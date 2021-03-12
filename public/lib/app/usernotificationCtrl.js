var usernotificationCtrl = function($scope, $uibModalInstance, $http, $location, $window, $cookies, config,$crypto) {

	 	
	 	$scope.sendnotification = function(){
	 		$scope.link = false;
	 		$scope.regex = "^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}";
	 		$scope.obj = {"url": ""};
	 	}
	 	$scope.sendnotification();
	 	
		$scope.sendmsg = function(){
		 $scope.error = false;
		 $scope.error1 = false;
		 $scope.error3 = false;
		
			if ($scope.mtitle == null ||  $scope.mtitle == undefined ||  $scope.mtitle.replace(/\s/g, '').length === 0 || $scope.mdesc == null ||  $scope.mdesc == undefined || $scope.mdesc.replace(/\s/g, '').length === 0) 
			{ 
				
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
					if($scope.obj.url == "" ||  $scope.obj.url == undefined || $scope.obj.url.replace(/\s/g, '').length === 0){
						
						$scope.error3 = true;
						return;
					} 
				}
				$scope.loading = true;
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
					    	swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",
					    		allowOutsideClick: false,
					              allowEscapeKey:false,
					              width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',
					            	  buttonsStyling: false,confirmButtonClass: 'button1'});
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
							    	swal({title: "Oops!", text: "Session has been timed out, Please login again.", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', confirmButtonColor: "#fcc917"});
					        		localStorage.clear();
					    	    	$window.location.href = '#login';
							    })*/
		 	        
		 	            }
		  		  	});
		 		})
		}
		
		$scope.sendmsgon = function(token){
		    localStorage.getItem("786a2y1e") !=null ?   $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';
			var apigClient = apigClientFactory.newClient({invokeUrl: $scope.decry.api,});
			var body = {oid: $scope.decry.oid,
					title: $scope.mtitle,
					msg: $scope.mdesc
					} 
			if($scope.multiuser == true){
			
					body.users =  $scope.userslist;
					body.type = '1';
					if($scope.link == true){
						body.link = true;
						body.url = $scope.obj.url;
					}

			}else{
		
					body.eid =  $scope.eid;
					body.type = '0';
						if($scope.link == true){
							body.link = true;
							body.url = $scope.obj.url;
						}
				
			}
		
		var params = {};

		
		
		var additionalParams = {
	             headers: {Authorization : token
	             }
	       };
		
		apigClient.sendPushNotificationPost(params, body, additionalParams)
			.then(function(result){
			    	
				
			   var json = JSON.stringify(result);
			   json = json.toString();
			   
		    	   json = JSON.parse(json);
		    	   
		    	   
			   $scope.loading = false;
			   $scope.$apply();
			   $uibModalInstance.close();
			   $window.location.href = '#userengagement';
			   /*if(json.data == "1" ||  $scope.multiuser == true){*/
				   	swal({title: "Notification sent",type:"success", text: "Notification sent to the user",allowOutsideClick: false,
			              allowEscapeKey:false,
			              width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',
							  buttonsStyling: false,confirmButtonClass: 'button1'});
							  
			   	/*}else{
				   	swal({title: "Notification not sent.",type:"error", text: "Notification not sent to the user",allowOutsideClick: false,
			              allowEscapeKey:false,
			              width: '400px',showConfirmButton: true, confirmButtonText: 'OK', confirmButtonColor: "#f5a138",customClass: 'sweetalert-confirmOk',
			            	  buttonsStyling: false,confirmButtonClass: 'button1'});
			   	}*/
			   
			  
		    	
			    }).catch( function(result){
			    	 $scope.loading = false;
			    	swal({title: "Notification not sent.",type:"error", text: "Notification not sent to the user. Please Contact Production Support Team.",allowOutsideClick: false,
			              allowEscapeKey:false,
			              width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',
			            	  buttonsStyling: false,confirmButtonClass: 'button1'});
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

app.controller('usernotificationCtrl', usernotificationCtrl);
usernotificationCtrl.$inject = ['$scope', '$uibModalInstance', '$http', '$location', '$window','$cookies', 'config','$crypto'];
