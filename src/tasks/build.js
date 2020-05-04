const fs = require('fs-extra');
const path = require('path');

class Build {
	constructor(component) {
		this.component = component;
		this.templatePath = '../../templates/';
	}

	async generate(file) {
		let filePath = path.join(this.component.path, file.path);
		if (file.directory) {
			await fs.mkdirp(filePath);
			await fs.copy(path.join(__dirname, this.templatePath, file.directory), filePath);
		} else if (file.template) {
			let template = require(path.join(this.templatePath, file.template));
			let content = typeof template === 'function' ? template(this.component) : template();
			await fs.outputFile(filePath, content);
		} else {
			throw new Error("file must have `template` or `directory`, got: " + JSON.stringify(file));
		}
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

		await this.build(files.demos);

		await this.build(files.documentation);
	}
}

module.exports = Build;
