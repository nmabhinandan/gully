define(['exports', 'module'], function (exports, module) {
	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var Gully = (function () {
		function Gully() {
			var routes = arguments[0] === undefined ? [] : arguments[0];
			var options = arguments[1] === undefined ? {} : arguments[1];

			_classCallCheck(this, Gully);

			this.routes = routes;
			this.hashBangs = options.hashBangs;

			this.registerEvents(this.hashBangs);
		}

		_createClass(Gully, [{
			key: 'state',
			value: function state() {
				var route = arguments[0] === undefined ? null : arguments[0];

				if (route != null) {
					this.routes.push(route);
					return this;
				}
			}
		}, {
			key: 'init',
			value: function init() {
				this.handle();
			}
		}, {
			key: 'registerEvents',
			value: function registerEvents() {
				var _this = this;

				var hb = arguments[0] === undefined ? true : arguments[0];

				if (hb === true) {
					window.addEventListener('hashchange', function () {
						_this.handle();
					});
				}
			}
		}, {
			key: 'handle',
			value: function handle() {}
		}]);

		return Gully;
	})();

	module.exports = Gully;
});

// TODO
//# sourceMappingURL=gully.js.map