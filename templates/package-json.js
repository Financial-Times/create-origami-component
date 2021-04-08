module.exports = (answers) => {

	const packageJson = {
		"name": `@financial-times/${answers.name}`,
		"version": "0.0.0",
		"description": answers.description,
		"keywords": JSON.stringify(answers.keywords),
		"homepage": `https://registry.origami.ft.com/components/${answers.name}`,
		"bugs": {
			"url": `https://github.com/Financial-Times/${answers.name}/issues`
		},
		"repository": {
			"type": "git",
			"url": `git+https://github.com/Financial-Times/${answers.name}.git`
		},
		"license": "MIT",
		"author": "",
		"type": "module",
		"devDependencies": {
			"remark": "^12.0.1",
			"remark-lint": "^7.0.1",
			"remark-preset-lint-origami-component": "^2.0.0-beta.1"
		},
		"dependencies": {},
		"peerDependencies": {},
		"scripts": {},
		"engines": {
			"npm": ">=7"
		}
	};

	if (answers.javascript) {
		Object.assign(packageJson, {
			"browser": "./main.js",
		});


		Object.assign(packageJson.devDependencies, {
			"eslint": "^7.19.0",
			"eslint-config-origami-component": "^2.1.0"
		});
	}

	if (answers.scss) {
		Object.assign(packageJson.devDependencies, {
			"stylelint": "^13.9.0",
			"stylelint-config-origami-component": "^1.0.4"
		});
	}

	if (answers.brands) {
		Object.assign(packageJson.peerDependencies, {
			"@financial-times/o-brand": "^4.0.0-beta.0"
		});
	}

	return JSON.stringify(packageJson, null, "\t");
};
