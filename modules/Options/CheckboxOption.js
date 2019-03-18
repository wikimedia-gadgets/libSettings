import Option from 'Option.js';
/**
 * @extends Option
 */
export default class CheckboxOption extends Option {
	constructor( config ) {
		super( config, 'Checkbox' );
	}

	UI( value ) {
		this.UIconfig.name = this.name;
		this.UIconfig.selected = value;
		this.checkboxInput = new OO.ui.CheckboxInputWidget( this.UIconfig );
		this.checkboxInput.connect( this, { change: 'change' } );
		return new OO.ui.FieldLayout( this.checkboxInput, {
			help: this.help,
			label: this.label,
			helpInline: this.helpInline,
			align: 'inline'
		} );
	}

	getUIvalue() {
		return this.checkboxInput.isSelected();
	}
}
