app.factory('loginService',function($http, $cookies){
	return{
		 
	
	checkLogin:function(){
		if($cookies.get('loginInfo')!=undefined){
			 
			return true;
			
		}else {
			 
			return false;
			 
		}
	},
	checkUserLogin:function(){
		if(this.checkLogin()===true){
		
			location.href='#home';
			return true;
		}else{
			location.href='#login';
		}
		return false;
	},
	checkEmailPass:function(emailPass){
	return	$http.get(path.url+'checkUserInfo/'+emailPass.email+'/'+emailPass.password+'/')
	}
	
	}
	
	
});

app.factory('sign_up',function($http){
	return {
		save_member :  function(data,config){
			$http.post(path.url+'save-member/',data,config); 
		}
	}
 
});

app.controller('authCtrl',function($scope,$state,loginService,$cookies){
	var self=this;
	$scope.name="login";
	var loginInfo={};
	self.saveLoginData=function(emailOrUser,password){
		var emailPass={"email":"","password":""		
		}
		emailPass.email=emailOrUser;
		emailPass.password=password;
		console.log('email ',emailPass);
		
		loginService.checkEmailPass(emailPass).then(function s(success){
			 
			if(success.data.email === emailOrUser && success.data.password === password) {
				 
				loginInfo={email:emailOrUser,password:password};
			 
			$cookies.put('loginInfo',JSON.stringify(loginInfo))
			console.log('session', $cookies.get('loginInfo') )
			 $state.go('home');
			 return ;
			}else{
				alert('Email & Password mismatch')
				$state.go('login');
			}
		},
		function e(err){
			console.log('fail',err);
		});
		
		 
	};
	
	
	self.init=function(){
		
		 
		if( $cookies.get('loginInfo')!=undefined){
			 
			location.href="#home";
		}else {

			location.href="#login";
			 
		}
		 
		 
		
		 
		 
	};
	self.logOut=function(){
		 
		$cookies.remove('loginInfo');
		 $state.go('login');
		 
	};
	self.checkLogin=loginService.checkLogin();
	self.checkUserLogin=function(){
		console.log('check user login');
		console.log(loginService.checkUserLogin())
		return loginService.checkUserLogin();
	};
	
});

app.controller('signUp_ctrl',function($scope,sign_up){
	var self=this;
	self.member={"user":"",
			"password":"",
			"email":"",
			"gender":"",
			"dob":"",
			"location":"",
			"image":"",
			"firstName":"",
			"lastName":"",
			"messName":"",
			"type":"",
			"occupation":"",
			"remark_mem1":"",
			"remark_mem2":""
}
	$scope.password_matcher=function(){
		return (self.member.password === $scope.password_validation);
	}
	self.notice="Fill and Match Password";
	self.checkValue=function(){
		sign_up.save_member(self.member,config);
		console.log('mem',self.member)
	}
	var config={
			headers : {
                'Content-Type': 'application/json'
            }
	}
	self.dateOptions={
			dateDisabled: disabled,
		    formatYear: 'yyyy',
		    maxDate: checkMinDate(),
//		    minDate: checkMinDate(),
		    startingDay: 1,
		    
	}
	function disabled(data){
		 
	}
	function checkMinDate(){
		var matuedYear=new Date().getFullYear()-12;
		var month=new Date().getMonth();
		var day=new Date().getDate();
		 
		var confirmDate=new Date(matuedYear,month,day);
		 
		return confirmDate;
	}
	self.isOpen=false;
	self.openDob=function(){
		self.isOpen=true;
	}
});