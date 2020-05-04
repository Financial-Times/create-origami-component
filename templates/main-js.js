const { withoutPrefix, camelCase} = require('./helpers/name-formats.js');

module.exports = answers => {
	const name = answers.name;

	return `import ${camelCase(name)} from './src/js/${withoutPrefix(name)}';
const constructAll = function () {
	${camelCase(name)}.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};
document.addEventListener('o.DOMContentLoaded', constructAll);
export default ${camelCase(name)};`;
};
