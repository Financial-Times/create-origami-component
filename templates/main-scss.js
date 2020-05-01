const stringCasing = require('./helpers/string-casing.js');

module.exports = answers => {
	const name = stringCasing(answers.name);

	return `@import 'src/scss/variables';

/// Output all ${name.camelCase} features
/// @param {Map} $opts [()] - A map of options to configure the output
/// @access public
/// @example scss
///		@include ${name.camelCase}($opts: (
///			// your opts here
///		))
@mixin ${name.camelCase} ($opts: ()) {
	// content of primary mixin
	.${name.lowercase} {
		display: block;
	}
}

@if ($${name.original}-is-silent == false) {
	@include ${name.camelCase}();

	// Set to silent again to avoid being output twice
	$${name.original}-is-silent: true !global;
}
`;
};
