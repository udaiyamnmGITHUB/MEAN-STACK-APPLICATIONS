utilities.factory('urlServices', [function ($http) {

   var baseUrl = "http://localhost:3000";
return{
    getLoginUrl : function(){
        //var loginUrl = baseUrl +  'user_list.json';
        //return loginUrl;
        return baseUrl + '/login';
    }
};

}]);