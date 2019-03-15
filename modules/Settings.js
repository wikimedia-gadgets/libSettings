/**
 * @param {Array.<Object>} optionsConfig
 * @property {string} optionsConfig[].title Header of particular set of preferences
 * @property {(boolean|Function)} [optionsConfig[].show] Boolean or function that returns a
 * Boolean. Can use anonymous function when a variable is only loaded after the settings is loaded.
 * @property {(boolean|Function)} [optionsConfig[].collapsed] Whether the settings should be
 *  collapsed (e.g, if it is rarely used "Advanced" settings).
 * @property {...libSettings.Option} optionsConfig[].preferences Array of Option objects.
 * @param {Object} settingsConfig
 * @property {string} settingsConfig.scriptName
 * @property {string} [settingsConfig.optionName = scriptName] optionName is the name under which
 * the options are stored using API:Options.( "userjs-" is prepended to this ).
 * @property {string} settingsConfig.size Same as https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.Window-static-property-size
 * @property {string} [settingsConfig.customSaveFailMessage]
 *
*/

export default class Settings {
	constructor(
		optionsConfig,
		settingsConfig
	) {
		// optionsConfig
		this.optionsConfig = optionsConfig;
		/* this.defaultOptions = {};
		this.runOverOptionsConfig( ( option ) => {
			this.defaultOptions[ option.name ] = option.defaultValue;
		} );*/
		this.scriptName = settingsConfig.scriptName;
		this.optionName = `userjs-${ settingsConfig.optionName || settingsConfig.scriptName }`;
		this.size = settingsConfig.size;
		this.saveMessage = `Settings for ${this.scriptName} successfully saved.`;
		this.saveFailMessage = settingsConfig.customSaveFailMessage || `Could not save settings for ${this.scriptName}.`;
	}

	/* Traverse through optionsConfig and get the requested value from the key,
	 * returning as a pair of option name and that value.
	 * settings menu
	 * @function
	 * @return {Object} */
	runOverOptionsConfig( func ) {
		this.optionsConfig.forEach( ( element ) => {
			element.preferences.forEach( ( option ) => {
				func( option );
			} );
		} );
	}

	/** Get settings
	 * @func
	 * @return {Object} { [optionName]: [optionValue],...}
	*/
	get() {
		if ( !this.options ) {
			this.optionsText = mw.user.options.get( this.optionName );
			this.userOptions = JSON.parse( this.optionsText );
			// transfer userOptions to optionsConfig
			this.runOverOptionsConfig( ( option ) => {
				const userOption = this.userOptions[ option.name ];
				if ( userOption !== undefined ) {
					option.setCustomValue( userOption );
				}
			} );

			// Then retrieve it, along with default Option as necessary
			this.options = {};
			this.runOverOptionsConfig( ( option ) => {
				this.options[ option.name ] = option.value;
			} );
		}
		return this.options;
	}

	/** Save settings
	 * Only saves unique settings, i.e settings that are different from the default
	 * @returns {Promise}
	 */
	save() {
		return mw.loader.using( 'mediawiki.api' ).then( () => {
			this.API = new mw.Api( {
				ajax: {
					headers: {
						'Api-User-Agent': `Script ${this.scriptName} using libSettings.`
					}
				}
			} );
			this.newUserOptions = {};
			this.runOverOptionsConfig( ( option ) => {
				this.newUserOptions[ option.name ] = option.getCustomValue();
			} );
			return this.API.saveOption( this.optionName, JSON.stringify( this.newUserOptions ) );
		} );
	}

	displayMain() {
		this.pages = [];

		// Deal with case of optionsConfig len 1 - can't BookLetLayout as only would be one BookLet
		this.optionsConfig.forEach( ( element ) => {
			const Temp = function ( name, config ) {
				Temp.super.call( this, name, config );
				// eslint-disable-next-line no-restricted-syntax
				element.preferences.forEach( ( option ) => {
					this.$element.append( option.UI().$element );
				} );
			};

			OO.inheritClass( Temp, OO.ui.PageLayout );
			Temp.prototype.setupOutlineItem = function () {
				this.outlineItem.setLabel( element.title );
			};

			const temp = new Temp( element.title );
			this.pages.push( temp );
		} );

		const booklet = new OO.ui.BookletLayout( {
			outlined: true
		} );

		booklet.addPages( this.pages );

		const SettingsDialog = function ( config ) {
			SettingsDialog.super.call( this, config );
		};

		OO.inheritClass( SettingsDialog, OO.ui.ProcessDialog );
		SettingsDialog.static.name = 'settingsDialog';
		SettingsDialog.static.title = 'Settings';
		SettingsDialog.static.actions = [
			{ action: 'save', label: 'Save settings', flags: [ 'primary', 'progressive' ] },
			{ label: 'Cancel', flags: 'safe' }
		];

		SettingsDialog.prototype.initialize = function () {
			SettingsDialog.super.prototype.initialize.call( this );
			this.content = booklet;
			this.$body.append( this.content.$element );
		};

		const self = this;
		SettingsDialog.prototype.getActionProcess = function ( action ) {
			if ( action ) {
				return new OO.ui.Process( () => {
					self.save().then( () => {
						mw.notify( self.saveMessage );
					}, () => {
						mw.notify( self.saveFailMessage );
					} ).always( () => {
						this.close( { action: action } );
					} );
				} );
			}
			return SettingsDialog.parent.prototype.getActionProcess.call( this, action );
		};

		/* SettingsDialog.prototype.getBodyHeight = function () {
			return this.content.$element.outerHeight( 800 );
		};*/

		// Make the window.
		const settingsDialog = new SettingsDialog( {
			size: 'full' || this.size // TEMP, need to figure out how to make window size proper with sizes other than full
		} );

		// Create and append a window manager
		const windowManager = new OO.ui.WindowManager();

		// eslint-disable-next-line jquery/no-global-selector
		$( 'body' ).append( windowManager.$element );

		// Add the window to the window manager using the addWindows() method.
		windowManager.addWindows( [ settingsDialog ] );

		// Open the window!
		windowManager.openWindow( settingsDialog );
	}

	display() {
		this.get();
		mw.loader.using( [ 'oojs-ui-core', 'oojs-ui-widgets', 'oojs-ui-windows' ] ).then( () => {
			return this.displayMain();
		} );
	}
}
