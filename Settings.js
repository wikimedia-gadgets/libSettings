'use strict';
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
 * the options are stored using API:Options. ( "userjs-" is prepended to this )
 * @property {string} settingsConfig.formFactor "small" | "medium" | "large" | "fullpage"
 * @property {string} [settingsConfig.customFailMessage]
 *
*/

libSettings.Settings = class {
	constructor(
		optionsConfig,
		settingsConfig
	) {
		// optionsConfig
		this.optionsConfig = optionsConfig;
		this.default;
		/* MAYBE FIXME: Check for duplicate names of options in optionsConfig
		 * - must be completely unique
		this.optionsConfig.foreach( ( element.preferences ) => {
			element.preferences.some ( ( optionElement ) => {
				optionElement.
			}
		} ); */

		this.scriptName = settingsConfig.scriptName;
		this.optionName = `userjs-${ settingsConfig.optionName || settingsConfig.scriptName}`;
		this.failMessage = settingsConfig.customFailMessage || `Could not load settings for ${this.scriptName}.`;
	}

	/* Function to get all the [@link libSettings.Option] objects inside optionsConfig */
	traverse() {

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
			this.API.saveOption( this.optionName, JSON.stringify( /* ?*/ ) );
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

	render() {

	}
};
