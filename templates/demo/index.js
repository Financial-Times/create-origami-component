const path = require('path');

module.exports = (config) => {
  return `
import React from "react";
import ReactDOM from "react-dom";

import App from '${path.relative('demos/local', __dirname + '/sandbox/app.js')}'; //TODO: change relative path
import ${config.shared.name.titleCase} from '../../${config.shared.templatePath}';

import './${config.demo.name}.scss';

const rootElement = document.getElementById('root');
ReactDOM.render(<App config={${JSON.stringify(config)}} component={${config.shared.name.titleCase}} />, rootElement);
`
};