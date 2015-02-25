(function() {
  var moduleName = "exchangeApp";
  var controllerName = "AdminCtrl";

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
            '初期表示',
            function() {
              it(
                  'get',
                  function() {
                    // テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
                    $httpBackend
                        .expectGET(_FRONT_APP_URL_ + "Admin")
                        .respond(
                            {"id":"35","user_id":"94","name":"\u8a66\u9a13\u30c7\u30fc\u30bf\u3000\u3053\u306e\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3051\u3055\u306a\u3044\u3067","description":"\u6d88\u3057\u305f\u3089\u6bba\u3059","image":"35.JPG"});
                    // そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
                    $httpBackend.flush();
                    expect($scope.project.id.length > 0).toEqual(true);

                  });
            });

      });
})();