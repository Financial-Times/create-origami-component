const stringCasing = require('./helpers/string-casing.js');

module.exports = answers => {
	const name = stringCasing(answers.name);

	return `/// Helper for \`o-brand\` function.
/// @access private
@function _${name.camelCase}Get($variables, $from: null) {
	@return oBrandGet($component: '${name.original}', $variables: $variables, $from: $from);
}
/// Helper for \`o-brand\` function.
/// @access private
@function _${name.camelCase}Supports($variant) {
	@return oBrandSupportsVariant($component: '${name.original}', $variant: $variant);
}
`
};
