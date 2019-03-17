import '../modules/index.js';
const CheckboxOption = mw.libs.libSettings.CheckboxOption;
const NumberOption = mw.libs.libSettings.NumberOption;
const DropdownOption = mw.libs.libSettings.DropdownOption;
const TextOption = mw.libs.libSettings.TextOption;
const shortdescHelper = [
	{
		title: 'Shortdesc-helper',
		preferences: [
			new NumberOption( {
				name: 'InputWidth',
				label: 'Width of editing input in em (default 35)',
				helptip: 'worth a damn',
				defaultValue: 35,
				UIconfig: {
					min: 10,
					max: 400,
					validate: /\d\d/
				}
			} ),
			new CheckboxOption( {
				name: 'AddToRedirect',
				label: 'Allow additions of short descriptions to redirects',
				help: 'When checked, redirects will have an "add" button to add a short description. (default off)',
				defaultValue: true
			} ),
			new DropdownOption( {
				name: 'SaveWikidata',
				label: 'Save changes to Wikidata',
				help: 'foooooo '.repeat( 40 ),
				defaultValue: 'add',
				values: [
					{ data: 'add', label: 'Only on additions (default)' },
					{ data: 'all', label: 'On all changes' },
					{ data: 'never', label: 'Never' }
				]
			} ),
			new CheckboxOption( {
				name: 'ClashFix',
				label: 'Disable css used to prevent content jump.',
				help: "You'd want to this if you have another script that clashes with this one, such as User:Yair_rand/WikidataInfo.js.",
				defaultValue: false
			} )
		]
	}
];

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
