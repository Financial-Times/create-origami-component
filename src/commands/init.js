const {Command} = require("@oclif/command")

const inquirer = require("inquirer");
const getName = require("../prompts/component-name");
const getDetails = require("../prompts/component-details");
const confirmation = require("../prompts/component-confirmation");

const	fs = require('fs-extra');
const path = require('path');

class Init extends Command {
	// TODO: should we use args (e.g. for component name)
	// constructor () {
	// 	super();
	// 	this.template = (name) => `../templates/${name}`;
	// }

	async run() {
		let name = await getName(inquirer);
		let details = await getDetails(name, inquirer);

		let answers = Object.assign(name, details);

		let generate = await confirmation(answers, inquirer);

		if (generate) {
			console.log(`Great! Building '${answers.name}' into '${answers.path}'.`)
			// GENERATE ALL TEH THINGS
			// fs.ensureDir(answers.path);
			fs.ensureDir('./sandbox-component');

			// start build root config files
			let origamiManifest = path.join('./sandbox-component', './origami.json');
			let bowerJSON = path.join('./sandbox-component', './bower.json');
			let gitIgnore = path.join('./sandbox-component', './.gitignore');
			let circleConfig = path.join('./sandbox-component', './.circleci/config.yml');

			fs.outputFile(origamiManifest, require('../../templates/origami-manifest')(answers));
			fs.outputFile(bowerJSON, require('../../templates/bower-json')(answers));
			fs.outputFile(gitIgnore, require('../../templates/gitignore')());
			fs.outputFile(circleConfig, require('../../templates/circle-config')());
			// end build root config files

			// start build js files
			// end build js files

			// start build scss files
			// end build scss files

			// start build test files
			// end build test files

			// start build demo files
			// end build demo files

			// start build documentation
			// end build documentation

		}
	}
}

// TODO: Init.description = ``

module.exports = Init
