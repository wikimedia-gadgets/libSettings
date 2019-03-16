import '../modules/index.js';
const BooleanOption = mw.libs.libSettings.BooleanOption;
const NumberOption = mw.libs.libSettings.NumberOption;
// const DropdownOption = mw.libs.libSettings.DropdownOption;
const optionsConfig = [
	{
		title: 'Main',
		preferences: [
			new NumberOption( {
				name: 'InputWidth',
				label: 'Width of editing input',
				helptip: 'foooooo',
				defaultValue: 35,
				values: {
					min: 20,
					max: 1000
				}
			} ),
			{
				header: 'checkboxes',
				options: [
					new BooleanOption( {
						name: 'AddToRedirect',
						label: 'Allow additions to redirects',
						helptip: 'When checked, redirects will have ',
						defaultValue: true
					} ),
					new BooleanOption( {
						name: 'AddWikidata',
						label: 'Upload to wikidata when adding a short description.',
						helptip: 'When checked.. ',
						defaultValue: true
					} )
				]
			}
			/* ,
			new DropdownOption( {
				name: 'SaveWikidata',
				label: 'Save changes to Wikidata',
				helptip: 'foooooo',
				defaultValue: 'add',
				values: [
					[ 'add', 'Only on additions (default)' ],
					[ 'all', 'On all changes' ],
					[ 'never', 'Never' ]
				]
			} )*/
		]
	}, /*

	{
		title: 'Semi-automated options',
		show: HasAWBAccess
	},
	*/
	{
		title: 'Advanced',
		preferences: [
			new BooleanOption( {
				name: 'ClashFix',
				label: 'Disable css used to prevent content jump.',
				helptip: "You'd want to this if you have another script that clashes with this one, such as User:Yair_rand/WikidataInfo.js.",
				defaultValue: false
			} )
		]
	}

];

const settings = new mw.libs.libSettings.Settings( {
	scriptName: 'test',
	size: 'larger',
	optionsConfig: optionsConfig
} );

settings.display();
