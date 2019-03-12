// jest.mock('../../../src/tasks/build-demos');
const BuildDemos = require('../../../src/tasks/build-demos');
// let tmock = jest.fn();
// BuildDemos.mockImplementation(() =>{
//   return {getTemplate: tmock}
// });

test('its does stuff', () => {
  let what = new BuildDemos({
      demosDefaults: {
        template: 'path/to/template'
      }
    });
  // what.getTemplate();
  // expect(tmock).toHaveBeenCalled();

  expect(what.data.template).toBe('path/to/template')
});

// describe('Build Demos', () => {
//   let mockData;

//   beforeEach(() => {
//     mockData = {
//       demosDefaults: {
//         template: 'path/to/template'
//       }
//     }
//   });

// });