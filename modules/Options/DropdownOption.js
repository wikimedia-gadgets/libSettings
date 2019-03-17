import Option from 'Option.js';
/**
 * @extends Option
 */
export default class DropdownOption extends Option {
	constructor( config ) {
		super( config, 'Dropdown' );
	}

	UI( value ) {
		this.UIconfig.name = this.name;
		this.UIconfig.options = this.config.values;
		this.UIconfig.options.some( ( element, index ) => {
			if ( element.data === value ) {
				this.UIconfig.options.unshift( this.UIconfig.options.splice( index, 1 )[ 0 ] );
				return true;
			}
		} );
		this.dropdownInput = new OO.ui.DropdownInputWidget( this.UIconfig );
		this.dropdownInput.connect( this, { change: 'change' } );
		return new OO.ui.FieldLayout( this.dropdownInput, {
			text: this.label,
			help: this.help,
			helpInline: this.helpInline,
			align: 'top'
		} );
	}

	getUIvalue() {
		return this.dropdownInput.getValue();
	}
}
