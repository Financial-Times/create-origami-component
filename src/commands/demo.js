const {Command, flags} = require('@oclif/command');
const path = require('path');
const fs = require('fs-extra');

const Config = require('../tasks/config');

class Demo extends Command {
  constructor(argv, config) {
    super(argv, config);
    this.data = {};
    this.cwd = process.cwd();
  }

  async run () {
    console.log('Building demos...')
    this.readData();
  }

  async readData () {
    const configPath = path.join(this.cwd, 'origami.json');
    let file = await fs.readFile(configPath, 'utf-8');
    let origamiJson;

    try {
      origamiJson = await JSON.parse(file);
    } catch (error) {
      // handle error
    }

    const { demos, shared } = new Config(origamiJson);

    demos.forEach(demo => {
      let config = {
        demo,
        shared
      };
      this.generateHTML(config)});
  }

  async generateHTML (config) {
    // let templatePath = path.join(this.cwd, this.data.defaults.template);
    let baseFile = require(path.join(__dirname, '../../templates/demo/base-html.js'));
    let destination  = path.join('demos', 'local');
    let demoName = config.demo.name + '.html';
    await fs.outputFile(path.join(this.cwd, destination, demoName), baseFile(config, 'utf-8'));

    this.generateReactTemplate(config);
  }

  async generateReactTemplate (config) {
    let templateFile = await fs.readFile(path.join(this.cwd, config.shared.template), 'utf-8');
    console.log(templateFile);
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
