import Option from 'Option.js';
/**
 * @extends Option
 */
export default class DropdownOption extends Option {
	constructor( config ) {
		config.type = 'Dropdown';
		super( config );
		this.values = config.values;
	}

	UI( value ) {
		this.UIconfig.name = this.name;
		this.UIconfig.options = this.values;
		this.UIconfig.options.some( ( element, index ) => {
			if ( element.data === value ) {
				this.UIconfig.options.unshift( this.UIconfig.options.splice( index, 1 )[ 0 ] );
				return true;
			}
		} );
		this.UIelement = new OO.ui.DropdownInputWidget( this.UIconfig );
		this.UIelement.connect( this, { change: 'change' } );
		return new OO.ui.FieldLayout( this.UIelement, {
			text: this.label,
			help: this.help,
			helpInline: this.helpInline,
			align: 'top'
		} );
	}

	getUIvalue() {
		return this.UIelement.getValue();
	}
}
