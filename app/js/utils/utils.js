'use strict';
const _ = require('../../lib/lodash/lodash');

const _getFilterStr = (filters, flag) => {
	if(!(filters instanceof Array)) {
		filters = [filters];
	}
	var str = '';
	filters.forEach((filter, index) => {
		if(index > 0) {
			str += flag ? ' || ' : ' && ';
		}
		var i = 0;
		str += '( ';
		for(var p in filter) {
			i++;
			if(i > 1) {
				str += ' && ';
			}
			if(p === '$or') {
				str += '( ' + _getFilterStr(filter[p], true) + ')';
			} else if(p === '$not') {
				str += '!(' + _getFilterStr(filter[p]) + ')';
			} else if ((typeof filter[p] === 'string') || (typeof filter[p] === 'number')){
				str += 'data.' + p + ' == ' + '"' + filter[p] + '"';
			} else {
				if(typeof filter[p] === 'object') {
					for (var k in filter[p]) {
						if(k === '$like') {
							str += 'data.' + p + '.indexOf(' + '"' + filter[p][k] + '") != -1'; 
						} else if(k === '$reg') {
							//To do
						} else if(k === '$in' && (filter[p][k]) instanceof Array) {
							str += '[' + filter[p][k].toString() + '].some(item => item == data.' + p + ')';
						} else {
							str += 'data.' + p + ' ' + _opMap[k] + '"' + filter[p][k] + '"';
						}
					}
				}
			}
		}
		str += ' )';	
	});
	return str;
}

const _opMap = {
	'$lt' : '<',
	'$lte' : '<=',
	'$gt' : '>',
	'$gte' : '>=',
	'$ne': '!=',
	'$eq': '=='
}

const doFilter = (filters,data) => {
	var str = getFilterStr(filters);
	var fn = new Function('data', 'return' + str + ';')
	return _.filter(data,(d) => {
		if(fn(d)) {
			return d;
		}
	})
}




var data = [{"id":0,"name":"manny","maths":45,"physics":7,"english":79,"chemistry":39,"chinese":22,"psychology":72},{"id":1,"name":"alex","maths":66,"physics":75,"english":17,"chemistry":52,"chinese":45,"psychology":11},{"id":2,"name":"alex","maths":92,"physics":38,"english":13,"chemistry":25,"chinese":5,"psychology":59},{"id":3,"name":"manny","maths":65,"physics":68,"english":46,"chemistry":33,"chinese":4,"psychology":66},{"id":4,"name":"limiting","maths":23,"physics":91,"english":98,"chemistry":15,"chinese":49,"psychology":33},{"id":5,"name":"limiting","maths":97,"physics":28,"english":88,"chemistry":58,"chinese":65,"psychology":60},{"id":6,"name":"tom","maths":68,"physics":72,"english":25,"chemistry":30,"chinese":12,"psychology":91},{"id":7,"name":"jim","maths":38,"physics":75,"english":89,"chemistry":71,"chinese":12,"psychology":80},{"id":8,"name":"michael","maths":40,"physics":60,"english":27,"chemistry":32,"chinese":75,"psychology":66},{"id":9,"name":"manny","maths":44,"physics":77,"english":51,"chemistry":73,"chinese":100,"psychology":14},{"id":10,"name":"manny","maths":58,"physics":66,"english":16,"chemistry":91,"chinese":12,"psychology":35},{"id":11,"name":"manny","maths":3,"physics":57,"english":36,"chemistry":63,"chinese":79,"psychology":35},{"id":12,"name":"manny","maths":49,"physics":37,"english":79,"chemistry":65,"chinese":54,"psychology":45},{"id":13,"name":"abby","maths":59,"physics":80,"english":3,"chemistry":73,"chinese":67,"psychology":9},{"id":14,"name":"manny","maths":52,"physics":23,"english":69,"chemistry":80,"chinese":39,"psychology":12},{"id":15,"name":"abby","maths":85,"physics":3,"english":10,"chemistry":28,"chinese":60,"psychology":63},{"id":16,"name":"tom","maths":28,"physics":5,"english":50,"chemistry":52,"chinese":95,"psychology":60},{"id":17,"name":"jim","maths":15,"physics":14,"english":7,"chemistry":34,"chinese":7,"psychology":35},{"id":18,"name":"jim","maths":37,"physics":45,"english":22,"chemistry":33,"chinese":93,"psychology":77},{"id":19,"name":"tom","maths":22,"physics":69,"english":95,"chemistry":35,"chinese":60,"psychology":40},{"id":20,"name":"alex","maths":7,"physics":54,"english":50,"chemistry":6,"chinese":7,"psychology":35},{"id":21,"name":"jim","maths":79,"physics":54,"english":63,"chemistry":66,"chinese":14,"psychology":98},{"id":22,"name":"manny","maths":52,"physics":72,"english":93,"chemistry":38,"chinese":37,"psychology":43},{"id":23,"name":"jim","maths":53,"physics":57,"english":29,"chemistry":64,"chinese":49,"psychology":94},{"id":24,"name":"manny","maths":35,"physics":34,"english":84,"chemistry":57,"chinese":9,"psychology":75},{"id":25,"name":"alex","maths":27,"physics":97,"english":19,"chemistry":17,"chinese":44,"psychology":48},{"id":26,"name":"jim","maths":94,"physics":45,"english":41,"chemistry":6,"chinese":94,"psychology":23},{"id":27,"name":"jim","maths":83,"physics":56,"english":11,"chemistry":59,"chinese":69,"psychology":36},{"id":28,"name":"kyle","maths":79,"physics":50,"english":78,"chemistry":77,"chinese":17,"psychology":52},{"id":29,"name":"michael","maths":97,"physics":1,"english":66,"chemistry":22,"chinese":1,"psychology":80},{"id":30,"name":"abby","maths":17,"physics":13,"english":11,"chemistry":91,"chinese":30,"psychology":4},{"id":31,"name":"limiting","maths":100,"physics":12,"english":39,"chemistry":67,"chinese":5,"psychology":80},{"id":32,"name":"jim","maths":42,"physics":63,"english":48,"chemistry":91,"chinese":25,"psychology":24},{"id":33,"name":"kyle","maths":71,"physics":51,"english":100,"chemistry":72,"chinese":11,"psychology":62},{"id":34,"name":"michael","maths":59,"physics":41,"english":3,"chemistry":80,"chinese":1,"psychology":74},{"id":35,"name":"kyle","maths":49,"physics":34,"english":29,"chemistry":40,"chinese":18,"psychology":7},{"id":36,"name":"limiting","maths":52,"physics":85,"english":38,"chemistry":62,"chinese":60,"psychology":36},{"id":37,"name":"alex","maths":43,"physics":1,"english":48,"chemistry":16,"chinese":82,"psychology":61},{"id":38,"name":"limiting","maths":86,"physics":39,"english":17,"chemistry":72,"chinese":47,"psychology":78},{"id":39,"name":"manny","maths":71,"physics":1,"english":71,"chemistry":97,"chinese":53,"psychology":28},{"id":40,"name":"tom","maths":95,"physics":59,"english":83,"chemistry":62,"chinese":30,"psychology":22},{"id":41,"name":"michael","maths":97,"physics":21,"english":75,"chemistry":53,"chinese":63,"psychology":94},{"id":42,"name":"tom","maths":64,"physics":24,"english":90,"chemistry":36,"chinese":20,"psychology":40},{"id":43,"name":"limiting","maths":17,"physics":66,"english":41,"chemistry":60,"chinese":30,"psychology":74},{"id":44,"name":"alex","maths":70,"physics":100,"english":27,"chemistry":28,"chinese":73,"psychology":10},{"id":45,"name":"alex","maths":37,"physics":58,"english":97,"chemistry":38,"chinese":36,"psychology":29},{"id":46,"name":"alex","maths":97,"physics":44,"english":27,"chemistry":46,"chinese":72,"psychology":34},{"id":47,"name":"manny","maths":46,"physics":88,"english":53,"chemistry":37,"chinese":4,"psychology":59},{"id":48,"name":"tom","maths":63,"physics":29,"english":89,"chemistry":35,"chinese":69,"psychology":26},{"id":49,"name":"limiting","maths":70,"physics":64,"english":36,"chemistry":100,"chinese":4,"psychology":79}];

// console.log(doFilter({name:'manny',english:{$gt:60}},data));

const pageSort = (array, from, to, iteratees, fnCompare) => {
	var half = array.length >> 1;
	var minIndex, maxIndex;

	if(to <= half) {
		maxIndex = nth(array, 0, array.length-1, to, iteratees, fnCompare);
		minIndex = nth(array, 0, maxIndex - 1, from, iteratees, fnCompare);
	} else {
		minIndex = nth(array, 0, array.length -1, to, iteratees, fnCompare);
		maxIndex = nth(array, minIndex + 1, array.length - 1, to, iteratees, fnCompare);
	}
	var subArray = array.slice(minIndex, maxIndex);
	sort(subArray, iteratees, fnCompare);
	return subArray;
}

const sort = (array, iteratees, fnCompare) => {
	var queue = [{s:0, t:array.length -1}];
	function quicksort(array, p, r) {
		if(p < r) {
			var q = partition(array, p, r, iteratees, fnCompare);
			queue.push({s:p, t:q-1});
			queue.push({s:q+1, t:r});
		}
	}
	var index = -1;
	while(index < queue.length -1) {
		index++;
		quicksort(array, queue[index].s, queue[index].t);
	}
	return array;
}

const nth = (array, p, r, n, iteratees, fnCompare) => {
	var index = n;
	if(n < p || n > r) {
		return undefined;
	}
	while(true) {
		var q = partition(array, p, r, iteratees, fnCompare);
		if(q < index) {
			p = q + 1;
		} else if(q > index) {
			r = q;
		} else {
			return index;
		}
	}
}

const partition = (array, p, r, iteratees, fnCompare) => {
	fnCompare = fnCompare || defaultPageSortComparator;
	var rand = Math.floor(Math.random() * (r - p + 1)) + p;
	swap(array, r, rand);
	var x = array[r];
	var i = p -1;
	for(var j = p; j < r; j++) {
		var c = fnCompare(array[j], x, iteratees);
		if(c == -1) {
			i = i + 1;
			swap(array, i, j);
		} else if(c === 0) {
			if(Math.random > 0.5) {
				i = i + 1;
				swap(array, i, j);
			}
		}
	}
	swap(array, i + 1, r);
	return i + 1;
}

const defaultPageSortComparator = (a, b, iteratees) => {
	var key,
		direction,
		result;
	for(var i = 0, len = iteratees.length; i < len; i++) {
		key = iteratees[i].field;
		direction = iteratees[i].direction;
		result = defaultComparator(a[key], b[key]) * direction;
		if(result !== 0){
			return result;
		}
	}
	return result;	
} 
const defaultComparator = (a, b) => {
	if(a > b) {
		return 1;
	} else if(a < b) {
		return -1;
	} else {
		return 0;
	}
}
const swap = (array, i, j) => {
	var t = array[i];
	array[i] = array[j];
	array[j] = t;
}

// console.log(pageSort(data,10,50,[{field:'name',direction:-1},{field:'maths',direction:-1}]))
