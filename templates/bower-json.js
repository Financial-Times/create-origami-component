module.exports = (answers) => {
	return `{
	"name": "${answers.name}",
	"description": "${answers.description}",
	"ignore": [
		"node_modules",
		"bower_components",
		"build"
	],
	"main": [
		${answers.scss ? `"main.scss"` : ''}${answers.scss && answers.javascript ? "," : ''}
		${answers.javascript ? `"main.js"` : ''}
	],
	"dependencies": {
		${answers.brand ? `"o-brand": "^3.2.10"` : ''}
	}
}`;
};
