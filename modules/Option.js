/** Represents an option.
 * @abstract
 * @param {Object} config
 * @property {string} config.name Name of option. (required)
 * @property {*} config.defaultValue (required)
 * @property {string} config.text Text displayed in settings. (required)
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
		this.text = config.text;
		this.type = type;
		this.basetypes = basetypes;
		this.value = this.defaultValue;
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
			mw.libs.libSettings.throw( `Value of ${this.name}  does not have one of the type(s) [${this.basetype}].`, errorLevel, 'TypeError' );
			return false;
		}

		// Check if in possibleValues
		if ( this.possibleKeys.indexOf( value ) === -1 ) {
			mw.libs.libSettings.throw( `Value of option ${this.name}, ${value}, is not in [${this.possibleKeys}].`, errorLevel );
			return false;
		}

		return true;
	}

	/**
	 * Set option value.
	 * @param {*} value
	 */
	setValue( value ) {
		if ( this.validate( value ) ) {
			this.value = value;
		} else {
			mw.libs.libSettings.warn( `Validation of the value of ${this.name}, failed, so the default setting of ${this.defaultValue} has been used.` );
			this.value = this.defaultValue;
		}
	}

	/**
	 * Get option value.
	 * @return {*}
	 */
	getValue() {
		return this.value;
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
		return mw.libs.libSettings.error( `buildUI not defined by extending class ${this.type}Option.` );
	}

	/**
	 * Update value. (called when save settings event is emitted )
	 * @return {OO.ui.element}
	 */
	update() {
		return mw.libs.libSettings.error( `update not defined by extending class ${this.type}Option.` );
	}
}
