const inquirer = require('inquirer');
const Boilerplate = require('../../../src/prompts/boilerplate');
jest.mock('inquirer')

describe('Boilerplate', () => {
	let boilerplate;
	let answers;
	let response;

	beforeAll(() => {
		boilerplate = new Boilerplate();
		boilerplate.prompt = jest.fn();
	});

	afterEach(() => {
		boilerplate.prompt.mockClear();
	})

	describe('Prompt: Name', () => {
		test('should accept a correctly formatted name', async () => {
			boilerplate.prompt
				.mockReturnValueOnce(Promise.resolve({ name: 'o-test-name' }))

			await boilerplate.getName();
			answers = await boilerplate.answers;
			expect(answers.name).toEqual('o-test-name');
		});

		describe('should sanitise and check a name that has been incorrectly formatted', () => {
			test('with spaces', async () => {
				boilerplate.prompt
					.mockReturnValueOnce(Promise.resolve({ name: 'o test name' }))
					.mockReturnValueOnce(Promise.resolve({ sanity: true }));

				await boilerplate.getName();
				answers = await boilerplate.answers;
				expect(answers.name).toEqual('o-test-name');
			});

			test('with camel case', async () => {
				boilerplate.prompt
					.mockReturnValueOnce(Promise.resolve({ name: 'oTestName' }))
					.mockReturnValueOnce(Promise.resolve({ sanity: true }));

				await boilerplate.getName();
				answers = await boilerplate.answers;
				expect(answers.name).toEqual('o-test-name');
			});

			test('with non-hyphen characters', async () => {
				boilerplate.prompt
					.mockReturnValueOnce(Promise.resolve({ name: 'o_test_name' }))
					.mockReturnValueOnce(Promise.resolve({ sanity: true }));

				await boilerplate.getName();
				answers = await boilerplate.answers;
				expect(answers.name).toEqual('o-test-name');
			});

			test('with excess hyphens', async () => {
				boilerplate.prompt
					.mockReturnValueOnce(Promise.resolve({ name: '-o-test--name-' }))
					.mockReturnValueOnce(Promise.resolve({ sanity: true }));

				await boilerplate.getName();
				answers = await boilerplate.answers;
				expect(answers.name).toEqual('o-test-name');
			});

			test('if check is not approved, asks name again', async () => {
				boilerplate.prompt
				.mockReturnValueOnce(Promise.resolve({ name: 'o test-name' }))
				.mockReturnValueOnce(Promise.resolve({ sanity: false }))
				.mockReturnValueOnce(Promise.resolve({ name: 'o-test-component' }))

				await boilerplate.getName();
				answers = await boilerplate.answers;
				expect(answers.name).toEqual('o-test-component');
			});
		});
	});

	describe('Prompt: Path', () => {
		test('set given name to path', async () => {
				boilerplate.prompt
					.mockReturnValueOnce(Promise.resolve({ name: 'o-test-name' }))
					.mockReturnValueOnce(Promise.resolve({ path: './o-test-name' }))

			await boilerplate.getName();
			await boilerplate.getPath();
			answers = await boilerplate.answers;
			expect(answers.path).toEqual('./o-test-name');
		});
	});

	describe('Prompt: Details', () => {
		test('save defaults to answers object', async () => {
			response = {
				description: 'description',
				keywords: [],
				email: 'origami.support@ft.com',
				slack: '#ft-origami',
				status: 'experimental',
				brands: ['master'],
				javascript: true,
				scss: true,
				demos: true
			}

			boilerplate.prompt
				.mockReturnValueOnce(Promise.resolve({ name: 'o-test-name' }))
				.mockReturnValueOnce(Promise.resolve({ path: './' }))
				.mockReturnValueOnce(Promise.resolve(response))

			await boilerplate.getName();
			await boilerplate.getPath();
			await boilerplate.getDetails();
			answers = await boilerplate.answers;

			expect(answers).toEqual(Object.assign({name: 'o-test-name', path: './'}, response));
		});
	});

	describe('Prompt: Confirmation', () => {
		beforeEach(() => {
			response = {
				description: 'description',
				keywords: [],
				email: 'origami.support@ft.com',
				slack: '#ft-origami',
				status: 'experimental',
				brands: ['master'],
				javascript: true,
				scss: true,
				demos: true
			}

			boilerplate.prompt
				.mockReturnValueOnce(Promise.resolve({ name: 'o-test-name' }))
				.mockReturnValueOnce(Promise.resolve({ path: './o-test-name' }))
				.mockReturnValueOnce(Promise.resolve(response))
		});

		test('Outputs answers when confirmation true', async () => {
			boilerplate.prompt
				.mockReturnValueOnce(Promise.resolve({ acceptable: true }))

				let component = await boilerplate.init();

				expect(component).toEqual((Object.assign({name: 'o-test-name', path: './o-test-name'}, response)));
		});

		describe('Offers to change answers when confirmation false', () => {
			test('and changes name + path', async () => {
				boilerplate.prompt
					.mockReturnValueOnce(Promise.resolve({ acceptable: false }))
					.mockReturnValueOnce(Promise.resolve({ change: 'name' }))
					.mockReturnValueOnce(Promise.resolve({ name: 'new-name' }))
					.mockReturnValueOnce(Promise.resolve({ acceptable: true }))

					let component = await boilerplate.init();

					expect(component).toEqual((Object.assign({name: 'new-name', path: './new-name'}, response)));
			});

			test('and changes other value', async () => {
				boilerplate.prompt
					.mockReturnValueOnce(Promise.resolve({ acceptable: false }))
					.mockReturnValueOnce(Promise.resolve({ change: 'javascript' }))
					.mockReturnValueOnce(Promise.resolve({ javascript: false }))
					.mockReturnValueOnce(Promise.resolve({ acceptable: true }))

				let component = await boilerplate.init();

				expect(component).toEqual((Object.assign({
					name: 'o-test-name',
					path: './o-test-name'
				}, response, { javascript: false })));
			});
		});
	});
});
