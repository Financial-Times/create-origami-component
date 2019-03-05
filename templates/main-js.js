const stringCasing = require('./helpers/string-casing.js');

module.exports = answers => {
	const name = stringCasing(answers.name);

	return `import ${name.camelCase} from './src/js/${name.original}';
const constructAll = function () {
	${name.camelCase}.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};
document.addEventListener('o.DOMContentLoaded', constructAll);
export default ${name.camelCase};`;
};
