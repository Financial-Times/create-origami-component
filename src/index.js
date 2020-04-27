const {cli} = require('cli-ux');
const chalk = require('chalk');
const tree = require('tree-node-cli');

const Boilerplate = require('./prompts/boilerplate');
const Build = require('./tasks/build');

void async function createOrigamiComponent () {
let component = await new Boilerplate().init();
	if (component) {
		cli.action.start(chalk.greenBright(`ok! generating '${component.name}' into '${component.path}'\n`));

		const build = new Build(component);
		await build.buildFolder();
		await cli.wait(200);
		cli.action.stop(chalk.yellowBright(`\nyay! '${component.name}' is ready!`)+ '\nhere\'s what it looks like:\n');
		console.log(tree(component.path, {allFiles: true}));
	}
}()
