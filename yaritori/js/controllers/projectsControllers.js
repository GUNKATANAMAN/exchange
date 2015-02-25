var projectsControllers = angular.module('projectsControllers', ['ngSanitize']);

projectsControllers.controller('ProjectsListCtrl', ['$scope', '$routeParams',
    '$http', '$location', '$modal',
    function($scope, $routeParams, $http, $location, $modal) {
      function getData() {
        $scope.messages = [];
        $http.get(_FRONT_APP_URL_ + "Projects").success(function(data) {
          $scope.projects = data;
          if (data.length <= 0) {
            $scope.messages.push("プロジェクトがありません");
          }
        });
      }
      getData();

      $scope.open = function(size) {

        var modalInstance = $modal.open({
          templateUrl : _VIEW_DIR_ + 'projects/partials/input-modal.html',
          controller : 'ProjectsModalCtrl',
          size : size
        });
        modalInstance.result.then(function() {
          getData();
        }, function() {

        });

      };
      $scope.validate = function(projectId) {
        data = {
          "project_id" : projectId
        }
        $http.put(_FRONT_APP_URL_ + "Projects", data).success(function(data) {
          if (data.error) {
            $scope.messages.push(data.error);
          } else {
            $location.path("/");
          }
        });
      }

    }]);

projectsControllers.controller('ProjectsModalCtrl', ['$scope', '$routeParams',
    '$modalInstance', '$http', '$filter',
    function($scope, $routeParams, $modalInstance, $http, $filter) {

      $scope.name = "";
      $scope.ok = function() {

        $scope.messages = [];
        if ($scope.name.length <= 0) {
          $scope.messages.push("プロジェクト名は必須項目です。");
        }

        if ($scope.messages.length > 0) {
          return;
        }

        data = {
          "name" : $scope.name,
          "description" : $scope.description
        };
        $http.post(_FRONT_APP_URL_ + "Projects", data).success(function(data) {
          if (data.error) {
            $scope.messages.push(data.error);
          } else {
            $modalInstance.close();
          }
        });
      }

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }]);
