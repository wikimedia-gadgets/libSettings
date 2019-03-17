import '../modules/index.js';
const BooleanOption = mw.libs.libSettings.BooleanOption;
const NumberOption = mw.libs.libSettings.NumberOption;
const DropdownOption = mw.libs.libSettings.DropdownOption;
const optionsConfig = [
	{
		preferences: [
			new NumberOption( {
				name: 'InputWidth',
				label: 'Width of editing input in em (default 35)',
				helptip: 'worth a damn',
				defaultValue: 35,
				UIconfig: {
					min: 10,
					max: 400
				}
			} ),
			new BooleanOption( {
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
			new BooleanOption( {
				name: 'ClashFix',
				label: 'Disable css used to prevent content jump.',
				help: "You'd want to this if you have another script that clashes with this one, such as User:Yair_rand/WikidataInfo.js.",
				defaultValue: false
			} )
		]
	}
];

const settings = new mw.libs.libSettings.Settings( {
	scriptName: 'test',
	helpInline: true,
	optionsConfig: optionsConfig
} );

settings.display();
window.settings = settings;
