const {cli} = require('cli-ux');
const chalk = require('chalk');
const tree = require('tree-node-cli');
const	fs = require('fs-extra');
const path = require('path');


class Build {
	constructor(component, files) {
		this.component = component;
		this.templatePath = '../../templates/';
		this.run()
	}

	async run() {
		cli.action.start(chalk.blueBright(`Great! Building '${this.component.name}' into '${this.component.path}'\n`));

		// timeout to give the impression that we're working hard, the build is practically instantaneous
		await cli.wait(1000);
		this.buildFolder();

		cli.action.stop(chalk.greenBright(`\nWooo, '${this.component.name}' is ready!`)+ '\nHere\'s your new folder tree:\n');

		await cli.wait(200);
		console.log(tree(this.component.path));
	}

	generate (file) {
		let template = require(this.templatePath + file.template);
		let filePath = path.join(this.component.path, file.path);
		let content = typeof template === 'function' ? template(this.component) : template();
		fs.outputFile(filePath, content);
	}

	build (files) { files.forEach(file => this.generate(file)) }

	buildFolder () {
		fs.ensureDir(this.component.path);

		const files = require(this.templatePath + 'list.js');

		this.build(files.config);

		if (this.component.javascript) { this.build(files.javascript(this.component.name)); }

		if (this.component.scss) { this.build(files.scss); }

		if (this.component.demos) { this.build(files.demos); }

		this.build(files.documentation);
	}
}

module.exports = Build;
