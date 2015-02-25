var exchangeApp = angular.module('exchangeApp', ['ngRoute', 'ngAnimate',
		'wc.Directives', 'ui.bootstrap', 'exchangesControllers',
		'loginControllers', 'registerControllers', 'projectsControllers','userControllers','adminControllers','headerControllers']);

exchangeApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/exchanges', {
		templateUrl : _VIEW_DIR_ + 'exchanges/list.html',
		controller : 'ExchangesListCtrl'
	}).when('/exchanges/:exchangeId', {
		templateUrl : _VIEW_DIR_ + 'exchanges/detail.html',
		controller : 'ExchangesDetailCtrl'
	}).when('/', {
		templateUrl : _VIEW_DIR_ + 'exchanges/top.html',
		controller : 'ExchangesCtrl'
	}).

	when('/login', {
		templateUrl : _VIEW_DIR_ + 'login/top.html',
		controller : 'LoginCtrl'
	}).

	when('/register', {
		templateUrl : _VIEW_DIR_ + 'register/top.html',
		controller : 'RegisterCtrl'
	}).

	when('/projects', {
		templateUrl : _VIEW_DIR_ + 'projects/list.html',
		controller : 'ProjectsListCtrl'
	}).

  when('/user', {
    templateUrl : _VIEW_DIR_ + 'user/top.html',
    controller : 'UserCtrl'
  }).

  when('/admin', {
    templateUrl : _VIEW_DIR_ + 'admin/top.html',
    controller : 'AdminCtrl'
  }).

	otherwise({
		redirectTo : '/'
	});
}]);

// pre request pre response
exchangeApp.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push(function($q, $rootScope, $location) {
		return {
			request : function(request) {
				return request;
			},
			response : function(response) {
				if (response.data.redirect) {
					$location.path(response.data.redirect);
				}
				return response;
			},
			responseError : function(rejection) {
				if (500 == rejection.status) {
					alert('System Error!');
				}
				return $q.reject(rejection);
			}
		};
	});
}]);

function NavBarCtrl($scope) {
  $scope.isCollapsed = true;
}