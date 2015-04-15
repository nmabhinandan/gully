import Gully from '../../gully';

describe("Gully router test", function() {

	let gully = new Gully();	

	it('should have default config parameters', function() {
		
		expect(gully.routes).to.deep.equal([]);
		expect(gully.hashBangs).to.equal(true);
		expect(gully.viewAttribute).to.equal('data-gully-view');
		expect(gully.notFoundUrl).to.equal('404');
	});

	it('should take custom config parameters', function() {

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

	it('should register required events', function() {
		let handle = sinon.stub(gully, 'handle');

		window.dispatchEvent(new Event('hashchange'));
		sinon.assert.calledOnce(handle);

		handle.restore();
	});

	it('should add new states', function() {		
		
		let handle = sinon.stub(gully, 'handle');
		let state = sinon.spy(gully, 'state');		

		gully.state({
				url: '/about',
				templateUrl: 'templates/about.html',
				controller: () => null
			}).state({
				url: '/404',
				templateUrl: 'templates/404.html'
			}).init();
		

		sinon.assert.calledTwice(state);	
		sinon.assert.calledOnce(handle);
		handle.restore();
	});

});