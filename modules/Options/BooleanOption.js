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
