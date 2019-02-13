const questions = require('./questions')

module.exports = async (obj, inquirer) => {
	// The prompt array could be a clever Object manipulation,
	// but personal preference leans toward readability
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
