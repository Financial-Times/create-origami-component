module.exports = answers => {
	return `<div>
	<div class="${answers.name}"${answers.javascript ? `data-o-component="${answers.name}"` : ''}></div>
</div>`;
};
