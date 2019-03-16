import Option from 'Option.js';
/**
 * @extends Option
 */
export default class BooleanOption extends Option {
	constructor( config ) {
		super( config, 'Boolean', [ 'boolean' ] );
	}

	UI() {
		this.checkbox = new OO.ui.CheckboxInputWidget( {
			name: this.name,
			selected: this.value
		} );

		return OO.ui.FieldLayout( this.checkbox, {
			label: this.label,
			help: this.helptip,
			helpInline: this.helpInline,
			align: 'inline'
		} );
	}

	getUIvalue() {
		return this.UIelement.isSelected();
	}
}
