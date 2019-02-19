jest.mock('inquirer');
const { inquirer, expectPrompts } = require('inquirer');
const ask = require('../../src/prompts/component-name');


describe('Prompt: Component Name', () => {
	it('should accept a correctly formatted name', async () => {
		expectPrompts([
			{
				input: {
					original: 'o-test-name'
				}
			}
		])

		const name = await ask(inquirer);
		expect(name).toEqual({
			name: 'o-test-name'
		})
	});

	describe('should offer a correction for an incorrectly formatted name', () => {
		it('with spaces', async () => {
			expectPrompts([
				{
					input: {
						original: 'o test name'
					}
				},
				{
					message: 'Did you mean o-test-name?',
					confirm: true
				}
			])

			const name = await ask(inquirer);
			expect(name).toEqual({
				name: 'o-test-name'
			})
		})
	});

	it('with camel case', async () => {
		expectPrompts([
			{
				input: {
					original: 'oTestName'
				}
			},
			{
				message: 'Did you mean o-test-name?',
				confirm: true
			}
		])

		const name = await ask(inquirer);
		expect(name).toEqual({
			name: 'o-test-name'
		})
	})

	it('with non-hyphen characters', async () => {
		expectPrompts([
			{
				input: {
					original: 'o_test_name'
				}
			},
			{
				message: 'Did you mean o-test-name?',
				confirm: true
			}
		])

		const name = await ask(inquirer);
		expect(name).toEqual({
			name: 'o-test-name'
		})
	})

	it('with excess hyphens', async () => {
		expectPrompts([
			{
				input: {
					original: 'o--test-name'
				}
			},
			{
				message: 'Did you mean o-test-name?',
				confirm: true
			}
		])

		const name = await ask(inquirer);
		expect(name).toEqual({
			name: 'o-test-name'
		})
	})

	// it('allows the user to fully edit name', async () => {
	// 	expectPrompts([
	// 		{
	// 			input: {
	// 				original: 'o--test-name'
	// 			}
	// 		},
	// 		{
	// 			message: 'Did you mean o-test-name?',
	// 			confirm: false
	// 		},
	// 		{
	// 			input: {
	// 				original: 'o-new-name'
	// 			}
	// 		}
	// 	])
	//
	// 	const name = await ask(inquirer);
	//
	// 	expect(name).toEqual({
	// 		name: 'o-test-component'
	// 	})
	// })
})
