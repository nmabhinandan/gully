export default class Gully {
	
	constructor(routes = [], options = {}) {
		this.routes = routes;
		this.hashBangs = options.hashBangs;
		
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
		// TODO
	}
		
}