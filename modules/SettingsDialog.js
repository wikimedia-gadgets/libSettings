export default function wrapSettingsDialog() {
	class Page extends OO.ui.PageLayout {
		constructor( name, config, element ) {
			super( name, config );
			this.element = element;
			this.element.preferences.forEach( ( option ) => {
				this.$element.append( option.UI().$element );
			} );
		}

		setupOutlineItem() {
			this.outlineItem.setLabel( this.element.title );
		}
	}

	class SettingsDialog extends OO.ui.ProcessDialog {
		constructor( config, self ) {
			super( config );
			this.settings = self;
			SettingsDialog.static.name = 'settingsDialog';
			SettingsDialog.static.title = this.settings.title;
			SettingsDialog.static.actions = [
				{ action: 'save', label: 'Save settings', flags: [ 'primary', 'progressive' ] },
				{ label: 'Cancel', flags: [ 'safe', 'destructive' ] },
				{ action: 'reset', label: 'Show defaults' }
			];
		}

		genInternalUI() {
			const onePage = ( this.settings.optionsConfig.length === 1 );
			let internalUI;

			const pages = this.settings.optionsConfig.map( ( element ) => {
				return new Page( element.title, { padded: onePage }, element );
			} );

			if ( !onePage ) {
				internalUI = new OO.ui.BookletLayout( {
					outlined: true
				} );

				internalUI.addPages( pages );
			} else {
				internalUI = pages[ 0 ];
			}

			return internalUI;
		}

		initialize() {
			super.initialize();
			this.content = this.genInternalUI();
			this.$body.append( this.content.$element );
		}

		getActionProcess( action ) {
			if ( action === 'save' ) {
				return new OO.ui.Process( () => {
					const promise = this.settings.save();
					this.pushPending();
					this.close( promise );
					promise.then( () => {
						mw.notify( this.settings.saveMessage );
					}, () => {
						mw.notify( this.settings.saveFailMessage );
					} );
				} );
			}

			/* Disable show defaults button if user settings are default;
			** have another button next to show default to 'show your current saved settings' (which is disabled if haven't modified yet )
			*/
			if ( action === 'reset' ) {
				return new OO.ui.Process( () => {
					this.settings.reset();
					const currentPageName = this.content.getCurrentPageName();
					this.content = this.genInternalUI();
					if ( currentPageName ) {
						this.content.setPage( currentPageName );
					}
					this.$body.html( this.content.$element );
				} );
			}

			return super.getActionProcess( action );
		}

		getHoldProcess( data ) {
			const process = super.getHoldProcess( data );
			if ( data ) {
				process.next( data );
				process.next( () => this.popPending() );
			}
			return process;
		}

		getBodyHeight() {
			return this.content.$element.outerHeight( 900 ); // TEMP, need to figure out how to properly make window size
		}
	}
	return SettingsDialog;
}
