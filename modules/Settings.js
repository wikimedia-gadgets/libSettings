import wrapSettingsDialog from 'SettingsDialog.js';

/**
 * Primary functions used here will be Settings.get to get the user options and
 * Settings.display to display the settings.
 * @extends OO.EventEmitter
 */
class Settings extends OO.EventEmitter {
	/**
	 * @param {Object} config
	 * @param {OptionsConfig} config.optionsConfig OptionsConfig object. (required)
	 * @param {string} config.scriptName The name of the script using libSettings.
	 * Used in user agents in API calls and is the default name by which options are saved
	 * using API:Options. Changing this will mean options under the old name will not be loaded.
	 * (consider setting config.optionName to the old name if renaming script.) (required)
	 * @param {string} config.title The title of the settings window, if it should not be
	 * "Settings".
	 * @param {string} [config.optionName = scriptName] optionName is the name under which
	 * the options are stored using API:Options.
	 * ("userjs-" is prepended to this as that is required by MediaWiki).
	 * @param {string} config.size An OO.ui.Window size for the settings window.
	 * ({@link https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.Window-cfg-size documentation})
	 * @param {boolean} config.helpInline The default for whether help text should be inline.
	 * @param {boolean} config.useUserOptions Whether to load and
	 * save user options using API:Options. If true, saving has to be manually done.
	 * @param {Object} config.userOptions The saved user options, if they are being loaded
	 * in another manner. Has to be used alongside config.useUserOptions = true.
	 * @param {boolean} config.notifyUponSave Whether to notify the user upon saving.
	 * @param {boolean} config.reloadUponSave Whether to reload the page upon saving.
	 * @param {string} config.saveLabel Can configure saveLabel, cancelLabel,
	 * showDefaultsLabel, and showCurrentSettingsLabel if using this dialog for another purpose,
	 * like initial configuration for an action.
	 * @param {string} config.cancelLabel
	 * @param {string} config.showDefaultsLabel
	 * @param {string} config.showCurrentSettingsLabel
	*/
	constructor( config ) {
		super();
		this.optionsConfig = config.optionsConfig;
		this.scriptName = config.scriptName;
		this.optionName = `userjs-${config.optionName || config.scriptName}`;
		this.size = config.size;
		this.title = config.title || mw.msg( 'libSettings-settings-title' );
		this.useUserOptions = ( config.useUserOptions === undefined ) || config.useUserOptions;
		this.notifyUponSave = ( config.notifyUponSave === undefined ) || config.notifyUponSave;
		this.reloadUponSave = ( config.reloadUponSave === undefined ) || config.reloadUponSave;
		this.userOptions = config.userOptions || {};
		this.optionsConfig.traverse( ( option ) => {
			if ( option.helpInline === undefined ) {
				option.helpInline = config.helpInline;
			}
		} );
		this.height = config.height;

		this.saveLabel = config.saveLabel || mw.msg( 'libSettings-save-label' );
		this.cancelLabel = config.cancelLabel || mw.msg( 'libSettings-cancel-label' );
		this.showDefaultsLabel = config.showDefaultsLabel || mw.msg( 'libSettings-showDefaults-label' );
		this.showCurrentSettingsLabel = config.showCurrentSettingsLabel || mw.msg( 'libSettings-showCurrentSettings-label' );
		this.saveMessage = mw.msg( 'libSettings-save-success-message', this.scriptName );
		this.saveFailMessage = mw.msg( 'libSettings-save-fail-message', this.scriptName );
	}

	/**
	 * Load settings using mw.user.options.get. Called by {@link Settings#get} if applicable.
	 */
	load() {
		this.optionsText = mw.user.options.get( this.optionName );
		this.userOptions = JSON.parse( this.optionsText ) || {};
	}

	/**
	 * Get settings.
	 * Calls {@link Settings#load} if configured to use user options from mw.user.options
	 * and settings haven't previously been loaded.
	 * @return {Object} { [optionName]: [optionValue],...}
	*/
	get() {
		if ( !this.options ) {
			if ( this.useUserOptions ) {
				this.load();
			}
			this.optionsConfig.updateProperty( 'value', this.userOptions );
			this.options = this.optionsConfig.retrieveProperty( 'value' );
		}
		return this.options;
	}

	/**
	 * Notifies the user about whether the settings were saved successfully or not.
	 * Set notifyUponSave to false to disable this.
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
	 * Automatically called when the save button is clicked.
	 * Only saves settings that are different from the default.
	 * If useUserOptions, returns the new user options, but actual saving
	 * or further work is left to the user, who also has to manually emit
	 * {@link Settings#endSave} once saving is complete and run {@link Settings#notifySave}.
	 * @listens SettingsDialog#startSave
	 * @fires Settings#endSave
	 * @returns {Promise|Object}
	 */
	save() {
		this.newUserOptions = this.optionsConfig.retrieveProperty( 'customUIValue' );
		if ( this.useUserOptions ) {
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
				() => {
					/**
						 * Indicates that settings has been saved. Listened to by settingsDialog
						 * to know when to close the window.
						 * @event Settings#endSave
						 */
					this.emit( 'endSave' );
				}
			);
		} else {
			return this.newUserOptions;
		}
	}

	/**
	 * Create window if not created already. Create new {@link SettingsDialog}
	 * and bind relevant events.
	 * @private
	 * @returns {OO.ui.WindowManager}
	 */
	displayMain() {
		if ( !this.windowManager ) {
			const SettingsDialog = wrapSettingsDialog();
			SettingsDialog.static.name = 'settingsDialog';
			SettingsDialog.static.title = this.title;
			SettingsDialog.static.actions = [
				{ action: 'save', label: this.saveLabel, flags: [ 'primary', 'progressive' ] },
				{ action: 'cancel', label: this.cancelLabel, flags: [ 'safe', 'destructive' ] },
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

			// Bind events
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
	 * Display the settings dialog. Bind to a relevant button in your script's
	 * interface.
	 * @returns {Promise<OO.ui.WindowManager>} Promise that gives the OO.ui.WindowManager of the
	 * settings dialog upon resolving.
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

export default Settings;
