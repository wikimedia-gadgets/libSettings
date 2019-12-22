/**
 * A group of options.
 */
class Group {
	/**
	 * @param {Object} config
	 * @param {string} config.header Header of the group.
	 * @param {boolean} config.hide Whether the group should be hidden.
	 * @param {Array<Option>} config.options The options in the group.
	 * @param {Object} config.UIconfig Configuration that is passed into the underlying UI.
	 */
	constructor( config ) {
		this.header = config.header;
		this.hide = config.hide;
		this.options = config.options;
		this.UIconfig = config.UIconfig || {};
	}

	/**
	 * Run a function on every option of this group.
	 * @param {Function} func
	 */
	traverse( func ) {
		this.options.forEach( ( option ) => {
			func( option );
		} );
	}

	/**
	 * @protected
	 * @return {OO.ui.FieldsetLayout}
	 */
	buildUI() {
		if ( !this.hide ) {
			this.hasUI = true;
			return this.UI();
		}
	}

	/**
	 * @private
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
