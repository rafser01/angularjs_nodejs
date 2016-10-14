app.config(function($stateProvider){
	$stateProvider.state('home',{
		url:'/home',
		views:{
			
			'main-content':{
				templateUrl:'home.html',
				controller:'homeController'
			},
			'right-baner@home':{
				templateUrl:'homeRightBaner.html',
				controller:'banerHomeCtrl'
			},
			'menu@home':{
				templateUrl:'adminMenu.html',
				controller:'menuCtrl'
			}
		},
		data:{pageTitle:'Home'}
	})
});
app.factory('homeService',function($http){
	return {
		fetchUserData:function(){
		return	$http({
				method:'GET',
				url:'http://127.0.0.1:8081/fetchUsers'
			}).then(function success(response){
				
				return response.data;
			},function error(error){
				alert('factory - homeService',error);
			});
		}
	}
});
app.controller('homeController',function($scope,homeService,loginService){
	 var self=this;
	 
	 self.users=function(){
		 homeService.fetchUserData().then(function(sucucess){
			 self.userList=sucucess;
		 },
		 function(error){
			 alert(error);
		 });
	 }
	  
	 self.users();
	 
	self.name="rakin";
	self.init=function(){
		
		loginService.checkUserLogin();
		
	};
	
	
	 
});
app.controller('banerHomeCtrl',function($scope){
	$scope.name="home right baner";
})