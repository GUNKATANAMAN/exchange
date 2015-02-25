var loginControllers = angular.module('loginControllers', ['ngSanitize']);

loginControllers.controller('LoginCtrl', ['$scope', '$routeParams', '$http', '$location', 'AuthService',
  function($scope, $routeParams, $http, $location, AuthService) {
	$scope.login = function() {
		$scope.messages = [];
		messages = [];
		if($scope.email1.length <= 0 || $scope.password1.length <= 0){
			return false;
		}
		data = {
				mailaddress: $scope.email1,
				password: $scope.password1
		};
		$http.put(_FRONT_APP_URL_ + "Login",data
				).success(function(data){
					if(data.error){
						$scope.messages.push(data.error);
					}else{
						$scope.success = data.success;
						AuthService.login();
						$location.path("/projects");
					}
				});
	}
  }]);