login.factory('loginServices', ['HttpServices', '$q', 'urlServices', function (HttpServices, $q, urlServices) {

    var login = function (username, password) {
        var authenticatedUser = false;
        var deferred = $q.defer();
        var userInput = {"username":username, "password":password};
        HttpServices.postJson(urlServices.getLoginUrl(), userInput).then(
            function (res) {
                if (res.user.username === username && res.user.password === password) {
                    res.user.authenticatedUser = true;
                }
                else {
                    res.user.authenticatedUser = false;
                }
                deferred.resolve(res);
            },
            function (errMsg) {
                deferred.reject(errMsg);
            }
        );
        return deferred.promise;
    };


    return {
        login: login
    };

}]);