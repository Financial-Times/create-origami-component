const { camelCase } = require('./helpers/name-formats.js');

module.exports = answers => {
	return `@import '../../main';

@include ${camelCase(answers.name)}();
`;
};
