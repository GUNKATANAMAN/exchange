var adminControllers = angular.module('adminControllers', ['ngSanitize']);

adminControllers.controller('AdminCtrl', [
    '$scope',
    '$routeParams',
    '$http',
    '$upload',
    function($scope, $routeParams, $http, $upload) {

      $http.get(_FRONT_APP_URL_ + "Admin").success(function(data) {
        $scope.project = data;
      });
      getUserProject = function(){
        $http.get(_FRONT_APP_URL_ + "UserProject").success(function(data) {
          $scope.users = data;
        });
      }
      getUserProject();

      $scope.update = function() {
        $http.put(_FRONT_APP_URL_ + "Admin", $scope.project).success(
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
                'type' : 'Project'
              },
              file : file
            }).progress(
                function(evt) {
                  var progressPercentage = parseInt(100.0 * evt.loaded
                      / evt.total);
                }).success(
                function(data, status, headers, config) {
                  $scope.project.image = data.filename + "?"
                      + new Date().getTime();
                });
          }
        }
      }

      $scope.searchUser = function() {
        $scope.messages = [];
        $scope.success = null;
        $http.get(_FRONT_APP_URL_ + "UserProject/" + $scope.mailaddress)
            .success(function(data) {
              if(!!data.error){
                $scope.messages = [data.error];
                $scope.user = null;
              }else{
                $scope.user = data;
              }
            });
      }

      $scope.addUser = function(user_id) {
        $scope.messages = [];
        $scope.success = null;
        params = {
          'user_id' : user_id
        };
        $http.post(_FRONT_APP_URL_ + "UserProject", params).success(
            function(data) {
              // $scope.user = data;
              getUserProject();
              $scope.success = true;
            });
      }

      $scope.deleteUser = function(userId) {
        $scope.messages = [];
        $scope.success = null;
        $http.delete(_FRONT_APP_URL_ + "UserProject/" + userId).success(
            function(data) {
              // $scope.user = data;
              getUserProject();
            });
      }

    }]);
