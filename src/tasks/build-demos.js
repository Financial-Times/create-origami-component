class BuildDemos {
  constructor (config) {
    this.config = config;
    this.data = {};
    this.getTemplate();
  }
  
  getTemplate () {
    this.data.template = this.config.demosDefaults.template;
  };

  // setVariants () {

  // }

  // setBrowserFeatures () {
  //   let features = [];
  //   if (this.config.browserFeatures) {
  //     this.data.defaults.browserFeatures = features
  //       .concat(this.config.browserFeatures.required || [])
  //       .concat(this.config.browserFeatures.optional || [])
  //   }

  //   this.data.defaults.browserFeatures.push('default')
  // }
}

module.exports = BuildDemos;