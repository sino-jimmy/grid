'use strict';
const EventEmitter = require('../utils/EventEmitter');
const pipe = fns => x => fns.reduce((v,f) => f(x,v === x ? null:v), x);
// const pipe = function(fns) {
// 	return function(x) {
		
// 		return fns.reduce(function(v,f){
			
// 			return f(x,v ===x? null:v);
// 		},x)
// 	}
// }
class MemoryDataSet extends EventEmitter{

	constructor(config) {
		super();
		this._columnModels = config.columnModels;
		this._sourceData = config.data;
		this._data = this.setData(config.data);

	} 
	doActions(actions) {
		var actionOrder = actions.actionOrder;
		var fns = actionOrder.map(order => this[order].bind(this));
		return pipe(fns)(actions);
	}

	setData(data) {
		return data;
	}

	getData() {
		return this._data;
	}

	getColumns(config, data) {
		var _data = data || this._data;
		var columns = config.columns;

		return _data.map(d => {
			var o = {};
			columns.map(c => {
				o[c] = d[c];
			})
			return o;
		});
		
	}

	limit(config, data) {
		var _data = data || this._data,
			start = config.limit[0],
			end = config.limit[1];
		return _data.slice(start,Math.min(start + end, _data.length));	
	}

	orderBy(config, data) {
		var _data = data || this._data;
		return _data;
	}

	filterBy(config, data) {
		var _data = data || this._data;
		return _data;
	}


}
module.exports = MemoryDataSet;