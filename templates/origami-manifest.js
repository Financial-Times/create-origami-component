const details = answers => {
	return `{
	"description": "${answers.description}",
	"keywords": ${JSON.stringify(answers.keywords)},
	"origamiType": "module",
	"origamiCategory": "${answers.category}",
	"origamiVersion": 1,
	"brands": ${JSON.stringify(answers.brands)},
	"support": "https://github.com/Financial-Times/${answers.name}/issues",
	"supportContact": {
		"email": "${answers.email}",
		"slack": "financialtimes/${answers.slack}"
	},
	"supportStatus": "${answers.status}",
	"browserFeatures": {}`;
}

const demos = (answers) => {
	return `
	"demosDefaults": {
		${answers.scss ? `"sass": "demos/src/demo.scss",` : ''}
		${answers.javascript ? `"js": "demos/src/demo.js",` : ''}
		"documentClasses": "",
		"dependencies": []
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
`
}
module.exports = (answers) => {
	let detailJSON = details(answers);
	let demosJSON = `,${demos(answers)}}`;
	return detailJSON + demosJSON;
};
