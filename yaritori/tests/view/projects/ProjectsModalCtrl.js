(function() {
	var moduleName = "exchangeApp";
	var controllerName = "ProjectsModalCtrl";

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

			$scope.name = "試験プロジェクト";
			$scope.description = "説明文テスト";

		}));

		describe('post', function() {
			it('登録成功', function() {
				$scope.ok();
				// テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
				$httpBackend.expectPOST(_FRONT_APP_URL_ + "Projects").respond({
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