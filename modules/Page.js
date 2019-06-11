/**
 * @param {Object} config
 * @property {string} config.title Header of particular set of preferences
 * @property {string} config.level Indentation level,
 * see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/OO.ui.OutlineOptionWidget
 * @property {(boolean|function)} config.hide Boolean
 * or function that returns a Boolean.
 * Can use function when a variable is only loaded after the settings is loaded.
 * @property {...libSettings.Option} config.preferences Array of Option objects.
 */

export default class Page {
	constructor( config ) {
		this.title = config.title;
		this.level = config.level;
		this.hide = config.hide;
		this.preferences = config.preferences;
	}

	/**
	 * Traverse preferences
	 * @param {Function} func
	 * @param {boolean} ignoreHidden Whether to ignore elements that have element.hide
	 */
	traverse( func, ignoreHidden ) {
		this.preferences.forEach( ( element ) => {
			if ( ignoreHidden && element.hide ) {
				return;
			}
			if ( 'traverse' in element.prototype ) {
				element.traverse( option => func( option ), ignoreHidden );
			} else {
				func( element );
			}
		} );
	}
}
