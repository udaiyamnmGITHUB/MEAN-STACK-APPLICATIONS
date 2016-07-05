var winston = require('winston');
var logstash = require('winston-logstash');

var logger = new winston.Logger();
var logstashLogger = new winston.Logger();

logger.add(winston.transports.Console, {
    handleExceptions: false,
    timestamp: true,
    json: false,
    colorize: false,
    level: 'info'
});

//Sends the log to logstash over tcp using 'winston-logstash'
logstash = function(level, message) {
}

//Sends the log to logstash over tcp
subscriptionLogstash = function(level, action, deviceType, ipAddress) {
  var logstashMessage = {};
  //action will be 'Subscribed' or 'Unsubscribed'
  logstashMessage.action = action;
  logstashMessage.ipaddress = ipAddress;
  logstash.deviceType = deviceType;
}

//Sends the log to logstash over tcp
alertLogstash = function(level, action, appId, topics) {
  var logstashMessage = {};
  //action will be 'Subscribed' or 'Unsubscribed'
  logstashMessage.action = action;
  logstashMessage.appId = appId;
  logstash.topics = topics;
}

module.exports = logger;
module.exports.logstashLogger = logstashLogger;
module.exports.subscriptionLogstash = subscriptionLogstash;
