jest.mock('inquirer')
const { inquirer, expectPrompts } = require('inquirer');
const Boilerplate = require('../../src/prompts/boilerplate');

describe('Prompt: Component Name', () => {

	it('should accept a correctly formatted name', async () => {
		console.log(inquirer);
		// expectPrompts([
		// 	{
		// 		input: {
		// 			original: 'o-test-name'
		// 		}
		// 	}
		// ])

		// const name = await boil.getName(inquirer);
		// expect(name).toEqual({
		// 	name: 'o-test-name'
		// })

		expect(new Boilerplate().init()).toMatchSnapshot();
	});
});
