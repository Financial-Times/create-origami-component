module.exports = answers => {
	const name = {
		original: answers.name,
		camelCase: answers.name.replace(/\-+(.)/g, (match, chr) => chr.toUpperCase())
	}

	return `@import 'src/scss/variables';

/// Output all ${name.camelCase} features
/// @param {Map} $opts - A map of options to configure the output
/// @access public
/// @example scss
///		@include ${name.camelCase}($opts: (
///			// your opts here
///		))
@mixin ${name.camelCase} ($opts) {
	// content of primary mixin
}

@if ($${name.original}-is-silent == false) {
	@include ${name.camelCase}();

	// Set to silent again to avoid being output twice
	$${name.original}-is-silent: true !global;
}
`;
};
