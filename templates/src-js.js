const { withoutPrefix, camelCase, titleCase} = require('./helpers/name-formats.js');

module.exports = answers => {
	const name = answers.name;
	const className = titleCase(withoutPrefix(name));
	const elementName = `${camelCase(withoutPrefix(name))}El`;

	return `class ${className} {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [${elementName}] - The component element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	constructor (${elementName}, opts) {
		this.${elementName} = ${elementName};
		this.options = Object.assign({}, {
		}, opts || ${className}.getDataAttributes(${elementName}));
	}
	/**
	 * Get the data attributes from the ${className}Element. If the element is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} ${elementName} - The component element in the DOM
	 */
	static getDataAttributes (${elementName}) {
		if (!(${elementName} instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(${elementName}.dataset).reduce((options, key) => {
			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}
			// Build a concise key and get the option value
			const shortKey = key.replace(/^${camelCase(name)}(\\w)(\\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = ${elementName}.dataset[key];
			// Try parsing the value as JSON, otherwise just set it as a string
			try {
				options[shortKey] = JSON.parse(value.replace(/\'/g, '"'));
			} catch (error) {
				options[shortKey] = value;
			}
			return options;
		}, {});
	}
	/**
	 * Initialise ${name} component/s.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the component
	 * @returns {${className}|${className}[]} The newly constructed ${className} components
	 */
	static init (rootElement, options) {
		if (!rootElement) {
			rootElement = document.body;
		}
		if (!(rootElement instanceof HTMLElement)) {
			rootElement = document.querySelector(rootElement);
		}
		if (rootElement instanceof HTMLElement && rootElement.matches('[data-o-component=${name}]')) {
			return new ${className}(rootElement, options);
		}
		return Array.from(rootElement.querySelectorAll('[data-o-component="${name}"]'), rootEl => new ${className}(rootEl, options));
	}
}

export default ${className};`;
}
