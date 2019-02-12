const {Command, flags} = require('@oclif/command')
const {log} = console;

const chalk = require('chalk');
const inquirer = require('inquirer');

class Init extends Command {
  async run() {
		let trueAnswers = [];

		const name = [
			{
				type: 'input',
				message: `What are you calling your new component? (required)`,
				name: 'name.original',
				validate: value => {
					if (!value) {
						return 'Please enter a name for your component'
					}
					return true
				},
			},
			{
				type: 'confirm',
				name: 'confirmName',
				message: answers => `Did you mean ${answers.name.altered}?`,
				when: answers => {
					answers.name.altered = answers.name.original
													.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
													.toLowerCase()
													.replace(/([^a-z-])/g, '-')
													.replace(/(-{2,})/g, '-')
													.replace(/(^-)/g, '')
					return answers.name.altered !== answers.name.original;
				}
			}
		]

		function ask() {
			inquirer.prompt(name)
			.then(answers => {
				if (answers.name.original !== answers.name.altered && !answers.confirmName) {
					ask();
				} else {
					promptMoar(answers)
				}
			})
		}

		function promptMoar(answers) {
			inquirer.prompt([{
				type: 'input',
				message: 'what',
				name: 'whatever'
			}]).then(xtraAnswers => {console.log(Object.assign(answers, xtraAnswers))})

		}
		ask();
	}
}

Init.description = `Describe the command here
...
Extra documentation goes here
`

Init.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = Init
