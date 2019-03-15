import libSettings from 'HelperFunctions.js';
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
	constructor( config, type, basetypes ) {
		this.name = config.name;
		this.defaultValue = config.defaultValue;
		this.possibeValues = config.possibleValues;
		switch ( typeof this.possibleValues ) {
			case 'Array':
				this.possibleKeys = this.possibleValues;
				this.possibleSettingsVal = this.possibleValues;
				break;
			case 'Object':
				// eslint-disable-next-line no-restricted-syntax
				this.possibleKeys = this.possibleValues.keys();
				// eslint-disable-next-line no-restricted-syntax
				this.possibleSettingsVal = this.possibleValues.values();
		}
		this.label = config.label;
		this.helptip = config.helptip;
		this.type = type;
		this.basetypes = basetypes;
		this.FieldLayout = true;
		this.helpinline = true || config.helpinline; /* TODO would want to be able to set all helpinline for a panel or entire settings window
		(e.g for twinkle would want to set all helpinline to true (probably don't want to mix types for at-least a panel - make it an optionsConfig preference for each panel and for the whole optionsConfig )) */
		this.validate( this.defaultValue, 'error' );
		// TODO: pseudocode
		// on ( 'savesettingsevent', update() )
	}

	validate( value, errorLevel ) {
		// Check type
		if (
			this.basetypes &&
			!this.basetypes.some( ( basetype ) => typeof value === basetype )
		) {
			libSettings.throw( `Value of ${this.name} ( ${value} ) does not have one of the type(s) [${this.basetypes}].`, errorLevel, 'TypeError' );
			return false;
		}

		// Check if in possibleValues
		if (
			this.possibleKeys &&
			this.possibleKeys.indexOf( value ) === -1
		) {
			libSettings.throw( `Value of option ${this.name}, ${value}, is not in [${this.possibleKeys}].`, errorLevel );
			return false;
		}

		return true;
	}

	/**
	 * Get custom value of option. (called when saving settings. )
	 * @return {*} value
	 */
	getCustomValue() {
		const customValue = this.getUIvalue();
		if ( this.validate( customValue ) ) {
			return customValue;
		} else {
			console.log( customValue );
			libSettings.warn( `Validation of the user inputed value of ${this.name}, failed, so that setting was not saved.` );
		}
	}

	/**
	 * Set custom value of option. (called when loading settings and copying over to optionsConfig. )
	 * @param {*} value
	 */
	setCustomValue( customValue ) {
		if ( this.validate( customValue ) ) {
			this.customValue = customValue;
		}
	}

	get value() {
		if ( this.customValue !== undefined ) {
			return this.customValue;
		} else {
			return this.defaultValue;
		}
	}

	/**
	 * Build UI.
	 * @return {OO.ui.element}
	 * //TODO could also be a  mw.widget..how generic can the UI element returned be
	 * prolly create a standard for what functions must be defined by output?
	 * i.e, must satisfy certain portions of OO.ui.element to work
	 * before we can't build the settings menu with it?
	 */
	buildUI() {
		return libSettings.error( `buildUI not defined by extending class ${this.type}Option.` );
	}

	getUIvalue() {
		return libSettings.error( `getUIvalue not defined by extending class ${this.type}Option.` );
	}

	UI() {
		this.UIelement = this.buildUI();
		return this.FieldLayout ?
			new OO.ui.FieldLayout( this.UIelement, { label: this.label, help: this.helptip, helpinline: this.helpinline, align: 'inline' } ) :
			out;
	}
}
