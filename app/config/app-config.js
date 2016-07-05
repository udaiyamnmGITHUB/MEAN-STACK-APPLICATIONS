var intializeTheAppConfig = function() {
    var http = require('http');
    var passport = require('passport');
    var express = require('express');
    var app = module.exports = express();
    var routes = express.Router();
    var envConfigObj = require('./env-config');
    var employeeDbConfig = require('./mongo-db-config');

    // catch the uncaught errors that weren't wrapped in a domain or try catch statement
    // do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
    process.on('uncaughtException', function(err) {
        // handle the error safely
        console.log('process error is caught' + err.stack);
    });

    // establish mongodb connection
    //set to correct env
    envConfigObj.updateEnv();

    //connect to EmployeeDB
    employeeDbConfig.connectEmployeeDB();
    
    
    // express config
    console.log('express');
    require('./express-config')(express, app, routes);
    // passport config
    require('./passport-config')(app, passport);
    console.log(__dirname);
    require('../routes/app-routes')(app, routes, passport);
    console.log('express config is done');

    var port = process.env.PORT || '3000';

    var server = http.createServer(app).listen(port);

    console.log('app port is: ', +port);
    var socketIO = require('socket.io')(server);
    var clientsockets = [];

    //Socket emitter
    socketIO.on('connection', function(socket) {

      clientsockets.push(socket);
      logger.info('Sockets Connected:', clientsockets.length);

      socket.on('disconnect', function () {
        //Remove the socket from the array when the connection is closed
        clientsockets.splice(clientsockets.indexOf(socket), 1);
      });


    });

    //https.createServer(app).listen(port);
    console.log('Server listening on port', port);

};

var appConfig = {};
appConfig.intializeTheAppConfig = intializeTheAppConfig;

module.exports = appConfig;