const { camelCase, lowercase } = require('./helpers/name-formats.js');

module.exports = answers => {
	const name = answers.name;

	return `@import '@financial-times/o-brand/main';

@import 'src/scss/variables';
${answers.brands ? `@import 'src/scss/brand';` : ''}

/// Output all ${camelCase(name)} features
/// @param {Map} $opts [()] - A map of options to configure the output
/// @access public
/// @example scss
///		@include ${camelCase(name)}($opts: (
///			// your opts here
///		))
@mixin ${camelCase(name)} ($opts: ()) {
	// content of primary mixin
	.${lowercase(name)} {
		display: block;
	}
}

@if ($${name}-is-silent == false) {
	@include ${camelCase(name)}();

	// Set to silent again to avoid being output twice
	$${name}-is-silent: true !global;
}
`;
};
