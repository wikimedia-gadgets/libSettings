import '../modules/index.js';
const BooleanOption = mw.libs.libSettings.BooleanOption;
const NumberOption = mw.libs.libSettings.NumberOption;
const DropdownOption = mw.libs.libSettings.DropdownOption;
const optionsConfig = [
	{
		title: 'Main',
		preferences: [
			new NumberOption( {
				name: 'InputWidth',
				label: 'Width of editing input (em)',
				helptip: 'worth a damn',
				defaultValue: 35,
				UIconfig: {
					min: 20,
					max: 800
				}
			} ),
			new BooleanOption( {
				name: 'AddToRedirect',
				label: 'Allow additions to redirects',
				help: 'When checked, redirects will have ',
				defaultValue: true
			} ),
			{
				header: 'Wikidata',
				options: [
					new BooleanOption( {
						name: 'AddWikidata',
						label: 'Upload to wikidata when adding a short description.',
						help: 'When checked.. ',
						defaultValue: true
					} ),
					new DropdownOption( {
						name: 'SaveWikidata',
						label: 'Save changes to Wikidata',
						help: 'foooooo',
						defaultValue: 'add',
						values: [
							{ data: 'add', label: 'Only on additions (default)' },
							{ data: 'all', label: 'On all changes' },
							{ data: 'never', label: 'Never' }
						]
					} )
				]
			}
		]
	}, /*

	{
		title: 'Semi-automated options',
		show: HasAWBAccess
	},
	*/
	{
		title: 'Advanced',
		level: 1,
		preferences: [
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
	size: 'large',
	helpInline: true,
	optionsConfig: optionsConfig
} );

settings.display();
window.settings = settings;
