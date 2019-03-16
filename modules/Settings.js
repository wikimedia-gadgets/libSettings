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
 * @property {number} settingsConfig.title
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
		this.title = settingsConfig.title || 'Settings';
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
					option.customValue = userOption;
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
				this.newUserOptions[ option.name ] = option.getCustomUIValue();
			} );
			return this.API.saveOption( this.optionName, JSON.stringify( this.newUserOptions ) );
		} );
	}

	reset() {
		this.runOverOptionsConfig( ( option ) => option.reset() );
		this.options = undefined;
	}

	genInternalUI() {
		const pages = [];

		const onePage = this.optionsConfig.length === 1;
		this.optionsConfig.forEach( ( element ) => {
			const Temp = function ( name, config ) {
				Temp.super.call( this, name, config );
				element.preferences.forEach( ( option ) => {
					this.$element.append( option.UI().$element );
				} );
			};

			OO.inheritClass( Temp, OO.ui.PageLayout );
			Temp.prototype.setupOutlineItem = function () {
				this.outlineItem.setLabel( element.title );
			};

			const temp = new Temp( element.title, { padded: onePage } );
			pages.push( temp );
		} );

		let internalUI;

		if ( !onePage ) {
			internalUI = new OO.ui.BookletLayout( {
				outlined: true
			} );

			internalUI.addPages( pages );
		} else {
			internalUI = pages[ 0 ];
		}

		return internalUI;
	}

	displayMain() {
		const internalUI = this.genInternalUI();

		const SettingsDialog = function ( config ) {
			SettingsDialog.super.call( this, config );
		};

		OO.inheritClass( SettingsDialog, OO.ui.ProcessDialog );
		SettingsDialog.static.name = 'settingsDialog';
		SettingsDialog.static.title = this.title;
		SettingsDialog.static.actions = [
			{ action: 'save', label: 'Save settings', flags: [ 'primary', 'progressive' ] },
			{ label: 'Cancel', flags: [ 'safe', 'destructive' ] },
			{ action: 'reset', label: 'Show defaults' }
		];

		SettingsDialog.prototype.initialize = function () {
			SettingsDialog.super.prototype.initialize.call( this );
			this.content = internalUI;
			this.$body.append( this.content.$element );
		};

		const self = this;
		SettingsDialog.prototype.getActionProcess = function ( action ) {
			if ( action === 'save' ) {
				return new OO.ui.Process( () => {
					const promise = self.save();
					this.pushPending();
					this.close( promise );
					promise.then( () => {
						mw.notify( self.saveMessage );
					}, () => {
						mw.notify( self.saveFailMessage );
					} );
				} );
			}

			if ( action === 'reset' ) {
				return new OO.ui.Process( () => {
					self.reset();
					this.content = self.genInternalUI();
					this.$body.html( this.content.$element );
				} );
			}

			return SettingsDialog.parent.prototype.getActionProcess.call( this, action );
		};

		SettingsDialog.prototype.getHoldProcess = function ( data ) {
			const process = SettingsDialog.parent.prototype.getHoldProcess.call( this, data );
			process.next( data );
			process.next( () => this.popPending() );
			return process;
		};

		SettingsDialog.prototype.getBodyHeight = function () {
			return this.content.$element.outerHeight( 900 ); // TEMP, need to figure out how to properly make window size
		};

		// Make the window.
		const settingsDialog = new SettingsDialog( {
			size: this.size
		} );

		// Create and append a window manager
		const windowManager = new OO.ui.WindowManager();

		// eslint-disable-next-line jquery/no-global-selector
		$( 'body' ).append( windowManager.$element );

		windowManager.addWindows( [ settingsDialog ] );
		windowManager.openWindow( settingsDialog );
		return settingsDialog;
	}

	display() {
		this.get();
		mw.loader.using( [ 'oojs-ui-core', 'oojs-ui-widgets', 'oojs-ui-windows' ] ).then( () => {
			return this.displayMain();
		} );
	}
}
