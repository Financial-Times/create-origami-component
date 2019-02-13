module.exports = {
	name: {
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
	confirmName: {
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
	},
	path: (name) => {
		return {
			name: "path",
			type: "list",
			message: "What folder should your choices be saved to?",
			default: "./",
			choices: [
				"./",
				`./${name}`
			]
		}
	},
	description: {
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
	keywords: {
		name: "keywords",
		type: "input",
		message: "Are there any keywords for this?",
		filter: value => {
			return [... new Set(value.split(/\s*[\s,]\s*/).filter(Boolean))];
		}
	},
	email: {
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
	slack: {
		name: "slack",
		type: "input",
		message: "What is the support slack channel for this component?",
		default: "#ft-origami"
	},
	status: {
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
	brands: {
		name: "brands",
		type: "checkbox",
		message: "What brands will this component support?",
		default: ["master"],
		choices: [
			"master",
			"internal",
			"whitelabel"
		]
	},
	javascript: {
		name: "javascript",
		type: "confirm",
		message: "Will your component use JavaScript?",
		default: true
	},
	scss: {
		name: "scss",
		type: "confirm",
		message: "Will your component use SCSS?",
		default: true
	},
	demos: {
		name: "demos",
		type: "confirm",
		message: "Will you need demos?",
		default: true
	},
	confirm: {
		name: "confirmation",
		type: "confirm",
		message: "Is this ok?"
	},
	change: (answers) => {
		return {
			name: "change",
			type: "list",
			message: "What would you like to change?",
			choices: Object.keys(answers)
		}
	}
}
