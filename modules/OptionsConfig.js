/* import Page from 'Page.js';*/
import Group from 'Group.js';

/* @param
** This class provides the only methods for interacting with OptionsConfig
** for safety.
*/
export default class OptionsConfig {
	constructor() {
		/* this.config shouldn't be modified. Only options should be modified, using
		** iterateOptions to access each option.
		** Don't access this.config directly; instead, use getConfig, if necessary.  */
		this.config = Array( arguments );
	}

	getConfig() {
		return this.config;
	}

	/* Traverse through optionsConfig and run the function over each option
	* @function
	* @return {Object} */
	iterate( func ) {
		this.config.forEach( ( page ) => {
			page.preferences.forEach( ( element ) => {
				if ( element instanceof Group ) {
					element.options.forEach( option => func( option ) );
				} else {
					func( element );
				}
			} );
		} );
	}

	/*
	iterateLevels( pageFunc, groupFunc, optionFunc ) {

	}*/

	/* Update custom value.
	** @param optionValues {Object} {optionName1: newValue1...} */
	updateCustomValue( optionValues ) {
		this.iterate( ( option ) => {
			const newCustomValue = optionValues[ option.name ];
			if ( newCustomValue !== undefined ) {
				option.customValue = newCustomValue;
			}
		} );
	}

	/* Retrieve each option's value as an object.
	** @return {Object} */
	retrieveValues() {
		const options = {};
		this.runOverOptionsConfig( ( option ) => {
			options[ option.name ] = option.value;
		} );
		return options;
	}
}
