const {Command, flags} = require("@oclif/command")

const inquirer = require("inquirer");
const getName = require("../prompts/component-name");
const getDetails = require("../prompts/component-details");
const confirm = require("../prompts/component-confirm");

class Init extends Command {
	async run() {
		let name = await getName(inquirer);
		let details = await getDetails(name, inquirer);

		let answers = Object.assign(name, details);
		
		await confirm(answers, inquirer);
		console.log(`Great! Building '${answers.name}' into '${answers.path}' ...`)
	}
}

// Init.description = `Describe the command here
// ...
// Extra documentation goes here
// `
//
// name: flags.string({char: 'n', description: 'name to print'}),
// Init.flags = {
// }

module.exports = Init
