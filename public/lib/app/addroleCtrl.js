var addroleCtrl = function ($scope, $http, $location, $window, $cookies, $uibModalInstance, config, $sce,$crypto) {
	
    $scope.home = function(){
		if($scope.action == 'new'){
			$scope.addrdeatils = {};
			$scope.addrdeatils.tabs = [];
		} else {
		 $scope.orgrname = angular.copy($scope.addrdeatils.rname);
		}
        
        $scope.adprods = [{"tid":"Content","ttitle":"Content"},
		{"tid":"Engage","ttitle":"Engage"}, {"tid":"Events","ttitle":"Events"},{"tid":"Reports","ttitle":"Reports"},
		{"tid":"Tenants","ttitle":"Tenants"} ];
        $scope.example2settings = {
            displayProp: 'tid'
        };
        $scope.example13data = $scope.adprods;
    
        $scope.example14settings = {
            scrollableHeight: '230px',
            scrollable: true,
			showCheckAll:true,
			showUncheckAll:true,
			enableSearch: true,
            externalIdProp : ''
        };

    };
    
    $scope.home();	

    $scope.catimageupload = function(topicfile) {
    	if(topicfile == null){
    		return;
    	}
    	//5242880 1048576
    	if(topicfile.size > 5242880){
    		$scope.topicfile = null;
    		 swal({title: "", text: "Image size is too large. File size cannot be greater than 5mb.",type:'error',buttonsStyling:false,allowOutsideClick: false,
	                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK',customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
    		 return;
    	}else{
    		$scope.topicfile = topicfile;
    	}
    	
    };

    $scope.saverole = function(){
        window.navigating=true;
    	$scope.error = false;
    	$scope.aerror1 = false;
    	
    	
    	if ($scope.addrdeatils.rname == null ||  $scope.addrdeatils.rname == undefined  || $scope.addrdeatils.rname.replace(/\s/g, '').length === 0 || $scope.addrdeatils.tabs == undefined || $scope.addrdeatils.tabs == null || $scope.addrdeatils.tabs.length === 0) 
		{ 
			if($scope.addrdeatils.rname == null ||  $scope.addrdeatils.rname == undefined || $scope.addrdeatils.rname.replace(/\s/g, '').length === 0){
				$scope.error = true;
			}
			
			if($scope.addrdeatils.tabs == undefined || $scope.addrdeatils.tabs == '' || $scope.addrdeatils.tabs.length === 0){
				$scope.aerror1 = true;
			}
		}else{
            $scope.loading = true;
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
    		
    	    if (cognitoUser != null && $scope.decry.oid != null) {
    	    	
    	    	$scope.getsession(cognitoUser);
    	    } else {
    	    	localStorage.clear();
    	    	window.navigating=false;
    	    	$window.location.href = '#login';
    	    }
        }
 };
 

 $scope.getsession = function(cognitoUser){
		
	  return new Promise((resolve, reject) => {
			 cognitoUser.getSession((err, session) =>{
	            if (err) {
			    	swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
		                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK',customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	            	localStorage.clear();
	            	$window.location.href = '#login';
	            }else{
	                $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
	            	var token = session.idToken.jwtToken;
	            	var apigClient = apigClientFactory.newClient({
	            	    invokeUrl: $scope.decry.api,
	            	});
				
	                var params = {};
	                //var id =  Math.floor(Math.random()*(999-100+1)+100);
	                var body = {
                            rname: $scope.addrdeatils.rname,
                            rtabs: $scope.addrdeatils.tabs,
                            oid: $scope.decry.oid,
                            rid: new Date().getTime(),
                            action: 'new'
	                        
					};
					if($scope.action !== undefined && $scope.action == 'edit'){
						body.action =  'edit';
						body.rid = $scope.addrdeatils.rid;
						body.ern = false;
						if($scope.orgrname.toLowerCase() != $scope.addrdeatils.rname.toLowerCase()){
							body.oldrname = $scope.orgrname.toLowerCase();
							body.ern = true;
						} 
					}
	             
	                var additionalParams = {
                            headers: {Authorization : token
                            }
					};
					
	                apigClient.updateUserRolePost(params, body, additionalParams)
						.then(function (result) {
						
							var response = JSON.stringify(result.data);
							if(response == null || response == 'null')
									{
										$scope.loading=true;
										$window.location.href = '#levelsetting';
									} else {
										response = JSON.parse(response);
											if(response.id === 0 || response.id === '0'){
												swal({title: "Oops!", text: response.msg , type: "warning",buttonsStyling:false,allowOutsideClick: false,
												allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
										$scope.loading=false;
										$scope.$apply();
											} else{
												$scope.loading=true;
												$window.location.href = '#levelsetting'
											}
									}
						
	            
	                        
	                        }).catch( function(result){
	                            
	                            var json = JSON.stringify(result);
	                            var json1 = json.toString();
	                           
	                        });
	            	
	        
	            }
 		  	});
		})
}
    
    $scope.close = function(){
		
        $uibModalInstance.close();
    };
    
        
    };
    
    app.controller('addroleCtrl', addroleCtrl);
    addroleCtrl.$inject = ['$scope', '$http', '$location', '$window','$cookies', '$uibModalInstance', 'config', '$sce','$crypto'];
    
    