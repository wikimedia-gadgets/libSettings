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
 * @property {(boolean|Function)} [config.optionsConfig[].show] Boolean or function that returns a
 * Boolean. Can use anonymous function when a variable is only loaded after the settings is loaded.
 * @property {...libSettings.Option} config.optionsConfig[].preferences Array of Option objects.
 *
*/

export default class Settings {
	constructor(
		config
	) {
		this.optionsConfig = config.optionsConfig;
		this.scriptName = config.scriptName;
		this.optionName = `userjs-${ config.optionName || config.scriptName }`;
		this.size = config.size;
		this.title = config.title || 'Settings';
		this.saveMessage = `Settings for ${this.scriptName} successfully saved.`;
		this.saveFailMessage = `Could not save settings for ${this.scriptName}.`;
		this.runOverOptionsConfig( ( option ) => {
			if ( option.helpInline !== undefined ) {
				option.helpInline = config.helpInline;
			}
		} );
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

	/** Reset optionsConfig
	 * Resets the optionsconfig (but does not save)
	 */

	reset() {
		this.runOverOptionsConfig( ( option ) => option.reset() );
		this.options = undefined;
	}

	displayMain() {
		const SettingsDialog = wrapSettingsDialog();
		// Make the window.
		const settingsDialog = new SettingsDialog( {
			size: this.size,
			classes: [ 'settingsDialog' ]
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
