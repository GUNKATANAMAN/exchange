(function() {
  var moduleName = "exchangeApp";
  var controllerName = "ExchangesListCtrl";

  describe(
      controllerName,
      function() {
        beforeEach(module(moduleName));

        var $controller;
        var controller;
        var $scope = {};
        var $httpBackend;
        var $location;

        beforeEach(inject(function(_$controller_, _$httpBackend_, _$location_) {
          // The injector unwraps the underscores (_) from around the
          // parameter
          // names when matching
          $controller = _$controller_;
          controller = $controller(controllerName, {
            $scope : $scope
          });
          $httpBackend = _$httpBackend_;
          $location = _$location_;

          $scope.name = "試験プロジェクト";
          $scope.description = "説明文テスト";

        }));

        describe(
            'get',
            function() {
              it(
                  'データあり',
                  function() {
                    // テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
                    $httpBackend
                        .expectGET(_FRONT_APP_URL_ + "Exchanges")
                        .respond(
                            {
                              "status" : [{
                                "id" : "1",
                                "name" : "\u8d77\u7968"
                              }, {
                                "id" : "2",
                                "name" : "\u9032\u884c\u4e2d"
                              }, {
                                "id" : "3",
                                "name" : "\u5b8c\u4e86"
                              }, {
                                "id" : "4",
                                "name" : "\u4fdd\u7559"
                              }, {
                                "id" : "5",
                                "name" : "\u4e2d\u6b62"
                              }],
                              "partner" : [{
                                "id" : "98",
                                "name" : "\u4eca\u91ce \u62f3"
                              }],
                              "exchanges" : [
                                  {
                                    "id" : "12",
                                    "user_id" : "98",
                                    "project_id" : "41",
                                    "title" : "\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3068\u30e6\u30fc\u30b6\u30fc\u306e\u7d10\u4ed8\u3051\u6a5f\u80fd\u4f5c\u6210",
                                    "status" : "1",
                                    "start_date" : "2015-02-11",
                                    "end_date" : "2015-02-27",
                                    "description" : "\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3068\u30e6\u30fc\u30b6\u30fc\u306e\u7d10\u4ed8\u3051\u6a5f\u80fd\u3092\u4f5c\u6210\u3059\u308b\u3002\n\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3067\u691c\u7d22\u3057\u3001\u8ffd\u52a0\u304c\u53ef\u80fd\u3002\n\u4e00\u89a7\u304b\u3089\u9078\u629e\u3057\u524a\u9664\u304c\u53ef\u80fd\u3002",
                                    "create_date" : "2015-02-11 15:35:16",
                                    "update_date" : "2015-02-11 15:35:16",
                                    "name" : "\u4eca\u91ce \u62f3",
                                    "users" : [{
                                      "exchange_id" : "12",
                                      "user_id" : "98",
                                      "id" : "98",
                                      "name" : "\u4eca\u91ce \u62f3",
                                      "mailaddress" : "gunkatanaman@ezweb.ne.jp",
                                      "password" : "40fbbd87428383d6ca636a583684f978"
                                    }]
                                  },
                                  {
                                    "id" : "13",
                                    "user_id" : "98",
                                    "project_id" : "41",
                                    "title" : "\u3066\u3059\u3068\u6295\u7a3f",
                                    "status" : "1",
                                    "start_date" : "2015-02-11",
                                    "end_date" : "0000-00-00",
                                    "description" : "\u30c6\u30b9\u30c8\u8aac\u660e",
                                    "create_date" : "2015-02-11 17:46:58",
                                    "update_date" : "2015-02-11 17:46:58",
                                    "name" : "\u4eca\u91ce \u62f3",
                                    "users" : [{
                                      "exchange_id" : "13",
                                      "user_id" : "98",
                                      "id" : "98",
                                      "name" : "\u4eca\u91ce \u62f3",
                                      "mailaddress" : "gunkatanaman@ezweb.ne.jp",
                                      "password" : "40fbbd87428383d6ca636a583684f978"
                                    }]
                                  }]
                            });
                    // そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
                    $httpBackend.flush();
                    expect($scope.exchanges.length > 0).toEqual(true);
                  });
              it('データなし', function() {
                // テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
                $httpBackend.expectGET(_FRONT_APP_URL_ + "Exchanges").respond({
                  "status" : [{
                    "id" : "1",
                    "name" : "\u8d77\u7968"
                  }, {
                    "id" : "2",
                    "name" : "\u9032\u884c\u4e2d"
                  }, {
                    "id" : "3",
                    "name" : "\u5b8c\u4e86"
                  }, {
                    "id" : "4",
                    "name" : "\u4fdd\u7559"
                  }, {
                    "id" : "5",
                    "name" : "\u4e2d\u6b62"
                  }],
                  "partner" : [{
                    "id" : "98",
                    "name" : "\u4eca\u91ce \u62f3"
                  }],
                  "exchanges" : []
                });
                // そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
                $httpBackend.flush();
                expect($scope.exchanges.length <= 0).toEqual(true);
              });
              it('リンク！', function() {
                // テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
                $httpBackend.expectGET(_FRONT_APP_URL_ + "Exchanges").respond({
                  "status" : [{
                    "id" : "1",
                    "name" : "\u8d77\u7968"
                  }, {
                    "id" : "2",
                    "name" : "\u9032\u884c\u4e2d"
                  }, {
                    "id" : "3",
                    "name" : "\u5b8c\u4e86"
                  }, {
                    "id" : "4",
                    "name" : "\u4fdd\u7559"
                  }, {
                    "id" : "5",
                    "name" : "\u4e2d\u6b62"
                  }],
                  "partner" : [{
                    "id" : "98",
                    "name" : "\u4eca\u91ce \u62f3"
                  }],
                  "exchanges" : []
                });
                // そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
                $httpBackend.flush();
                spyOn($location, 'path');
                $scope.goDetail(1);
                expect($location.path).toHaveBeenCalledWith('/exchanges/1');
              });

            });

        describe(
            'search',
            function() {
              it(
                  'データあり',
                  function() {
                    // テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
                    $httpBackend.expectGET(_FRONT_APP_URL_ + "Exchanges")
                        .respond({
                          "status" : [{
                            "id" : "1",
                            "name" : "\u8d77\u7968"
                          }, {
                            "id" : "2",
                            "name" : "\u9032\u884c\u4e2d"
                          }, {
                            "id" : "3",
                            "name" : "\u5b8c\u4e86"
                          }, {
                            "id" : "4",
                            "name" : "\u4fdd\u7559"
                          }, {
                            "id" : "5",
                            "name" : "\u4e2d\u6b62"
                          }],
                          "partner" : [{
                            "id" : "98",
                            "name" : "\u4eca\u91ce \u62f3"
                          }],
                          "exchanges" : []
                        });
                    // そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
                    $httpBackend.flush();

                    $scope.create_date = $scope.end_date = $scope.start_date = $scope.update_date = new Date('2015-02-15');
                    $scope.partner = 98;
                    $scope.user_id = 98;
                    $scope.status = 1;

                    $scope.search();
                    $httpBackend
                        .expectGET(
                            _FRONT_APP_URL_
                                + "Exchanges/user_id/98/partner/98/status/1/start_date/2015-02-15/end_date/2015-02-15/create_date/2015-02-15/update_date/2015-02-15")
                        .respond(
                            {
                              "exchanges" : [{
                                "id" : "12",
                                "user_id" : "98",
                                "project_id" : "41",
                                "title" : "\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3068\u30e6\u30fc\u30b6\u30fc\u306e\u7d10\u4ed8\u3051\u6a5f\u80fd\u4f5c\u6210",
                                "status" : "1",
                                "start_date" : "2015-02-11",
                                "end_date" : "2015-02-27",
                                "description" : "\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3068\u30e6\u30fc\u30b6\u30fc\u306e\u7d10\u4ed8\u3051\u6a5f\u80fd\u3092\u4f5c\u6210\u3059\u308b\u3002\n\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3067\u691c\u7d22\u3057\u3001\u8ffd\u52a0\u304c\u53ef\u80fd\u3002\n\u4e00\u89a7\u304b\u3089\u9078\u629e\u3057\u524a\u9664\u304c\u53ef\u80fd\u3002",
                                "create_date" : "2015-02-11 15:35:16",
                                "update_date" : "2015-02-11 15:35:16",
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
                    // そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
                    $httpBackend.flush();
                    expect($scope.exchanges.length > 0).toEqual(true);
                  });
              it(
                  'データなし',
                  function() {
                    // テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
                    $httpBackend.expectGET(_FRONT_APP_URL_ + "Exchanges")
                        .respond({
                          "status" : [{
                            "id" : "1",
                            "name" : "\u8d77\u7968"
                          }, {
                            "id" : "2",
                            "name" : "\u9032\u884c\u4e2d"
                          }, {
                            "id" : "3",
                            "name" : "\u5b8c\u4e86"
                          }, {
                            "id" : "4",
                            "name" : "\u4fdd\u7559"
                          }, {
                            "id" : "5",
                            "name" : "\u4e2d\u6b62"
                          }],
                          "partner" : [{
                            "id" : "98",
                            "name" : "\u4eca\u91ce \u62f3"
                          }],
                          "exchanges" : []
                        });
                    // そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
                    $httpBackend.flush();

                    $scope.create_date = $scope.end_date = $scope.start_date = $scope.update_date = new Date('2015-02-15');
                    $scope.partner = 98;
                    $scope.user_id = 98;
                    $scope.status = 1;
                    $scope.search();
                    $httpBackend
                        .expectGET(
                            _FRONT_APP_URL_
                                + "Exchanges/user_id/98/partner/98/status/1/start_date/2015-02-15/end_date/2015-02-15/create_date/2015-02-15/update_date/2015-02-15")

                        .respond('{"exchanges":[]}');
                    // そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
                    $httpBackend.flush();
                    expect($scope.exchanges.length <= 0).toEqual(true);
                  });

            })
      });

})();