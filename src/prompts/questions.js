module.exports = {
	name: {
		name: "name",
		type: "input",
		message: "What's the component called? (required)",
		validate: value => {
			if (!value) {
				return "Please enter a name for your component. "
			}
			return true
		}
	},
	sanityCheck: (name) => {
		return {
			name: "sanity",
			type: "confirm",
			message: `Is "${name}" okay?`
		}
	},
	path: (name) => {
		return {
			name: "path",
			type: "list",
			message: "Should we start this component in the current directory, or a subdirectory?",
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
		message: "Enter a short description of what your component does",
		validate: value => {
			if (!value) {
				return "Please enter a description for your component. https://origami.ft.com/spec/v1/manifest/#description"
			}
			return true
		}
	},
	keywords: {
		name: "keywords",
		type: "input",
		message: "Enter some keywords related to your component to help discoverability in the registry",
		filter: value => {
			// splits the string by ',' and ' ', filters out any rogue spaces & removes duplicate values
			return [... new Set(value.split(/\s*[\s,]\s*/).filter(Boolean))];
		}
	},
	email: {
		name: "email",
		type: "input",
		message: "What's the email address for the team that will be supporting this component?",
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
		message: "What is slack channel for the team who will support this component?",
		default: "#ft-origami"
	},
	status: {
		name: "status",
		type: "list",
		message: "What is the status of this component? https://origami.ft.com/spec/v1/manifest/#supportstatus",
		default: "experimental",
		choices: [
			"active",
			"experimental",
			"maintained"
		]
	},
	category: {
		name: "category",
		type: "list",
		message: "What category does this component fall under? https://origami.ft.com/spec/v1/manifest/#origamicategory",
		default: "components",
		choices: [
			"components",
			"utilities",
			"primitives",
			"layouts"
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
		message: "Will your component use JavaScript? (this will add some helpful Origami JavaScript boilerplate)",
		default: true
	},
	scss: {
		name: "scss",
		type: "confirm",
		message: "Will your component use Sass? (this will add some helpful Origami Sass boilerplate)",
		default: true
	},
	confirm: {
		name: "acceptable",
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
