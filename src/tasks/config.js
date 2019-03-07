class Config {
  constructor (demos) {
    this.config = demos;
    this.demos = [];
    this.shared = {};
    this.init();
  }

  init() {
    this.getTemplate();
    this.setVariants();
    this.setBrowserFeatures();
    this.setDemos();

    return {
      demos: this.demo,
      shared: this.shared
    };
  }
  
  getTemplate () {
    this.shared.template = this.config.demosDefaults.template;
  };

  setVariants () {
    if (!this.config.demosDefaults.variants) {
      throw new Error("The 'demosDefaults.variants' property is required");
    }
    
    this.shared.variants = this.config.demosDefaults.variants;
  }

  setBrowserFeatures () {
    this.shared.browserFeatures = [];
    if (this.config.browserFeatures) {
      this.shared.browserFeatures = []
        .concat(this.config.browserFeatures.required || [])
        .concat(this.config.browserFeatures.optional || [])
    }

    this.shared.browserFeatures.push('default');
  }

  setDemos () {
    if (!Array.isArray(this.config.demos) || this.config.demos.length === 0) {
      throw new Error ('No demos found')
    }

    this.demos = this.config.demos;
  }
}

module.exports = Config;