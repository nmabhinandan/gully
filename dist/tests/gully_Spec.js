'use strict';

describe('Gully router test', function () {

	var expect = chai.expect;

	it('should have default config parameters', function () {
		var gully = new Gully();

		// expect(gully._routes).to.deep.equal(new Set());
		expect(gully._hashBangs).to.equal(true);
		expect(gully._viewAttribute).to.equal('data-gully-view');
		expect(gully._notFoundUrl).to.equal('404');
	});

	it('should take custom config parameters', function () {

		var gully_two = new Gully({
			hashBangs: false,
			viewAttribute: 'testViewAttr',
			notFoundUrl: 'testNotFoundUrl'
		});

		// expect(gully_two._routes).to.deep.equal(new Set());
		expect(gully_two._hashBangs).to.equal(false);
		expect(gully_two._viewAttribute).to.equal('testViewAttr');
		expect(gully_two._notFoundUrl).to.equal('testNotFoundUrl');
	});

	it('should register required events', function () {
		var gully = new Gully();
		// let _handle = sinon.stub(gully, '_handle');

		// window.dispatchEvent(new Event('hashchange')); // phantomjs doesn't support this syntax.

		// let event = document.createEvent('Event');
		// event.initEvent('hashchange', true, true);		
		// dispatchEvent(event);

		// sinon.assert.calledOnce(handle);

		// handle.restore();
	});

	it('should add new states', function () {
		var gully = new Gully();

		var _handle = sinon.stub(gully, '_handle');
		var state = sinon.spy(gully, 'state');

		gully.state({
			url: '/about',
			templateUrl: 'templates/about.html',
			controller: function controller() {
				return null;
			}
		}).state({
			url: '/404',
			templateUrl: 'templates/404.html'
		}).init();

		sinon.assert.calledTwice(state);
		sinon.assert.calledOnce(_handle);
		_handle.restore();
	});
});