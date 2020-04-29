module.exports = {
	config: [
		{
			path: './origami.json',
			template: 'origami-manifest'
		},
		{
			path: './bower.json',
			template: 'bower-json'
		},
		{
			path: './.gitignore',
			template: 'gitignore'
		},
		{
			path: './.github/workflows',
			directory: 'workflows'
		},
		{
			path: './.github/CODEOWNERS',
			template: 'codeowners'
		},
		{
			path: './.github/ISSUE_TEMPLATE.md',
			template: 'issue-template-md'
		}
	],
	javascript: name => {
		return [
			{
				path: './main.js',
				template: 'main-js'
			},
			{
				path: `./src/js/${name}.js`,
				template: 'src-js'
			},
			{
				path: `./test/js/${name}.test.js`,
				template: 'test-js'
			},
			{
				path: `./test/js/helpers/fixtures.js`,
				template: 'test-fixtures'
			}
		]
	},
	scss: [
		{
			path: './main.scss',
			template: 'main-scss'
		},
		{
			path: `./src/scss/_variables.scss`,
			template: 'scss-variables'
		},
		{
			path: `./src/scss/_brand.scss`,
			template: 'scss-brand'
		},
		{
			path: `./test/scss/index.test.scss`,
			template: 'test-scss-index',
		},
		{
			path: `./test/scss/_main.test.scss`,
			template: 'test-scss-main'
		}
	],
	demos: [
		{
			path: './demos/src/demo.js',
			template: 'demos-js',
		},
		{
			path: './demos/src/demo.scss',
			template: 'demos-scss'
		},
		{
			path: './demos/src/demo.mustache',
			template: 'demos-mustache'
		},
		{
			path: './demos/src/pa11y.mustache',
			template: 'demos-pa11y'
		}
	],
	documentation: [
		{
			path: './README.md',
			template: 'readme'
		}
	]
}
