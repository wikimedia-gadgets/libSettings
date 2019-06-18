/**
 * A Page of options.
 */
class Page {
	/**
	 * @param {Object} config
 	 * @param {string} config.title Header of particular set of preferences
 	 * @param {string} config.level Indentation level,
 	 * see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/OO.ui.OutlineOptionWidget
 	 * @param {boolean} config.hide Boolean
 	 * or function that returns a Boolean.
 	 * Can use function when a variable is only loaded after the settings is loaded.
 	 * @param {...libSettings.Option} config.preferences Array of Option objects.
 	 */
	constructor( config ) {
		this.title = config.title;
		this.level = config.level;
		this.hide = config.hide;
		this.preferences = config.preferences;
		this.UIconfig = config.UIconfig || {};
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
			if ( 'traverse' in Object.getPrototypeOf( element ) ) {
				element.traverse( option => func( option ), ignoreHidden );
			} else {
				func( element );
			}
		} );
	}

	/**
	 * @param {boolean} singlePage Whether there are multiple pages of settings or only one page.
	 * @return {OO.ui.PageLayout}
	 */
	buildUI( singlePage ) {
		if ( !this.hide ) {
			this.hasUI = true;
			return this.UI( singlePage );
		}
	}

	/**
	 * @param {boolean} singlePage
	 * @return {OO.ui.PageLayout}
	 */
	UI( singlePage ) {
		this.UIconfig.padded = singlePage;
		this.UIconfig.scrollable = false;
		const page = this;

		class PageUI extends OO.ui.PageLayout {
			constructor() {
				super( page.title, page.UIconfig );
				page.preferences.forEach( ( element ) => {
					const UI = element.buildUI();
					if ( UI ) {
						this.$element.append( UI.$element );
					}
				} );
			}

			setupOutlineItem() {
				this.outlineItem.setLabel( page.title );
				this.outlineItem.setLevel( page.level );
			}
		}

		return new PageUI();
	}
}

export default Page;
