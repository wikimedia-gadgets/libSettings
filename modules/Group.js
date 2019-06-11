/**
 * @property {(boolean|function)} config.hide
 */
export default class Group {
	constructor( config ) {
		this.header = config.header;
		this.hide = config.hide;
		this.options = config.options;
	}

	/**
	 * Traverse options
	 * @param {Function} func
	 * @param {boolean} ignoreHidden Whether to ignore elements that have element.hide
	 */
	traverse( func, ignoreHidden ) {
		this.options.forEach( ( option ) => {
			if ( ignoreHidden && option.hide ) {
				return;
			}
			func( option );
		} );
	}
}
