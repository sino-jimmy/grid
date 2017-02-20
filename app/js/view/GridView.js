// const $ = require('../../lib/jquery/jquery-3.1.1');
'use strict';
const _ = require('../../lib/lodash/lodash');

const getView = (columnModels, data) => {
	var str =   '<table>'
			// +   `${columnModels[0].text}`
			+       '<thead>'
			+           '<tr>'
			+				'<% for(var i = 0,len = columnModels.length; i < len;i++) { %>'
			+				'<th><%= columnModels[i].text %></th>'
			+				'<% } %>'
			+			'</tr>'
			+		'</thead>'
			+       '<tbody>'		
			+			'<% for(i = 0, len = data.length; i < len; i++) {%>'
			+				'<tr>' 
			+					'<% for(var j = 0, l = columnModels.length; j < l; j++ ) {%>'
			+						'<td><%=data[i][columnModels[j].dataIndex]%></td>'
			+					'<%}%>'
			+				'</tr>'
			+			'<%}%>'
			+		'</tbody>'
			+	'</table>';
	var html = _.template(str)({columnModels:columnModels,data:data});

	return html	
}
// getView([{text:'maths'},{text:'physics'},{text:'chinese'}],[{maths:60,physics:70,chinese:80},{maths:60,physics:70,chinese:80},{maths:60,physics:70,chinese:80}])
class GridView {
	constructor (config) {
		this._dom = config.dom;
		this._store = config.store;	
	}
	reload(result) {
		this.render(result);
	}

	render(result) {
		var columnModels = (result && result.columnModels) || this._store.getColumnModels();
		var data = (result && result.data) || this._store.loadData();
		var html = getView(columnModels,data);
		this._dom.innerHTML = html;
	}	

}

module.exports = GridView
