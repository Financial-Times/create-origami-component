const path = require('path');

module.exports = (config) => {
  return `
import React from "react";
import ReactDOM from "react-dom";

import DemoSandbox from '${path.relative('demos/local', __dirname, './sandbox/demo-sandbox.js')}'; //TODO: change relative path
import OMessage from '../../${config.shared.template}'; // TODO: decide where to get component name later to set here and in render
// import '{componentStylePath}'; // TODO: import here or in component react template?

const demoData = ${JSON.stringify(config)};
const rootElement = document.getElementById('root');
ReactDOM.render(<DemoSandbox demo={demoData} component={OMessage} />, rootElement);
`
};