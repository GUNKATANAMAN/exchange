(function() {
	var moduleName = "exchangeApp";
	var controllerName = "LoginCtrl";

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

					$scope.email1 = "gunkatanaman@ezweb.ne.jp";
					$scope.password1 = "Pass7410!";

				}));

				describe(
						'put',
						function() {
							it(
									'存在しないアカウント',
									function() {

										$scope.login();
										// テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
										$httpBackend
												.expectPUT(
														_FRONT_APP_URL_
																+ "Login")
												.respond(
														{
															"error" : "\u30ed\u30b0\u30a4\u30f3\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002"
														});
										// そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
										$httpBackend.flush();

										expect($scope.messages[0]).toEqual(
												"ログインに失敗しました。");
									});
							it('ログイン成功！', function() {

								$scope.login();
								// テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
								$httpBackend.expectPUT(
										_FRONT_APP_URL_ + "Login").respond({
									"success" : true
								});
								// そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
								$httpBackend.flush();

								expect($scope.success).toEqual(true);
							});

						});
			});
})();