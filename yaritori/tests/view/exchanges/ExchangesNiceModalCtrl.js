(function() {
  var moduleName = "exchangeApp";
  var controllerName = "ExchangesNiceModalCtrl";

  describe(controllerName, function() {
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
        $modalInstance : g_modalInstance,
        $routeParams : {
          exchangeId : "8"
        },
        exchange_seq : "3"

      });
      $httpBackend = _$httpBackend_;
    }));

    describe('get', function() {
      it('登録成功', function() {
        $scope.description = "きゃぷちゃナイス";

        $scope.ok();
        // テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
        $httpBackend.expectPOST(_FRONT_APP_URL_ + "Nice", {
          "exchange_id" : "8",
          "exchange_seq" : "3",
          "description" : "きゃぷちゃナイス"
        }).respond({
          success : true
        });
        // そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
        $httpBackend.flush();
        expect(g_modalInstance.close).toHaveBeenCalled();
      });
    });
  });

})();