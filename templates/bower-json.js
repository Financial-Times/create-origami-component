module.exports = (answers) => {
	//TODO: conditional commas need to be handled here somehow
	return `{
  "name": "${answers.name}",
  "description": "${answers.description}",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "build"
  ],
  "main": [
    ${answers.scss ? `"main.scss"` : ''}${answers.scss && answers.javascript ? "," : ''}
    ${answers.javascript ? `"main.js"` : ''}
  ]
}`;
};
