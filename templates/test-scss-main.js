const { camelCase } = require('./helpers/name-formats.js');

module.exports = answers => {
	const name = answers.name;

	return `@include describe('${camelCase(name)} mixins') {
	@include describe('${camelCase(name)}') {
		@include it('does something') {
			@include assert() {
				@include output($selector: false) {
					.test-mixin {
						@include ${camelCase(name)}();
					}
				}
				@include expect($selector: false) {
					.test-mixin .${name} {
						display: block;
					}
				}
			}
		}
	}
}
`;
};
