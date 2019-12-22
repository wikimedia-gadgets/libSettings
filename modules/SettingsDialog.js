/**
 * This wrapping function exists because until OOUI is loaded,
 * the class {@link SettingsDialog} cannot be created, as it extends
 * {@link https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ProcessDialog OO.ui.ProcessDialog}.
 * @returns {SettingsDialog}
 */
function wrapSettingsDialog() {
	/**
	 * This {@link https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ProcessDialog OO.ui.ProcessDialog}
	 * is the settings window.
	 * @private
	 * @extends OO.ui.ProcessDialog
	 */
	class SettingsDialog extends OO.ui.ProcessDialog {
		/**
	 	 * @param {Object} config
	 	 * @param {OptionsConfig} optionsConfig
	 	 * @param {number} height Height of the settings dialog, if overriding default
		 */
		constructor( config, optionsConfig, height ) {
			super( config );
			this.optionsConfig = optionsConfig;
			this.height = height;
		}

		/**
		 * @param {string} newPropertyNameUI
		 */
		setPropertyNameUI( newPropertyNameUI ) {
			this.optionsConfig.traverse( ( option ) => {
				option.propertyNameUI = newPropertyNameUI;
			} );
		}

		/**
		 * @returns {OO.ui.Layout}
		 */
		genInternalUI() {
			const config = this.optionsConfig.getConfig();
			/**
			 * Necessary to determine singlePage here
			 * as a single page layout needs padding.
			 */
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

		/**
		 * Call {@link SettingsDialog#genInternalUI}
		 */
		setupUI() {
			this.content = this.genInternalUI();
			this.$body.html( this.content.$element );
			this.changeHandler();
		}

		/**
		 * saveStatus is true
		 * if all inputs are valid
		 * and if user changed
		 * @listens Option#change
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

		/**
		 */
		regenUI() {
			let currentPageName;
			if ( this.content.getCurrentPageName ) {
				currentPageName = this.content.getCurrentPageName();
			}
			this.setupUI();
			if ( currentPageName ) {
				this.content.setPage( currentPageName );
			}
		}

		/**
		 * Add {@link SettingsDialog#setupUI} to the setting up process.
		 * @return {OO.ui.Process}
		 */
		getSetupProcess() {
			const process = super.getSetupProcess();
			process.next( () => this.setupUI() );
			return process;
		}

		/**
		 * When a button is pressed, it
		 * @param {string} action
		 * @fires SettingsDialog#startSave
		 * @returns {OO.ui.Process}
		 */
		getActionProcess( action ) {
			if ( action === 'save' ) {
				return new OO.ui.Process( () => {
					/**
					 * Indicates that settings should be saved now.
					 * (fired upon pressing save button)
					 * @event SettingsDialog#startSave
					 */
					this.emit( 'startSave' );
					/**
					 * FIXME also disable showDefault and showCurrentSettings buttons
					 * ( kinda like VE does ) or all buttons?
					 */
					this.pushPending();
				} );
			}

			if ( action === 'showDefault' ) {
				return new OO.ui.Process( () => {
					this.setPropertyNameUI( 'defaultValue' );
					this.regenUI();
				} );
			}

			if ( action === 'showCurrentSettings' ) {
				return new OO.ui.Process( () => {
					this.setPropertyNameUI( 'value' );
					this.regenUI();
				} );
			}

			return super.getActionProcess( action );
		}

		/**
		 * FIXME: is this necessary? if closing right after no need to pop pending
		 * @param {*} data
		 * @return {OO.ui.Process}
		 */
		getHoldProcess( data ) {
			const process = super.getHoldProcess( data );
			process.next( () => this.popPending() );
			return process;
		}

		/**
		 * @return {number}
		 */
		getBodyHeight() {
			return (
				this.height ||
				this.content.$element.outerWidth( true ) * 1 / 1.61803398875 // golden ratio
			);
		}
	}

	return SettingsDialog;
}

export default wrapSettingsDialog;
