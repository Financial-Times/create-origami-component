class BuildDemos {
  constructor (config) {
    this.config = config;
    this.data = {};
    this.init();
  }

  init() {
    this.getTemplate();
    this.setVariants();
  }
  
  getTemplate () {
    this.data.template = this.config.demosDefaults.template;
  };

  setVariants () {
    if (!this.config.demosDefaults.variants) {
      throw new Error("The 'demosDefaults.variants' property is required");
    }

    this.data.varianta = this.config.demosDefaults.variants;
  }

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