'use strict';
class EventEmitter {
	constructor() {
		this._handler = {};
	}

	on(eventName,handler) {
		if(!this._handler[eventName]) {
			this._handler[eventName] = [];
		}
		if(handler instanceof Function) {
			this._handler[eventName].push(handler);
		}
		return this;
	}

	fire() {
		var eventName = arguments[0],
			args = Array.prototype.slice.call(arguments,1),
			i,
			handlers = this._handler[eventName],
			len = handlers.length;

		if(handlers && handlers.length) {
			for(i = 0; i < len; i++) {
				handlers[i].apply(null, args);
			}
		}

		return this;	

	}

}
export EventEmitter;