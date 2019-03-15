import Option from 'Option.js';
/**
 * Use mw.widgets.DateInputWidget
 * @extends Option
 */
export default class DateOption extends Option {
	constructor( config ) {
		super( config, 'Date', 'Date' );
	}
}
