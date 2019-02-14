module.exports = answers => {
	const name = {
		original: answers.name,
		camelCase: answers.name.replace(/\-+(.)/g, (match, chr) => chr.toUpperCase())
	}

	return `import ${name.camelCase} from './src/js/${name.original}';
const constructAll = function () {
	${name.camelCase}.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};
document.addEventListener('o.DOMContentLoaded', constructAll);
export default ${name.camelCase};`;
};
