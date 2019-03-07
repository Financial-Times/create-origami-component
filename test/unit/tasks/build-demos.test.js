const BuildDemos = require('../../../src/tasks/build-demos');

describe('BuildDemos', () => {
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
      let build = new BuildDemos(mockData);
      expect(build.data.template).toBe('path/to/template')
    });
  });

  describe('.setVariants', () => {
    test('sets component variant rules ', () => {
      let build = new BuildDemos(mockData);
      expect(build.data.variants).toEqual([])
    });

    test('throws an error if variant rules are not defined', () => {
      mockData.demosDefaults.variants = null;
      expect(() => new BuildDemos(mockData)).toThrowError("The 'demosDefaults.variants' property is required")
    });
  });
  
  describe('.setBrowserFeatures', () => {
      test("sets ['default'] browser features if none present", () => {
        let build = new BuildDemos(mockData);
        expect(build.data.browserFeatures).toEqual(['default'])
      });

      test("sets ['default'] browser features if none present", () => {
        mockData.browserFeatures= {
          required: ['feature-1'],
          optional: ['feature-2']
        }
        
        let build = new BuildDemos(mockData);
        expect(build.data.browserFeatures).toEqual(['feature-1', 'feature-2', 'default'])
      });
  });

  describe('.setDemos', () => {
    test('sets demos to build', () => {
      let build = new BuildDemos(mockData);
      expect(build.data.demos).toEqual([{}])
    });

    test('throws an error if variant rules are not defined', () => {
      mockData.demos = null;
      expect(() => new BuildDemos(mockData)).toThrowError("No demos found")
    });
  })
});