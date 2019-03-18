import Option from 'Option.js';
/**
 * @extends Option
 */
export default class TextOption extends Option {
	constructor( config ) {
		super( config );
		this.type = 'Text';
		this.className = 'textInput';
		this.widget = 'TextInputWidget';
	}

	validate() {
		return this.UIelement.getValidity().then( () => {
			this.validInput = true;
		}, () => {
			this.validInput = false;
		} );
	}

	UI( value ) {
		this.UIconfig.name = this.name;
		this.UIconfig.value = value;
		this.UIconfig.classes = [ `libSettings-${this.className}` ];
		this.UIelement = new OO.ui[ this.widget ]( this.UIconfig );
		this.UIelement.connect( this, { change: () => {
			this.validate().then( () => this.change() );
		} } );
		this.validate();
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
