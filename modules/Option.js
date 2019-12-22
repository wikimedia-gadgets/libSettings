/**
 * Represents an option.
 * @abstract
 * @extends OO.EventEmitter
*/
class Option extends OO.EventEmitter {
	/**
	 * @param {Object} config
	 * @param {string} config.name Name of option. (required)
	 * @param {*} config.defaultValue The default value for the option. (required)
	 * @param {string} config.label Text displayed in settings. (required)
	 * @param {string} config.help Help text shown in settings.
	 * @param {boolean} config.hide Whether to hide the option.
	 * @param {boolean} config.helpInline Whether the help text should be inline or not.
	 * @param {Object} config.UIconfig Configuration that is passed into the underlying UI.
	 * @param {string} config.type
	 * Type of option. Should be same as name of subclass minus
	 * Option at the end (e.g "Color" for "ColorOption" class) (Defined by subclasses.)
	 * @param {...string} config.basetypes
	 * Type(s) to validate against (Defined by subclasses).
	 */
	constructor( config ) {
		super();
		this.name = config.name;
		this.defaultValue = config.defaultValue;
		this.label = config.label;
		this.type = config.type;
		this.UIconfig = config.UIconfig || {};
		this.help = config.help;
		this.hide = config.hide;
		this.helpInline = config.helpInline;

		const libSettingClass = [ `libSettings-${this.type}Option` ];
		this.UIconfig.classes = this.UIconfig.classes ?
			this.UIconfig.classes.push( libSettingClass ) :
			libSettingClass;
		this.validInput = true;
		/**
		 * The name of the attribute the option's UI should display when generating the UI.
		 * Changed when e.g. showing the default value.
		 */
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
	 * Return either the configured saved user value if it exists or the default value.
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
	 * Return only the values the user has configured in the UI for each option
	 * where it is different from the default.
	 * This is called when saving settings.
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
	 * @protected
	 * @return {OO.ui.Element}
	 */
	buildUI() {
		if ( !this.hide ) {
			this.hasUI = true;
			return this.UI( this[ this.propertyNameUI ] );
		}
	}

	/**
	 * Defines how to get the value inputed by the user in the UI.
	 * @return {*}
	 */
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

export default Option;
