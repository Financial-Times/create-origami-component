const Config = require('../../../src/tasks/config');

describe('Config', () => {
  let mockData;

  beforeEach(() => {
    mockData = {
      demosDefaults: {
        template: 'path/to/template',
        dependencies: ['dep-1'],
        variants: [],
      },
      demos: [{}]
    }
  });

  describe('.getTemplate', () => {
    test('sets default demo template path', () => {
      let config = new Config(mockData);
      expect(config.shared.templatePath).toBe('path/to/template')
    });
  });

  describe('.setVariants', () => {
    test('sets component variant rules ', () => {
      let config = new Config(mockData);
      expect(config.shared.variants).toEqual([])
    });

    test('sets component variants to null if rules are not defined', () => {
      mockData.demosDefaults.variants = undefined;
      let config = new Config(mockData);
      expect(config.shared.variants).toBeNull()
    });
  });

  describe('.setDependencies', () => {
    test('sets component and sanbox dependencies ', () => {
      let config = new Config(mockData);
      expect(config.shared.dependencies).toEqual(['dep-1'])
    });
  });
  
  describe('.setBrowserFeatures', () => {
      test("sets ['default'] browser features if none present", () => {
        let config = new Config(mockData);
        expect(config.shared.browserFeatures).toEqual(['default'])
      });

      test("sets requestsed (required and options) browser features", () => {
        mockData.browserFeatures = {
          required: ['feature-1'],
          optional: ['feature-2']
        }
        
        let config = new Config(mockData);
        expect(config.shared.browserFeatures).toEqual(['feature-1', 'feature-2', 'default'])
      });
  });

  describe('.setDemos', () => {
    test('sets demos to config', () => {
      let config = new Config(mockData);
      expect(config.demos).toEqual([{}])
    });

    test('throws an error if variant rules are not defined', () => {
      mockData.demos = null;
      expect(() => new Config(mockData)).toThrowError("No demos found")
    });
  })
});