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

    await fs.writeFile(path.join(this.cwd, '.sassrc'), JSON.stringify({
      "includePaths": [
        path.join(process.cwd(), 'bower_components')
      ]
    }))



    await this.readData();
    await this.serve();
  }

  async readData () {
    const configPath = path.join(this.cwd, 'origami.json');
    let file = await fs.readFile(configPath, 'utf-8');
    let origamiJson;

    try {
      origamiJson = JSON.parse(file);
    } catch (error) {
      // handle error
    }

    const { demos, shared } = new Config(origamiJson);

    await Promise.all(demos.map(demo => {
      let config = {
        demo,
        shared
      };

      return this.generateHTML(config)
      })
    )
  }

  async generateHTML (config) {
    let baseFile = require(path.join(__dirname, '../../templates/demo/base-html.js'));
    let destination  = path.join('demos', 'tmp');
    let demoName = config.demo.name + '.html';
    await fs.outputFile(path.join(this.cwd, destination, demoName), baseFile(config, 'utf-8'));

    return this.generateReactTemplate(config);
  }

  async generateReactTemplate (config) {
    let mainJS = require(path.join(__dirname, '../../templates/demo/index.js'))
    await fs.outputFile(path.join(this.cwd, 'demos/tmp', config.demo.name + '.js'), mainJS(config, 'utf-8'));
  }

  async serve () {
    // const entry = path.join(this.cwd, 'demos/tmp/*.html'); // only needs to be called once,  
    const entry = path.join(this.cwd, 'demos/tmp/alert-error.html'); // to test
    const Bundler = require('parcel-bundler');
    const bundle = new Bundler(entry, {
      outDir: 'demos/local',
      cache: false,
      sourceMaps: false, 
      minify: false
    });

    await bundle.serve(); //temporarily to see the result of the single file
  }

  // cleanup .sassrc
  // cleaup demos/tmp/
}

// Demo.description = `Describe the command here
// ...
// Extra documentation goes here
// `

// Demo.flags = {
//   name: flags.string({char: 'n', description: 'name to print'}),
// }

module.exports = Demo
