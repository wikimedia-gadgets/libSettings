import Option from 'Option.js';
/**
 * @extends Option
 */
export default class NumberOption extends Option {
	constructor( config ) {
		super( config, 'Number' );
	}

	validate() {
		return this.numberInput.getValidity().then( () => {
			this.validInput = true;
		}, () => {
			this.validInput = false;
		} );
	}

	UI( value ) {
		this.UIconfig.name = this.name;
		this.UIconfig.classes = [ 'libSettings-numberInput' ];
		this.UIconfig.value = value;
		this.numberInput = new OO.ui.NumberInputWidget( this.UIconfig );
		this.numberInput.connect( this, { change: () => {
			this.validate().then( () => this.change() );
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
