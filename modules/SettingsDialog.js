export default function wrapSettingsDialog() {
	class PageUI extends OO.ui.PageLayout {
		constructor( name, config, element, value, hideHandle ) {
			super( name, config );
			this.element = element;
			this.element.preferences.forEach( ( element2 ) => {
				/* Don't display element2 if element2.hide */
				if ( hideHandle( element2 ) ) {
					return;
				}
				if ( element2.header ) {
					element2.UIconfig = element2.UIconfig || {};
					element2.UIconfig.label = element2.header;
					const fieldset = new OO.ui.FieldsetLayout( element2.UIconfig );
					let fieldLayouts = element2.options.map(
						option => option.buildUI( value )
					);
					fieldLayouts = fieldLayouts.filter( element => element );
					fieldset.addItems( fieldLayouts );
					this.$element.append( fieldset.$element );
				} else {
					this.$element.append( element2.buildUI( value ).$element );
				}
			} );
		}

		setupOutlineItem() {
			this.outlineItem.setLabel( this.element.title );
			this.outlineItem.setLevel( this.element.level );
		}
	}

	class SettingsDialog extends OO.ui.ProcessDialog {
		constructor( config, self ) {
			super( config );
			this.settings = self;
		}

		genInternalUI( value ) {
			// ignore elements that have hide set to true
			const realOptionsConfig = this.optionsConfig.filter(
				element => !this.hideHandle( element )
			);
			const onePage = realOptionsConfig.length === 1;

			let internalUI;

			const pages = realOptionsConfig.map( element => {
				return new PageUI(
					element.title,
					{
						padded: onePage,
						scrollabe: false
					},
					element,
					value,
					this.hideHandle
				);
			} );

			if ( !onePage ) {
				internalUI = new OO.ui.BookletLayout( {
					outlined: true
				} );

				internalUI.addPages( pages );
			} else {
				internalUI = pages[ 0 ];
			}

			this.outerHeight = pages[ 0 ].$element.outerHeight( true );

			return internalUI;
		}

		setupUI( value ) {
			this.content = this.genInternalUI( value );
			this.$body.html( this.content.$element );
			this.changeHandler();
		}

		getSetupProcess() {
			const process = super.getSetupProcess();
			process.next( () => this.setupUI( 'value' ) );
			return process;
		}

		/** saveStatus is true
		 * if all inputs are valid
		 * and if user changed
		 */
		changeHandler() {
			let validInput = true;
			let userChanged = false;
			let showDefaultStatus = false;
			this.optionsConfig.traverse( ( option ) => {
				/* Skip options where UI hasn't been created */
				if ( !option.hasUI ) {
					return;
				}
				if ( !option.validInput ) {
					validInput = false;
				}
				const UIvalue = option.UIvalue;
				if ( UIvalue !== option.value ) {
					userChanged = true;
				}
				if ( UIvalue !== option.defaultValue ) {
					showDefaultStatus = true;
				}
			} );
			this.actions.setAbilities( {
				save: validInput && userChanged,
				showDefault: showDefaultStatus,
				showCurrentSettings: userChanged
			} );
		}

		regenUI( value ) {
			let currentPageName;
			if ( this.content.getCurrentPageName ) {
				currentPageName = this.content.getCurrentPageName();
			}
			this.setupUI( value );
			if ( currentPageName ) {
				this.content.setPage( currentPageName );
			}
		}

		getActionProcess( action ) {
			if ( action === 'save' ) {
				return new OO.ui.Process( () => {
					const promise = this.settings.save();
					this.pushPending();
					this.close( promise );
				} );
			}

			if ( action === 'showDefault' ) {
				return new OO.ui.Process( () => {
					this.regenUI( 'defaultValue' );
				} );
			}

			if ( action === 'showCurrentSettings' ) {
				return new OO.ui.Process( () => {
					this.regenUI( 'value' );
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
			return (
				this.settings.height ||
				this.content.$element.outerWidth( true ) * 1 / 1.61803398875 // golden ratio
			);
		}
	}

	return SettingsDialog;
}
