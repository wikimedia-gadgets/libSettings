import Option from 'Option.js';
/**
 * @extends Option
 */
export default class TextOption extends Option {
	constructor( config ) {
		super( config );
		this.type = 'Text';
	}

	validate() {
		return this.UIelement.getValidity().then( () => {
			this.validInput = true;
		}, () => {
			this.validInput = false;
		} );
	}

	UIconfigure( value ) {
		this.UIconfig.name = this.name;
		this.UIconfig.value = value;
	}

	UI( value ) {
		this.UIconfigure( value );
		this.UIconfig.classes = [ 'libSettings-textInput' ];
		this.UIelement = new OO.ui.TextInputWidget( this.UIconfig );
		return this.UIfurther();
	}

	UIfurther() {
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
