var adminControllers = angular.module('adminControllers', ['ngSanitize']);

adminControllers
    .controller(
        'AdminCtrl',
        [
            '$scope',
            '$routeParams',
            '$http',
            '$upload',
            function($scope, $routeParams, $http, $upload) {

              $http.get(_FRONT_APP_URL_ + "Admin").success(function(data) {
                $scope.project = data;
              });
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
              };
            }]);
