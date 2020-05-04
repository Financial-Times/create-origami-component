const { titleCase, withoutPrefix } = require('./helpers/name-formats.js');

module.exports = answers => {
	const name = answers.name;
	const className = titleCase(withoutPrefix(name));

	return `/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';
import ${className} from '../../main';

describe("${className}", () => {
	it('is defined', () => {
		proclaim.equal(typeof ${className}, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof ${className}.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(${className}, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(${className}, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new ${name}", () => {

		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const boilerplate = ${className}.init();
			proclaim.equal(boilerplate instanceof Array, true);
			proclaim.equal(boilerplate[0] instanceof ${className}, true);
		});

		it("single component when initialized with a root element", () => {
			const boilerplate = ${className}.init('#element');
			proclaim.equal(boilerplate instanceof ${className}, true);
		});
	});
});`;
};
