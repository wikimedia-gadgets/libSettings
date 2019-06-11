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

	get UIvalue() {
		return Number( super.UIvalue );
	}
}
