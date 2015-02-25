var headerControllers = angular.module('headerControllers', ['ngSanitize']);

headerControllers.controller('HeaderCtrl', ['$scope', '$location',
    function($scope, $location) {
      $scope.isActive = function(viewLocation) {
        data = $location.path().split("/");
        return data[1] === viewLocation;
      }
    }]);