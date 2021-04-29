const nixt = require('nixt');
const rimraf = require('rimraf');

describe('Init', function() {
	this.timeout(100 * 1000);

	afterEach((done) => {
		rimraf('./bob', done);
	});

	it('Does not create the project board github action when `origami-core` are not Github owners', (done) => {
		nixt({ colors: false })
			.run('./bin/run')
			.on(/name/i).respond('bob\n')
			.on(/directory/i).respond('\033[B\n')
			.on(/description/i).respond('bla bla\n')
			.on(/keywords/i).respond('\n')
			.on(/brands/).respond('\n')
			.on(/JavaScript/).respond('\n')
			.on(/Sass/).respond('\n')
			.on(/status/).respond('\n')
			.on(/team email/).respond('customer-products@ft.com\n')
			.on(/slack channel/).respond('#ft-next-dev\n')
			.on(/Github team/).respond('customer-products\n')
			.on(/right/).respond('\n')
			.exist('./bob/.github')
			.notExist('./bob/.github/workflows/add-new-issues-and-pull-requests-to-origami-project-board.yml')
			.end(done)
	});

	context('with default values', () => {
		let test;
		beforeEach(() => {
			test = nixt({ colors: false })
			.run('./bin/run')
			.on(/name/i).respond('bob\n')
			.on(/current directory/i).respond('\033[B\n')
			.on(/description/i).respond('bla bla\n')
			.on(/keywords/i).respond('\n')
			.on(/brands/).respond('\n')
			.on(/JavaScript/).respond('\n')
			.on(/Sass/).respond('\n')
			.on(/status/).respond('\n')
			.on(/team email/).respond('\n')
			.on(/slack channel/).respond('\n')
			.on(/Github team/).respond('\n')
			.on(/right/).respond('\n');
		});

		it('Uses default values where possible to create folder tree', done => {
			test
				.exist('./bob/')
				.exist('./bob/src/js')
				.exist('./bob/src/scss')
				.exist('./bob/test/js')
				.exist('./bob/test/scss')
				.exist('./bob/demos')
				.exist('./bob/.github')
				.end(done)
		});

		it('is a valid origami component', done => {
			test
				.exec("cd bob && npx obt install && npx obt demo && npx obt verify && npx obt test")
				.end(done);
		})
	});

	context('without javascript', () => {
		let test;
		beforeEach(() => {
			test = nixt({ colors: false })
			.run('./bin/run')
			.on(/name/i).respond('bob\n')
			.on(/directory/i).respond('\033[B\n')
			.on(/description/i).respond('bla bla\n')
			.on(/keywords/i).respond('\n')
			.on(/brands/).respond('\n')
			.on(/JavaScript/).respond('n\n')
			.on(/Sass/).respond('\n')
			.on(/status/).respond('\n')
			.on(/team email/).respond('\n')
			.on(/slack channel/).respond('\n')
			.on(/Github team/).respond('\n')
			.on(/right/).respond('\n');
		});

		it('Does not create Javascript files if not requested', (done) => {
			test
				.exist('./bob/')
				.exist('./bob/src/scss')
				.exist('./bob/test/scss')
				.exist('./bob/demos')
				.exist('./bob/.github')
				.notExist('./bob/src/js')
				.notExist('./bob/test/js')
				.notExist('./bob/demo/demo.js')
				.end(done)
		});

		it('is a valid origami component', done => {
			test
				.exec("cd bob && npx obt install && npx obt demo && npx obt verify && npx obt test")
				.end(done);
		})
	});

	context('without sass', () => {
		let test;
		beforeEach(() => {
			test = nixt({ colors: false })
			.run('./bin/run')
			.on(/name/i).respond('bob\n')
			.on(/directory/i).respond('\033[B\n')
			.on(/description/i).respond('bla bla\n')
			.on(/keywords/i).respond('\n')
			.on(/brands/).respond('\n')
			.on(/JavaScript/).respond('\n')
			.on(/Sass/).respond('n\n')
			.on(/status/).respond('\n')
			.on(/team email/).respond('\n')
			.on(/slack channel/).respond('\n')
			.on(/Github team/).respond('\n')
			.on(/right/).respond('\n');
		});

		it('Does not create SCSS files if not requested', (done) => {
			test
				.exist('./bob/')
				.exist('./bob/src/js')
				.exist('./bob/test/js')
				.exist('./bob/demos')
				.exist('./bob/.github')
				.exist('./bob/.github/workflows/add-new-issues-and-pull-requests-to-origami-project-board.yml')
				.notExist('./bob/src/scss')
				.notExist('./bob/test/scss')
				.notExist('./bob/demo/demo.scss')
				.end(done)
		});

		it('is a valid origami component', done => {
			test
				.exec("cd bob && npx obt install && npx obt demo && npx obt verify && npx obt test")
				.end(done);
		});
	});
});
