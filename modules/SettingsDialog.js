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
	 * It has four buttons, a save button, a cancel button, a "show defaults" button,
	 * and a "show current settings" button, and multiple pages of options using
	 * OO.ui.BookletLayout.
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
		 * Set the propertyNameUI to e.g. be "defaultValue" when showing default settings
		 * so that when the UI is regenerated the right values are shown on the UI.
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
		 * Call {@link SettingsDialog#genInternalUI} and set the body to be that
		 */
		setupUI() {
			this.content = this.genInternalUI();
			this.$body.html( this.content.$element );
			this.changeHandler();
		}

		/**
		 * Determines if the buttons should be enabled or not
		 * The save button is enabled if all inputs are valid and if user changed an option
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
		 * Regenerate the UI upon resetting settings.
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
		 * When a button is pressed, this is called with the action name.
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
					this.actions.setAbilities( {
						save: false,
						showDefault: false,
						showCurrentSettings: false,
						cancel: false
					} );
					this.pushPending();
				} );
			}

			if ( action === 'cancel' ) {
				this.close();
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
