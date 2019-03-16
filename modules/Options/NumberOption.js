import Option from 'Option.js';
/**
 * @extends Option
 */
export default class NumberOption extends Option {
	constructor( config ) {
		super( config, 'Number' );
	}

	UI() {
		this.UIconfig.name = this.name;
		this.UIconfig.classes = [ 'libSettings-numberInput' ];
		this.UIconfig.value = this.value;
		this.numberInput = new OO.ui.NumberInputWidget( this.UIconfig );
		this.validate();
		this.numberInput.on( 'change', ( value ) => this.validate( value ) );
		return new OO.ui.FieldLayout( this.numberInput, {
			text: this.label,
			help: this.helptip,
			helpInline: this.helpInline,
			align: 'inline'
		} );
	}

	getUIvalue() {
		return this.numberInput.getValue();
	}
}
