import Option from 'Option.js';
/**
 * Use mw.widgets.DateInputWidget
 * @extends Option
 */
class DateOption extends Option {
	constructor( config ) {
		config.type = 'Date';
		super( config );
	}
}

export default DateOption;
