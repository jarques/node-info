var http    = require('http'),
    os      = require('os'),
    url     = require('url'),
    express = require('express'),
    port    = 8080,
    app     = express.createServer();

var __dirname = 'public';

var server = http.createServer(app).listen(port, function(){
  console.log("Express server listening on port " + port);
});

app.get('/', function(req,res) {
    res.sendfile( __dirname + '/index.html');
});

app.get('*', function(req, res, next) {

    var call = url.parse(req.url).pathname.replace(/.*\/|\.[^.]*$/g, '');
    try{
        var resu = os[call]();
        res.write(JSON.stringify(resu),'utf8');
        res.end();
    } catch(e) {};

    var file = req.params[0];
    res.sendfile( __dirname + '/' + file);

});

var sio = require('socket.io').listen(server);

sio.configure(function(){

    sio.set('log level', 0);

    sio.set('authorization', function(handshakeData, callback) {
        callback(null, true);
    })

});

sio.sockets.on('connection', function(client) {

    client.emit('onconnected', { keys: Object.keys(os) });

});

console.log('Server running on port ' + port);
