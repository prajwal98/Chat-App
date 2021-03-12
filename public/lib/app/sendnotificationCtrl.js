var sendnotificationCtrl = function($scope, $uibModalInstance, $http, $location, $window, $cookies, config,$crypto) {

	 	
	 	$scope.sendnotification = function(){
	 		// $scope.teamname = $scope.groupnotify.GNAME;
	 		// $scope.GID = $scope.gid;
	 		$scope.link = false;
	 		$scope.regex = "/(http(s)?://.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/";
	 		$scope.obj = {"url": ""};
	 	}
	 	$scope.sendnotification();
	 	
		$scope.sendmsg = function(){
		 $scope.error = false;
		 $scope.error1 = false;
		 $scope.error4 = false;

		 var regexQuery = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
        var url1 = new RegExp(regexQuery,"g");
       
			if ($scope.mtitle == null ||  $scope.mtitle == undefined ||  $scope.mtitle.replace(/\s/g, '').length === 0 
			|| $scope.mdesc == null ||  $scope.mdesc == undefined || $scope.mdesc.replace(/\s/g, '').length === 0
			|| $scope.type == "" ||  $scope.type == undefined) 
			{ 
				if ($scope.type == "" ||  $scope.type == undefined)
		 		{
			 		$scope.error4 = true;
				 }
				if($scope.mtitle == null ||  $scope.mtitle == undefined ||  $scope.mtitle.replace(/\s/g, '').length === 0 ){
					$scope.error = true;
				}
				if($scope.mdesc == null ||  $scope.mdesc == undefined || $scope.mdesc.replace(/\s/g, '').length === 0){
					$scope.error1 = true;
				}
			}
				else 
				{
					
					if($scope.link == true){
					
						if($scope.obj.url == "" ||  $scope.obj.url == undefined || $scope.obj.url.replace(/\s/g, '').length === 0 || !url1.test($scope.obj.url) ){
							
							$scope.error3 = true;
							return;
						} 
					}
				$scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));	
				$scope.loading = true;
				AWSCognito.config.region =  config.reg;
			    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
			        IdentityPoolId: $scope.decry.iid
			    });
			  
				var poolData = { UserPoolId : $scope.decry.uid,
				        ClientId : $scope.decry.cid
				    };
				
				var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
				
				var cognitoUser = userPool.getCurrentUser();
				
			    if (cognitoUser != null && $scope.decry.oid != null) {
			    	
			    	$scope.getsession(cognitoUser);
			    }else {
			    	localStorage.clear();
			    	$window.location.href = '#login';
			    }

			  
				 
				}
			
		};
		
		$scope.getsession = function(cognitoUser){
			
			  return new Promise((resolve, reject) => {
		 			 cognitoUser.getSession((err, session) =>{
		 	            if (err) {
					    	swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
     			                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
		 	            	localStorage.clear();
		 	            	$window.location.href = '#login';
		 	            }else{
		 	            	
		 	            	var token = session.idToken.jwtToken;
		 	            	 $scope.sendmsgon(token); 
							   resolve();
			            	/*var apigClient = apigClientFactory.newClient({});
			    			var params1 = {};
			    			var body = {type: '0',token : token,oid : localStorage.getItem("oid"),admin: 0};
			    			var additionalParams = {};
			            	apigClient.getCredentialsPost(params1, body, additionalParams)
							.then(function(result1){
							   var tjson = JSON.stringify(result1.data);
							   tjson = tjson.toString();
							   
							   tjson = JSON.parse(tjson);
							   $scope.sendmsgon(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken); 
							   resolve();	
							    }).catch( function(result){
							    	swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', confirmButtonColor: "#fcc917"});
					        		localStorage.clear();
					    	    	$window.location.href = '#login';
							    })*/
		 	        
		 	            }
		  		  	});
		 		})
		}
		

		$scope.sendmsgon = function(token){
		    $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
			var apigClient = apigClientFactory.newClient({invokeUrl: $scope.decry.api,});
			var params = {};

			var body = {
					// gid:  $scope.GID,
					title: $scope.mtitle,
					message: $scope.mdesc,
					oid: $scope.decry.oid,
					action:  $scope.type
					 };
					 
			if($scope.link == true){
				
				body.link = true;
				body.url = $scope.obj.url;
			}
			if ($scope.toTenants === true) {
				body.tenants = $scope.tenantlist;
			} else {
				body.userslist = $scope.userslist;
				body.oid = $scope.decry.tenant;
			}
			// if($scope.userslist != undefined){
			// 	body.userslist = $scope.userslist;
			// } added
			// if($scope.tenantlist != undefined){
			// 	body.tenantlist = $scope.tenantlist;
			// } added
			// if($scope.GID === undefined){
			// 	body.gid = $scope.tenant;
			// }
			var additionalParams = {
		             headers: {Authorization : token
		             }
			   };
			 
			apigClient.groupNotificationPost(params, body, additionalParams)
				.then(function(result){
					 $scope.loading = false;
					
				   swal({title: "Notification sent",type:"success", text: "Notification sent to users",
					   buttonsStyling:false,allowOutsideClick: false,
		                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
						if ($scope.toTenants === true) {
							$window.location.href = '#engage';
						} else {
				   $window.location.href = '#userengagement';
						}
				    }).catch( function(result){
				    	 $scope.loading = false;
				    	swal({title: "Notification not sent.",type:"error", text: "Notification not sent to users. Please Contact Production Support Team.",buttonsStyling:false,allowOutsideClick: false,
			                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
				    	  $uibModalInstance.close();
				    	
				    });
		}
		
		$scope.close = function(){
		
			$uibModalInstance.dismiss('cancel');
	
		};
		
		$scope.url = function(){
			
			if($scope.link == false){
				$scope.link = true;
			}else{
				$scope.link = false;
			}
		};

};

app.controller('sendnotificationCtrl', sendnotificationCtrl);
sendnotificationCtrl.$inject = ['$scope', '$uibModalInstance', '$http', '$location', '$window','$cookies', 'config','$crypto'];

app.factory("getsegmentid", function($window, $q, config,$crypto){
    return {
    	getsegmentid: function(){
    		var segmentid,decry;
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
    		
    	    if (cognitoUser != null && decry.oid != null) {
    	    	
    	    	segmentid = getdata(cognitoUser);
    	    }
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#login';
    	    }
    	    function getdata(cognitoUser){
      	    	 return new Promise((resolve, reject) => {
      	 			 cognitoUser.getSession((err, session) =>{
      	 				
           	            if (err) {
           	            	localStorage.clear();
           	            	$window.location.href = '#login';
           	            }else{
           	            	
           	            	var token = session.idToken.jwtToken;
           	            	var apigClient = apigClientFactory.newClient({
           	            	 invokeUrl: decry.api,
    						});
    					  var params = {};
    					  
    						var body = {
    								groupid : decry.teamid
    								 };
    							var additionalParams = {
      								headers: {Authorization : token
      								}
    							};
    						
    							var usersl =	apigClient.getSegmentPost(params, body, additionalParams)
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
           	    			
           	    					
           	    						
           	    						resolve(usersl)
           	    		  
           	               
           	            
           	            	}
           	           
           	        
      	  		  	});
      	 		})
      	    }
    	    return segmentid;
        }
    };
});