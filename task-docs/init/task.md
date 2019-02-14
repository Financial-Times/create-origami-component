# `init/boilerplate`

```
{
	interactive: true,
	flags: [
		--migration ?
		--fixtures ?
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

This will walk the user through an interactive interface with the following prompts:
```
- name: The name of the component *required*
- description: Description of the component *required*
- keywords: Keywords to filter the component, defaults to empty array ?
- support-email: Email for support, defaults to origami.support@ft.com ?
- support-slack: Slack channel for support, defaults to financial-times/ft-origami ?
- support-status: Status of the component, defaults to experimental ?
- brands: list of supported brands, defaults to master ?
```

Based on the file structure provided, we'll need to check for the existence of certain files in order to generate other boiler plates, which takes us to boolean prompts:

```
if no ./main.js:
	- Do you want to use JavaScript in this component? (Y/N)
		if Y
			- init main.js
			- init JS tests

if no ./main.scss
	- Do you want to use SCSS in this component? (Y/N)
		if Y
			- init main.scss
			- init True (scss) tests

if no demos/
	- Do you want to make demos for this component (Y/N)
	- make demos (dependant on how we choose to implement React)
```

The following should be generated with generic/default values:
<details>
	<summary><code>origami.json</code></summary>
	<pre><code>{
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
</code></pre>
</details>


<details>
	<summary><code>README.md</code></summary>
	<pre><code>
	\# [COMPONENT_NAME] [CircleCI badge]
	// A short description of what this component does.
	// A table of contents to help people find thing
		\- Markup
		\- JavaScript
		\- Sass
		\- Contact
		\- License
	// Whatever usage instructions your component has. We've broken this down by Markup, JavaScript and Sass, but it depends how complex your component is.
	<br>
	\#\# Markup
	//Common templating can go here, especially if there is only one template, but people can always check the demos for more.
	//Remember to start your codeblocks with three backticks and "html" so your markup is syntax highlighted correctly.
	\`\`\`html
	<div data-o-component="[COMPONENT_NAME]" class='[COMPONENT_NAME]'\>
		//...
	</div\>
	\`\`\`
	<br>
	\#\# JavaScript
	// Remember to start your codeblocks with three backticks and "js" so your js is syntax highlighted correctly.
	//Though it's not practical to repeat every aspect of Origami modules convention for every component, **A LOT** of people get tripped up by modules not auto initialising, so this line is useful if you have JavaScript:
	No code will run automatically unless you are using the Build Service.
	You must either construct an '[COMPONENT_NAME]' object or fire the 'o.DOMContentLoaded' event, which [COMPONENT_NAME] listens for.
	<br>
	\#\#\#Constructing an [COMPONENT_NAME]
	\`\`\`js
	const [CAPITALIZED_COMPONENT_NAME] = require('[COMPONENT_NAME]');
	[CAPITALIZED_COMPONENT_NAME].init();
	\`\`\`
	<br>
	\#\#\# Firing an oDomContentLoaded event
	\`\`\`js
	require('[COMPONENT_NAME]');
	document.addEventListener('DOMContentLoaded', function() {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	});
	\`\`\`
	<br>
	\#\# Sass
	// Remember to start your codeblocks with three backticks and "sass" so your markup is syntax highlighted correctly.
	<br>
	You can include all styles and variations of this component by calling:
	\`\`\`sass
	@include [COMPONENT_NAME]();
	\`\`\`
	<br>
	You can also be more specific about which styles and variations you would like to output by using an  '$opts' map:
	<br>
	\`\`\`sass
	@include [COMPONENT_NAME]($opts: (
		// fill out the opts map here
		));
	\`\`\`
	<br>
	\#\# Contributing
	// If your component is particularly complicated (image sets fall into this category) then a contributing section or even a contributing.md might be useful
	<br>
	Contact
	If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/[COMPONENT_NAME]/issues), visit [SLACK_CHANNEL](https://financialtimes.slack.com/messages/[SLACK_CHANNEL]/) or email [SUPPORT_EMAIL](mailto:[SUPPORT_EMAIL]).
	<br>
	\#\# Licence
	This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
	</code></pre>
</details>


<details>
	<summary><code>.gitignore</code></summary>
	<pre><code>.DS_Store
.env
/.sass-cache/
/bower_components/
/node_modules/
/build/
.idea/
/demos/local
/coverage</code></pre>
</details>


<details>
	<summary><code>circleci/config.yml</code></summary>
	<pre><code>version: 2
jobs:
  test:
    docker:
      \- image: circleci/node:8-browsers
    steps:
      \- checkout
      \- run:
          name: Ensure package.json exists for caching
          command: if [[ ! -f package.json ]]; then echo "{}" > package.json; fi
      \- run:
          name: Ensure bower.json exists for caching
          command: if [[ ! -f bower.json ]]; then echo "{}" > bower.json; fi
      \- restore_cache:
          key: dependency-cache-{{ checksum "package.json" }}-{{ checksum "bower.json" }}
      \- run:
          name: Install dependencies
          command: npx origami-build-tools@^7 install
      \- save_cache:
          key: dependency-cache-{{ checksum "package.json" }}-{{ checksum "bower.json" }}
          paths:
            \- node_modules
            \- bower_components
      \- run:
          name: Build accessibility testing demo
          command: npx origami-build-tools@^7 demo --demo-filter pa11y --suppress-errors
      \- run:
          name: Run linters
          command: npx origami-build-tools@^7 verify
      \- run:
          name: Run tests
          command: npx origami-build-tools@^7 test
workflows:
  version: 2
  test:
    jobs:
      \- test</code></pre>
</details>

<br>

**Questions**
- Should the default manifest implement circle 2? The current boilerplate indicates V1, so I am unsure.
- Should we implement a flag for generating the migration table & `MIGRATION.md`?

**Notes**
- The format of the demos property in the manifest will be up for debate depending on how we start rendering React Demos
- We can add `--flags` to provide even more granular control or specific boilerplate changes, currently considering `--migration` and `--fixtures`.

### DOCS

- [`README`](../README.md)
- [`build`](./BUILD.md)
- [`install`](./INSTALL.md)
- [`lint`](./LINT.md)
- [`test`](./TEST.md)
