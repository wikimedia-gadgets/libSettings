/**
 * This class provides the only methods for interacting with OptionsConfig
 * for safety.
*/
class OptionsConfig {
	/**
	 * @param {Array<Page>} config
	 */
	constructor( config ) {
		this.config = config;
		/**
		 * this.options is a single level object of {option.name: option,..}
 	 	 * which allows options can be easily and efficiently iterated.
	 	 * this.options is an implementation detail of traverse, and retrieveProperty
	 	 * and should not be depended on (only access optionsConfig through functions).
		 * @private
		 * @type {Array}
		 */
		this.options = this.depthCopyTraverse();
	}

	/**
	 * Don't access this.config directly; instead, use getConfig, if necessary to access.
	 * Getting should only be used to find information about this.config, not for modification -
	 * this.config shouldn't be modified. Only options should be modified, using
	 * traverse to access each option.
	 * @returns {Object}
	*/
	getConfig() {
		return this.config;
	}

	/**
	 * FIXME: Don't actually use the ignoreHidden functionality anywhere,
	 * is it necessary? Would need to remove from Page and Group's traverse
	 * function too.
	 * Actually go in and get the options, and create an object
	 * with references to those options.
	 * Used on instantiating to create this.options, which is a
	 * list of options that is one level deep.
	 * @private
	 * @param {boolean} ignoreHidden
	 * @return {Object}
	 */
	depthCopyTraverse( ignoreHidden ) {
		const options = {};
		const copy = function ( option ) {
			options[ option.name ] = option;
		};
		this.config.forEach( ( page ) => {
			/**
			 * Don't do anything if ignoreHidden is true
			 * and the page is hidden.
			 */
			if ( ignoreHidden && page.hide ) {
				return;
			}
			page.traverse( copy, ignoreHidden );
		} );
		return options;
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
	 * Updates a property of desired options.
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
