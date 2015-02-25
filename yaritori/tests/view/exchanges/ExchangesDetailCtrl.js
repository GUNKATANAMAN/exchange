(function() {
  var moduleName = "exchangeApp";
  var controllerName = "ExchangesDetailCtrl";

  describe(
      controllerName,
      function() {
        beforeEach(module(moduleName));

        var $controller;
        var controller;
        var $scope = {};
        var $httpBackend

        beforeEach(inject(function(_$controller_, _$httpBackend_) {
          // The injector unwraps the underscores (_) from around the
          // parameter
          // names when matching
          $controller = _$controller_;
          controller = $controller(controllerName, {
            $scope : $scope,
            $routeParams : {
              exchangeId : 12
            },
            $modalInstance : g_modalInstance
          });
          $httpBackend = _$httpBackend_;
        }));

        describe(
            'get',
            function() {
              it(
                  '初期表示',
                  function() {
                    $httpBackend
                        .expectGET(_FRONT_APP_URL_ + "Exchanges/12")
                        .respond(
                            {
                              "exchanges" : [{
                                "id" : "12",
                                "user_id" : "98",
                                "project_id" : "41",
                                "title" : "\u304b\u3063\u3053\u3092\u3064\u3051\u305f\u30c6\u30b9\u30c8",
                                "status" : "\u8d77\u7968",
                                "start_date" : "2015-12-31",
                                "end_date" : "2015-12-31",
                                "description" : "\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3068\u30e6\u30fc\u30b6\u30fc\u306e\u7d10\u4ed8\u3051\u6a5f\u80fd\u3092\u4f5c\u6210\u3059\u308b\u3002<br \/>\n\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3067\u691c\u7d22\u3057\u3001\u8ffd\u52a0\u304c\u53ef\u80fd\u3002<br \/>\n\u4e00\u89a7\u304b\u3089\u9078\u629e\u3057\u524a\u9664\u304c\u53ef\u80fd\u3002",
                                "create_date" : "2015-02-11 15:35:16",
                                "update_date" : "2015-02-12 01:06:39",
                                "name" : "\u4eca\u91ce \u62f3",
                                "users" : [{
                                  "exchange_id" : "12",
                                  "user_id" : "98",
                                  "id" : "98",
                                  "name" : "\u4eca\u91ce \u62f3",
                                  "mailaddress" : "gunkatanaman@ezweb.ne.jp",
                                  "password" : "40fbbd87428383d6ca636a583684f978"
                                }]
                              }]
                            });
                    $httpBackend
                        .expectGET(_FRONT_APP_URL_ + "History/12")
                        .respond(
                            {
                              "history" : [
                                  {
                                    "project_id" : "41",
                                    "exchange_id" : "12",
                                    "seq" : "11",
                                    "user_id" : "98",
                                    "partner_id" : "0",
                                    "description" : "\u898b\u3084\u3059\u304f\u306a\u3063\u305f\uff1f",
                                    "change_log" : "\u30bf\u30a4\u30c8\u30eb\u3092\u304b\u3063\u3053\u3092\u3064\u3051\u305f\u30c6\u30b9\u30c8\u306b\u5909\u66f4\u3002\u30b9\u30c6\u30fc\u30bf\u30b9\u3092\u300c\u8d77\u7968\u300d\u306b\u5909\u66f4\u3002\u3084\u308a\u53d6\u308a\u76f8\u624b\u3092\u300c\u4eca\u91ce \u62f3\u300d\u306b\u5909\u66f4\u3002\u958b\u59cb\u65e5\u3092\u300c2015-12-31\u300d\u306b\u5909\u66f4\u3002",
                                    "create_time" : "2015-02-12 01:06:39",
                                    "user_name" : "\u4eca\u91ce \u62f3"
                                  },
                                  {
                                    "project_id" : "41",
                                    "exchange_id" : "12",
                                    "seq" : "10",
                                    "user_id" : "98",
                                    "partner_id" : "0",
                                    "description" : "",
                                    "change_log" : "\u30bf\u30a4\u30c8\u30eb\u3092\u30d2\u30b9\u30c8\u30ea\u30fc\u3092\u8ffd\u52a0\u3057\u305f\u3068\u304d\u306b\u518d\u53d6\u5f97\u306b\u5909\u66f4\u3002",
                                    "create_time" : "2015-02-12 01:05:36",
                                    "user_name" : "\u4eca\u91ce \u62f3"
                                  },
                                  {
                                    "project_id" : "41",
                                    "exchange_id" : "12",
                                    "seq" : "9",
                                    "user_id" : "98",
                                    "partner_id" : "0",
                                    "description" : "\u5c65\u6b74\u306e\u4f5c\u6210\u3068\u8868\u793a\u304c\u306a\u3093\u3068\u306a\u304f\u5b8c\u4e86\u3002\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u7684\u306a\u30c1\u30a7\u30c3\u30af\u306f\u8981\u5fc5\u8981\u3002<br \/>\n\u5f8c\u30c6\u30b9\u30c8\u3082\u306d\u3002",
                                    "change_log" : "\u30b9\u30c6\u30fc\u30bf\u30b9\u3092\u5b8c\u4e86\u306b\u5909\u66f4\u3002",
                                    "create_time" : "2015-02-12 01:00:42",
                                    "user_name" : "\u4eca\u91ce \u62f3"
                                  },
                                  {
                                    "project_id" : "41",
                                    "exchange_id" : "12",
                                    "seq" : "8",
                                    "user_id" : "98",
                                    "partner_id" : "0",
                                    "description" : "",
                                    "change_log" : "\u30bf\u30a4\u30c8\u30eb\u3092a\u306b\u5909\u66f4\u3002",
                                    "create_time" : "2015-02-12 00:55:55",
                                    "user_name" : "\u4eca\u91ce \u62f3"
                                  },
                                  {
                                    "project_id" : "41",
                                    "exchange_id" : "12",
                                    "seq" : "7",
                                    "user_id" : "98",
                                    "partner_id" : "0",
                                    "description" : "",
                                    "change_log" : "\u30bf\u30a4\u30c8\u30eb\u3092a\u306b\u5909\u66f4\u3002",
                                    "create_time" : "2015-02-12 00:54:44",
                                    "user_name" : "\u4eca\u91ce \u62f3"
                                  },
                                  {
                                    "project_id" : "41",
                                    "exchange_id" : "12",
                                    "seq" : "6",
                                    "user_id" : "98",
                                    "partner_id" : "0",
                                    "description" : "",
                                    "change_log" : "",
                                    "create_time" : "2015-02-12 00:54:30",
                                    "user_name" : "\u4eca\u91ce \u62f3"
                                  },
                                  {
                                    "project_id" : "41",
                                    "exchange_id" : "12",
                                    "seq" : "5",
                                    "user_id" : "98",
                                    "partner_id" : "0",
                                    "description" : "",
                                    "change_log" : "",
                                    "create_time" : "2015-02-12 00:52:52",
                                    "user_name" : "\u4eca\u91ce \u62f3"
                                  },
                                  {
                                    "project_id" : "41",
                                    "exchange_id" : "12",
                                    "seq" : "4",
                                    "user_id" : "98",
                                    "partner_id" : "0",
                                    "description" : "",
                                    "change_log" : "",
                                    "create_time" : "2015-02-12 00:52:27",
                                    "user_name" : "\u4eca\u91ce \u62f3"
                                  },
                                  {
                                    "project_id" : "41",
                                    "exchange_id" : "12",
                                    "seq" : "3",
                                    "user_id" : "98",
                                    "partner_id" : "0",
                                    "description" : "",
                                    "change_log" : "\u30bf\u30a4\u30c8\u30eb\u3092a\u306b\u5909\u66f4\u3002",
                                    "create_time" : "2015-02-12 00:51:18",
                                    "user_name" : "\u4eca\u91ce \u62f3"
                                  },
                                  {
                                    "project_id" : "41",
                                    "exchange_id" : "12",
                                    "seq" : "2",
                                    "user_id" : "98",
                                    "partner_id" : "0",
                                    "description" : "",
                                    "change_log" : "\u30bf\u30a4\u30c8\u30eb\u3092aaaa\u306b\u5909\u66f4\u3002",
                                    "create_time" : "2015-02-12 00:51:04",
                                    "user_name" : "\u4eca\u91ce \u62f3"
                                  },
                                  {
                                    "project_id" : "41",
                                    "exchange_id" : "12",
                                    "seq" : "1",
                                    "user_id" : "98",
                                    "partner_id" : "0",
                                    "description" : "\u3042\u3042\u3042\u3042",
                                    "change_log" : "\u30bf\u30a4\u30c8\u30eb\u3092\u3042\u3042\u3042\u3042\u306b\u5909\u66f4\u3002\u30b9\u30c6\u30fc\u30bf\u30b9\u3092\u9032\u884c\u4e2d\u306b\u5909\u66f4\u3002\u3084\u308a\u53d6\u308a\u76f8\u624b\u3092\u4eca\u91ce \u62f3\u306b\u5909\u66f4\u3002\u958b\u59cb\u65e5\u30922015-02-10\u306b\u5909\u66f4\u3002",
                                    "create_time" : "0000-00-00 00:00:00",
                                    "user_name" : "\u4eca\u91ce \u62f3"
                                  }]
                            });
                    $httpBackend.flush();

                    expect($scope.exchange != undefined).toEqual(true);
                    expect($scope.history.length > 0).toEqual(true);
                  });
            });
      });

})();