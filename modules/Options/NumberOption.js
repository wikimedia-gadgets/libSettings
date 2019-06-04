import TextOption from 'Options/TextOption.js';
/**
 * @extends TextOption
 */
export default class NumberOption extends TextOption {
	constructor( config ) {
		config.type = 'Number';
		super( config );
		this.widget = 'NumberInputWidget';
	}

	getUIvalue() {
		return Number( super.getUIvalue() );
	}
}
