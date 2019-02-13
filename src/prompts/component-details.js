const questions = (name) => {
	return [
		{
			name: "path",
			type: "list",
			message: "What folder should your choices be saved to?",
			default: "./",
			choices: [
				"./",
				`./${name}`
			]
		},
		{
			name: "description",
			type: "input",
			message: "Please provide a short description.",
			validate: value => {
				if (!value) {
					return "Please enter a description for your component"
				}
				return true
			}
		},
		{
			name: "keywords",
			type: "input",
			message: "Are there any keywords for this?",
			filter: value => {
				return value.split(/\s*[\s,]\s*/).filter(Boolean)
			}
		},
		{
			name: "email",
			type: "input",
			message: "What is the support email for this component?",
			default: "origami.support@ft.com",
			validate: value => {
				if (!value.includes("@")) {
					return "Please enter a valid email address";
				}
				return true;
			}
		},
		{
			name: "slack",
			type: "input",
			message: "What is the support slack channel for this component?",
			default: "#ft-origami"
		},
		{
			name: "status",
			type: "list",
			message: "What is the status of this component?",
			default: "experimental",
			choices: [
				"active",
				"experimental",
				"maintained"
			]
		},
		{
			name: "brands",
			type: "checkbox",
			message: "What brands will this component support?",
			default: ["master"],
			choices: [
				"master",
				"internal",
				"whitelabel"
			]
		}
	]
}

module.exports = async (obj, inquirer) => {
	return await inquirer.prompt(questions(obj.name));
}
