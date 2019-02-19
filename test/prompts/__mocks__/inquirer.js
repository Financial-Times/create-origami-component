let pendingAssertions;

exports.inquirer = {
	createPromptModule: () => {
		return prompts => {
				if (!pendingAssertions) {
					throw new Error(`'inquirer' was mocked and used without pending assertions: ${prompts}`)
				}

				const answers = {};
				let skipped = 0;

				prompts.forEach((prompt, i) => {
					if (prompt.when && !prompt.when(answers)) {
						skipped++
						return;
					} else if (prompt.when) {
						prompt.when(answers);
					}

					const set = value => {
						if (prompt.validate) {
							const response = prompt.validate(value)
							if (response !== true) {
								throw new Error(`validation failed for prompt: ${prompt}`)
							}
						}

						prompt.name = prompt.name === 'name.original' ? 'name' : prompt.name;
						answers[prompt.name] = prompt.filter ? prompt.filter(value) : value;
					}

					const answer = pendingAssertions[i - skipped];

					if (answer.message) {
						const message = typeof prompt.message === 'function' ? prompt.message(answers) : prompt.message;
						expect(message).toContain(answer.message);
					}

					if (answer.choices) {
						expect(prompt.choices.length).toBe(answer.choices.length);
						answer.choices.forEach((choice, i) => {
							const expected = choice;
							if (expected) {
								expect(prompt.choices[i]).toBe(expected);
							}
						});
					}

					if (answer.input != null) {
						expect(prompt.type).toBe('input');
						set(answer.input)
					}

					if (answer.choose != null) {
						expect(prompt.type).toBe('list');
						set(prompt.choices[answer.choose])
					}

					if (answer.check != null) {
						expect(prompt.type).toBe('checkbox');
						set(answer.check.map(i => prompt.choices[i]));
					}

					if (answer.confirm != null) {
						expect(prompt.type).toBe('confirm');
						set(answer.confirm)
					}

					if (answer.useDefault) {
						expect('default'in prompt).toBe(true);
						set(typeof prompt.default === 'function' ? prompt.default(answers) : prompt.default)
					}
				});

				expect(prompts.length).toBe(pendingAssertions.length + skipped)

				pendingAssertions = null;
				return Promise.resolve(answers);
			}
		}
	}
}

exports.expectPrompts = assertions => pendingAssertions = assertions
