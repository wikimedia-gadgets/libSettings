import wrapSettingsDialog from 'SettingsDialog.js';
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
		this.optionsConfig = optionsConfig;
		this.scriptName = settingsConfig.scriptName;
		this.optionName = `userjs-${ settingsConfig.optionName || settingsConfig.scriptName }`;
		this.size = settingsConfig.size;
		this.title = settingsConfig.title || 'Settings';
		this.saveMessage = `Settings for ${this.scriptName} successfully saved.`;
		this.saveFailMessage = settingsConfig.customSaveFailMessage || `Could not save settings for ${this.scriptName}.`;
	}

	/* Traverse through optionsConfig andrun the function over each option
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

	displayMain() {
		const SettingsDialog = wrapSettingsDialog();
		// Make the window.
		const settingsDialog = new SettingsDialog( {
			size: this.size
		}, this );

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
