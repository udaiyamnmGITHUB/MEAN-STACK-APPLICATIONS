var bodyParser = require('body-parser');
var engine = require('ejs-locals');
var logger = require('morgan');
//var employeeDbConfig = require('./db-config/mongo-db-config');
var cookieParser = require('cookie-parser');
var errorhandler = require('errorhandler');
var compression = require('compression');
var timeout = require('connect-timeout');

module.exports = function(express, app, routes) {

    app.enable("jsonp callback");
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    console.log("::::"+__dirname)
    app.use(express.static('../views'));
    // cookieParser should be above session
    app.use(cookieParser());
    // request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({limit: '50000kb'}));
    //Parse content-type: text/plain from Android apps
    //Android apps are sending content-type as text/plain instead of application/json
    //app.use(bodyParser.text());
  //  app.use(timeout('600s'));

    app.use(compression({
      threshold: 256
    }));
    app.use('/', routes);
};