const questions = require('./questions');

const ask = async (inquirer) => {
	let answers = await inquirer.prompt([
		questions.name,
		questions.confirmName
	]);

	if (answers.name.original !== answers.name.altered && !answers.confirmName) {
		return await ask(inquirer);
	} else {
		answers.name = answers.name.altered;
		delete answers["confirmName"];
		return answers
	}
}

module.exports = ask;
