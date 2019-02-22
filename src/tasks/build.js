
const	fs = require('fs-extra');
const path = require('path');


class Build {
	constructor(component, files) {
		this.component = component;
		this.templatePath = '../../templates/';
		this.buildFolder()
	}

	async generate (file) {
		let template = require(this.templatePath + file.template);
		let filePath = path.join(this.component.path, file.path);
		let content = typeof template === 'function' ? template(this.component) : template();
		await fs.outputFile(filePath, content);
	}

	build (files) { files.forEach(file => this.generate(file)) }

	async buildFolder () {
		await fs.ensureDir(this.component.path);

		const files = require(this.templatePath + 'list.js');

		this.build(files.config);

		if (this.component.javascript) { this.build(files.javascript(this.component.name)); }

		if (this.component.scss) { this.build(files.scss); }

		if (this.component.demos) { this.build(files.demos); }

		this.build(files.documentation);
	}
}

module.exports = Build;
