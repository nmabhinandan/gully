define(['exports', '../../gully'], function (exports, _gully) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _Gully = _interopRequire(_gully);

	describe('Gully router test', function () {

		var gully = new _Gully();

		it('should have default config parameters', function () {

			expect(gully._routes).to.deep.equal([]);
			expect(gully.hashBangs).to.equal(true);
			expect(gully.viewAttribute).to.equal('data-gully-view');
			expect(gully.notFoundUrl).to.equal('404');
		});

		it('should take custom config parameters', function () {

			var gully_two = new _Gully({
				hashBangs: false,
				viewAttribute: 'testViewAttr',
				notFoundUrl: 'testNotFoundUrl'
			});

			expect(gully_two._routes).to.deep.equal([]);
			expect(gully_two.hashBangs).to.equal(false);
			expect(gully_two.viewAttribute).to.equal('testViewAttr');
			expect(gully_two.notFoundUrl).to.equal('testNotFoundUrl');
		});

		it('should register required events', function () {
			var handle = sinon.stub(gully, 'handle');

			// window.dispatchEvent(Event('hashchange')); // phantomjs doesn't support this syntax.

			var event = document.createEvent('Event');
			event.initEvent('hashchange', true, true);
			window.dispatchEvent(event);

			sinon.assert.calledOnce(handle);
			handle.restore();
		});

		it('should add new states', function () {

			var handle = sinon.stub(gully, 'handle');
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
			sinon.assert.calledOnce(handle);
			handle.restore();
		});

		// it('should handle the routing', function() {
		// 	let getUrlFragment = sinon.stub(gully, 'getUrlFragment');
		// 	let applyState = sinon.stub(gully, 'applyState');
		// 	let handleNotFoundUrl = sinon.stub(gully, 'handleNotFoundUrl');
		// 	let _routes = sinon.stub(gully, '_routes');

		// });
	});
});