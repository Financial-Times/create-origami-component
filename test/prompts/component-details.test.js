jest.mock('inquirer');
const { inquirer, expectPrompts } = require('inquirer');
const ask = require('../../src/prompts/component-details');

describe('Prompt: Component Details', () => {
	let nameObj = {
		name: 'o-test-name'
	}

	it('builds an answer object with default reponses', async () => {
		expectPrompts([
			{ useDefault: true }, // path
			{ input: 'Component description' },
			{ input: '' }, // keywords
			{ useDefault: true }, // email
			{ useDefault: true }, // slack
			{ useDefault: true }, // status
			{ useDefault: true }, // brands
			{ useDefault: true }, // javascript
			{ useDefault: true }, // scss
			{ useDefault: true }, // demos
		])

		const config = await ask(nameObj, inquirer);

		expect(config).toEqual({
			path: './',
			description: 'Component description',
			keywords: [],
			email: 'origami.support@ft.com',
			slack: '#ft-origami',
			status: 'experimental',
			brands: ['master'],
			javascript: true,
			scss: true,
			demos: true
		})
	});

	it('build a configured answer object (removes repeated words from keyword array)', async () => {
		expectPrompts([
			{
				choices:  ['./', './o-test-name'],
				choose: 1
			},
			{ input: 'Component description' },
			{ input: 'key, words, key' },
			{ input: 'an@email.com' },
			{ input: '#slack-channel' },
			{
				choices: ['active', 'experimental', 'maintained'],
			 	choose: 0
			},
			{
				choices: ['master', 'internal', 'whitelabel'],
			 	check: [0, 1, 2]
			},
			{ confirm: false }, // javascript
			{ confirm: true }, // scss
			{ confirm: true } // demos
		])

		const config = await ask(nameObj, inquirer);

		expect(config).toEqual({
			path: './o-test-name',
			description: 'Component description',
			keywords: ['key', 'words'],
			email: 'an@email.com',
			slack: '#slack-channel',
			status: 'active',
			brands: ['master', 'internal', 'whitelabel'],
			javascript: false,
			scss: true,
			demos: true
		})
	});
})
