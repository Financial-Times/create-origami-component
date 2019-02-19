const inquirer = require("inquirer");
const Questions = require('../prompts/questions');

class Boilerplate extends Questions {
	constructor() {
		super();

		this.prompt = inquirer.createPromptModule();
	}

	async isCompliant() {
		this.answers.name.sanitized = this.answers.name.original
					.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`) // lowers capitalized letters, adds '-' before each (newComponent => new-component)
					.toLowerCase()
					.replace(/([^a-z-])/g, '-') // replaces any characters that are not a-z or a '-' with a hyphen
					.replace(/(-{2,})/g, '-') // replaces double hyphen with single hyphen
					.replace(/(^-)/g, '') // replaces hyphen if at the beginning of string

		this.populateQuestions();
		if (this.answers.name.sanitized !== this.answers.name.original) {
			let verify = await this.prompt([this.questions.confirmName]);

			if (!verify.confirmName) {
				return await this.getName();
			}
		}

		return this.answers.name.sanitized;
	}

	async getName () {
		this.answers.name = await this.prompt([this.questions.name])
		this.answers.name = await this.isCompliant();
	}

	async getDetails () {
		this.populateQuestions();
		Object.assign(this.answers, await this.prompt([
			this.questions.path,
			this.questions.description,
			this.questions.keywords,
			this.questions.email,
			this.questions.slack,
			this.questions.status,
			this.questions.brands,
			this.questions.javascript,
			this.questions.scss,
			this.questions.demos
		]));
	}

	async confirm () {
		console.log("\n=== Your setup: ===");
		console.log(this.answers);
		console.log("===================\n");

		let accept = await this.prompt([this.questions.confirm]);

		if (!accept.confirmation) {
			this.populateQuestions();
			let answer = await this.prompt([this.questions.change]);

			if (answer.change === "name") {
				await this.getName();
				if (this.answers.path !== './') { this.answers.path = `./${this.answers.name}` }
			} else {
				this.answers[answer.change] = await this.prompt([this.questions[answer.change]]);
			}

			await this.confirm()
		}
	}

	async init() {
		await this.getName();
		await this.getDetails();
		await this.confirm();

		return this.answers;
	}
}

module.exports = Boilerplate;
