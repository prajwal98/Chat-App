 "use strict";
var settingsCtrl = function ($scope, $http,$location, $window, config,$crypto) {

	$scope.settings = function() {
	    $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		AWSCognito.config.region =  config.reg;
	    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
	        IdentityPoolId: $scope.decry.iid
	    });
	   
		var poolData = { UserPoolId : $scope.decry.uid,
		        ClientId : $scope.decry.cid
		    };
		
		var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
		
		var cognitoUser = userPool.getCurrentUser();
		
	    if (cognitoUser != null && $scope.decry.email != null) {
	    	
			 if($window.innerWidth > 1024){
				  $scope.secondwidth = +$window.innerWidth - +224;
		    	}else{
		    		$scope.secondwidth = +$window.innerWidth - +65;
		    	}
		$scope.second = {'width':$scope.secondwidth};
    	$(window).resize(function() {
    		
    	      $scope.$apply(function() {
    	        $scope.windowWidth = $( window ).width();
    	        if($scope.windowWidth < 1023){
    	        	$scope.secondwidth = +$window.innerWidth - +65;
    	    		$scope.second = {'width':$scope.secondwidth};
    	        	$scope.sscreen = true;
    	    		$scope.lscreen = false;
    	        }
    	        if($scope.windowWidth > 1024 ){
    	        	$scope.secondwidth = +$window.innerWidth - +224;
    	    		$scope.second = {'width':$scope.secondwidth};
    	        	$scope.sscreen = false;
    	    		$scope.lscreen = true;
    	        }
    	      });
    	    });

		
    }else{
    	localStorage.clear();
    	$window.location.href = '#login';
    	}
	    window.navigating = false;
	};
	
	$scope.settings();

	$scope.loadcategories = function(){
		$scope.loading = true;
		 window.navigating = true;
		$window.location.href = '#categories';
	}
	
	$scope.emailtemp = function(){
		$scope.loading = true;
		 window.navigating = true;
		$window.location.href = '#wetemplate';
	}
};

app.controller('settingsCtrl', settingsCtrl);
settingsCtrl.$inject = ['$scope', '$http','$location', '$window', 'config','$crypto'];

app.factory("getcategories", function($window, $q, config,$crypto){
    return {
    	getcategories: function(){
    		var categories,decry;
    		localStorage.getItem("786a2y1e") !=null ?   decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';
    		
    		AWSCognito.config.region =  config.reg;
    	    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
    	        IdentityPoolId: config.iid
    	    });
    	  
    		var poolData = { UserPoolId : config.uid,
    		        ClientId : config.cid
    		    };
    		
    		var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    		
    		var cognitoUser = userPool.getCurrentUser();
    		
    	    if (cognitoUser != null && decry.orgid != null) {
    	    	cognitoUser.getSession(function(err, session) {
    	            if (err) {
    	            	localStorage.clear();
    	            	$window.location.href = '#login';
    	            }else{
    	            	var token = session.idToken.jwtToken;
    	            	
						var apigClient = apigClientFactory.newClient({
						    invokeUrl: decry.api,
						});
						 
					  var params = {};
					  
						var body = {};

							var additionalParams = {
  								headers: {Authorization : token
  								}
							};
						
							categories = apigClient.getCategoriesPost(params, body, additionalParams)
							.then(function(result){
							    	
								
							   var json = JSON.stringify(result.data);
							    var users = json.toString();
							    
							    return $q.when(users);
							    	
							    }).catch( function(result){
							    	
							    	var json = JSON.stringify(result);
							    	var json1 = json.toString();
							    	decry["activemenu"] = 'dashboard';
                                    localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify(decry), config.key));
							    	//localStorage.setItem("activemenu", 'dashboard');
									$window.location.href = '#dashboard';
							    	
							    });
		   
    	            }
    	    	});
    	    }
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#login';
    	    }
    	    return categories;
        }
    };
});

