const {Command, flags} = require('@oclif/command');
const path = require('path');
const fs = require('fs-extra');

const Config = require('../tasks/config');

class Demo extends Command {
  constructor(argv, config) {
    super(argv, config);
    this.data = {};
    this.cwd = process.cwd();
    this.templatePath = '../../templates/demo/'
  }

  async run () {
    console.log('Building demos...')
    this.readData();
  }

  async readData () {
    const configPath = path.join(this.cwd, 'origami.json');
    let file = await fs.readFile(configPath, 'utf-8')
    let origamiJson;

    try {
      origamiJson = await JSON.parse(file);
    } catch (error) {
      // handle error
    }

    const { demos, shared } = await new Config(origamiJson);

    demos.forEach(demo => this.generateHTML(demo, shared));
  }

  async generateHTML (demo, shared) {
    // let templatePath = path.join(this.cwd, this.data.defaults.template);
    let baseFile = require(path.join(__dirname, this.templatePath, 'base.js'));
    let destination  = path.join('demos', 'local');
    let demoName = demo.name + '.html';
    fs.outputFile(path.join(this.cwd, destination, demoName), baseFile(demo, shared), 'utf-8');
  }
}

// Demo.description = `Describe the command here
// ...
// Extra documentation goes here
// `

// Demo.flags = {
//   name: flags.string({char: 'n', description: 'name to print'}),
// }

module.exports = Demo
