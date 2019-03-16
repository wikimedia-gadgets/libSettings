export default class SettingsDialog extends OO.ui.ProcessDialog {
	constructor( config, self ) {
		super( config );
		this.self = self;
		SettingsDialog.static.name = 'settingsDialog';
		SettingsDialog.static.title = this.self.title;
		SettingsDialog.static.actions = [
			{ action: 'save', label: 'Save settings', flags: [ 'primary', 'progressive' ] },
			{ label: 'Cancel', flags: [ 'safe', 'destructive' ] },
			{ action: 'reset', label: 'Show defaults' }
		];
	}

	genInternalUI() {
		const pages = [];
		let internalUI;

		const onePage = this.self.optionsConfig.length === 1;
		this.self.optionsConfig.forEach( ( element ) => {
			const Temp = function ( name, config ) {
				Temp.super.call( this, name, config );
				element.preferences.forEach( ( option ) => {
					this.$element.append( option.UI().$element );
				} );
			};

			OO.inheritClass( Temp, OO.ui.PageLayout );
			Temp.prototype.setupOutlineItem = function () {
				this.outlineItem.setLabel( element.title );
			};

			const temp = new Temp( element.title, { padded: onePage } );
			pages.push( temp );
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
				const promise = this.self.save();
				this.pushPending();
				this.close( promise );
				promise.then( () => {
					mw.notify( this.self.saveMessage );
				}, () => {
					mw.notify( this.self.saveFailMessage );
				} );
			} );
		}

		/* Disable show defaults button if user settings are default;
		** have another button next to show default to 'show your current saved settings' (which is disabled if haven't modified yet )
		*/
		if ( action === 'reset' ) {
			return new OO.ui.Process( () => {
				this.self.reset();
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
