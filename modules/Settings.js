import wrapSettingsDialog from 'SettingsDialog.js';
const messages = require( '../i18n/en.json' );

/**
 * @param {Object} settingsConfig
 * @property {string} settingsConfig.scriptName
 * @property {string} [settingsConfig.optionName = scriptName] optionName is the name under which
 * the options are stored using API:Options.( "userjs-" is prepended to this ).
 * @property {string} settingsConfig.size Same as https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.Window-static-property-size
 * @property {number} settingsConfig.title
 *
*/

export default class Settings {
	constructor(
		config
	) {
		mw.messages.set( messages );
		this.optionsConfig = config.optionsConfig;
		this.scriptName = config.scriptName;
		this.optionName = `userjs-${config.optionName || config.scriptName}`;
		this.size = config.size;
		this.title = config.title || mw.msg( 'libSettings-settings-title' );
		this.saveSettings = ( config.saveSettings === undefined ) || config.saveSettings;
		this.notifyUponSave = ( config.notifyUponSave !== undefined ) ?
			config.notifyUponSave : this.saveSettings;
		this.reloadUponSave = ( config.reloadUponSave !== undefined ) ?
			config.reloadUponSave : this.saveSettings;
		this.userOptions = config.userOptions || {};
		this.optionsConfig.traverse( ( option ) => {
			if ( option.helpInline === undefined ) {
				option.helpInline = config.helpInline;
			}
		} );
		this.height = config.height;

		this.saveSettingsLabel = config.saveSettingsLabel || mw.msg( 'libSettings-save-label' );
		this.cancelLabel = config.cancelLabel || mw.msg( 'libSettings-cancel-label' );
		this.showDefaultsLabel = config.showDefaultsLabel || mw.msg( 'libSettings-showDefaults-label' );
		this.showCurrentSettingsLabel = config.showCurrentSettingsLabel || mw.msg( 'libSettings-showCurrentSettings-label' );
		this.saveMessage = mw.msg( 'libSettings-save-success-message', this.scriptName );
		this.saveFailMessage = mw.msg( 'libSettings-save-fail-message', this.scriptName );
	}

	/**
	 */
	load() {
		this.optionsText = mw.user.options.get( this.optionName );
		this.userOptions = JSON.parse( this.optionsText ) || {};
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
			this.optionsConfig.updateValues( this.userOptions );
			this.options = this.optionsConfig.retrieveValues();
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
		this.newUserOptions = this.optionsConfig.retrieveProperty( 'customUIvalue' );
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

			// If userOptions is specified, then can have a button to show current settings.
			if ( Object.keys( this.userOptions ).length > 0 ) {
				SettingsDialog.static.actions.push(
					{ action: 'showCurrentSettings', label: this.showCurrentSettingsLabel }
				);
			}

			// Make the window.
			this.settingsDialog = new SettingsDialog( {
				size: this.size,
				classes: [ 'settingsDialog' ]
			}, this.optionsConfig );

			// Bindings
			this.optionsConfig.traverse( ( option ) => {
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
