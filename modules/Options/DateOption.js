/**
 * Use mw.widgets.DateInputWidget
 * @extends mw.libs.libSettings.Option
 */
export default class DateOption extends mw.libs.libSettings.Option {
	constructor( config ) {
		super( config, 'Date', 'Date' );
	}
}
