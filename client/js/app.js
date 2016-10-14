var app=angular.module('myApp',['ngAnimate','ngSanitize', 'ui.bootstrap',  'ui.router' ,'ngCookies']);
app.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/home');
	$stateProvider.state('login',{
		url:'/login',
		views:{
			'main-content':{
				templateUrl:'login.html',
				controller:'authCtrl'
			}
		},
		data:{pageTitle:'login'}
	}).state('signup',{
		url:'/signup',
		views:{
			'main-content':{
				templateUrl:'signup.html',
				controller:'authCtrl'
			}
		},
		data:{pageTitle:'SignUp'}
	})
	 
});

app.controller('appCtrl',function($scope){
	$scope.$on('$stateChangeSuccess',function(event,toState){
		if(angular.isDefined(toState.data.pageTitle)){
			$scope.pageTitle=toState.data.pageTitle+' | Smart Mess';
		}
	})
})

 
 
