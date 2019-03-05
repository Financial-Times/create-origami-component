import bob from './src/js/bob';
const constructAll = function () {
	bob.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};
document.addEventListener('o.DOMContentLoaded', constructAll);
export default bob;