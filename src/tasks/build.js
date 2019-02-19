
const	fs = require('fs-extra');
const path = require('path');
const {cli} = require('cli-ux');

class Build {
	constructor(component) {
		this.component = component
		this.run()
	}

	async run() {
		cli.action.start(`Great! Building '${this.component.name}' into '${this.component.path}'\n`);

		// timeout to give the impression that we're working hard, the build is practically instantaneous
		await cli.wait(1000);
		this.generate();

		cli.action.stop(`\nWooo, ${this.component.name} is ready to go!`);
	}

	generate() {
		// fs.ensureDir(this.answers.path);
		fs.ensureDir('./sandbox-component'); //for testing, just to avoid overwriting the *actual* src file in oat

		const files = require('../template-list.js');

		let generate = file => {
			let template = require(`../../templates/${file.template}`);
			// let filePath = path.join(this.answers.path, file.path);
			let filePath = path.join('./sandbox-component', file.path);
			let content = typeof template === 'function' ? template(this.component) : template();
			fs.outputFile(filePath, content);
		};

		const build = files => files.forEach(generate);

		build(files.config);

		if (this.component.javascript) { build(files.javascript(this.component.name)); }

		if (this.component.scss) { build(files.scss); }

		if (this.component.demos) { build(files.demos); }

		build(files.documentation);
	}
}

module.exports = Build;
