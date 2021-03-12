var analyticsCtrl = function ($scope, $http, $location, $window, $cookies, config,$crypto) {


	$scope.analytics = function() {
	    localStorage.getItem("786a2y1e") !=null ?   $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login'; 
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
    	$scope.decry["activemenu"] = 'creport';   
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
    	
    }else{
    	localStorage.clear();
    	$window.location.href = '#login';
    	}
	    window.navigating = false;
	};
	
	$scope.analytics();
};

app.controller('analyticsCtrl', analyticsCtrl);
analyticsCtrl.$inject = ['$scope', '$http', '$location', '$window','$cookies', 'config','$crypto'];


