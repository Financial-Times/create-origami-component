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
	javascript: [
		{
			path: './main.js',
			template: 'main-js',
			answers: true
		}
	]
}
