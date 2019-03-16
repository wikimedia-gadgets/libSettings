import Option from 'Option.js';
/**
 * @extends Option
 */
export default class NumberOption extends Option {
	constructor( config ) {
		super( config, 'Number' );
	}

	UI() {
		this.numberInput = new OO.ui.NumberInputWidget( {
			name: this.name,
			classes: [ 'libSettings-numberInput' ],
			input: { value: this.value },
			min: this.values.min,
			max: this.values.max
		} );

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
