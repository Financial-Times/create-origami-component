const BuildDemos = require('../../../src/tasks/build-demos');

describe('BuildDemos', () => {
  let mockData;

  beforeEach(() => {
    mockData = {
      demosDefaults: {
        template: 'path/to/template',
        variants: []
      }
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
      expect(build.data.variants).toBe([])
    });

    test('throws an error if variant rules are not defined', () => {
      mockData.demosDefaults.variants = null;
      expect(() => new BuildDemos(mockData)).toThrowError("The 'demosDefaults.variants' property is required")
    });
  });
});