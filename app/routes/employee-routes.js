var employeeHandler = require('../employee-handlers');
module.exports = function(routes) {

/* Fetches the news catagories */
    routes.get('/', employeeHandler.getIndexPage);
    
};
