'use strict';
const _ = require('../../lib/lodash/lodash');

const getFilterStr = (filters, flag) => {
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
				str += '( ' + getFilterStr(filter[p], true) + ')';
			} else if(p === '$not') {
				str += '!(' + getFilterStr(filter[p]) + ')';
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

const doFilter = (filters,data) {
	var str = getFilterStr(filters);
	var fn = new Function('data',str)
	return _.filter(data,(d) => {
		return fn(d);
	})
}

