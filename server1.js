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
const server = app.listen(1338, 'localhost');
server.on('error', function(err) {
    console.log('error:' + err);
});

app.post('/ajax/deal', (req, res) => {
	var post = '';
    req.on('data', function(chunk){    
        post += chunk;
    });
    req.on('end', function(){    
        post = querystring.parse(post);
       	console.log('server accept: ', post.name, post.id);
		let data = {
			name: post.name + ' - server 1338 process',
			id: post.id + ' - server 1338 process'
		}
		res.send(data);
        res.end();
    });

})

app.get('/ajax/jsonp', (req, res) => {
    var post = '';
    console.log('server accept: ', req.query);
    let data = "{" + "name: '" + req.query.name + "',"
             +       "id: '" + req.query.id + "',"
             + '}';
    let callback = req.query.callback;
    let jsonp = callback + '(' + data + ')';
    console.log(jsonp);
    res.send(jsonp);
    res.end();         

})

app.get('/ajax/script', (req, res) => {
      console.log('server accept: ', req.query);
    let data = "{" + "name: '" + req.query.name + "',"
             +       "id: '" + req.query.id + "',"
             + '}';
    let callback = req.query.callback;
    let jsonp = callback + '(' + data + ')';
    console.log(jsonp);
    res.send(jsonp);
    res.end();            

})

app.post('/cors',(req, res) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', '3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    var post = '';
    req.on('data', function(chunk){    
        post += chunk;
    });
    req.on('end', function(){    
        post = querystring.parse(post);
        console.log('server accept: ', post.name, post.id);
        let data = {
            name: post.name + ' - server 1338 process',
            id: post.id + ' - server 1338 process'
        }
        res.send(data);
        res.end();
    });
})

app.get('/cors',(req, res) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', '3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    
    console.log('server accept: ', req.query.name, req.query.id);
    let data = {
        name: req.query.name + ' - server 1338 process',
        id: req.query.id + ' - server 1338 process'
    }
    res.send(data);
    res.end();

})


server.on('listening', function(){
    console.log('server: ' + 'localhost' + ' port: ' + 1338 +' starting');
});