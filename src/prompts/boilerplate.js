const inquirer = require("inquirer");
const questions = require("./questions");

class Boilerplate {
	constructor() {
		this.prompt = inquirer.createPromptModule();
		this.answers = {};
		this.questions = questions;
	}

	async init() {
		await this.getName();
		await this.getPath();
		await this.getDetails();
		await this.getConfirmation();

		return this.answers;
	}

	async getName () {
		const response = await this.prompt([this.questions.name]);
		let sanitized = response.name
						.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`) // lowers capitalized letters, adds '-' before each (newComponent => new-component)
						.toLowerCase()
						.replace(/([^a-z-])/g, '-') // replaces any characters that are not a-z or a '-' with a hyphen
						.replace(/(-{2,})/g, '-') // replaces double hyphen with single hyphen
						.replace(/(^-|-$)/g, '') // replaces hyphen if at the beginning or end of string

		this.answers.name = sanitized;

		if (sanitized !== response.name) {
			const { sanity } = await this.prompt([this.questions.sanityCheck(this.answers.name)]);

			if (!sanity) {
				await this.getName();
			}
		}
	}

	async getPath() {
		const response = await this.prompt([this.questions.path(this.answers.name)])
		this.answers = Object.assign(this.answers, response);
	}

	async getDetails() {
		const response = await this.prompt([
			this.questions.description,
			this.questions.keywords,
			this.questions.category,
			this.questions.brands,
			this.questions.javascript,
			this.questions.scss,
			this.questions.status,
			this.questions.email,
			this.questions.slack
		])

		this.answers = Object.assign(this.answers, response);
	}

	async getConfirmation() {
		console.log("\n=== Your component: ===");
		console.log(this.answers);
		console.log("===================\n");

		let response = await this.prompt([this.questions.confirm])
		if (!response.acceptable) {
				response = await this.prompt([this.questions.change(this.answers)])

			if (response.change === 'name') {
					await this.getName();
					if (this.answers.path !== './') { this.answers.path = `./${this.answers.name}` }
			} else {
				await this.prompt([this.questions[response.change]])
			}

			await this.getConfirmation();
		}
	}
}

module.exports = Boilerplate;
