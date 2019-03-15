import Option from 'Option.js';
/**
 * @extends Option
 */
export default class BooleanOption extends Option {
	constructor( config ) {
		super( config, 'Boolean', [ 'boolean' ] );
	}

	buildUI() {
		return new OO.ui.CheckboxInputWidget( {
			name: this.name,
			selected: this.value
		} );
	}

	getUIvalue() {
		return this.UIelement.isSelected();
	}
}
