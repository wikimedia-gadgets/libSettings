import Option from 'Option.js';
/**
 * @extends Option
 */
export default class BooleanOption extends Option {
	constructor( config ) {
		super( config, 'Boolean' );
	}

	UI() {
		this.UIconfig.name = this.name;
		this.UIconfig.selected = this.value;
		this.checkbox = new OO.ui.CheckboxInputWidget( this.UIconfig );
		return new OO.ui.FieldLayout( this.checkbox, {
			help: this.helptip,
			label: this.label,
			helpInline: this.helpInline,
			align: 'inline'
		} );
	}

	getUIvalue() {
		return this.checkbox.isSelected();
	}
}
