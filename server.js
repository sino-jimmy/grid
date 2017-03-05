const http = require('http');
const express = require("express");

const app = express();
var querystring = require('querystring');

//var server = http.createServer(app);
app.get("/grid/:data/:method/:total", function(request, response){	
	var genDatas = require('./dao/' + request.params.data)[request.params.method];
    response.send(genDatas(request.params.total));
});
app.use(express.static(__dirname));
const server = app.listen(1337, 'localhost');
server.on('error', function(err) {
    console.log('error:' + err);
});

app.post('/ajax/deal', (req, res) => {
	console.log('post');
	var post = '';
    req.on('data', function(chunk){    
        post += chunk;
    });
    req.on('end', function(){    
        post = querystring.parse(post);
       	console.log('server accept: ', post.name, post.id);
		let data = {
			name: post.name + ' - server 1337 process',
			id: post.id + ' - server 1337 process'
		}
		res.send(data);

    });

})

server.on('listening', function(){
    console.log('server: ' + 'localhost' + ' port: ' + 1337 +' starting');
});