const {Command} = require("@oclif/command")

const inquirer = require("inquirer");
const getName = require("../prompts/component-name");
const getDetails = require("../prompts/component-details");
const confirm = require("../prompts/component-confirm");

class Init extends Command {
	// TODO: should we use args (e.g. for component name)
	async run() {
		let name = await getName(inquirer);
		let details = await getDetails(name, inquirer);

		let answers = Object.assign(name, details);

		await confirm(answers, inquirer);
		console.log(`Great! Building '${answers.name}' into '${answers.path}' ...`)
	}
}

// TODO: Init.description = ``

module.exports = Init
