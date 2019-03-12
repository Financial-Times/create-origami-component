const {Command, flags} = require('@oclif/command');
const path = require('path');
const fs = require('fs-extra');

const Config = require('../tasks/config');

class Demo extends Command {
  constructor(argv, config) {
    super(argv, config);
    this.data = {};
    this.cwd = process.cwd();
    this.flags = this.parse(Demo).flags;
  }

  async run () {
    console.log('Building demos...')

    await this.generateSCSSRc();
    await this.readData();
    await this.bundlerSetup();
  }

  async generateSCSSRc () {
    await fs.writeFile(path.join(this.cwd, '.sassrc'), JSON.stringify({
      "includePaths": [
        path.join(process.cwd(), 'bower_components')
      ]
    }))
  }

  async readData () {
    const configPath = path.join(this.cwd, 'origami.json');
    let file = await fs.readFile(configPath, 'utf-8');
    let origamiJson;

    try {
      origamiJson = JSON.parse(file);
    } catch (error) {
      // TODO: handle error
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

  async bundlerSetup () {
    const entry = path.join(this.cwd, 'demos/tmp/*.html');
    const Bundler = require('parcel-bundler');
    const bundle = new Bundler(entry, {
      outDir: 'demos/local',
      cache: false,
      sourceMaps: false, 
      minify: false
    });

    if (this.flags.serve) {
      await bundle.serve(8999);
    } else {
      await bundle.bundle()
    }

    try {
      await fs.remove(path.join(this.cwd, '.sassrc'));
      await fs.remove(path.join(this.cwd, 'demos/tmp/'));
    } catch (err) {
       // TODO: handle error
    }
  }
}

// Demo.description = `Describe the command here
// ...
// Extra documentation goes here
// `

Demo.flags = {
  serve: flags.boolean({char: 's', description: 'run local development server (port: 8999)'}),
}

module.exports = Demo
