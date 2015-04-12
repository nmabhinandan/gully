export default class Gully {
	
	constructor(routes = [], options = {}) {
		this.routes = routes;
		this.hashBangs = options.hashBangs;
		this.viewAttr = 'data-gully-view';
		this.notFoundUrl = '404'
		
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
		for(let r of this.routes) {
			let match = r.url.match(/\/([^\/]*).*$/);
			let url = match ? match[1] : '';

			if(url.trim() === fragment.trim()) {
				this.applyState(url.trim(), r);
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
		let match = window.location.href.match(/\/#\/(.*)$/);				
        let frag = match ? match[1] : '';
        console.log(frag);

        return frag;
	}
		
}