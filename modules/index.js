import Option from 'Option.js';
import Settings from 'Settings.js';
import OptionsConfig from 'OptionsConfig.js';
import Page from 'Page.js';
import Group from 'Group.js';
import CheckboxOption from 'Options/CheckboxOption.js';
import TextOption from 'Options/TextOption.js';
import NumberOption from 'Options/NumberOption.js';
import DropdownOption from 'Options/DropdownOption.js';

mw.libs.libSettings = {};
mw.libs.libSettings.Option = Option;
mw.libs.libSettings.Settings = Settings;
mw.libs.libSettings.OptionsConfig = OptionsConfig;
mw.libs.libSettings.Page = Page;
mw.libs.libSettings.Group = Group;
mw.libs.libSettings.CheckboxOption = CheckboxOption;
mw.libs.libSettings.TextOption = TextOption;
mw.libs.libSettings.NumberOption = NumberOption;
mw.libs.libSettings.DropdownOption = DropdownOption;

// Only to work as a gadget
const messages = require( '../i18n/en.json' );
mw.messages.set( messages );

mw.util.addCSS( `.libSettings-NumberOption {
	max-width: 15em
}` );
