(function() {
	var moduleName = "exchangeApp";
	var controllerName = "ExchangesModalCtrl";

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
				$modalInstance : g_modalInstance
			});
			$httpBackend = _$httpBackend_;
		}));

		describe('post', function() {
			it('登録成功', function() {
				$httpBackend.expectGET(_FRONT_APP_URL_ + "Exchanges").respond({"status":[{"id":"1","name":"\u8d77\u7968"},{"id":"2","name":"\u9032\u884c\u4e2d"},{"id":"3","name":"\u5b8c\u4e86"},{"id":"4","name":"\u4fdd\u7559"},{"id":"5","name":"\u4e2d\u6b62"}],"partner":[{"id":"98","name":"\u4eca\u91ce \u62f3"}],"exchanges":[{"id":"12","user_id":"98","project_id":"41","title":"\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3068\u30e6\u30fc\u30b6\u30fc\u306e\u7d10\u4ed8\u3051\u6a5f\u80fd\u4f5c\u6210","status":"1","start_date":"2015-02-11","end_date":"2015-02-27","description":"\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3068\u30e6\u30fc\u30b6\u30fc\u306e\u7d10\u4ed8\u3051\u6a5f\u80fd\u3092\u4f5c\u6210\u3059\u308b\u3002\n\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3067\u691c\u7d22\u3057\u3001\u8ffd\u52a0\u304c\u53ef\u80fd\u3002\n\u4e00\u89a7\u304b\u3089\u9078\u629e\u3057\u524a\u9664\u304c\u53ef\u80fd\u3002","create_date":"2015-02-11 15:35:16","update_date":"2015-02-11 15:35:16","name":"\u4eca\u91ce \u62f3","users":[{"exchange_id":"12","user_id":"98","id":"98","name":"\u4eca\u91ce \u62f3","mailaddress":"gunkatanaman@ezweb.ne.jp","password":"40fbbd87428383d6ca636a583684f978"}]},{"id":"13","user_id":"98","project_id":"41","title":"\u3066\u3059\u3068\u6295\u7a3f","status":"1","start_date":"2015-02-11","end_date":"0000-00-00","description":"\u30c6\u30b9\u30c8\u8aac\u660e","create_date":"2015-02-11 17:46:58","update_date":"2015-02-11 17:46:58","name":"\u4eca\u91ce \u62f3","users":[{"exchange_id":"13","user_id":"98","id":"98","name":"\u4eca\u91ce \u62f3","mailaddress":"gunkatanaman@ezweb.ne.jp","password":"40fbbd87428383d6ca636a583684f978"}]}]});
				$httpBackend.flush();

				$scope.title = "test title";
				$scope.description = "test description";
				$scope.ok();
				// テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
				$httpBackend.expectPOST(_FRONT_APP_URL_ + "Exchanges").respond({
					success : true
				});
				// そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
				$httpBackend.flush();
				expect(g_modalInstance.close).toHaveBeenCalled();
			});
			it('登録失敗', function() {
				$scope.name = "";
				$scope.ok();
				expect($scope.messages.length > 0).toEqual(true);
			});
		});
	});

})();