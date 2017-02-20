const names = ['jim', 'abby', 'tom', 'limiting', 'michael', 'kyle', 'manny','alex'];
const lessons = ['maths', 'physics', 'english', 'chemistry', 'chinese', 'psychology'];


const genDatas = total => {
	var i,arr = [];
	for (i = 0; i < total; i++) {
		arr.push({
			id : i,
			name : names[Math.floor(Math.random() * names.length)],
			maths: Math.floor(Math.random() * 100 + 1),
			physics: Math.floor(Math.random() * 100 + 1),
			english: Math.floor(Math.random() * 100 + 1),
			chemistry: Math.floor(Math.random() * 100 + 1),
			chinese: Math.floor(Math.random() * 100 + 1),
			psychology: Math.floor(Math.random() * 100 + 1)
		})
	}

	return arr;
}

module.exports = {
	genDatas: genDatas
}
// export {genDatas}