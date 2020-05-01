module.exports = answers => {
	return `<div class="${answers.name}"${answers.javascript ? `data-o-component="${answers.name}"` : ''}></div>\n`;
};
