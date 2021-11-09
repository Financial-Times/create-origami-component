const fs = require('fs-extra');
const Build = require('../../../src/tasks/build');

describe('Build', () => {
	let mockDetails;
	let rootPath;
	describe('successfully writes a folder tree', () => {
		beforeAll(async () => {
			mockDetails = {
				name: 'test-name',
				path: './test-name',
				description: 'description',
				keywords: [],
				email: 'origami.support@ft.com',
				slack: '#ft-origami',
				status: 'experimental',
				brands: ['core'],
				javascript: true,
				scss: true,
				demos: true
			}

			rootPath = mockDetails.path;
			await (new Build(mockDetails).buildFolder());

		});

		afterAll(async () => {
			await fs.remove(rootPath)
		})

		test("with a root folder", async () => {
			let root = await fs.readdir(rootPath);
			expect(root).toMatchSnapshot();
		});

		test("with a '.github' folder", async () => {
			let github = await fs.readdir(`${rootPath}/.github`);
			expect(github).toMatchSnapshot();
		});

		test("with a '.gitignore'", async () => {
			let gitIgnore = await fs.access(`${rootPath}/.gitignore`);
			expect(gitIgnore).toMatchSnapshot();
		});

		test("with a 'package.json'", async () => {
			let packageJson = await fs.access(`${rootPath}/package.json`);
			expect(packageJson).toMatchSnapshot();
		});

		test("with an 'origami.json'", async () => {
			let origamiJson = await fs.access(`${rootPath}/origami.json`);
			expect(origamiJson).toMatchSnapshot();
		});

		test("with an 'README.md'", async () => {
			let readMe = await fs.access(`${rootPath}/README.md`);
			expect(readMe).toMatchSnapshot();
		});

		test("with a 'src/' folder", async () => {
			let src = await fs.readdir(`${rootPath}/src`);
			expect(src).toMatchSnapshot();
		});

		test("with a 'src/js' folder", async () => {
			let srcJS = await fs.readdir(`${rootPath}/src/js`);
			expect(srcJS).toMatchSnapshot();
		});

		test("with a 'src/js/component-name' file", async () => {
			let componentJS = await fs.access(`${rootPath}/src/js/${mockDetails.name}.js`);
			expect(componentJS).toMatchSnapshot();
		});

		test("with a 'src/scss' folder", async () => {
			let srcSCSS = await fs.readdir(`${rootPath}/src/scss`);
			expect(srcSCSS).toMatchSnapshot();
		});

		test("with a 'src/scss/_variables.scss' file", async () => {
			let componentSCSS = await fs.access(`${rootPath}/src/scss/_variables.scss`);
			expect(componentSCSS).toMatchSnapshot();
		});


		test("with a 'src/scss/_brand.scss' file", async () => {
			let componentSCSS = await fs.access(`${rootPath}/src/scss/_brand.scss`);
			expect(componentSCSS).toMatchSnapshot();
		});

		test("with a 'test' folder", async () => {
			let test = await fs.readdir(`${rootPath}/test`);
			expect(test).toMatchSnapshot();
		});

		test("with a 'test/js' folder", async () => {
			let testJS = await fs.readdir(`${rootPath}/test/js`);
			expect(testJS).toMatchSnapshot();
		});

		test("with a 'test/js/component-name' file", async () => {
			let testJSFile = await fs.access(`${rootPath}/test/js/${mockDetails.name}.test.js`);
			expect(testJSFile).toMatchSnapshot();
		});

		test("with a 'test/js/helpers' folder", async () => {
			let testJSHelpers = await fs.readdir(`${rootPath}/test/js/helpers`);
			expect(testJSHelpers).toMatchSnapshot();
		});

		test("with a 'test/js/helpers/fixtures' file", async () => {
			let testJSFixtures = await fs.access(`${rootPath}/test/js/helpers/fixtures.js`);
			expect(testJSFixtures).toMatchSnapshot();
		});

		test("with a 'test/scss' folder", async () => {
			let testSCSS = await fs.readdir(`${rootPath}/test/scss/`);
			expect(testSCSS).toMatchSnapshot();
		});

		test("with a 'test/scss/main' file", async () => {
			let testSCSSMain = await fs.access(`${rootPath}/test/scss/_main.test.scss`);
			expect(testSCSSMain).toMatchSnapshot();
		});

		test("with a 'test/scss/index' file", async () => {
			let testSCSSIndex = await fs.access(`${rootPath}/test/scss/index.test.scss`);
			expect(testSCSSIndex).toMatchSnapshot();
		});

		test("with a 'demos' folder", async () => {
			let demos = await fs.readdir(`${rootPath}/demos`);
			expect(demos).toMatchSnapshot();
		});

		test("with a 'demos/src' folder", async () => {
			let demosSrc = await fs.readdir(`${rootPath}/demos/src`);
			expect(demosSrc).toMatchSnapshot();
		});

		test("with a 'demos/src/demo.js' file", async () => {
			let demosJS = await fs.access(`${rootPath}/demos/src/demo.js`);
			expect(demosJS).toMatchSnapshot();
		});

		test("with a 'demos/src/demo.scss' file", async () => {
			let demosSCSS = await fs.access(`${rootPath}/demos/src/demo.scss`);
			expect(demosSCSS).toMatchSnapshot();
		});

		test("with a 'demos/src/demo.mustache' file", async () => {
			let demosMustache = await fs.access(`${rootPath}/demos/src/demo.mustache`);
			expect(demosMustache).toMatchSnapshot();
		});

		test("with a 'demos/src/pa11y.mustache' file", async () => {
			let demosPa11y = await fs.access(`${rootPath}/demos/src/pa11y.mustache`);
			expect(demosPa11y).toMatchSnapshot();
		});
	});
});
