const questions = require('./questions')

module.exports = async (obj, inquirer) => {
	return await inquirer.prompt([
		questions.path(obj.name),
		questions.description,
		questions.keywords,
		questions.email,
		questions.slack,
		questions.status,
		questions.brands,
		questions.javascript,
		questions.scss,
		questions.demos
	]);
}
