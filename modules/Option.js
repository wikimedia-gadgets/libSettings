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

export default class Option {
	constructor( config, type ) {
		this.name = config.name;
		this.defaultValue = config.defaultValue;
		this.values = config.values;
		this.label = config.label;
		this.helptip = config.helptip;
		this.type = type;
		this.FieldLayout = true;
		this.helpInline = true || config.helpinline; /* TODO would want to be able to set all helpinline for a panel or entire settings window
		(e.g for twinkle would want to set all helpinline to true (probably don't want to mix types for at-least a panel - make it an optionsConfig preference for each panel and for the whole optionsConfig )) */
	}

	get value() {
		if ( this.customValue !== undefined ) {
			return this.customValue;
		} else {
			return this.defaultValue;
		}
	}

	reset() {
		this.customValue = undefined;
	}

	/**
	 * CreateUI.
	 * @return {OO.ui.element}
	 * //TODO could also be a  mw.widget..how generic can the UI element returned be
	 * prolly create a standard for what functions must be defined by output?
	 * i.e, must satisfy certain portions of OO.ui.element to work
	 * before we can't build the settings menu with it?
	 */
	UI() {
		return mw.log.error( `UI not defined by extending class ${this.type}Option.` );
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
