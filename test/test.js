import '../modules/index.js';
const CheckboxOption = mw.libs.libSettings.CheckboxOption;
const DropdownOption = mw.libs.libSettings.DropdownOption;
const TextOption = mw.libs.libSettings.TextOption;

const replyLink = [
	{
		title: 'General',
		preferences: [
			{
				header: 'General',
				options: [
					new CheckboxOption( {
						name: 'AutoReload',
						label: 'Should the page automatically reload after you click the "Reply" button?',
						defaultValue: true
					} ),
					new CheckboxOption( {
						name: 'CustomSummary',
						label: 'Should an additional text field, allowing a custom edit summary, be displayed?',
						help: 'The edit summary will replace the normal "Replying to comment by so-and-so" text',
						defaultValue: false
					} ),
					new TextOption( {
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
					new DropdownOption( {
						name: 'PreloadPing',
						label: 'When should a ping template be preloaded in the text area?',
						defaultValue: 'always',
						values: [
							{ data: 'always', label: 'Always' },
							{ data: 'button', label: 'Button (will add a button to insert the ping)' },
							{ data: 'never', label: 'Never' }
						]
					} ),
					new TextOption( {
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
			new DropdownOption( {
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
];

const settings = new mw.libs.libSettings.Settings( {
	title: 'Settings for reply-link',
	scriptName: 'test',
	size: 'large',
	height: 'auto',
	helpInline: true,
	optionsConfig: replyLink
} );

settings.display();
window.settings = settings;
