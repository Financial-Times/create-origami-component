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
    this.setDependencies();
    this.setBrowserFeatures();
    this.setDemos();

    return {
      demos: this.demo,
      shared: this.shared
    };
  }
  
  getTemplate () {
    this.shared.templatePath = this.config.demosDefaults.template;
  };

  setVariants () {
    if (!this.config.demosDefaults.variants) {
      throw new Error("The 'demosDefaults.variants' property is required");
    }
    
    this.shared.variants = this.config.demosDefaults.variants;
  }

  setDependencies () {
    // TODO: Not sure how we'll approach this (other than changing the design?), 
    // but we can't have two brands going at once—the form will end up reflecting the brand that the user has chosen to edit ?
    let sandboxDependencies = ['o-forms@styles', 'o-buttons']; //TODO: change @styles when o-forms 7 is released
    let dependencies = sandboxDependencies.concat(this.config.demosDefaults.dependencies);
    this.shared.dependencies = [... new Set(dependencies)];
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