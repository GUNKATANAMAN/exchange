(function() {
  var moduleName = "exchangeApp";
  var controllerName = "ExchangesCtrl";

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
            $scope : $scope
          });
          $httpBackend = _$httpBackend_;
        }));

        describe(
            'get',
            function() {
              it(
                  '初期表示',
                  function() {
                    // テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
                    $httpBackend
                        .expectGET(_FRONT_APP_URL_ + "Top")
                        .respond(
                            {
                              "history" : [
                                  {
                                    "project_id" : "35",
                                    "exchange_id" : "16",
                                    "seq" : "1",
                                    "user_id" : "94",
                                    "partner_id" : "0",
                                    "description" : "\u5c65\u6b74\u8ffd\u52a0\u3057\u305f\u3088",
                                    "change_log" : "",
                                    "create_time" : "2015-03-08 16:35:21",
                                    "image" : "94.JPG",
                                    "user_name" : "\u8a66\u9a13\u30c7\u30fc\u30bf"
                                  },
                                  {
                                    "project_id" : "35",
                                    "exchange_id" : "8",
                                    "seq" : "10",
                                    "user_id" : "94",
                                    "partner_id" : "0",
                                    "description" : "\u8aac\u660e",
                                    "change_log" : "\u30bf\u30a4\u30c8\u30eb\u3092\u300c\u30c6\u30b9\u30c8\u30b1\u30fc\u30b9\u4f5c\u6210\u300d\u306b\u5909\u66f4\u3002\u30b9\u30c6\u30fc\u30bf\u30b9\u3092\u300c\u9032\u884c\u4e2d\u300d\u306b\u5909\u66f4\u3002\u3084\u308a\u53d6\u308a\u76f8\u624b\u3092\u300c\u8a66\u9a13\u30c7\u30fc\u30bf\u300d\u306b\u5909\u66f4\u3002\u958b\u59cb\u65e5\u3092\u300c2015-12-31\u300d\u306b\u5909\u66f4\u3002\u7d42\u4e86\u65e5\u3092\u300c2013-12-30\u300d\u306b\u5909\u66f4\u3002",
                                    "create_time" : "2015-03-01 13:45:59",
                                    "image" : "94.JPG",
                                    "user_name" : "\u8a66\u9a13\u30c7\u30fc\u30bf"
                                  },
                                  {
                                    "project_id" : "35",
                                    "exchange_id" : "8",
                                    "seq" : "9",
                                    "user_id" : "94",
                                    "partner_id" : "0",
                                    "description" : "\u8aac\u660e",
                                    "change_log" : "\u30bf\u30a4\u30c8\u30eb\u3092\u300c\u30c6\u30b9\u30c8\u30b1\u30fc\u30b9\u4f5c\u6210\u300d\u306b\u5909\u66f4\u3002\u30b9\u30c6\u30fc\u30bf\u30b9\u3092\u300c\u9032\u884c\u4e2d\u300d\u306b\u5909\u66f4\u3002\u3084\u308a\u53d6\u308a\u76f8\u624b\u3092\u300c\u8a66\u9a13\u30c7\u30fc\u30bf\u300d\u306b\u5909\u66f4\u3002\u958b\u59cb\u65e5\u3092\u300c2015-12-31\u300d\u306b\u5909\u66f4\u3002\u7d42\u4e86\u65e5\u3092\u300c2013-12-30\u300d\u306b\u5909\u66f4\u3002",
                                    "create_time" : "2015-02-25 21:41:19",
                                    "image" : "94.JPG",
                                    "user_name" : "\u8a66\u9a13\u30c7\u30fc\u30bf"
                                  }],
                              "nice" : {
                                "exchange_id" : "16",
                                "exchange_seq" : "1",
                                "seq" : "1",
                                "user_id" : "94",
                                "description" : "\u30ca\u30a4\u30b9\u8ffd\u52a0\u3057\u305f\u3088",
                                "update_date" : "2015-03-08 16:35:49",
                                "image" : "94.JPG",
                                "user_name" : "\u8a66\u9a13\u30c7\u30fc\u30bf"
                              },
                              "bad" : {
                                "exchange_id" : "8",
                                "exchange_seq" : "3",
                                "seq" : "15",
                                "user_id" : "94",
                                "description" : "\u5e02\u306d",
                                "update_date" : "2015-03-08 16:45:33",
                                "image" : "94.JPG",
                                "user_name" : "\u8a66\u9a13\u30c7\u30fc\u30bf"
                              }
                            });
                    // そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
                    $httpBackend.flush();
                    expect($scope.history != undefined).toEqual(true);
                    expect($scope.history.length > 0).toEqual(true);
                    expect($scope.nice != undefined).toEqual(true);
                    expect($scope.bad != undefined).toEqual(true);
                  });
            });
      });

})();