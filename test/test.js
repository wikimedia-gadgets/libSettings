import '../dist/index.js';
const BooleanOption = mw.libs.libSettings.BooleanOption;
/* const NumberOption = mw.libs.libSettings.NumberOption;
const StringOption = mw.libs.libSettings.StringOption; */
const optionsConfig = [
	{
		title: 'Main',
		preferences: [/*
			new NumberOption( {
				name: 'InputWidth',
				label: 'Width of editing input',
				defaultValue: 35
			} ),*/
			new BooleanOption( {
				name: 'AddToRedirect',
				label: 'Allow additions to redirects',
				helptip: 'When checked, redirects will have ',
				defaultValue: true
			} ) /*
			new StringOption( {
				name: 'SaveWikidata',
				label: 'Save changes to Wikidata',
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
				value: false
			} )
		]
	}

];

const settingsConfig = {
	scriptName: 'test',
	formfactor: 'medium'
};

const settings = new mw.libs.libSettings.Settings( optionsConfig, settingsConfig );
settings.display();
