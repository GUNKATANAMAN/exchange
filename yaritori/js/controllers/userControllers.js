var userControllers = angular.module('userControllers', ['ngSanitize',
    'angularFileUpload']);

userControllers.controller('UserCtrl', [
    '$scope',
    '$routeParams',
    '$http',
    '$upload',
    function($scope, $routeParams, $http, $upload) {

      // {"id":"98","name":"\u4eca\u91ce","mailaddress":"gunkatanaman@ezweb.ne.jp","password":"40fbbd87428383d6ca636a583684f978","image":"98.JPG"}
      $http.get(_FRONT_APP_URL_ + "User").success(function(data) {
        $scope.user = data;
      });

      $scope.update = function() {
        $http.put(_FRONT_APP_URL_ + "User", $scope.user).success(
            function(data) {
            });
      }

      $scope.upload = function(files) {
        if (files && files.length) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            $upload.upload({
              url : _FRONT_APP_URL_ + 'upload',
              fields : {
                'type' : 'User'
              },
              file : file
            }).progress(
                function(evt) {
                  var progressPercentage = parseInt(100.0 * evt.loaded
                      / evt.total);
                }).success(
                function(data, status, headers, config) {
                  $scope.user.image = data.filename + "?"
                      + new Date().getTime();
                });
          }
        }
      };
    }]);