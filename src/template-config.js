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
		}
	]
}
