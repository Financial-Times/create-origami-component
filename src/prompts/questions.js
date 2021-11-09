module.exports = {
	name: {
		name: "name",
		type: "input",
		message: "component name (required)",
		validate: value => {
			if (!value) {
				return "please enter a name for your component\nhttps://origami.ft.com/docs/components/code/#naming-conventions"
			}
			return true
		}
	},
	sanityCheck: (name) => {
		return {
			name: "sanity",
			type: "confirm",
			message: `is "${name}" okay?`
		}
	},
	path: (name) => {
		return {
			name: "path",
			type: "list",
			message: "Should we create this component in the current directory, or a subdirectory?",
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
		message: "description (required)",
		validate: value => {
			if (!value) {
				return "please enter a description for your component\nhttps://origami.ft.com/docs/manifests/origami-json/#description"
			}
			return true
		}
	},
	keywords: {
		name: "keywords",
		type: "input",
		message: "keywords (to help discoverability in the registry)",
		filter: value => {
			// splits the string by ',' and ' ', filters out any rogue spaces & removes duplicate values
			return [... new Set(value.split(/\s*[\s,]\s*/).filter(Boolean))];
		}
	},
	email: {
		name: "email",
		type: "input",
		message: "support team email (required)",
		default: "origami.support@ft.com",
		validate: value => {
			if (!value.includes("@")) {
				return "please enter a valid email address for the team that will support this component";
			}
			return true;
		}
	},
	slack: {
		name: "slack",
		type: "input",
		message: "support team slack channel (required)",
		default: "#origami-support"
	},
	githubTeam: {
		name: "githubTeam",
		type: "input",
		message: "support Github team (required)",
		default: "origami-core"
	},
	status: {
		name: "status",
		type: "list",
		message: "support status (https://origami.ft.com/docs/manifests/origami-json/#supportstatus)",
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
		message: "supported brands (https://origami.ft.com/docs/components/customisation/#brands)",
		default: ["core"],
		choices: [
			"core",
			"internal",
			"whitelabel"
		]
	},
	javascript: {
		name: "javascript",
		type: "confirm",
		message: "will your component use JavaScript? (this will add some helpful Origami JavaScript boilerplate)",
		default: true
	},
	scss: {
		name: "scss",
		type: "confirm",
		message: "will your component use Sass? (this will add some helpful Origami Sass boilerplate)",
		default: true
	},
	confirm: {
		name: "acceptable",
		type: "confirm",
		message: "is this right?"
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
