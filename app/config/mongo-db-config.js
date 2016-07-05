var mongoose = require('mongoose');
var employeeDB = {};
var db = mongoose.connection;
employeeDB.url = 'mongodb://localhost/ERP_APP';

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
   console.log('ERP_APP db	 is connected!');
});

employeeDB.connectEmployeeDB = function (){
    mongoose.connect(employeeDB.url);
};

module.exports = employeeDB;