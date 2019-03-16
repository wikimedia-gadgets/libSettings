import Option from 'Option.js';
import Settings from 'Settings.js';
import BooleanOption from 'Options/BooleanOption.js';
import DateOption from 'Options/DateOption.js';
import NumberOption from 'Options/NumberOption.js';
mw.util.addCSS(
	`.libSettings-numberInput {
		max-width: 15em
	}`
);
mw.libs.libSettings = {};
mw.libs.libSettings.Option = Option;
mw.libs.libSettings.Settings = Settings;
mw.libs.libSettings.BooleanOption = BooleanOption;
mw.libs.libSettings.DateOption = DateOption;
mw.libs.libSettings.NumberOption = NumberOption;
