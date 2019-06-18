/**
 * Represents an option.
 * @abstract
 * @extends OO.EventEmitter
*/
class Option extends OO.EventEmitter {
	/**
	 * @param {Object} config
	 * @param {string} config.name Name of option. (required)
	 * @param {*} config.defaultValue (required)
	 * @param {string} config.label Text displayed in settings. (required)
	 * @param {string} config.helptip Help text shown in settings.
	 * @param {(boolean|function)} config.hide
	 * @param {string} config.type
	 * Type of option. Should be same as name of extending class minus
	 * Option at the end (e.g "Color" for "ColorOption" class)
	 * @param {...string} config.basetypes
	 * Type(s) to validate against (Defined by extending classes).
	 */
	constructor( config ) {
		super();
		this.name = config.name;
		this.defaultValue = config.defaultValue;
		this.type = config.type;
		this.UIconfig = config.UIconfig || {};
		this.label = config.label;
		this.help = config.help;
		this.hide = config.hide;

		this.UIconfig.classes = [ `libSettings-${this.type}Option` ];
		this.validInput = true;
		this.propertyNameUI = 'value';

		if ( this.name === undefined || this.defaultValue === undefined ) {
			const varName = ( this.name === undefined ) ? 'name' : 'defaultValue';
			throw Error( `[libSettings] "${varName}" of an Option is required to be defined but is not.` );
		}
		if ( this.type === undefined ) {
			throw Error( '[libSettings] "config.type" is required to be defined by classes that extend Option.' );
		}
	}

	/**
	 * @return {*}
	 */
	get value() {
		if ( this.customValue !== undefined ) {
			return this.customValue;
		} else {
			return this.defaultValue;
		}
	}
	/**
	 * @param {*} newValue
	 */
	set value( newValue ) {
		this.customValue = newValue;
	}

	/**
	 * Return only custom values of option from UI. (called when saving settings. )
	 * If no UI, return value.
	 * @return {*}
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
	 * Emit a change event. Called by {@link Option#UI}
	 * @fires Option#change
	 */
	change() {
		/**
		 * Indicates that a user has changed the value of an option in the UI. Listened to by
		 * {@link SettingsDialog#changeHandler}.
		 * @event Option#change
		 */
		this.emit( 'change' );
	}

	/**
	 * @return {OO.ui.Element}
	 */
	buildUI() {
		if ( !this.hide ) {
			this.hasUI = true;
			return this.UI( this[ this.propertyNameUI ] );
		}
	}

	/**
	 * @return {*}
	 */
	get UIvalue() {
		return mw.log.error( `Getter UIvalue not defined by extending class ${this.type}Option.` );
	}

	/**
	 * Create UI.
	 * @protected
	 * @param {any} value
	 * @return {OO.ui.element}
	 */
	UI() {
		return mw.log.error( `Function UI not defined by extending class ${this.type}Option.` );
	}
}

export default Option;
