var orgCtrl = function (uservalues,$scope, $http, $location, $window, $timeout, $cookies, jwtHelper,$uibModal, config,$crypto) {

	$scope.org = function(){
		if (localStorage.getItem("786a2y1e") != null) {
		    localStorage.getItem("786a2y1e") !=null ?   $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';
	 
	        
		AWSCognito.config.region = config.reg;
	    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
	        IdentityPoolId: $scope.decry.iid
	    });
	   
		var poolData = { UserPoolId : $scope.decry.uid,
		        ClientId : $scope.decry.cid
		    };
		var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
		
		var cognitoUser = userPool.getCurrentUser();
		if (cognitoUser != null && $scope.decry.oid != null) {
	    	
	    	  cognitoUser.getSession(function(err, session) {
		            if (err) {
		            	//$window.location.href = '#login';
		            }else{
		            	$scope.loading = true;
		            	
		            	 if($scope.decry.role == "ContentCreators"){
		            		 $window.location.href = '#objects';
		            	 }else
		            		 {
		            		 $window.location.href = '#dashboard';
		            		 }
		            	}
	    	  });
	    	
	    } else {
	    	
	    	
	    }
		}
	};
    
	$scope.org();
	
	$scope.myFunct = function(keyEvent) {
		  if (keyEvent.which === 13)
			  $scope.submit();
		}

	
	$scope.submit = function(){
		$scope.error3 = false;
		$scope.error = false;
		$scope.error1 = false;
		$scope.error2 = false;
		
		if($scope.online == true){
		
		if($scope.orgid == null || $scope.orgid == '' || $scope.orgid.replace(/\s/g, '').length === 0){
			$scope.error2 = true;
		}else if($scope.orgid.length < 3){
	        $scope.error = true;
	    }else{
	
			$scope.loading = true;
			var apigClient = apigClientFactory.newClient({
				  invokeUrl:config.iurl,
			});

	    	var params = {};
	    	$scope.orgid1 = $scope.orgid.toUpperCase();
			var body = {
    					oid : $scope.orgid1,
    					type: '1'
					 };
			
			var additionalParams = {};
			apigClient.getorgDetailsPost(params, body, additionalParams)
				.then(function(result){
					var json = JSON.stringify(result.data);
				   json = json.toString();
				    $scope.orddetails = JSON.parse(json);	
				    
				    if($scope.orddetails.oid == false || $scope.orddetails.oid == 'false'){
				    	$scope.error1 = true;
				    	$scope.loading = false;
				    	$scope.$apply();
				    }else{
				 
				    	$scope.orgjson = JSON.stringify(result.data);
                        $scope.orgjson = json.toString();
                        $scope.orgjson = JSON.parse( $scope.orgjson);   
                        
                        var data ={};
                        data.uid = $scope.orgjson.uid;
                        data.iid = $scope.orgjson.iid;
                        data.api = $scope.orgjson.api;
                        data.cid = $scope.orgjson.cid;
                        data.oid = $scope.orgid1;
                        data.ctype = $scope.orgjson.ctype;
                        data.orgtype = '1';
                        if ($scope.orgjson.htype === undefined) {
                            data.htype = 0;
                            data.appcolor = '#fff';
                        } else {
                            data.htype = $scope.orgjson.htype;
                            data.appcolor = $scope.orgjson.appcolor;
                        }
                          var encrypted = $crypto.encrypt( JSON.stringify(data), config.key);                      
                          localStorage.setItem("786a2y1e",encrypted);
                         
                        $window.location.href = '#login';
				    }
					
				})
			}
				
		}else{
			$scope.error3 = true;
		}
	}
	
	
};

app.controller('orgCtrl', orgCtrl);
orgCtrl.$inject = ['uservalues','$scope', '$http', '$location', '$window', '$timeout', '$cookies','jwtHelper','$uibModal', 'config','$crypto'];

