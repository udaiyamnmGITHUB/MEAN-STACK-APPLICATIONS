var envConfigObj = {};
var dev = "dev";
var sit = "sit";
var uat = "uat";
var prod = "prod";
var RC_ENV = '-rc';
var updateEnv = function(){

	var orgEnv = process.env.ENVIRONMENT;

	 try {
        if (process.env.ENVIRONMENT) {
            console.log('Environment is defined already');
        }

        else{
			process.env.ENVIRONMENT = dev;
        	console.log('Environment is set to dev');
        }

    }
    catch (error) {
        console.log('Error occurred to set the environment', error);
        process.env.ENVIRONMENT = originalEnvVal;
    }

};

envConfigObj.updateEnv = updateEnv;

module.exports = envConfigObj;