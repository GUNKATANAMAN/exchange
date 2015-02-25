exchangeApp.factory('AuthService', function($q, $timeout){
    var _user = null;
    return {
        isLogged: function(){ return !!_user; },
        getUser: function(){ return _user; },
        login: function(){
        	_user = {login:true}
        },
        logout: function(){
            _user = null;
            return $q.all();
        }
    };
});
//exchangeApp.run(function($rootScope, $location, $route, AuthService){
//    $rootScope.$on('$routeChangeStart', function(ev, next, current){
//        if (next.controller == 'LoginCtrl' || next.controller == 'RegisterCtrl')
//        {
//            if (AuthService.isLogged())
//            {
//                $location.path('/');
//                $route.reload();
//            }
//        }
//        else
//        {
//            if (AuthService.isLogged() == false)
//            {
//                $location.path('/login');
//                $route.reload();
//            }
//        }
//    });
//});

