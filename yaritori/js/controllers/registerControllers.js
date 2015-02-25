var registerControllers = angular.module('registerControllers',
		[ 'ngSanitize' ]);

registerControllers.controller('RegisterCtrl', [
		'$scope',
		'$routeParams',
		'$http',
		'$location',
		'$timeout',
		function($scope, $routeParams, $http, $location, $timeout) {
			$scope.validate = function() {
				result = true;
				$scope.messages = [];
				messages = [];

				if ($scope.name.length <= 0 || $scope.password1.length <= 0
						|| $scope.password2.length <= 0
						|| $scope.email1.length <= 0
						|| $scope.email2.length <= 0) {
					return false;

				}

				if ($scope.email1 != $scope.email2) {
					messages.push("メールアドレスに誤りがあります。");
				}
				if ($scope.password1 != $scope.password2) {
					messages.push("パスワードに誤りがあります。");
				}
				if (messages.length > 0) {
					$scope.messages = messages;
					return false;

				}

				data = {
					name : $scope.name,
					mailaddress : $scope.email1,
					password : $scope.password1
				};
				$http.post(_FRONT_APP_URL_ + "Register", data).success(
						function(data) {
							if (data.error) {
								$scope.messages.push(data.error);
							} else {
								$scope.success = data.success;
								$timeout(function() {
									$location.path("/login");
								}, 1000);
							}
						});
			}
		} ]);