var exchangesControllers = angular.module('exchangesControllers',
    ['ngSanitize']);

exchangesControllers
    .controller(
        'ExchangesListCtrl',
        [
            '$scope',
            '$http',
            '$modal',
            '$location',
            '$filter',
            function($scope, $http, $modal, $location, $filter) {

              $scope.title = $scope.end_date = $scope.description = $scope.start_date = "";
              $http.get(_FRONT_APP_URL_ + "Exchanges").success(function(data) {
                $scope.statusOptions = data.status;
                $scope.partnerOptions = data.partner;
                $scope.statusOptions.unshift({
                  "" : ""
                });
                $scope.partnerOptions.unshift({
                  "" : ""
                });
                $scope.exchanges = data.exchanges;
              });

              $scope.open = function(size) {

                var modalInstance = $modal.open({
                  templateUrl : _VIEW_DIR_
                      + 'exchanges/partials/input-modal.html',
                  controller : 'ExchangesModalCtrl',
                  size : size
                });

                modalInstance.result.then(function(selectedItem) {
                  $scope.selected = selectedItem;
                }, function() {

                });
              };

              $scope.search = function() {
                params = "";
                if ($scope.title != "")
                  params = params + "/title/" + $scope.title;
                if ($scope.user_id != "" && $scope.user_id != undefined)
                  params = params + "/user_id/" + $scope.user_id;
                if ($scope.partner != "" && $scope.partner != undefined)
                  params = params + "/partner/" + $scope.partner;
                if ($scope.status != "" && $scope.status != undefined)
                  params = params + "/status/" + $scope.status;
                if ($scope.start_date != null && $scope.start_date != "")
                  params = params + "/start_date/"
                      + $filter('date')($scope.start_date, 'yyyy-MM-dd');
                if ($scope.end_date != null && $scope.end_date != "")
                  params = params + "/end_date/"
                      + $filter('date')($scope.end_date, 'yyyy-MM-dd');
                if ($scope.create_date != null && $scope.create_date != "")
                  params = params + "/create_date/"
                      + $filter('date')($scope.create_date, 'yyyy-MM-dd');
                if ($scope.update_date != null && $scope.update_date != "")
                  params = params + "/update_date/"
                      + $filter('date')($scope.update_date, 'yyyy-MM-dd');;

                $http.get(_FRONT_APP_URL_ + "Exchanges" + params).success(
                    function(data) {
                      $scope.exchanges = data.exchanges;
                    });
              }

              $scope.goDetail = function(id) {
                $location.path("/exchanges/" + id);
              }

            }]);

exchangesControllers.controller('ExchangesModalCtrl', [
    '$scope',
    '$routeParams',
    '$modalInstance',
    '$http',
    '$filter',
    function($scope, $routeParams, $modalInstance, $http, $filter) {

      $http.get(_FRONT_APP_URL_ + "Exchanges").success(function(data) {
        $scope.statusOptions = data.status;
        $scope.partnerOptions = data.partner;
        $scope.status = $scope.statusOptions[0].id;
        $scope.partner = $scope.partnerOptions[0].id;
      });
      hiduke = new Date();
      $scope.startdate = new Date();
      $scope.title = $scope.enddate = $scope.description = "";

      $scope.ok = function() {
        $scope.messages = [];
        // 必須チェック
        if ($scope.title.length <= 0) {
          $scope.messages.push("タイトルは必須項目です。");
        }
        if ($scope.status.length <= 0) {
          $scope.messages.push("ステータスは必須項目です。");
        }
        if ($scope.partner.length <= 0) {
          $scope.messages.push("やり取り相手は必須項目です。");
        }
        if ($scope.description.length <= 0) {
          $scope.messages.push("説明は必須項目です。");
        }

        if ($scope.messages.length > 0) {
          return false;
        } else {
          data = {
            "title" : $scope.title,
            "status" : $scope.status,
            "partner" : $scope.partner,
            "start_date" : $scope.startdate,
            "end_date" : $scope.enddate,
            "description" : $scope.description
          }
          $http.post(_FRONT_APP_URL_ + "Exchanges", data).success(
              function(data) {
                if (data.error) {
                  $scope.messages.push(data.error);
                } else {
                  $scope.success = data.success;
                  $modalInstance.close();
                }
              });

        }
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }]);

exchangesControllers.controller('ExchangesDetailCtrl', [
    '$scope',
    '$routeParams',
    '$modal',
    '$http',
    '$routeParams',
    function($scope, $routeParams, $modal, $http, $routeParams) {

      $http.get(_FRONT_APP_URL_ + "Exchanges/" + $routeParams.exchangeId)
          .success(function(data) {
            $scope.exchange = data.exchanges[0];
          })
      function getHistory() {
        $http.get(_FRONT_APP_URL_ + "History/" + $routeParams.exchangeId)
            .success(function(data) {
              $scope.history = data.history;
            })
      }
      getHistory();
      // 履歴追加モーダル
      $scope.openHistory = function() {

        var modalInstance = $modal.open({
          templateUrl : _VIEW_DIR_
              + 'exchanges/partials/input-history-modal.html',
          controller : 'ExchangesHistoryModalCtrl'
        });

        modalInstance.result.then(function(selectedItem) {
          getHistory();
        }, function() {

        });
      };

      // ナイス追加モーダル
      $scope.openNice = function(seq) {
        var modalNiceInstance = $modal
            .open({
              templateUrl : _VIEW_DIR_
                  + 'exchanges/partials/input-nice-modal.html',
              controller : 'ExchangesNiceModalCtrl',
              resolve : {
                exchange_seq : function() {
                  return seq
                }
              }
            });

        modalNiceInstance.result.then(function(selectedItem) {
          getHistory();
        }, function() {

        });
      };

      // バッド追加モーダル
      $scope.openBad = function(seq) {
        var modalNiceInstance = $modal.open({
          templateUrl : _VIEW_DIR_ + 'exchanges/partials/input-bad-modal.html',
          controller : 'ExchangesBadModalCtrl',
          resolve : {
            exchange_seq : function() {
              return seq
            }
          }
        });

        modalNiceInstance.result.then(function(selectedItem) {
          getHistory();
        }, function() {

        });
      };

    }]);

exchangesControllers.controller('ExchangesHistoryModalCtrl', [
    '$scope',
    '$routeParams',
    '$modalInstance',
    '$http',
    '$filter',
    function($scope, $routeParams, $modalInstance, $http, $filter) {

      $scope.title = $scope.description = "";
      $http.get(_FRONT_APP_URL_ + "Exchanges").success(function(data) {
        $scope.statusOptions = data.status;
        $scope.partnerOptions = data.partner;
        $scope.statusOptions.unshift({
          "" : ""
        });
        $scope.partnerOptions.unshift({
          "" : ""
        });
      });
      $scope.ok = function() {
        $scope.messages = [];
        params = {};
        isEmpty = true;
        if ($scope.title != "" && $scope.title != undefined) {
          params.title = $scope.title;
          isEmpty = false;
        }
        if ($scope.user_id != "" && $scope.user_id != undefined) {
          params.user_id = $scope.user_id;
          isEmpty = false;
        }
        if ($scope.partner != "" && $scope.partner != undefined) {
          params.partner = $scope.partner;
          isEmpty = false;
        }
        if ($scope.status != "" && $scope.status != undefined) {
          params.status = $scope.status;
          isEmpty = false;
        }
        if ($scope.start_date != null && $scope.start_date != ""
            && $scope.start_date != undefined) {
          params.start_date = $filter('date')($scope.start_date, 'yyyy-MM-dd');
          isEmpty = false;
        }
        if ($scope.end_date != null && $scope.end_date != ""
            && $scope.end_date != undefined) {
          params.end_date = $filter('date')($scope.end_date, 'yyyy-MM-dd');
          isEmpty = false;
        }
        if ($scope.create_date != null && $scope.create_date != ""
            && $scope.create_date != undefined) {
          params.create_date = $filter('date')
              ($scope.create_date, 'yyyy-MM-dd');
          isEmpty = false;
        }
        if ($scope.update_date != null && $scope.update_date != ""
            && $scope.update_date != undefined) {
          params.update_date = $filter('date')
              ($scope.update_date, 'yyyy-MM-dd');
          isEmpty = false;
        }
        if ($scope.description != "" && $scope.description != undefined) {
          params.description = $scope.description;
          isEmpty = false;
        }

        if (isEmpty) {
          $scope.messages.push("履歴を追加するには１つ以上の変更が必要です。");
        }

        params.exchange_id = $routeParams.exchangeId;

        if ($scope.messages.length > 0) {
          return false;
        } else {
          $http.post(_FRONT_APP_URL_ + "History", params).success(
              function(data) {
                if (data.error) {
                  $scope.messages.push(data.error);
                } else {
                  $scope.success = data.success;
                  $modalInstance.close();
                }
              });

        }
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }]);

exchangesControllers.controller('ExchangesNiceModalCtrl', ['$scope',
    '$routeParams', '$modalInstance', '$http', 'exchange_seq',
    function($scope, $routeParams, $modalInstance, $http, exchange_seq) {

      $scope.description = "";
      $scope.ok = function() {
        $scope.messages = [];
        params = {};
        isEmpty = true;

        params.exchange_id = $routeParams.exchangeId;
        params.exchange_seq = exchange_seq;
        params.description = $scope.description;

        if ($scope.messages.length > 0) {
          return false;
        } else {
          $http.post(_FRONT_APP_URL_ + "Nice", params).success(function(data) {
            if (data.error) {
              $scope.messages.push(data.error);
            } else {
              $scope.success = data.success;
              $modalInstance.close();
            }
          });

        }
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }]);

exchangesControllers.controller('ExchangesBadModalCtrl', ['$scope',
    '$routeParams', '$modalInstance', '$http', 'exchange_seq',
    function($scope, $routeParams, $modalInstance, $http, exchange_seq) {

      $scope.description = "";
      $scope.ok = function() {
        $scope.messages = [];
        params = {};
        isEmpty = true;

        params.exchange_id = $routeParams.exchangeId;
        params.exchange_seq = exchange_seq;
        params.description = $scope.description;

        if ($scope.messages.length > 0) {
          return false;
        } else {
          $http.post(_FRONT_APP_URL_ + "Bad", params).success(function(data) {
            if (data.error) {
              $scope.messages.push(data.error);
            } else {
              $scope.success = data.success;
              $modalInstance.close();
            }
          });

        }
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }]);

exchangesControllers.controller('ExchangesCtrl', [
    '$scope',
    '$routeParams',
    '$http',
    function($scope, $routeParams, $http) {
      /*
       * sample json [ { id:1, number:1, person_name:"今野", header_text:{
       * status:"進行中" }, img_url:"", body_text:"説明文テスト<br>説明文テスト<br>説明文テスト<br>" } ];
       */
      $scope.cards = $http.get(_FRONT_APP_URL_ + "Top/index").success(
          function(data) {
            $scope.cards = data;
          });
    }]);