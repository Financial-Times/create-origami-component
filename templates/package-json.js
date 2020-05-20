module.exports = (answers) => {
	return `{
	"private": true,
	"name": "${answers.name}",
	"devDependencies": {
		"eslint-config-origami-component": "^2.0.1",
		"origami-ci-tools": "^2.0.0",
		"stylelint-config-origami-component": "^1.0.2"
	}
}`;
};
