export default class Gully {

	constructor(options = { hashBangs: true, viewAttribute: "data-gully-view", notFoundUrl: "404" }) {
			
		this.routes = [];
		this.hashBangs = options.hashBangs;
		this.viewAttribute = options.viewAttribute;
		this.notFoundUrl = options.notFoundUrl;
		
		this.registerEvents(this.hashBangs);
	}

	state(route = null) {		
		if (route != null){
			this.routes.push(route);
			return this;
		}
	}

	init() {
		this.handle();
	}
	
	registerEvents(hb = true) {

		if(hb === true) {			
			window.addEventListener('hashchange', () => {
				this.handle();
			});			
		}
	}

	handle() {		

		let fragment = this.getUrlFragment();
		let found = false;		
		let frags = fragment.split(/\//);
		// if (frags[frags.length] == '') {
		// 	frags.splice(frags.length, 1);
		// }

		console.log(frags);
		for(let r of this.routes) {
			let match = r.url.match(/\/([^\/]*).*$/);
			let userRoutes = match ? match[1] : '';

			// let routeFrags = userRoutes.split();

			if(userRoutes.trim() === fragment.trim()) {
				this.applyState(userRoutes.trim(), r);
				found = true;
			}
		}
		if(! found) {
			this.handleNotFoundUrl();
		}
	}

	applyState(url, route) {				
		
		if(route.controller) {
			route.controller();
		}
		
		let viewElement = this.selectElement();
		
		fetch(route.templateUrl)
			.then(function(response) {
				return response.text()
			}).then(function(body) {
				viewElement.innerHTML = body
			});
		
	}

	handleNotFoundUrl() {
		let url = window.location.href;
		url = url.replace(/#(.*)$/, '#/' + this.notFoundUrl);
		window.location = url;
	}

	selectElement() {

		if(document.querySelectorAll) {
			return document.querySelector('[' + this.viewAttr + ']');
		} else {
			let matchingElement = undefined;
			let allElements = document.getElementsByTagName('*');
			for (let elt of allElements) {
				if (elt.getAttribute(this.viewAttr) !== null) {
					matchingElement = allElements[i];
					break;
				}
			}
			return matchingElement;
		}
	}

	getUrlFragment() {		
		let match = window.location.href.match(/\/#\/(.*)/);				
        let frag = match ? match[1] : '';        

        return frag;
	}
		
}