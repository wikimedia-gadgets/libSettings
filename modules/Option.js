/** Represents an option.
 * @abstract
 * @param {Object} config
 * @property {string} config.name Name of option. (required)
 * @property {*} config.defaultValue (required)
 * @property {string} config.label Text displayed in settings. (required)
 * @property {string} config.helptip Help text shown in settings.
 * @property {(boolean|function)} config.hide
 * @param {string} type Type of option. Should be same as name of extending class minus
 *  Option at the end (e.g "Color" for "ColorOption" class)
 * @param {...string} basetypes Type(s) to validate against (Defined by extending classes).
*/

export default class Option {
	constructor( config ) {
		this.name = config.name;
		this.defaultValue = config.defaultValue;
		this.type = config.type;
		this.UIconfig = config.UIconfig || {};
		this.label = config.label;
		this.help = config.help;
		this.hide = config.hide;

		this.UIconfig.classes = [ `libSettings-${this.type}Option` ];
		this.validInput = true;

		if ( this.name === undefined || this.defaultValue === undefined ) {
			const varName = ( this.name === undefined ) ? 'name' : 'defaultValue';
			throw Error( `[libSettings] "${varName}" of an Option is required to be defined but is not.` );
		}
		if ( this.type === undefined ) {
			throw Error( '[libSettings] "config.type" is required to be defined by classes that extend Option.' );
		}
	}

	get value() {
		if ( this.customValue !== undefined ) {
			return this.customValue;
		} else {
			return this.defaultValue;
		}
	}

	set value( newValue ) {
		this.customValue = newValue;
	}

	/**
	 * Return only custom values of option from UI. (called when saving settings. )
	 * If no UI, return value.
	 * @return {*} value
	 */
	get customUIValue() {
		let UIValue;
		if ( this.hasUI ) {
			UIValue = this.UIvalue;
		} else {
			UIValue = this.value;
		}
		if ( UIValue !== this.defaultValue ) {
			return UIValue;
		} else {
			return undefined;
		}
	}

	/**
	 * Emit a change event.
	 */
	change() {
		this.emit( 'change' );
	}

	buildUI() {
		if ( !this.hide ) {
			this.hasUI = true;
			return this.UI( this[ this.propertyNameUI ] );
		}
	}

	get UIvalue() {
		return mw.log.error( `Getter UIvalue not defined by extending class ${this.type}Option.` );
	}

	/**
	 * Create UI.
	 * @param {any} value
	 * @return {OO.ui.element}
	 */
	UI() {
		return mw.log.error( `Function UI not defined by extending class ${this.type}Option.` );
	}
}
