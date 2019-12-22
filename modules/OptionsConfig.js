/**
 * This class stores the options config and provides methods for interacting with it.
*/
class OptionsConfig {
	/**
	 * @param {Array<Page>} config Array of page objects delineating the options.
	 */
	constructor( config ) {
		this.config = config;
		/**
		 * this.options is a one-level deep object of {option.name: option,..}
 	 	 * which allows options can be easily and efficiently iterated.
	 	 * this.options is an implementation deta
	 	 * and should not be depended on (only access the config through functions).
		 * @private
		 * @type {Object}
		 */
		this.options = this.depthCopyTraverse();
	}

	/**
	 * Used on instantiating to create this.options, which is a
	 * list of options that is one level deep.
	 * @private
	 * @return {Object}
	 */
	depthCopyTraverse() {
		const options = {};
		const copy = function ( option ) {
			options[ option.name ] = option;
		};
		this.config.forEach( ( page ) => {
			page.traverse( copy );
		} );
		return options;
	}

	/**
	 * Returns the options config object.
	 * This should only be used to find information about the config object, not for modification
	 * Only options should be modified, using {@link OptionsConfig#traverse}} to access each option.
	 * @returns {Object}
	*/
	getConfig() {
		return this.config;
	}

	/**
	 * Run a function on every option.
	 * @param {Function} func
	*/
	traverse( func ) {
		for ( const optionName in this.options ) {
			func( this.options[ optionName ] );
		}
	}

	/**
	 * Retrieve a property from every option.
	 * @example
	 * // Retrieve the default value of every option
	 * optionsConfig.retrieveProperty( 'defaultValue' )
	 * @param {string} propertyName
	 * @returns {Object} {option.name: option.propertyName,...}
	 */
	retrieveProperty( propertyName ) {
		const optionProperties = {};
		for ( const optionName in this.options ) {
			const option = this.options[ optionName ];
			optionProperties[ optionName ] = option[ propertyName ];
		}
		return optionProperties;
	}

	/**
	 * Updates the value of a property for desired options.
	 * @example
	 * // Update the value of the option "InputWidth"
	 * optionsConfig.updateProperty( 'value', {InputWidth: false})
	 * @example
	 * // Set all values to default
	 * optionsConfig.updateProperty( 'value', optionsConfig.retrieveProperty( 'defaultValue' ))
	 * @param {string} propertyName
	 * @param {Object} newPropertyValues {option.name: newPropertyValue,...}
	 */
	updateProperty( propertyName, newPropertyValues ) {
		for ( const optionName in newPropertyValues ) {
			const newPropertyValue = newPropertyValues[ optionName ];
			const option = this.options[ optionName ];
			if ( option ) {
				option[ propertyName ] = newPropertyValue;
			}
		}
	}
}

export default OptionsConfig;
