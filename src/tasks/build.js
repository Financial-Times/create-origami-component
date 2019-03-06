const fs = require('fs-extra');
const path = require('path');

class Build {
	constructor(component) {
		this.component = component;
		this.templatePath = '../../templates/boilerplate/';
	}

	async generate(file) {
		let template = require(this.templatePath + file.template);
		let filePath = path.join(this.component.path, file.path);
		let content = typeof template === 'function' ? template(this.component) : template();
		await fs.outputFile(filePath, content);
	}

	async build(files) {
		for (const file of files) {
			await this.generate(file);
		}
	}

	async buildFolder() {
		await fs.ensureDir(this.component.path);

		const files = require(this.templatePath + 'helpers/list.js');

		await this.build(files.config);

		if (this.component.javascript) {
			await this.build(files.javascript(this.component.name));
		}

		if (this.component.scss) {
			await this.build(files.scss);
		}

		if (this.component.demos) {
			await this.build(files.demos);
		}

		await this.build(files.documentation);
	}
}

module.exports = Build;