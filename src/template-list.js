module.exports = {
	config: [
		{
			path: './origami.json',
			template: 'origami-manifest',
			answers: true
		},
		{
			path: './bower.json',
			template: 'bower-json',
			answers: true
		},
		{
			path: './.gitignore',
			template: 'gitignore'
		},
		{
			path: './.circle/config.yml',
			template: 'circle-config'
		}
	],
	javascript: name => {
		return [
			{
				path: './main.js',
				template: 'main-js',
				answers: true
			},
			{
				path: `./src/js/${name}.js`,
				template: 'src-js',
				answers: true
			},
			{
				path: `./test/js/${name}.test.js`,
				template: 'test-js',
				answers: true
			},
			{
				path: `./test/js/helpers/fixtures.js`,
				template: 'test-fixtures',
				answers: true
			}
		]
	},
	scss: [
		{
			path: './main.scss',
			template: 'main-scss',
			answers: true
		},
		{
			path: `./src/scss/_variables.scss`,
			template: 'scss-variables',
			answers: true
		},
		{
			path: `./test/scss/index.test.scss`,
			template: 'test-scss-index',
		},
		{
			path: `./test/scss/_main.test.scss`,
			template: 'test-scss-main',
			answers: true
		}
	],
	demos: [
		{
			path: './demos/src/demo.js',
			template: 'demos-js',
		},
		{
			path: './demos/src/demo.scss',
			template: 'demos-scss',
			answers: true
		},
		{
			path: './demos/src/demo.mustache',
			template: 'demos-mustache',
			answers: true
		},
		{
			path: './demos/src/pa11y.mustache',
			template: 'demos-pa11y',
			answers: true
		}
	],
	documentation: [
		{
			path: './README.md',
			template: 'readme',
			answers: true
		}
	]
}
