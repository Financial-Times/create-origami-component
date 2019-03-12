const path = require('path');

module.exports = (config) => {
return `
import React from "react";
import ReactDOM from "react-dom";

import DemoSandbox from '${path.relative('demos/local', __dirname + '/sandbox/demo-sandbox.js')}'; //TODO: change relative path
import OMessage from '../../${config.shared.templatePath}'; // TODO: decide where to get component name later to set here and in render

const demoData = ${JSON.stringify(config.demo.data)};
const variantData = ${JSON.stringify(config.shared.variants)};
const rootElement = document.getElementById('root');
ReactDOM.render(<DemoSandbox demo={demoData} variants={variantData} component={OMessage} />, rootElement);
`
};