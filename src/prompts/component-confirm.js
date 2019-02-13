const getName = require("../prompts/component-name");
const questions = require('./questions');

const ask = async (answers, inquirer) => {
	console.log("\n=== Your setup: ===");
	console.log(answers);
	console.log("===================\n");

	let accept = await inquirer.prompt([questions.confirm]);
	if (!accept.confirmation) {
		let change;
		let answer = await inquirer.prompt([questions.change(answers)]);

		if (answer.change === "name") {
			change = await getName(inquirer);
		} else if (answer.change === "path") {
			change = await inquirer.prompt([questions.path(answers.name)])
		} else {
			change = await inquirer.prompt([questions[answer.change]]);
		}

		Object.assign(answers, change)
		return await ask(answers, inquirer);
	} else {
		return answers;
	}
}
module.exports = ask;
