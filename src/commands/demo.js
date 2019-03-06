const {Command, flags} = require('@oclif/command');
const path = require('path');
const fs = require('fs-extra');

const BuildDemos = require('../tasks/build-demos');

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
    let demos;

    try {
      demos = await JSON.parse(file);
    } catch (error) {
      // handle error
    }

    new BuildDemos(demos);
  //   this.data.defaults = demos.demosDefaults;

  //   let browserFeatures = []
  //   if (demos.browserFeatures) {
  //     this.data.defaults.browserFeatures = browserFeatures.concat(demos.browserFeatures.required || []).concat(demos.browserFeatures.optional || []);
  //   }
  //   this.data.defaults.browserFeatures.push('default');
    

  //   if (!this.data.defaults.variants) {
  //     //throw Error, variants are required, there is probably a better way to do this.
  //   }
  //   this.data.variants = this.data.defaults.variants;

  //   this.data.demos = demos.demos;


  //   this.data.demos.forEach(demo => this.generateHTML(demo))
  // }

  // async generateHTML (demo) {
  //   // let templatePath = path.join(this.cwd, this.data.defaults.template);
  //   let baseFile = require(path.join(__dirname, this.templatePath, 'base.js'));
  //   let destination  = path.join('demos', 'local');
  //   let demoName = demo.name + '.html';
  //   fs.outputFile(path.join(this.cwd, destination, demoName), baseFile(demo, this.data.defaults), 'utf-8');
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
