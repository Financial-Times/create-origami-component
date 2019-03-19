module.exports = (string) => {
  return {
    original: string,
    titleCase: string.split('-').map(word => word.replace(word[0], word[0].toUpperCase())).join(''),
    camelCase: string.replace(/\-+(.)/g, (match, chr) => chr.toUpperCase())
  }
}