
/**
 * Gully.js
 * License: MIT
 */

export default class Gully {

	constructor(options = { hashBangs: true, viewAttribute: 'data-gully-view', notFoundUrl: "404" }) {

		this._routes = new Set();
		this._hashBangs = options.hashBangs;
		this._viewAttribute = options.viewAttribute;
		this._notFoundUrl = options.notFoundUrl;
		this.registerEvents(this._hashBangs);
	}

	state(route = null) {

		if (route !== null){
			this._routes.add(route);
		} else {
			throw (new Error('Cannot add empty state'));
		}

		return this;
	}

	init() {
		this._handle();
	}

	registerEvents(hb = true) {

		if(hb === true) {

			window.addEventListener('hashchange', () => {
				this._handle();
			});
		}
	}

	_handle() {


		let fragment = this.getUrlFragment();
		let frags = fragment.split(/\//).filter(Boolean);
		frags = frags.length === 0 ? ['/'] : frags;

		for(let route of this._routes) {

			let url = route.url.split(/\//).filter(Boolean);
			url = url.length === 0 ? ['/'] : url;

			if(url.length !== frags.length) {
				continue;
			}

			let matched = this._matchRoute(url, frags);

			if(! matched) {
				continue;
			} else {
				this.applyState(route, matched); // matched = route parameters
				return;
			}
		}

		this._handleNotFoundUrl();
	}

	_matchRoute(route, frags) {

		let params = new Map();
		for(let i = 0; i < frags.length; i++) {

			let isParam = route[i].match(/^:.+/) ? route[i].match(/^:.+/)[0] : false;

			if(isParam) {

				params.set(isParam.substr(1), frags[i]);
				continue;
			}

			if(route[i].trim() !== frags[i].trim()) {
				return false;
			}

		}

		return params;
	}

	applyState(route, params) {

		this._callController(route);
		this._renderTemplates(route);
	}

	_callController(route) {

		if(route.controller) {
			route.controller(params);
		}
	}

	_renderTemplates(route) {

		let viewElement = this._selectElement();

		if(route.template !== undefined) {
			viewElement.innerHTML = route.template;
		} else if(route.templateUrl !== undefined) {

			fetch(route.templateUrl)
				.then(function(response) {
					return response.text();
				}).then(function(body) {
					viewElement.innerHTML = body;
				});
		}
	}

	_handleNotFoundUrl() {

		let url = window.location.href;
		url = url.replace(/#(.*)$/, '#/' + this._notFoundUrl);
		window.location = url;
	}

	_selectElement() {

		if(document.querySelector) {
			return document.querySelector('[' + this._viewAttribute + ']');
		} else {
			let allElements = document.getElementsByTagName('*');
			for (let elt of allElements) {
				if (elt.getAttribute(this._viewAttribute) !== null) {
					matchingElement = allElements[i];
					break;
				}
			}

			return matchingElement;

		}
	}

	getUrlFragment() {

		let match = window.location.href.match(/\/#\/(.*)/);		
        return match ? match[1] : '';
	}

}
