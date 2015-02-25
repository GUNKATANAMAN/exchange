(function() {
	var moduleName = "exchangeApp";
	var controllerName = "RegisterCtrl";

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

					$scope.name = "今野";
					$scope.email1 = "gunkatanaman@ezweb.ne.jp";
					$scope.email2 = "gunkatanaman@ezweb.ne.jp";
					$scope.password1 = "Pass7410!";
					$scope.password2 = "Pass7410!";

				}));

				describe('validate', function() {
					it('メールアドレス違い',
							function() {
								$scope.email2 = "test@test.com";
								$scope.validate();
								expect($scope.messages).toEqual(
										[ "メールアドレスに誤りがあります。" ]);
							});
					it('パスワード違い', function() {
						$scope.password1 = "abc";
						$scope.validate();
						expect($scope.messages).toEqual([ "パスワードに誤りがあります。" ]);
					});
					it('メル／パスワード違い', function() {
						$scope.email2 = "test@test.com";
						$scope.password1 = "abc";
						$scope.validate();
						expect($scope.messages).toEqual(
								[ "メールアドレスに誤りがあります。", "パスワードに誤りがあります。" ]);

					});
				});
				describe(
						'post',
						function() {
							it('登録成功', function() {

								$scope.validate();
								// テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
								$httpBackend.expectPOST(
										_FRONT_APP_URL_ + "Register").respond({
									success : true
								});
								// そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
								$httpBackend.flush();

								expect($scope.success).toEqual(true);
							});
							it(
									'すでに使用されているメールアドレス',
									function() {

										$scope.validate();
										// テスト用に、このURLに対してajax通信すると、事前に知らせる必要があるらしい
										$httpBackend
												.expectPOST(
														_FRONT_APP_URL_
																+ "Register")
												.respond(
														{
															"error" : "\u3059\u3067\u306b\u767b\u9332\u3055\u308c\u3066\u3044\u308b\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3067\u3059\u3002"
														});
										// そしてflushで実行、あくまでMOCデータ、データの検証はサーバーサイドのテストとなる
										$httpBackend.flush();

										expect($scope.messages[0]).toEqual(
												"すでに登録されているメールアドレスです。");
									});

						});
			});
})();