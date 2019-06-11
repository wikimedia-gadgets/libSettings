import '../modules/index.js';
const ls = mw.libs.libSettings;

const replyLink = new ls.OptionsConfig(
	{
		title: 'General',
		preferences: [
			{
				header: 'General',
				options: [
					new ls.CheckboxOption( {
						name: 'AutoReload',
						label: 'Should the page automatically reload after you click the "Reply" button?',
						defaultValue: true
					} ),
					new ls.CheckboxOption( {
						name: 'CustomSummary',
						label: 'Should an additional text field, allowing a custom edit summary, be displayed?',
						help: 'The edit summary will replace the normal "Replying to comment by so-and-so" text',
						defaultValue: false
					} ),
					new ls.TextOption( {
						name: 'SigPrefix',
						label: 'Prefix in front of your signature whenever you sign, in the style of the signature button from the editing toolbar.',
						help: 'For example, if you want a -- in front of your signature, use "--"',
						defaultValue: ''
					} )
				]
			},
			{
				header: 'Pings',
				options: [
					new ls.DropdownOption( {
						name: 'PreloadPing',
						label: 'When should a ping template be preloaded in the text area?',
						defaultValue: 'always',
						values: [
							{ data: 'always', label: 'Always' },
							{ data: 'button', label: 'Button (will add a button to insert the ping)' },
							{ data: 'never', label: 'Never' }
						]
					} ),
					new ls.TextOption( {
						name: 'PreloadPingTpl',
						label: 'Which ping template to preload.',
						help: 'For {{re}} use "{{re|##}} ", etc. The text ## will be replaced with a username.',
						defaultValue: '{{u|##}}',
						UIconfig: {
							validate: /##/
						}
					} )
				]
			}
		]
	},
	{
		title: 'Testing',
		preferences: [
			new ls.DropdownOption( {
				name: 'DryRun',
				label: 'Should the script make no actual edits, but just print results in the console?',
				help: 'This is useful for testing.',
				defaultValue: 'never',
				values: [
					{ data: 'always', label: 'Always' },
					{ data: 'checkbox', label: 'Checkbox' },
					{ data: 'never', label: 'Never' }
				]
			} )
		]
	}
);

const settings = new ls.Settings( {
	title: 'Settings for reply-link',
	scriptName: 'test',
	size: 'large',
	height: 'auto',
	helpInline: true,
	optionsConfig: replyLink
} );

settings.display();
window.settings = settings;
