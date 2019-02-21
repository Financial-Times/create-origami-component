const {Command} = require("@oclif/command")

const Boilerplate = require('../prompts/boilerplate');
const Build = require('../tasks/build');

class Init extends Command {
	// TODO: should we use args? (e.g. for component name instead of prompting)

	async run() {
		let component = await new Boilerplate().init();
		if (component) { new Build(component) }
	}
}

// TODO: Init.description = ``

module.exports = Init
