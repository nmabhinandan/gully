import 'gully';
import 'chai';
import 'sinon';

describe("Gully router test", function() {

	let expect = chai.expect;
	
	it('should have default config parameters', function() {
		let gully = new Gully();
		
		// expect(gully._routes).to.deep.equal(new Set());
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

		// expect(gully_two._routes).to.deep.equal(new Set());
		expect(gully_two.hashBangs).to.equal(false);
		expect(gully_two.viewAttribute).to.equal('testViewAttr');
		expect(gully_two.notFoundUrl).to.equal('testNotFoundUrl');
	});

	it('should register required events', function() {
		let gully = new Gully();
		let handle = sinon.stub(gully, 'handle');

		// window.dispatchEvent(new Event('hashchange')); // phantomjs doesn't support this syntax.

		// let event = document.createEvent('Event');
		// event.initEvent('hashchange', true, true);		
		// dispatchEvent(event);

	
		// sinon.assert.calledOnce(handle);
		
		// handle.restore();
	});

	it('should add new states', function() {	
		let gully = new Gully();	
		
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
/*
	it('should handle the routing', function() {
		let gully = new Gully();
		let getUrlFragment = sinon.stub(gully, 'getUrlFragment');
		getUrlFragment.onCall(0).returns('');
		getUrlFragment.onCall(1).returns('about');
		getUrlFragment.onCall(2).returns('users');
		getUrlFragment.onCall(3).returns('users/15');
		getUrlFragment.onCall(4).returns('users/20/settings');

		let applyState = sinon.stub(gully, 'applyState');
		let handleNotFoundUrl = sinon.stub(gully, 'handleNotFoundUrl');
		
		let matchRoute = sinon.stub(gully, 'matchRoute');
		matchRoute.onCall(0).returns(new Map());
		matchRoute.onCall(1).returns(new Map());
		matchRoute.onCall(2).returns(new Map());
		matchRoute.onCall(3).returns(new Map([['id', '15']]));
		matchRoute.onCall(4).returns(new Map([['id', '20']]));

		let ctrl = sinon.stub();
		let routes = [
			{
				url: '/',
				templateUrl: 'templates/home.html',
				controller: ctrl
			},
			{
				url: '/about',
				templateUrl: 'tempaltes/about.html',
				controller: ctrl
			},
			{
				url: '/users',
				templateUrl: 'templates/users.html',
				controller: ctrl
			},
			{
				url: '/users/:id',
				templateUrl: 'templates/users.profile.html',
				controller: ctrl
			},
			{
				url: '/users/:id/settings',
				templateUrl: 'templates/users.settings.html',
				controller: ctrl
			}
		];
		
		for(let route of routes) {
			gully._routes.add(route);
		}
		

		for(let i of Array(5).keys()) {
			gully.handle();	
		}

		sinon.assert.callCount(getUrlFragment, 5);
		sinon.assert.callCount(matchRoute, 5);
		sinon.assert.callCount(applyState, 5);
		sinon.assert.callCount(ctrl, 5);
	});
*/
});