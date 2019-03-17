import '../modules/index.js';
const CheckboxOption = mw.libs.libSettings.CheckboxOption;
const NumberOption = mw.libs.libSettings.NumberOption;
const DropdownOption = mw.libs.libSettings.DropdownOption;
const TextOption = mw.libs.libSettings.TextOption;

const replyLink = [
	{
		title: 'Reply link',
		preferences: [
			new TextOption( {
				name: 'replyLinkPreloadPingTpl',
				label: 'Some code with a ##, "{{u|##}}, ',
				help: 'Which ping template to preload. For {{re}} use "{{re|##}} ", etc. The text ## will be replaced with a username.',
				defaultValue: '{{u|##}}',
				UIconfig: {
					validate: /##/
				}
			} )
		]
	}
];

const settings = new mw.libs.libSettings.Settings( {
	scriptName: 'test',
	helpInline: true,
	size: 'large',
	optionsConfig: shortdescHelper.concat( replyLink )
} );

settings.display();
window.settings = settings;
