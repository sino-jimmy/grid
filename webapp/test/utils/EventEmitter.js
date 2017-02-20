const should = require('should');
const assert = require('assert');
const EventEmitter = require('../../js/utils/EventEmitter');
describe('测试should', () => {
	it('test should', () => {
	function Class (){
				return function(){};
			}
			var Person = new Class();
			var o = new Person();
			o.should.be.ok;
	})
})

describe('test EventEmitter', () => {
	var EE = new EventEmitter();
	it('event properties', () => {
		EE.should.have.properties('on','fire');
	})
	it('test on and fire',() => {		
		EE.on('crying',(info) => {
			info.should.be.equal('crying');
		});
		EE.on('eating', (food) => {
			food.should.be.deepEqual({
				apple:'apple'
			})
		})
		EE.fire('crying','crying');
		EE.fire('eating',{apple:'apple'});
	})
})