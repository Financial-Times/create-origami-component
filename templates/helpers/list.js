const { withoutPrefix } = require('./name-formats.js');

module.exports = {
	config: [
		{
			path: './origami.json',
			template: 'origami-manifest'
		},
		{
			path: './.remarkrc.js',
			template: 'remarkrc-js'
		},
		{
			path: './package.json',
			template: 'package-json'
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
			path: './.eslintrc.js',
			template: 'eslintrc-js'
		},
		{
			path: './.stylelintrc.js',
			template: 'stylelintrc-js'
		},
		{
			path: './.dependabot',
			directory: 'dependabot'
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
	workflows: githubTeam => {
		const workflows = [
			{
				path: './.github/workflows/apply-labels.yml',
				original: 'workflows/apply-labels.yml'
			},
			{
				path: './.github/workflows/auto-approve.yml',
				original: 'workflows/auto-approve.yml'
			},
			{
				path: './.github/workflows/automatic-tag-and-release.yml',
				original: 'workflows/automatic-tag-and-release.yml'
			},
			{
				path: './.github/workflows/release-origami-component.yml',
				original: 'workflows/release-origami-component.yml'
			},
			{
				path: './.github/workflows/sync-repo-labels.yml',
				original: 'workflows/sync-repo-labels.yml'
			},
			{
				path: './.github/workflows/test-origami-component.yml',
				original: 'workflows/test-origami-component.yml'
			}
		];
		// Only push new issues to the Origami project board if the Origami Core
		// team are the code owners of the new component.
		if (githubTeam === 'origami-core') {
			workflows.push({
				path: './.github/workflows/add-new-issues-and-pull-requests-to-origami-project-board.yml',
				original: 'workflows/add-new-issues-and-pull-requests-to-origami-project-board.yml'
			});
		}
		return workflows;
	},
	javascript: name => {
		return [
			{
				path: './main.js',
				template: 'main-js'
			},
			{
				path: `./src/js/${withoutPrefix(name)}.js`,
				template: 'src-js'
			},
			{
				path: `./test/js/${withoutPrefix(name)}.test.js`,
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
