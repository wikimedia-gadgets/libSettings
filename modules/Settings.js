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
		// Creating and opening a simple dialog window.

		// Subclass Dialog class. Note that the OOjs inheritClass() method extends the parent constructor's prototype and static methods and properties to the child constructor.

		function MyDialog( config ) {
			MyDialog.super.call( this, config );
		}

		OO.inheritClass( MyDialog, OO.ui.Dialog );
		// Specify a name for .addWindows()
		MyDialog.static.name = 'myDialog';
		// Specify a title statically (or, alternatively, with data passed to the opening() method).
		MyDialog.static.title = 'Simple dialog';

		// Customize the initialize() function: This is where to add content to the dialog body and set up event handlers.
		MyDialog.prototype.initialize = function () {
		// Call the parent method
			MyDialog.super.prototype.initialize.call( this );
			// Create and append a layout and some content.
			this.content = new OO.ui.PanelLayout( {
				padded: true,
				expanded: false
			} );
			this.content.$element.append( '<p>A simple dialog window. Press \'Esc\' to close. </p>' );
			this.$body.append( this.content.$element );
		};

		// Override the getBodyHeight() method to specify a custom height (or don't to use the automatically generated height)
		MyDialog.prototype.getBodyHeight = function () {
			return this.content.$element.outerHeight( true );
		};

		// Make the window.
		const myDialog = new MyDialog( {
			size: 'medium'
		} );

		// Create and append a window manager, which will open and close the window.
		const windowManager = new OO.ui.WindowManager();
		// eslint-disable-next-line jquery/no-global-selector
		$( 'body' ).append( windowManager.$element );

		// Add the window to the window manager using the addWindows() method.
		windowManager.addWindows( [ myDialog ] );

		// Open the window!
		windowManager.openWindow( myDialog );
	}

	display() {
		mw.loader.using( 'oojs-ui-core', 'oojs-ui-windows' ).then( () => {
			this.displayMain();
		} );
	}
}
