/**
 * A Group of options.
 */
class Group {
	/**
	 * @param {Object} config
	 * @param {string} config.header
	 * @param {boolean} config.hide
	 * @param {Array<Option>} config.options
	 * @param {Object} config.UIconfig
	 */
	constructor( config ) {
		this.header = config.header;
		this.hide = config.hide;
		this.options = config.options;
		this.UIconfig = config.UIconfig || {};
	}

	/**
	 * Traverse options
	 * @param {Function} func
	 */
	traverse( func ) {
		this.options.forEach( ( option ) => {
			func( option );
		} );
	}

	/**
	 * @return {OO.ui.FieldsetLayout}
	 */
	buildUI() {
		if ( !this.hide ) {
			this.hasUI = true;
			return this.UI();
		}
	}

	/**
	 * @return {OO.ui.FieldsetLayout}
	 */
	UI() {
		this.UIconfig.label = this.header;
		const fieldset = new OO.ui.FieldsetLayout( this.UIconfig );
		let fieldLayouts = this.options.map(
			option => option.buildUI()
		);
		fieldLayouts = fieldLayouts.filter( element => element );
		fieldset.addItems( fieldLayouts );
		return fieldset;
	}
}

export default Group;
