const {Command} = require("@oclif/command")

const inquirer = require("inquirer");
const getName = require("../prompts/component-name");
const getDetails = require("../prompts/component-details");
const confirmation = require("../prompts/component-confirmation");

const	fs = require('fs-extra');
const path = require('path');

class Init extends Command {
	// TODO: should we use args? (e.g. for component name instead of prompting)

	async run() {
		let name = await getName(inquirer);
		let details = await getDetails(name, inquirer);

		this.answers = Object.assign(name, details);

		let confirmed = await confirmation(this.answers, inquirer);

		if (confirmed) {
			console.log(`Great! Building '${this.answers.name}' into '${this.answers.path}'.`)
			// GENERATE ALL TEH THINGS
			// fs.ensureDir(this.answers.path);
			fs.ensureDir('./sandbox-component');

			const files = require('../template-list.js');

			let generate = file => {
				let template = require(`../../templates/${file.template}`);
				// let filePath = path.join(this.answers.path, file.path));
				let filePath = path.join('./sandbox-component', file.path);
				let content = file.answers ? template(this.answers) : template();
				fs.outputFile(filePath, content);
			};

			const build = files => files.forEach(generate);

			build(files.config);

			if (this.answers.javascript) { build(files.javascript(this.answers.name)); }

			if (this.answers.scss) { build(files.scss); }

			if (this.answers.demos) { build(files.demos); }

			// build(files.documentation);
		}
	}
}

// TODO: Init.description = ``

module.exports = Init
