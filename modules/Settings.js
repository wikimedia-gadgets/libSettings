import wrapSettingsDialog from 'SettingsDialog.js';
const messages = require( '../i18n/en.json' );

/**
 * @param {Object} config
 * @property {string} config.scriptName
 * @property {string} [config.optionName = scriptName] optionName is the name under which
 * the options are stored using API:Options.( "userjs-" is prepended to this ).
 * @property {string} config.size @see https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.Window-static-property-size
 * @property {string} config.title
 * @property {Object} config.userOptions If user options are being loaded in another manner
 * (has to be used alongside config.saveSettings = true)
 * @property {OptionsConfig} config.optionsConfig
*/
export default class Settings extends OO.EventEmitter {
	constructor( config ) {
		super();
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
	 * Load settings using mw.user.options.get. Called by get() if applicable.
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
			this.optionsConfig.updateProperty( 'value', this.userOptions );
			this.options = this.optionsConfig.retrieveProperty( 'value' );
		}
		return this.options;
	}

	/**
	 * @param {boolean} status
	 */
	notifySave( status ) {
		if ( this.notifyUponSave ) {
			if ( status ) {
				mw.notify( this.saveMessage );
				if ( this.reloadUponSave ) {
					window.location.reload();
				}
			} else {
				mw.notify(
					this.saveFailMessage,
					{
						autoHide: false
					}
				);
			}
		}
	}

	/**
	 * Save settings
	 * Only saves unique settings, i.e settings that are different from the default
	 * @fires Settings#endSave Indicates when settings has been saved
	 * (listened to by settingsDialog).
	 * @returns {Promise|Object}
	 */
	save() {
		this.newUserOptions = this.optionsConfig.retrieveProperty( 'customUIValue' );
		if ( this.saveSettings ) {
			return mw.loader.using( 'mediawiki.api' ).then( () => {
				this.API = new mw.Api( {
					ajax: {
						headers: {
							'Api-User-Agent': `Script ${this.scriptName} using libSettings ([[w:en:MediaWiki:Gadget-libSettings.js]]).`
						}
					}
				} );
				return this.API.saveOption(
					this.optionName,
					JSON.stringify( this.newUserOptions )
				).then(
					() => this.notifySave( true ),
					() => this.notifySave( false )
				).always(
					() => this.emit( 'endSave' )
				);
			} );
		} else {
			/**
			 * User has to manually emit event indicating that settings have been saved
			 * and run this.notifySave()
			 */
			return this.newUserOptions;
		}
	}

	/**
	 * @returns {OO.ui.WindowManager}
	 */
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
			this.settingsDialog = new SettingsDialog(
				{
					size: this.size,
					classes: [ 'libSettings-SettingsDialog' ]
				},
				this.optionsConfig,
				this.height
			);

			// Bindings
			this.settingsDialog.connect( this, {
				startSave: 'save'
			} );
			this.connect( this.settingsDialog, {
				endSave: 'close'
			} );
			this.optionsConfig.traverse( ( option ) => {
				option.connect( this.settingsDialog, {
					change: 'changeHandler'
				} );
			} );

			this.windowManager = new OO.ui.WindowManager();

			document.body.appendChild( this.windowManager.$element[ 0 ] );

			this.windowManager.addWindows( [ this.settingsDialog ] );
			this.windowManager.on( 'closing', () => {

			} );
		}

		this.windowManager.openWindow( this.settingsDialog );

		return this.windowManager;
	}

	/**
	 *@returns {Promise<OO.ui.WindowManager>}
	 */
	display() {
		// Make sure we've loaded the user configured options before displaying the window
		this.get();
		// oojs-ui-widgets is needed for BookletLayout
		return mw.loader.using( [ 'oojs-ui-core', 'oojs-ui-widgets', 'oojs-ui-windows' ] ).then( () => {
			return this.displayMain();
		} );
	}
}
