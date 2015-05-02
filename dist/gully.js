'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

/**
 * Gully.js
 * License: MIT
 */

var Gully = (function () {
	function Gully() {
		var options = arguments[0] === undefined ? { hashBangs: true, viewAttribute: 'data-gully-view', notFoundUrl: '404' } : arguments[0];

		_classCallCheck(this, Gully);

		this._routes = new Set();
		this._hashBangs = options.hashBangs;
		this._viewAttribute = options.viewAttribute;
		this._notFoundUrl = options.notFoundUrl;
		this.registerEvents(this._hashBangs);
	}

	_createClass(Gully, [{
		key: 'state',
		value: function state() {
			var route = arguments[0] === undefined ? null : arguments[0];

			if (route !== null) {
				this._routes.add(route);
			} else {
				throw new Error('Cannot add empty state');
			}

			return this;
		}
	}, {
		key: 'init',
		value: function init() {
			this._handle();
		}
	}, {
		key: 'registerEvents',
		value: function registerEvents() {
			var _this = this;

			var hb = arguments[0] === undefined ? true : arguments[0];

			if (hb === true) {

				window.addEventListener('hashchange', function () {
					_this._handle();
				});
			}
		}
	}, {
		key: '_handle',
		value: function _handle() {

			var fragment = this.getUrlFragment();
			var frags = fragment.split(/\//).filter(Boolean);
			frags = frags.length === 0 ? ['/'] : frags;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this._routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var route = _step.value;

					var url = route.url.split(/\//).filter(Boolean);
					url = url.length === 0 ? ['/'] : url;

					if (url.length !== frags.length) {
						continue;
					}

					var matched = this._matchRoute(url, frags);

					if (!matched) {
						continue;
					} else {
						this.applyState(route, matched); // matched = route parameters
						return;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this._handleNotFoundUrl();
		}
	}, {
		key: '_matchRoute',
		value: function _matchRoute(route, frags) {

			var params = new Map();
			for (var _i = 0; _i < frags.length; _i++) {

				var isParam = route[_i].match(/^:.+/) ? route[_i].match(/^:.+/)[0] : false;

				if (isParam) {

					params.set(isParam.substr(1), frags[_i]);
					continue;
				}

				if (route[_i].trim() !== frags[_i].trim()) {
					return false;
				}
			}

			return params;
		}
	}, {
		key: 'applyState',
		value: function applyState(route, params) {

			this._callController(route);
			this._renderTemplates(route);
		}
	}, {
		key: '_callController',
		value: function _callController(route) {

			if (route.controller) {
				route.controller(params);
			}
		}
	}, {
		key: '_renderTemplates',
		value: function _renderTemplates(route) {

			var viewElement = this._selectElement();

			if (route.template !== undefined) {
				viewElement.innerHTML = route.template;
			} else if (route.templateUrl !== undefined) {

				fetch(route.templateUrl).then(function (response) {
					return response.text();
				}).then(function (body) {
					viewElement.innerHTML = body;
				});
			}
		}
	}, {
		key: '_handleNotFoundUrl',
		value: function _handleNotFoundUrl() {

			var url = window.location.href;
			url = url.replace(/#(.*)$/, '#/' + this._notFoundUrl);
			window.location = url;
		}
	}, {
		key: '_selectElement',
		value: function _selectElement() {

			if (document.querySelector) {
				return document.querySelector('[' + this._viewAttribute + ']');
			} else {
				var allElements = document.getElementsByTagName('*');
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = allElements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var elt = _step2.value;

						if (elt.getAttribute(this._viewAttribute) !== null) {
							matchingElement = allElements[i];
							break;
						}
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2['return']) {
							_iterator2['return']();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				return matchingElement;
			}
		}
	}, {
		key: 'getUrlFragment',
		value: function getUrlFragment() {

			var match = window.location.href.match(/\/#\/(.*)/);
			return match ? match[1] : '';
		}
	}]);

	return Gully;
})();
//# sourceMappingURL=gully.js.map