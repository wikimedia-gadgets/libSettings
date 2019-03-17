/** Represents an option.
 * @abstract
 * @param {Object} config
 * @property {string} config.name Name of option. (required)
 * @property {*} config.defaultValue (required)
 * @property {string} config.label Text displayed in settings. (required)
 * @property {string} config.helptip Help text shown in settings.
 * @property {Array} config.possibleValues Either [ <value>, .. ] or
 *  [ [ <InternalValue>, <ValueDisplayedInSettings> ], .. ].
 *  Value is validated against possibleValues.
 * @param {string} type Type of option. Should be same as name of extending class minus
 *  Option at the end (e.g "Color" for "ColorOption" class)
 * @param {...string} basetypes Type(s) to validate against (Defined by extending classes).
*/

export default class Option extends OO.EventEmitter {
	constructor( config ) {
		super();
		this.name = config.name;
		this.defaultValue = config.defaultValue;
		this.UIconfig = config.UIconfig || {};
		this.label = config.label;
		this.help = config.help;
		this.validInput = true;
	}

	get value() {
		if ( this.customValue !== undefined ) {
			return this.customValue;
		} else {
			return this.defaultValue;
		}
	}

	change() {
		this.emit( 'change' );
	}

	/**
	 * CreateUI.
	 * @param {any} value
	 * @return {OO.ui.element}
	 */
	UI() {
		return mw.log.error( `UI not defined by extending class ${this.type}Option.` );
	}

	buildUI( value ) {
		return this.UI( this[ value ] );
	}

	getUIvalue() {
		return mw.log.error( `getUIvalue not defined by extending class ${this.type}Option.` );
	}

	/**
	 * Return only custom values of option from UI. (called when saving settings. )
	 * @return {*} value
	 */
	getCustomUIValue() {
		const UIValue = this.getUIvalue();
		if ( UIValue !== this.defaultValue ) {
			return UIValue;
		}
	}
}
