'use strict';
import {MemoryDataSet} from './js/dataset/MemoryDataSet.js';
import GridStore from './js/store/GridStore';
import GridView from './js/view/GridView';
class App {
	constructor(config) {
		
		this._dataset  = new MemoryDataSet({
			columnModels: config.columnModels,
			data: config.data
		})
		config.dataset = this._dataset
		this._store = new GridStore(config);
		config.store = this._store;
 		this._view = new GridView(config);
	}

	render() {
		this._view.render();
	}
 
}

export App
// var app1 = new App({
// 	columnModels:[{text:'maths'},{text:'physics'},{text:'chinese'}],
// 	data: [{maths:60,physics:70,chinese:80},{maths:60,physics:70,chinese:80},{maths:60,physics:70,chinese:80}],
// })

// app1.render();

// setTimeout(() => {
// 	app1._store.on('data-loaded', n =>{
// 		app1._view.reload({data:n})	
// 	})
// 	app1._store.loadData();

// },1000)