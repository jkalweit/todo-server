var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var Sync = require('./dist/SyncNodeServer');
var app = express();
var server = http.createServer(app);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var io = socketio(server);

var defaultData = {
    lists: {
        '0': {
            key: '0',
            text: 'Grocery 2',
            todos: {
                '0': { key: '0', text: 'Milk', isComplete: false }
            }
        }
    }
};

var syncServer = new Sync.SyncNodeServer('todos', io, defaultData);
app.use('/', express.static(path.join(__dirname, 'www/')));
// console.log('path', path.join(__dirname, '../client/'));

// using this for debugging...
app.get('/todos/reset', function (req, res) {
    syncServer.resetData(defaultData);
    res.send('Reset.');
});

app.get('/test', function (req, res) {
    syncServer.resetData(defaultData);
    res.send('Test response!');
});


var port = process.env.PORT || 1337;
server.listen(port, function () {
    console.log('Express is listening on %s:%s', server.address().address, server.address().port);
});
