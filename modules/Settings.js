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
 * @property {string} settingsConfig.formFactor "small" | "medium" | "large" | "fullpage"
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
		this.defaultOptions = {};
		this.optionsConfig.forEach( ( element ) => {
			element.preferences.forEach( ( option ) => {
				this.defaultOptions[ option.name ] = option.defaultValue;
			} );
		} );
		this.scriptName = settingsConfig.scriptName;
		this.optionName = `userjs-${ settingsConfig.optionName || settingsConfig.scriptName }`;
		this.saveMessage = `Settings for ${this.scriptName} saved.`;
		this.saveFailMessage = settingsConfig.customSaveFailMessage || `Could not save settings for ${this.scriptName}.`;
	}

	/** Save settings
	 * Only saves unique settings, i.e settings that are different from the default
	 */
	save() {
		mw.loader.using( 'mediawiki.api' ).then( () => {
			this.API = new mw.Api( {
				ajax: {
					headers: {
						'Api-User-Agent': `Script ${this.scriptName} using libSettings.`
					}
				}
			} );
			this.API.saveOption( this.optionName, JSON.stringify( /* ?*/ ) ).then( () => {
				mw.notify( this.saveMessage );
			}, () => {
				mw.notify( this.saveFailMessage );
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
			this.defaultKeys = Object.keys( this.defaultOptions );
			this.options = {};
			// Loop clones this.defaultOptions while using this.userOptions when it exists
			this.defaultKeys.foreach( ( key ) => {
				this.options[ key ] = this.userOptions[ key ] || this.defaultOptions[ key ];
			} );
		}
		return this.options;
	}

	/* Traverse through this.optionsConfig and get the values inputed by the user into the
	 * settings menu */
	getInputedValues() {

	}

	displayMain() {
		function PageOneLayout( name, config ) {
			PageOneLayout.super.call( this, name, config );
			this.$element.append( '<p>First page</p>' );
		}

		OO.inheritClass( PageOneLayout, OO.ui.PageLayout );
		PageOneLayout.prototype.setupOutlineItem = function () {
			this.outlineItem.setLabel( 'Page One' );
		};

		function PageTwoLayout( name, config ) {
			PageTwoLayout.super.call( this, name, config );
			this.$element.append( '<p>Second page</p>' );
		}

		OO.inheritClass( PageTwoLayout, OO.ui.PageLayout );
		PageTwoLayout.prototype.setupOutlineItem = function () {
			this.outlineItem.setLabel( 'Page Two' );
		};

		// Create the pages
		const page1 = new PageOneLayout( 'one' );
		const page2 = new PageTwoLayout( 'two' );

		// Create a booklet. Set 'outlined' to 'true' to display the
		// outline labels (e.g., 'Page One') on the left side of the booklet.
		const booklet = new OO.ui.BookletLayout( {
			outlined: true
		} );

		// Add pages to the booklet with the addPages() method.
		booklet.addPages( [ page1, page2 ] );

		const SettingsDialog = function ( config ) {
			SettingsDialog.super.call( this, config );
		};

		OO.inheritClass( SettingsDialog, OO.ui.Dialog );
		SettingsDialog.static.name = 'settingsDialog';
		SettingsDialog.static.title = 'Settings';

		SettingsDialog.prototype.initialize = function () {
			SettingsDialog.super.prototype.initialize.call( this );
			this.content = booklet;
			this.$body.append( this.content.$element );
		};

		/* SettingsDialog.prototype.getBodyHeight = function () {
			return this.content.$element.outerHeight( false );
		};*/

		// Make the window.
		const settingsDialog = new SettingsDialog( {
			size: 'larger'
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
		mw.loader.using( [ 'oojs-ui-core', 'oojs-ui-widgets', 'oojs-ui-windows' ] ).then( () => {
			return this.displayMain();
		} );
	}
}
