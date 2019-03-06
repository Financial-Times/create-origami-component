module.exports = answers => {
	return `<div>
	<h1>Basic Demo</h1>
	<div class="${answers.name}"${answers.javascript ? ` data-o-component="${answers.name}"` : ''}></div>
</div>
<div>
	<h1>Basic Demo:hover</h1>
	<div class="${answers.name}"${answers.javascript ? ` data-o-component="${answers.name}"` : ''}></div>
</div>
`;
};
