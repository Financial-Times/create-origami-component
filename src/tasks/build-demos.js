class BuildDemos {
  constructor (config) {
    this.config = config;
    this.data = {};
    this.init();
  }

  init() {
    this.getTemplate();
    this.setVariants();
    this.setBrowserFeatures();
    this.setDemos();
  }
  
  getTemplate () {
    this.data.template = this.config.demosDefaults.template;
  };

  setVariants () {
    if (!this.config.demosDefaults.variants) {
      throw new Error("The 'demosDefaults.variants' property is required");
    }
    
    this.data.variants = this.config.demosDefaults.variants;
  }

  setBrowserFeatures () {
    this.data.browserFeatures = [];
    if (this.config.browserFeatures) {
      this.data.browserFeatures = []
        .concat(this.config.browserFeatures.required || [])
        .concat(this.config.browserFeatures.optional || [])
    }

    this.data.browserFeatures.push('default');
  }

  setDemos () {
    if (!Array.isArray(this.config.demos) || this.config.demos.length === 0) {
      throw new Error ('No demos found')
    }

    this.data.demos = this.config.demos;
  }
}

module.exports = BuildDemos;