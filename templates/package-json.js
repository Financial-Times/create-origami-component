module.exports = (answers) => {
	return `{
	"private": true,
	"name": "${answers.name}",
	"devDependencies": {
		"eslint-config-origami-component": "^2.0.0",
		"origami-ci-tools": "^2.0.0"
	}
}`;
};
