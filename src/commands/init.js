const {Command} = require("@oclif/command")

const Boilerplate = require('../prompts/boilerplate');

const	fs = require('fs-extra');
const path = require('path');

class Init extends Command {
	// TODO: should we use args? (e.g. for component name instead of prompting)

	async run() {
		let component = await new Boilerplate().init();

		console.log(`Great! Building '${component.name}' into '${component.path}'.`)

		// fs.ensureDir(this.answers.path);
		fs.ensureDir('./sandbox-component'); //for testing, just to avoid overwriting the *actual* src file in oat

		const files = require('../template-list.js');

		let generate = file => {
			let template = require(`../../templates/${file.template}`);
			// let filePath = path.join(this.answers.path, file.path);
			let filePath = path.join('./sandbox-component', file.path);
			let content = file.answers ? template(component) : template();
			fs.outputFile(filePath, content);
		};

		const build = files => files.forEach(generate);

		build(files.config);

		if (component.javascript) { build(files.javascript(component.name)); }

		if (component.scss) { build(files.scss); }

		if (component.demos) { build(files.demos); }

		build(files.documentation);
	}
}

// TODO: Init.description = ``

module.exports = Init
