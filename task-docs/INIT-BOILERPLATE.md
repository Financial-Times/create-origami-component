## `init/boilerplate`

```
{
	interactive: true,
	flags: [
		--migration
		--fixtures
	],
	functionality: [
	'component boilerplate',
	'demo (app?) boilerplate'
	'test file boilerplate',
	'fixture boilerplate'
	],
	requires: [
	'a set up to support a react app?'
	]
}
```

This task should be responsible for a more comprehensive boilerplate than the current `obt init`.

We can provide more granular control over what boilerplate details get output by making this command interactive, much like an `npm init`—meaning we need a list of prompts for the command.

We can add `--flags` to provide even more granular control or specific boilerplate changes, currently considering `--migration` and `--fixtures`.

This will walk the user through an interactive interface with the following prompts:
	- name: The name of the component *required*
	- description: Description of the component *required*
	- keywords: Keywords to filter the component, defaults to empty array ?
	- support-email: Email for support, defaults to origami.support@ft.com ?
	- support-slack: Slack channel for support, defaults to financial-times/ft-origami ?
	- support-status: Status of the component, defaults to experimental ?
	- brands: list of supported brands, defaults to master ?

The rest of the manifest should be generated with generic/default values:
```json
{
	"origamiType": "module",
	"origamiCategory": "components",
	"origamiVersion": 1,
	"support": "https://github.com/Financial-Times/[COMPONENT_NAME]/issues",
	"browserFeatures": {},
	"ci": {
		"circle":  "https://circleci.com/api/[VERSION?]/project/Financial-Times/[COMPONENT_NAME]"
	},
	"demosDefaults": {
		"sass": "demos/src/demo.scss",
		"js": "demos/src/demo.js",
		"documentClasses": "",
		"dependencies": ""
	},
	"demos": [
		{
			"title": "A Useful Demo",
			"name": "demo",
			"template": "demos/src/demo.mustache",
			"description": "Description of the demo"
		},
		{
			"title": "Pa11y",
			"name": "pa11y",
			"template": "demos/src/pa11y.mustache",
			"description": "Accessibility test will be run against this demo",
			"hidden": true
		}
	]
}
```

The README should be generated with generic content, with information from the prompts above:
```
[COMPONENT_NAME] [![Circle CI](https://circleci.com/gh/Financial-Times/[COMPONENT_NAME]/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/[COMPONENT_NAME]/tree/master)[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================
_A short description of what this component does._
_A table of contents to help people find things_
- [Markup](#markup)
- [JavaScript](#javascript)
- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

_Whatever usage instructions your component has. We've broken this down by Markup, JavaScript and Sass, but it depends how complex your component is._

### Markup
_Common templating can go here, especially if there is only one template, but people can always check the demos for more._
_Remember to start your codeblocks with three backticks and "html" so your markup is syntax highlighted correctly._
'''html
<div data-o-component="[COMPONENT_NAME]" class='[COMPONENT_NAME]'>
</div>
'''

### JavaScript
_Remember to start your codeblocks with three backticks and "js" so your js is syntax highlighted correctly._
_Though it's not practical to repeat every aspect of Origami modules convention for every component, **A LOT** of people get tripped up by modules not auto initialising, so this line is useful if you have JavaScript:_
No code will run automatically unless you are using the Build Service.
You must either construct an '[COMPONENT_NAME]' object or fire the 'o.DOMContentLoaded' event, which [COMPONENT_NAME] listens for.

#### Constructing an [COMPONENT_NAME]
'''js
const [CAPITALIZED_COMPONENT_NAME] = require('[COMPONENT_NAME]');
[CAPITALIZED_COMPONENT_NAME].init();
'''

#### Firing an oDomContentLoaded event
'''js
require('[COMPONENT_NAME]');
document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
'''

### Sass
_Remember to start your codeblocks with three backticks and "sass" so your markup is syntax highlighted correctly._

You can include all styles and variations of this component by calling:
'''sass
@include [COMPONENT_NAME]();
'''

You can also be more specific about which styles and variations you would like to output by using an  '$opts' map:

'''sass
@include [COMPONENT_NAME]($opts: (
	// fill out the opts map here
));
'''

## Contributing
If your component is particularly complicated (image sets fall into this category) then a contributing section or even a contributing.md might be useful

## Contact
If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/[COMPONENT_NAME]/issues), visit [SLACK_CHANNEL](https://financialtimes.slack.com/messages/[SLACK_CHANNEL]/) or email [SUPPORT_EMAIL](mailto:[SUPPORT_EMAIL]).
## Licence
This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).`;
```

Boolean prompts:
```
if no `main.js`:
	- Ask about JS init (Y/N)
		if Y
			- init main.js
			- init tests

if no `main.scss`
	- Ask about JS init (Y/N)
		if Y
		- Init main.scss
		- init tests

if no `demos`
	- make demos ?
```

**Questions**
- Should the default manifest implement circle 2? The current boilerplate indicates V1, so I am unsure.
- Should we implement a flag for generating the migration table & `MIGRATION.md`?

**Notes**
- The format of the demos property in the manifest will be up for debate depending on how we start rendering React Demos
