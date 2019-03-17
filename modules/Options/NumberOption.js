import TextOption from 'Options/TextOption.js';
/**
 * @extends Option
 */
export default class NumberOption extends TextOption {
	constructor( config ) {
		super( config );
		this.type = 'Number';
	}

	UI( value ) {
		super.UIconfigure( value );
		this.UIconfig.classes = [ 'libSettings-numberInput' ];
		this.UIelement = new OO.ui.NumberInputWidget( this.UIconfig );
		return super.UIfurther();
	}

	getUIvalue() {
		return Number( this.UIelement.getValue() );
	}
}
