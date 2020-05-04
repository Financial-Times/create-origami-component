const { camelCase } = require('./helpers/name-formats.js');

module.exports = answers => {
	const name = answers.name;

	return `/// Helper for \`o-brand\` function.
/// @access private
@function _${camelCase(name)}Get($variables, $from: null) {
	@return oBrandGet($component: '${name}', $variables: $variables, $from: $from);
}
/// Helper for \`o-brand\` function.
/// @access private
@function _${camelCase(name)}Supports($variant) {
	@return oBrandSupportsVariant($component: '${name}', $variant: $variant);
}
`
};
