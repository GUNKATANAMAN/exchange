(function() {
	var moduleName = "exchangeApp";
	var controllerName = "ProjectsListCtrl";

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
				$scope : $scope
			});
			$httpBackend = _$httpBackend_;

			$scope.name = "試験プロジェクト";
			$scope.description = "説明文テスト";

		}));

		describe('get', function() {
			it('データあり', function() {

				// テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
				$httpBackend.expectGET(_FRONT_APP_URL_ + "Projects").respond('[{"id":"12","user_id":"80","name":"\u30d4\u30d4\u3063\u3068\u30e1\u30fc\u30eb","description":"\u81ea\u793e\u30b5\u30fc\u30d3\u30b9","project_id":"12"}]');
				// そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
				$httpBackend.flush();
				expect($scope.projects.length > 0).toEqual(true);
			});
			it('データなし', function() {

				// テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
				$httpBackend.expectGET(_FRONT_APP_URL_ + "Projects").respond([]);
				// そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
				$httpBackend.flush();
				expect($scope.messages).toEqual(["プロジェクトがありません"]);
			});

		});
	});

})();