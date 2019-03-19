import wrapSettingsDialog from 'SettingsDialog.js';

/**
 * @param {Object} settingsConfig
 * @property {string} settingsConfig.scriptName
 * @property {string} [settingsConfig.optionName = scriptName] optionName is the name under which
 * the options are stored using API:Options.( "userjs-" is prepended to this ).
 * @property {string} settingsConfig.size Same as https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.Window-static-property-size
 * @property {number} settingsConfig.title
 *
 * @property {Array.<Object>} config.optionsConfig
 * @property {string} config.optionsConfig[].title Header of particular set of preferences
 * @property {string} config.optionsConfig[].level Indentation level, see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/OO.ui.OutlineOptionWidget
 * @property {(boolean)} [config.optionsConfig[].hide] Boolean ( NOT IMPLEMENTED:
 * or function that returns a Boolean.
 * Can use function when a variable is only loaded after the settings is loaded. )
 * @property {...libSettings.Option} config.optionsConfig[].preferences Array of Option objects.
 *
*/

export default class Settings {
	constructor(
		config
	) {
		mw.messages.set( {
			'ls-saveMessage': 'Settings for $1 successfully saved.',
			'ls-saveFailMessage': 'Could not save settings for $1.',
			'ls-save': 'Save settings',
			'ls-cancel': 'Cancel',
			'ls-showDefaults': 'Show defaults',
			'ls-showCurrentSettings': 'Show current settings'
		} );
		this.optionsConfig = config.optionsConfig;
		this.scriptName = config.scriptName;
		this.optionName = `userjs-${config.optionName || config.scriptName}`;
		this.size = config.size;
		this.title = config.title || 'Settings';
		this.saveSettings = ( config.saveSettings === undefined ) || config.saveSettings;
		this.notifyUponSave = ( config.notifyUponSave !== undefined ) ?
			config.notifyUponSave : this.saveSettings;
		this.reloadUponSave = ( config.reloadUponSave !== undefined ) ?
			config.reloadUponSave : this.saveSettings;
		this.userOptions = config.userOptions || {};
		this.runOverOptionsConfig( ( option ) => {
			if ( option.helpInline === undefined ) {
				option.helpInline = config.helpInline;
			}
		} );
		this.height = config.height;

		this.saveSettingsLabel = config.saveSettingsLabel || mw.msg( 'ls-save' );
		this.cancelLabel = config.cancelLabel || mw.msg( 'ls-cancel' );
		this.showDefaultsLabel = config.showDefaultsLabel || mw.msg( 'ls-showDefaults' );
		this.showCurrentSettingsLabel = config.showCurrentSettingsLabel || mw.msg( 'ls-showCurrentSettings' );
		this.saveMessage = mw.msg( 'ls-saveMessage', this.scriptName );
		this.saveFailMessage = mw.msg( 'ls-saveFailMessage', this.scriptName );
	}

	/* Traverse through optionsConfig and run the function over each option
	 * @function
	 * @return {Object} */
	runOverOptionsConfig( func ) {
		this.optionsConfig.forEach( ( element ) => {
			element.preferences.forEach( ( element2 ) => {
				if ( element2.header ) {
					element2.options.forEach( option => func( option ) );
				} else {
					func( element2 );
				}
			} );
		} );
	}

	load() {
		this.optionsText = mw.user.options.get( this.optionName );
		this.userOptions = JSON.parse( this.optionsText ) || {};
	}

	transfer() {
		// transfer userOptions to optionsConfig
		this.runOverOptionsConfig( ( option ) => {
			const userOption = this.userOptions[ option.name ];
			if ( userOption !== undefined ) {
				option.customValue = userOption;
			}
		} );

		// Then retrieve it, along with default Option as necessary
		this.options = {};
		this.runOverOptionsConfig( ( option ) => {
			this.options[ option.name ] = option.value;
		} );
		return this.options;
	}

	/** Get settings
	 * @func
	 * @return {Object} { [optionName]: [optionValue],...}
	*/
	get() {
		if ( !this.options ) {
			if ( this.saveSettings ) {
				this.load();
			}
			this.transfer();
		}
		return this.options;
	}

	notifySave( status ) {
		if ( this.notifyUponSave ) {
			if ( status ) {
				mw.notify( this.saveMessage );
			} else {
				mw.notify( this.saveFailMessage );
			}
		}
	}

	/** Save settings
	 * Only saves unique settings, i.e settings that are different from the default
	 * @returns {Promise|function}
	 */
	save() {
		this.newUserOptions = {};
		this.runOverOptionsConfig( ( option ) => {
			this.newUserOptions[ option.name ] = option.getCustomUIValue();
		} );

		if ( this.saveSettings ) {
			return mw.loader.using( 'mediawiki.api' ).then( () => {
				this.API = new mw.Api( {
					ajax: {
						headers: {
							'Api-User-Agent': `Script ${this.scriptName} using libSettings.`
						}
					}
				} );
				return this.API.saveOption(
					this.optionName,
					JSON.stringify( this.newUserOptions )
				).then( () => this.notifySave( true ), () => this.notifySave( false ) );
			} );
		} else {
			this.notifySave( true );
			return () => this.newUserOptions;
		}
	}

	displayMain() {
		if ( !this.windowManager ) {
			const SettingsDialog = wrapSettingsDialog();
			SettingsDialog.static.name = 'settingsDialog';
			SettingsDialog.static.title = this.title;
			SettingsDialog.static.actions = [
				{ action: 'save', label: this.saveSettingsLabel, flags: [ 'primary', 'progressive' ] },
				{ label: this.cancelLabel, flags: [ 'safe', 'destructive' ] },
				{ action: 'showDefault', label: this.showDefaultsLabel }
			];

			if ( Object.keys( this.userOptions ).length > 0 ) {
				SettingsDialog.static.actions.push(
					{ action: 'showCurrentSettings', label: this.showCurrentSettingsLabel }
				);
			}

			// Make the window.
			this.settingsDialog = new SettingsDialog( {
				size: this.size,
				classes: [ 'settingsDialog' ]
			}, this );

			// Bindings
			this.runOverOptionsConfig( ( option ) => {
				option.connect( this.settingsDialog, {
					change: 'changeHandler'
				} );
			} );

			this.windowManager = new OO.ui.WindowManager();

			document.body.appendChild( this.windowManager.$element[ 0 ] );

			this.windowManager.addWindows( [ this.settingsDialog ] );
			this.windowManager.on( 'closing', ( win, closed, data ) => {
				if ( data ) {
					data.then( () => {
						if ( this.reloadUponSave ) {
							window.location.reload();
						}
					} );
				}
			} );
		}

		this.windowManager.openWindow( this.settingsDialog );

		return this.windowManager;
	}

	display() {
		this.get();
		return mw.loader.using( [ 'oojs-ui-core', 'oojs-ui-widgets', 'oojs-ui-windows' ] ).then( () => {
			return this.displayMain();
		} );
	}
}
