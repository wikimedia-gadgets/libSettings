import Option from 'Option.js';
/**
 * @extends Option
 */
export default class NumberOption extends Option {
	constructor( config ) {
		super( config, 'Number' );
	}

	validate( value ) {
		const num = Number( value );
		this.validInput = (
			num >= ( this.UIconfig.min || -Infinity ) &&
			num <= ( this.UIconfig.max || +Infinity )
		);
	}

	UI( value ) {
		this.UIconfig.name = this.name;
		this.UIconfig.classes = [ 'libSettings-numberInput' ];
		this.UIconfig.value = value;
		this.numberInput = new OO.ui.NumberInputWidget( this.UIconfig );
		this.numberInput.connect( this, { change: ( UIvalue ) => {
			this.validate( UIvalue );
			this.change();
		} } );
		this.validate( this.numberInput.getValue() );
		return new OO.ui.FieldLayout( this.numberInput, {
			text: this.label,
			help: this.help,
			helpInline: this.helpInline,
			align: 'top'
		} );
	}

	getUIvalue() {
		return Number( this.numberInput.getValue() );
	}
}
