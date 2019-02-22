const {Command} = require("@oclif/command")
const {cli} = require('cli-ux');
const chalk = require('chalk');
const tree = require('tree-node-cli');

const Boilerplate = require('../prompts/boilerplate');
const Build = require('../tasks/build');

class Init extends Command {
	// TODO: should we use args? (e.g. for component name instead of prompting)

	async run() {
		let component = await new Boilerplate().init();
		if (component) {
			cli.action.start(chalk.blueBright(`Great! Building '${component.name}' into '${component.path}'\n`));

			// timeout to give the impression that we're working hard, the build is practically instantaneous
			await cli.wait(1000);

			new Build(component)

			cli.action.stop(chalk.greenBright(`\nWooo, '${component.name}' is ready!`)+ '\nHere\'s your new folder tree:\n');

			await cli.wait(200);
			console.log(tree(component.path));
		}
	}
}

// TODO: Init.description = ``

module.exports = Init
