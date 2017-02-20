'use strict';
import EventEmitter from '../utils/EventEmitter';


class GridStore extends EventEmitter {

	constructor(config) {
		super();
		this._columnModels = config.columnModels;
		this._dataset = config.dataset;
		this._view = config.gridView;
		this.setStatus({})
	}

	bindEvent() {
	}

	getColumnModels() {
		return this._columnModels;
	}

	getAllDataIndexs() {
		return this._columnModels.map(c => c.dataIndex);
	}

	setStatus(status) {
		this._status = {};
		
		this._status.limit = status.limit || [0,50];
		this._status.orders = status.orders || [];
		this._status.columns = status.columns || this.getAllDataIndexs();
		this._status.filters = status.filters || [];
		this._status.actionOrder = status.actionOrder || ['getColumns', 'filterBy', 'orderBy', 'limit'];
	}

	getStatus() {
		return this._status; 
	}

	getData() {
		return this._dataset.getData();
	}

	loadData() {
		var status = this.getStatus();
		// var actions = status.actionOrder;
		// var fns = actions.map(n => this._dataset[n].bind(this._dataset));
		// var result = pipe(fns)(status);
		var result = this._dataset.doActions(status);
		return result;
		
	}


}
module.exports = GridStore