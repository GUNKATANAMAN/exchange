(function() {
  var moduleName = "exchangeApp";
  var controllerName = "UserCtrl";

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
                        .expectGET(_FRONT_APP_URL_ + "User")
                        .respond(
                            {"id":"98","name":"\u4eca\u91cegggg","mailaddress":"gunkatanaman@ezweb.ne.jp","password":"40fbbd87428383d6ca636a583684f978","image":"98.JPG"});
                    // そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
                    $httpBackend.flush();
                    expect($scope.user.id.length > 0).toEqual(true);

                  });
            });

      });
})();