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
 * @property {(boolean)} [config.optionsConfig[].hide] Boolean ( NOT IMPLEMENTED: or function that returns a
 * Boolean. Can use function when a variable is only loaded after the settings is loaded. )
 * @property {...libSettings.Option} config.optionsConfig[].preferences Array of Option objects.
 *
*/

export default class Settings extends OO.EventEmitter {
	constructor(
		config
	) {
		super();
		this.optionsConfig = config.optionsConfig;
		this.scriptName = config.scriptName;
		this.optionName = `userjs-${ config.optionName || config.scriptName }`;
		this.size = config.size;
		this.title = config.title || 'Settings';
		this.saveMessage = `Settings for ${this.scriptName} successfully saved.`;
		this.saveFailMessage = `Could not save settings for ${this.scriptName}.`;
		this.saveSettings = ( config.saveSettings !== undefined ) ? config.saveSettings : true;
		this.notifyUponSave = ( config.notifyUponSave !== undefined ) ?
			config.notifyUponSave : this.saveSettings;
		this.userOptions = config.userOptions || {};
		this.runOverOptionsConfig( ( option ) => {
			if ( option.helpInline === undefined ) {
				option.helpInline = config.helpInline;
			}
		} );
		this.height = config.height;
		this.saveSettingsLabel = config.saveSettingsLabel || 'Save settings';
		this.cancelLabel = config.cancelLabel || 'Cancel';
		this.showDefaultsLabel = config.showDefaultsLabel || 'Show defaults';
		this.showCurrentSettingsLabel = config.showCurrentSettingsLabel || 'Show current settings';

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
	 * @returns {Promise}
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
		const settingsDialog = new SettingsDialog( {
			size: this.size,
			classes: [ 'settingsDialog' ]
		}, this );

		// Bindings
		this.runOverOptionsConfig( ( option ) =>{
			option.connect( settingsDialog, {
				change: 'changeHandler'
			} );
		} );

		// Create and append a window manager
		const windowManager = new OO.ui.WindowManager();

		// eslint-disable-next-line jquery/no-global-selector
		$( 'body' ).append( windowManager.$element );

		windowManager.addWindows( [ settingsDialog ] );
		windowManager.openWindow( settingsDialog );
		return windowManager;
	}

	display() {
		this.get();
		return mw.loader.using( [ 'oojs-ui-core', 'oojs-ui-widgets', 'oojs-ui-windows' ] ).then( () => {
			return this.displayMain();
		} );
	}
}
