/**
 * A Page of options.
 */
class Page {
	/**
	 * @param {Object} config
 	 * @param {string} config.title Header of particular set of preferences
 	 * @param {string} config.level Indentation level.
 	 * See https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/OO.ui.OutlineOptionWidget.
 	 * @param {boolean} config.hide Whether the page should be hidden.
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
	 */
	traverse( func ) {
		this.preferences.forEach( ( element ) => {
			if ( 'traverse' in Object.getPrototypeOf( element ) ) {
				element.traverse( option => func( option ) );
			} else {
				func( element );
			}
		} );
	}

	/**
	 * Create the page's UI if not hidden.
	 * @private
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
	 * @private
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
