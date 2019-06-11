export default function wrapSettingsDialog() {
	class SettingsDialog extends OO.ui.ProcessDialog {
		constructor( config, optionsConfig, save, height ) {
			super( config );
			this.optionsConfig = optionsConfig;
			this.save = save;
			this.height = height;
			this.propertyName = 'value';
		}

		genInternalUI() {
			const config = this.optionsConfig.getConfig();
			/* Necessary to determine singlePage here
			 * as a single page layout needs padding. */
			const singlePage = config.filter(
				page => !page.hide
			).length === 1;
			const pages = config.map(
				page => page.buildUI( singlePage )
			);
			pages.filter( element => element );

			let internalUI;

			if ( !singlePage ) {
				internalUI = new OO.ui.BookletLayout( {
					outlined: true
				} );

				internalUI.addPages( pages );
			} else {
				internalUI = pages[ 0 ];
			}

			return internalUI;
		}

		setupUI() {
			this.content = this.genInternalUI();
			this.$body.html( this.content.$element );
			this.changeHandler();
		}

		getSetupProcess() {
			const process = super.getSetupProcess();
			process.next( () => this.setupUI() );
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

		regenUI() {
			this.optionsConfig.traverse( ( option ) => {
				option.propertyNameUI = this.propertyNameUI;
			} );
			let currentPageName;
			if ( this.content.getCurrentPageName ) {
				currentPageName = this.content.getCurrentPageName();
			}
			this.setupUI();
			if ( currentPageName ) {
				this.content.setPage( currentPageName );
			}
		}

		getActionProcess( action ) {
			if ( action === 'save' ) {
				return new OO.ui.Process( () => {
					const promise = this.save();
					this.pushPending();
					this.close( promise );
				} );
			}

			if ( action === 'showDefault' ) {
				return new OO.ui.Process( () => {
					this.propertyNameUI = 'defaultValue';
					this.regenUI();
				} );
			}

			if ( action === 'showCurrentSettings' ) {
				return new OO.ui.Process( () => {
					this.propertyNameUI = 'value';
					this.regenUI();
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
				this.height ||
				this.content.$element.outerWidth( true ) * 1 / 1.61803398875 // golden ratio
			);
		}
	}

	return SettingsDialog;
}
