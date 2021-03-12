var passwordresetCtrl = function($scope, $uibModalInstance, $http, $location, $window, config,$uibModal,$crypto) {
	
	  
      
	 $scope.close = function(){
      
          $window.location.href = '#login';
	    $uibModalInstance.dismiss('cancel');

    };
        $scope.changepwd = function()
        {
        	// localStorage.getItem("786a2y1e") !=null ?   $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';
            
        	
        	$scope.chpwd = true;
            $scope.loading = true;
            $scope.error = false;
            $scope.error1 = false;
            $scope.error2 = 7;
            $scope.error3 = 5;
            $scope.format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if($scope.online == true){
            if(   $scope.vcode == null || $scope.cpwd == null || $scope.pwd == null ||
                    $scope.vcode == '' || $scope.cpwd == '' || $scope.pwd == ''){
                        
                        if($scope.cpwd == '' || $scope.cpwd == null) {
                            $scope.error3 = 0;
                        }
                        if( $scope.pwd == '' || $scope.pwd == null) {
                            $scope.error2 = 0;
                        }
                        if($scope.vcode == '' || $scope.vcode == null) {
                            $scope.error = 1;
                        }
                       
                         $scope.loading = false;
                    } else if($scope.pwd != null || $scope.cpwd != null || $scope.vcode != null){
                        $scope.sign = true;
                      
                        if($scope.pwd != null){
                            
                            if(!$scope.format.test($scope.pwd) ){
                                $scope.error2 = 1;
                                $scope.chpwd = false;
                            }
                        }
                        if($scope.pwd != null){
                          
                            if(!$scope.format.test($scope.pwd) ){
                                $scope.error2 = 1;
                                $scope.chpwd = false;
                            }
                        }
                        
                        if($scope.cpwd != null){
                        if($scope.pwd.length < 8 || $scope.pwd.replace(/\s/g, '').length === 0) {
                            $scope.error3 = 0;
                            $scope.chpwd = false;
                        }
                        if(!$scope.format.test($scope.cpwd) ){
                            $scope.error3 = 1;
                            $scope.chpwd = false;
                        }
                        }
                        
                        if($scope.cpwd != $scope.pwd){
                            $scope.error3 = 2;
                            $scope.chpwd = false;
                            }
                         $scope.loading = false;
                        
                         if($scope.pwd != null){
                             
                        	 if($scope.pwd.indexOf(' ') >= 0 )
                             {
                                 $scope.error2 = 9;
                                 $scope.error = false;
                                 $scope.chpwd = false;
                             }
                        }
                         
                        if($scope.chpwd == true){
                       
                            $scope.loading = true;
                            $scope.confirmpassword();
                        }
                        
                       
                       
                    }
                }else{
                    $scope.error = 7;
                    $scope.loading = false;
                }
            }
        
        $scope.confirmpassword = function(){
           
        	$scope.loading = true;
            var poolData = { UserPoolId : config.uid,
                        ClientId : config.cid
                    };
  
            var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
            
            var userData = {
                Username : localStorage.getItem("emailid"),
                Pool : userPool
            };
          
            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
           
            cognitoUser.confirmPassword($scope.vcode, $scope.pwd, {
                onSuccess: function (result) {
                
                    swal({title: "",type:"success", text: "Password has been changed successfully.", width: '400px',showConfirmButton: true, confirmButtonText: 'Login Now',
                    	customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1',allowOutsideClick: false,
                        allowEscapeKey:false, buttonsStyling: false});
                    $window.location.href = '#login';
                    $uibModalInstance.close();
                    $scope.$apply();
                },
                onFailure: function(err) {
                    
                    if (err == 'CodeMismatchException: Invalid verification code provided, please try again.')
                    {
                        $scope.loading = false;
                        $scope.error = 8;
                        $scope.$apply();
                    
                        
                    }else if(err="NetworkingError: Network Failure")
                        {
                        $scope.loading = false;
                        $scope.error = 7;
                        $scope.$apply();
                     
                        }
                    else 
                    {
                        $scope.loading = false;
                        $scope.error2 = 5;
                       $scope.$apply();
                     
                    }
                }
            });
        
        };
};
app.controller('passwordresetCtrl', passwordresetCtrl);
passwordresetCtrl.$inject = ['$scope', '$uibModalInstance', '$http', '$location', '$window', 'config','$uibModal','$crypto'];