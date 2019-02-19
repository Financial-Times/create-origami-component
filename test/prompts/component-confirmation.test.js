// jest.mock('inquirer');
// const { inquirer, expectPrompts } = require('inquirer');
// const ask = require('../../src/prompts/component-confirmation');
//
// describe('Prompt: Component Confirmation', () => {
// 	let answers = {
// 		name: 'o-test-name',
// 		path: './',
// 		description: 'Component description',
// 		keywords: [],
// 		email: 'origami.support@ft.com',
// 		slack: '#ft-origami',
// 		status: 'experimental',
// 		brands: ['master'],
// 		javascript: true,
// 		scss: true,
// 		demos: true
// 	}
//
// 	it('asks for confirmation on configured answers', async () => {
// 		expectPrompts([
// 			{ confirm: true }
// 		])
//
// 		const config = await ask(answers, inquirer);
//
// 		expect(config).toEqual(answers);
// 	});
//
// 	// it('allows a change in the configuration if confirmation is rejected', async () => {
// 	// 	expectPrompts([
// 	// 		{ confirm: false }
// 	// 		// { confirm: false },
// 	// 		// {
// 	// 		// 	message: 'What would you like to change?',
// 	// 		// 	choices: ['name', 'path', 'description', 'keywords', 'email', 'slack', 'status', 'brands', 'javascript', 'scss', 'demos'],
// 	// 		// 	choose: 2
// 	// 		// },{
// 	// 		// 	input: 'Different description'
// 	// 		// },
// 	// 		// { confirm: true }
// 	// 	])
// 	//
// 	//
// 	// 	const config = await ask(answers, inquirer);
// 	// 	expect(ask).toHaveBeenCalledTimes(2)
// 	//
// 	// 	// expect(config).toEqual(answers);
// 	// });
// })
