const Config = require('../../../src/tasks/config');

describe('Config', () => {
  let mockData;

  beforeEach(() => {
    mockData = {
      demosDefaults: {
        template: 'path/to/template',
        variants: [],
      },
      demos: [{}]
    }
  });

  describe('.getTemplate', () => {
    test('sets default demo template path', () => {
      let config = new Config(mockData);
      expect(config.shared.template).toBe('path/to/template')
    });
  });

  describe('.setVariants', () => {
    test('sets component variant rules ', () => {
      let config = new Config(mockData);
      expect(config.shared.variants).toEqual([])
    });

    test('throws an error if variant rules are not defined', () => {
      mockData.demosDefaults.variants = null;
      expect(() => new Config(mockData)).toThrowError("The 'demosDefaults.variants' property is required")
    });
  });
  
  describe('.setBrowserFeatures', () => {
      test("sets ['default'] browser features if none present", () => {
        let config = new Config(mockData);
        expect(config.shared.browserFeatures).toEqual(['default'])
      });

      test("sets ['default'] browser features if none present", () => {
        mockData.browserFeatures= {
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