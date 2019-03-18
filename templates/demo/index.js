const path = require('path');
const stringCasing = require('../boilerplate/helpers/string-casing.js');

module.exports = (config) => {
  const titleCasedName = stringCasing(config.shared.name).titleCase;
  return `
import React from "react";
import ReactDOM from "react-dom";

import App from '${path.relative('demos/local', __dirname + '/sandbox/app.js')}'; //TODO: change relative path
import ${titleCasedName} from '../../${config.shared.templatePath}'; // TODO: decide where to get component name later to set here and in render

const rootElement = document.getElementById('root');
ReactDOM.render(<App config={${JSON.stringify(config)}} component={${titleCasedName}} />, rootElement);
`
};