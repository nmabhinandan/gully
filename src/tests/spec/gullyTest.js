import Gully from '../../gully';

describe("Gully router test", function() {

	it('should take default config parameters correctly', function() {		
		
		let gully = new Gully();

		expect(gully.routes).to.deep.equal([]);
		expect(gully.hashBangs).to.equal(true);
		expect(gully.viewAttribute).to.equal('data-gully-view');
		expect(gully.notFoundUrl).to.equal('404');		
	});

	it('should take custom config parameters correctly', function() {

		let gully_two = new Gully({
			hashBangs: false,
			viewAttribute: 'testViewAttr',
			notFoundUrl: 'testNotFoundUrl'
		});

		expect(gully_two.routes).to.deep.equal([]);
		expect(gully_two.hashBangs).to.equal(false);
		expect(gully_two.viewAttribute).to.equal('testViewAttr');
		expect(gully_two.notFoundUrl).to.equal('testNotFoundUrl');
	});

});