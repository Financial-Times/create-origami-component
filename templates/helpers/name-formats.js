module.exports = {
  lowercase: string => string.toLowerCase(),
  titleCase: string => string.split('-').map(word => word.replace(word[0], word[0].toUpperCase())).join(''),
  camelCase: string => string.replace(/\-+(.)/g, (match, chr) => chr.toUpperCase()),
  withoutPrefix: string => string.replace(/^[a-z]-/g, '')
};
