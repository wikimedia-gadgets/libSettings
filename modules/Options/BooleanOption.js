import Option from 'Option.js';
/**
 * @extends Option
 */
export default class BooleanOption extends Option {
	constructor( config ) {
		super( config, 'Boolean', [ 'boolean' ] );
	}

	// TODO: emit an event upon saving the settings (using OO.eventemitter ),
	// so that instead of doing setValue upon every change, only need to do setValue upon saving
	// more of an impact on other input boxes, where
	buildUI() {
		this.checkbox = new OO.ui.CheckboxInputWidget( {
			name: this.name,
			selected: this.getValue()
		} );

		return new OO.ui.FieldLayout( this.checkbox, { label: this.label, align: 'inline' } );
	}

	update() {
		this.setValue( this.checkbox.getValue() ); // convert getValue into a boolean (what string does checkbox return with getValue?)
	}
}
