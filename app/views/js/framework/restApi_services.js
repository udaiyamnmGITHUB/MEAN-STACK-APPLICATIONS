utilities.factory('HttpServices', ['$http','$q',  function ($http, $q) {

    this.contentType = 'application/json';
    var setHeaders = function(contentType){
         this.contentType = contentType;
    };

    var getHeaders = function(){
        var header = {'Content-type':this.contentType};
        return header;
    };
     var httpRequest = function (method, url, dataToBePosted){
         var deferred = $q.defer();
         $http({method:method,  url:url, data:dataToBePosted, headers: {"Content-Type": "application/json"}})
            .success(function(data, status, headers, config){
                deferred.resolve(data);
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
            });
        return deferred.promise;
    };
    function getJson(url, dataToBePosted){
        var method = 'GET';
        return httpRequest(method, url, dataToBePosted);
    }
    function postJson(url, dataToBePosted){
        var method = 'post';
        return httpRequest(method, url, dataToBePosted);
    }
    return {
        getJson : getJson,
        postJson: postJson
    };
}]);
