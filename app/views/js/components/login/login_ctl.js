login.controller('loginCtl', ['$scope', '$state', 'loginServices', 'userServices', function ($scope, $state, loginServices, userServices) {

    $scope.init = function(){
      $scope.username = "";
      $scope.password = "";
      $scope.errorMessage = "";
    };
    var successLogin = function(response){
        if(response.user.authenticatedUser === true){
            userServices.createAuthorisedUser(response.user);
            $state.go("contactList");
        }
        else{
            $scope.errorMessage = 'Oops! Your username or password is wrong. Please try again.';
        }
    } ;

    var failureLogin = function(error){
        alert("sorry, you are not authourized");
    } ;

    $scope.login = function(){
      if($scope.username && $scope.password){
          loginServices.login($scope.username, $scope.password).then(successLogin, failureLogin);
      }

    };

}]);