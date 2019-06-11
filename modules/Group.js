/**
 * @property {boolean} config.hide
 */
export default class Group {
	constructor( config ) {
		this.header = config.header;
		this.hide = config.hide;
		this.options = config.options;
		this.UIconfig = config.UIconfig || {};
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

	buildUI() {
		if ( !this.hide ) {
			this.hasUI = true;
			return this.UI();
		}
	}

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
