module.exports = answers => {
	const name = {
		original: answers.name,
		camelCase: answers.name.replace(/\-+(.)/g, (match, chr) => chr.toUpperCase()),
	}

	return `@include describe('${name.camelCase} mixins') {
	@include describe('${name.camelCase}') {
		@include it('does something') {
			@include assert() {
				@include output($selector: false) {
					.test-mixin {
						@include ${name.camelCase}();
					}
				};
				@include expect($selector: false) {
					.test-mixin .${name.original} {
						display: block;
					}
				};
			};
		}
	}
}
`;
};
