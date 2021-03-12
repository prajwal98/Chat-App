var forgotpwdCtrl = function($scope, $uibModalInstance, $http, $location, $window, config,$crypto,$uibModal ) {
	
	$scope.forgot = true;
	$scope.close = function(){
		
		$uibModalInstance.dismiss('cancel');
	
	};
	

	$scope.myFunct = function(keyEvent) {
		  if (keyEvent.which === 13)
			  $scope.next();
		}
	$scope.next = function() {

	   
		$scope.ferror1 = 0;
		$scope.format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
		$scope.format1 = /[ 1234567890]/;
		$scope.format2 = /[ abcdefghijklmnopqrstuvwxyz]/;
		$scope.ferror = false;
		if($scope.online == true){

		// $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		if($scope.femail == undefined || $scope.femail == ''){
			$scope.ferror = true;
		}else{
			
		
		$scope.loading = true;
		var poolData = { UserPoolId : config.uid,
		        ClientId : config.cid
		    };
	    
	    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
	    var userData = {
	    	Username : $scope.femail,
	        Pool : userPool
	    };
	    
	    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
	    cognitoUser.forgotPassword({
	        onSuccess: function (result) {
	        	$uibModalInstance.dismiss('cancel');
	        	swal({title: "", text: "Password reset completed.",type:"success",
	        		buttonsStyling:false,allowOutsideClick: false,
	                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'Login Now', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					$window.location.href = '#login';
	        },
	        onFailure: function(err) {
	        	$scope.loading = false;
	        	$scope.$apply();
	        	if (err == 'LimitExceededException: Attempt limit exceeded, please try after some time.')
	        	{
	        		$scope.ferror1 = 1;	 
	        		$scope.$apply();
	        		}
	        	if (err == "UserNotFoundException: Username/client id combination not found.") 
	        	{
	        		$scope.ferror1 = 2;
	        		$scope.$apply();}
	        	if(err == 'CodeMismatchException: Invalid verification code provided, please try again.')
	        	{
	        		$scope.ferror1 = 3;	 
	        		$scope.$apply();}
	        	if(err == "NetworkingError: Network Failure")
	        	{
	        		$scope.ferror1 = 4;	
	        		$scope.$apply();}
	        },
	        inputVerificationCode() {
	        	$scope.loading = false;
	        	 window.navigating = false;
	        	 localStorage.setItem("emailid",$scope.femail );
	        	 $uibModalInstance.dismiss('cancel'); 
	        	
	 
	             $scope.Instance = $uibModal.open({
	                 templateUrl: 'passwordreset.html',
	                 controller: 'passwordresetCtrl',
	                 backdrop: 'static',
	                 keyboard: false,
	                 windowClass: 'forgotmodal',
	                
	                 });
	        /*
	        	$uibModalInstance.dismiss('cancel');
	            var verificationCode = prompt('Please input verification code ' ,'');
	            var newPassword = prompt('Enter new password ' ,'');
	            cognitoUser.confirmPassword(verificationCode, newPassword, this);
	        	$scope.loading = false;
	        	$scope.$apply();
	        	
	        	swal({
	        		  title: "Password Reset",
	        		  
					  html:
						'<span style="color:black;font-family:MyWebFont1;">Please enter the verification code sent to your Email ID</span>' +
						'</br>' +
						'<p ng-app="" style="text-align: center;color:#767676;width:30%;float:left;font-size: 14px;margin-top:4px;margin-left: 25px;font-family:MyWebFont1;">Verification Code</p>' +
	      				'<p style="color:#767676;width:3%;float:left;font-size: 14px;margin:4px 4px 0 0;font-family:MyWebFont1;">:</p>' +
	      				'<input id="code" name="ntitle" rows="1" wrap="soft" ng-model="ntitle" style="font-family:MyWebFont1;float:left;border: 1px solid #ccc;width:50%;overflow:hidden; resize:none;margin-bottom:10px;font-size:14px;" ></input>'+				
	      				'</br>'+
	      				'<p style="text-align:center;color:#767676;width:30%;float:left;font-size: 14px;margin-top:4px;margin-left: 25px;font-family:MyWebFont1;">Password</p>' +
	      				'<p style="color:#767676;width:3%;float:left;font-size: 14px;margin:4px 4px 0 0;font-family:MyWebFont1;">:</p>' +
	      				'<input type="password" id="pwd" name="nduration" rows="1" wrap="soft" ng-model="nduration" style="font-family:MyWebFont1;border: 1px solid #ccc;float:left;width:50%;overflow:hidden;margin-bottom:10px;font-size:14px;"></input>'+
	      				'</br>'+
	      				'<p style="text-align:center;color:#767676;width:30%;float:left;font-size: 14px;margin-top:4px;margin-left: 25px;font-family:MyWebFont1;">Confirm Password</p>' +
	      				'<p style="color:#767676;width:3%;float:left;font-size: 14px;margin:4px 4px 0 0;font-family:MyWebFont1;">:</p>' +
	      				'<input type="password" id="cpwd" name="nduration" rows="1" wrap="soft" ng-model="nduration" style="font-family:MyWebFont1;border: 1px solid #ccc;float:left;width:50%;overflow:hidden;font-size:14px;margin-bottom:10px;"></input>'+
	      				'</br>'+
	      				'</br>'+'</br>'+
	      				'<p style="color:#484848;font-family:MyWebFont1;margin-top: 61px;">* Password should be at least 8 characters, contain at least one lowercase letter & one number & one special character.</p>',
	      				closeOnCancel: false,
					    allowOutsideClick: false,
					    allowEscapeKey:false,
					    showCancelButton: true, 
					    showConfirmButton: true, confirmButtonText: 'Submit', confirmButtonColor: "#f5a138",
					 
			              customClass: 'sweetalertPass',
						   buttonsStyling: false,
			              cancelButtonClass: 'button2',
			              confirmButtonClass: 'button1',
			            
					  preConfirm: function () {
					    return new Promise(function (resolve) {
					    	 if ($('#code').val().replace(/\s/g, '').length === 0 || $('#code').val() === '' ||  $('#cpwd').val().replace(/\s/g, '').length === 0 || $('#pwd').val().replace(/\s/g, '').length === 0 || $('#cpwd').val() === '' ||  $('#pwd').val() === '') {
					    		 swal.showValidationError('Please enter the required fields');
					        	  resolve();
					    		 
						      
					        } else {
					        	
					        if($('#pwd').val().indexOf(' ') >= 0 ||  $('#cpwd').val().indexOf(' ') >= 0 ){
					        	  swal.showValidationError('Password should not contain space');
					        	  resolve();
					        }else if(!$scope.format2.test($('#pwd').val()) || !$scope.format2.test($('#cpwd').val())  || !$scope.format1.test($('#pwd').val()) || !$scope.format1.test($('#cpwd').val())  || !$scope.format.test($('#pwd').val()) || !$scope.format.test($('#cpwd').val()) || $('#pwd').val().length < 8 || $('#cpwd').val().length < 8){
					        	swal.showValidationError('Invalid Password format');
					        	  resolve();
				    		}else if ($('#cpwd').val() ===  $('#pwd').val() ){
					    			
					    			 resolve([
									     $('#code').val(),
									     $('#pwd').val()
									     ]);
					    		}else {
						        	
						        	  swal.showValidationError('Password do not match');
						        	  resolve();
						        	  }
					        	  
					        }
					    });
					  }
					}).then(function (result) {
						 var json = JSON.stringify(result);
						  $scope.ndesc = JSON.parse(json);
						$scope.code = $scope.ndesc.value[0];;
						$scope.npwd = $scope.ndesc.value[1];;
						$scope.confirmpassword($scope.code, $scope.npwd);
					 
					});*/
	        	
	        	
	        }
	    });
		
	}
	}else{
		$scope.ferror1 = 4;
	}
	};
	
	$scope.confirmpassword = function(code, npwd){
		$scope.loading = true;
    	$scope.$apply();
    	var poolData = { UserPoolId : config.uid,
    		        ClientId : config.cid
    		    };
	    
	    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
	    var userData = {
	    	Username : $scope.femail,
	        Pool : userPool
	    };
	  
	    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
	   
	    cognitoUser.confirmPassword(code, npwd, {
	        onSuccess: function (result) {
	        	$uibModalInstance.dismiss('cancel');
	        	swal({title: "", text: "Password reset completed.", width: '400px',showConfirmButton: true, confirmButtonText: 'Login Now', confirmButtonColor: "#f5a138"});
	    		$window.location.href = '#login';
	        },
	        onFailure: function(err) {
	        	
	        	if (err == 'CodeMismatchException: Invalid verification code provided, please try again.')
	        	{
	        		$scope.loading = false;
		        	$scope.$apply();
	        		swal({
		        		  title: "",
		        		  html:
							'<span style="color:red;font-family:MyWebFont1;">Invalid verification code provided, please try again</span>' +
							'</br>' +
							'</br>' +
							'<span style="color:black;font-family:MyWebFont1;">Please enter the verification code sent to your Email ID</span>' +
							'</br>' +
							'<p ng-app="" style="text-align: center;color:#767676;width:30%;float:left;font-size: 14px;margin-top:4px;margin-left: 20px;font-family:MyWebFont1;">Verification Code</p>' +
		      				'<p style="color:#767676;width:3%;float:left;font-size: 14px;margin:4px 4px 0 0;font-family:MyWebFont1;">:</p>' +
		      				'<input id="code" name="ntitle" rows="1" wrap="soft" ng-model="ntitle" style="font-family:MyWebFont1;float:left;border: 1px solid #ccc;width:50%;overflow:hidden; resize:none;margin-bottom:10px;font-size:14px;" ></input>'+				
		      				'</br>'+
		      				'<p style="text-align:center;color:#767676;width:30%;float:left;font-size: 14px;margin-top:4px;margin-left: 20px;font-family:MyWebFont1;">Password</p>' +
		      				'<p style="color:#767676;width:3%;float:left;font-size: 14px;margin:4px 4px 0 0;font-family:MyWebFont1;">:</p>' +
		      				'<input type="password" id="pwd" name="nduration" rows="1" wrap="soft" ng-model="nduration" style="font-family:MyWebFont1;border: 1px solid #ccc;float:left;width:50%;overflow:hidden;margin-bottom:10px;font-size:14px;"></input>'+
		      				'</br>'+
		      				'<p style="text-align:center;color:#767676;width:30%;float:left;font-size: 14px;margin-top:4px;margin-left: 20px;font-family:MyWebFont1;">Confirm Password</p>' +
		      				'<p style="color:#767676;width:3%;float:left;font-size: 14px;margin:4px 4px 0 0;font-family:MyWebFont1;">:</p>' +
		      				'<input type="password" id="cpwd" name="nduration" rows="1" wrap="soft" ng-model="nduration" style="font-family:MyWebFont1;border: 1px solid #ccc;float:left;width:50%;overflow:hidden;font-size:14px;margin-bottom:10px;"></input>'+
		      				'</br>'+
		      				'</br>'+'</br>'+
		      				'<p style="color:#484848;font-family:MyWebFont1;margin-top: 61px;">* Password should be at least 8 characters, contain at least one lowercase letter & one number & one special character.</p>',
		      				closeOnCancel: false,
						    allowOutsideClick: false,
						    allowEscapeKey:false,
						    showCancelButton: true, 
						    showConfirmButton: true, confirmButtonText: 'Submit',
						    width: '450px',
				              height: '450px',
				              customClass: 'sweetalertPass',
							   buttonsStyling: false,
				              cancelButtonClass: 'button2',
				              confirmButtonClass: 'button1',
						  preConfirm: function () {
						    return new Promise(function (resolve) {
						    	 if ($('#code').val().replace(/\s/g, '').length === 0 || $('#code').val() === '' ||  $('#cpwd').val().replace(/\s/g, '').length === 0 || $('#pwd').val().replace(/\s/g, '').length === 0 || $('#cpwd').val() === '' ||  $('#pwd').val() === '') {
						    		 swal.showValidationError('Please enter the required fields');
						        	  resolve();
						    		 
							      
						        } else {
						        	
						        if($('#pwd').val().indexOf(' ') >= 0 ||  $('#cpwd').val().indexOf(' ') >= 0 ){
						        	  swal.showValidationError('Password should not contain space');
						        	  resolve();
						        }else if(!$scope.format2.test($('#pwd').val()) || !$scope.format2.test($('#cpwd').val())  || !$scope.format1.test($('#pwd').val()) || !$scope.format1.test($('#cpwd').val())  || !$scope.format.test($('#pwd').val()) || !$scope.format.test($('#cpwd').val()) || $('#pwd').val().length < 8 || $('#cpwd').val().length < 8){
						        	swal.showValidationError('Invalid Password format');
						        	  resolve();
					    		}else if ($('#cpwd').val() ===  $('#pwd').val() ){
						    			
						    			 resolve([
										     $('#code').val(),
										     $('#pwd').val()
										     ]);
						    		}else {
							        	
							        	  swal.showValidationError('Password do not match');
							        	  resolve();
							        	  }
						        	  
						        }
						    });
						  }
						}).then(function (result) {
							var json = JSON.stringify(result);
							  $scope.ndesc = JSON.parse(json);
							$scope.code = $scope.ndesc.value[0];;
							$scope.npwd = $scope.ndesc.value[1];;
							$scope.confirmpassword($scope.code, $scope.npwd);
						 
						 
						});
		        	
	        	}
	        	else 
	        	{
	        		$scope.loading = false;
		        	$scope.$apply();
	        		swal({
		        		  title: "",
		        		  html:
							'<span style="color:black;font-family:MyWebFont1;">Invalid Password: Password length should be minimum of 8 Characters</span>' +
							'</br>' +
							'</br>' +
							'<span style="color:black;font-family:MyWebFont1;">Please enter the verification code sent to your Email ID</span>' +
							'</br>' +
							'<p ng-app="" style="font-family:MyWebFont1;text-align: center;color:#767676;width:30%;float:left;font-size: 14px;margin-top:4px;margin-left: 20px;">Verification Code</p>' +
		      				'<p style="font-family:MyWebFont1;color:#767676;width:3%;float:left;font-size: 14px;margin:4px 4px 0 0;">:</p>' +
		      				'<input id="code" name="ntitle" rows="1" wrap="soft" ng-model="ntitle" style="font-family:MyWebFont1;float:left;border: 1px solid #ccc;width:50%;overflow:hidden; resize:none;margin-bottom:10px;font-size:14px;" ></input>'+				
		      				'</br>'+
		      				'<p style="font-family:MyWebFont1;text-align:center;color:#767676;width:30%;float:left;font-size: 14px;margin-top:4px;margin-left: 20px;">Password</p>' +
		      				'<p style="font-family:MyWebFont1;color:#767676;width:3%;float:left;font-size: 14px;margin:4px 4px 0 0;">:</p>' +
		      				'<input type="password" id="pwd" name="nduration" rows="1" wrap="soft" ng-model="nduration" style="font-family:MyWebFont1;border: 1px solid #ccc;float:left;width:50%;overflow:hidden;margin-bottom:10px;font-size:14px;"></input>'+
		      				'</br>'+
		      				'<p style="font-family:MyWebFont1;text-align:center;color:#767676;width:30%;float:left;font-size: 14px;margin-top:4px;margin-left: 20px;">Confirm Password</p>' +
		      				'<p style="font-family:MyWebFont1;color:#767676;width:3%;float:left;font-size: 14px;margin:4px 4px 0 0;">:</p>' +
		      				'<input type="password" id="cpwd" name="nduration" rows="1" wrap="soft" ng-model="nduration" style="font-family:MyWebFont1;border: 1px solid #ccc;float:left;width:50%;overflow:hidden;font-size:14px;margin-bottom:10px;"></input>',
		      				closeOnCancel: false,
						    allowOutsideClick: false,
						    allowEscapeKey:false,
						    showCancelButton: true, cancelButtonText: 'Cancel',
						    showConfirmButton: true, confirmButtonText: 'Submit', 
						    width: '450px',
				              height: '450px',
				              customClass: 'sweetalertPass',
							   buttonsStyling: false,
				              cancelButtonClass: 'button2',
				              confirmButtonClass: 'button1',
						  preConfirm: function () {
						    return new Promise(function (resolve) {
						    	 if ($('#code').val().replace(/\s/g, '').length === 0 || $('#code').val() === '' ||  $('#cpwd').val().replace(/\s/g, '').length === 0 || $('#pwd').val().replace(/\s/g, '').length === 0 || $('#cpwd').val() === '' ||  $('#pwd').val() === '') {
						    		 swal.showValidationError('Please enter the required fields');
						        	  resolve();
						    		 
							      
						        } else {
						        	
						        if($('#pwd').val().indexOf(' ') >= 0 ||  $('#cpwd').val().indexOf(' ') >= 0 ){
						        	  swal.showValidationError('Password should not contain space');
						        	  resolve();
						        }else if(!$scope.format2.test($('#pwd').val()) || !$scope.format2.test($('#cpwd').val())  || !$scope.format1.test($('#pwd').val()) || !$scope.format1.test($('#cpwd').val())  || !$scope.format.test($('#pwd').val()) || !$scope.format.test($('#cpwd').val()) || $('#pwd').val().length < 8 || $('#cpwd').val().length < 8){
						        	swal.showValidationError('Invalid Password format');
						        	  resolve();
					    		}else if ($('#cpwd').val() ===  $('#pwd').val() ){
						    			
						    			 resolve([
										     $('#code').val(),
										     $('#pwd').val()
										     ]);
						    		}else {
							        	
							        	  swal.showValidationError('Password do not match');
							        	  resolve();
							        	  }
						        	  
						        }
						    });
						  }
						}).then(function (result) {
							var json = JSON.stringify(result);
							  $scope.ndesc = JSON.parse(json);
							$scope.code = $scope.ndesc.value[0];;
							$scope.npwd = $scope.ndesc.value[1];;
							$scope.confirmpassword($scope.code, $scope.npwd);
						 
						 
						});
	        	}
	        }
	    });
	
	};

};


app.controller('forgotpwdCtrl', forgotpwdCtrl);
forgotpwdCtrl.$inject = ['$scope', '$uibModalInstance', '$http', '$location', '$window', 'config','$crypto','$uibModal'];