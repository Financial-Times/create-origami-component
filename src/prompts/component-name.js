const questions = [
	{
		name: "name.original",
		type: "input",
		message: "What are you calling your new component? (required)",
		validate: value => {
			if (!value) {
				return "Please enter a name for your component"
			}
			return true
		},
	},
	{
		name: "confirmName",
		type: "confirm",
		message: answers => `Did you mean ${answers.name.altered}?`,
		when: answers => {
			answers.name.altered = answers.name.original
											.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
											.toLowerCase()
											.replace(/([^a-z-])/g, '-')
											.replace(/(-{2,})/g, '-')
											.replace(/(^-)/g, '')
			return answers.name.altered !== answers.name.original;
		}
	}
]

const ask = async (inquirer) => {
	let answers = await inquirer.prompt(questions);
	if (answers.name.original !== answers.name.altered && !answers.confirmName) {
		await ask(inquirer);
	} else {
		answers.name = answers.name.altered;
		return answers
	}
}

module.exports = ask;
