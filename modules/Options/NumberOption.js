import TextOption from 'Options/TextOption.js';
/**
 * @extends Option
 */
export default class NumberOption extends TextOption {
	constructor( config ) {
		super( config );
		this.type = 'Number';
		this.className = 'numberInput';
		this.widget = 'NumberInputWidget';
	}

	getUIvalue() {
		return Number( super.getUIvalue() );
	}
}
