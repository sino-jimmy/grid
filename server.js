const http = require('http');
const express = require("express");

const app = express();

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
server.on('listening', function(){
    console.log('server: ' + 'localhost' + ' port: ' + 1337 +' starting');
});