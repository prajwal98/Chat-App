var addsubjectCtrl = function ($scope, $http, $location, $window, $cookies, $uibModalInstance, config, Upload, $sce,$crypto) {
	
	$scope.topics = [];
	$scope.chapters = [];
    $scope.home = function(){
        
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

    $scope.addcategory = function(){
        window.navigating=true;
    	$scope.error = false;
    	$scope.error1 = false;
    	
    	
    	if ($scope.cname == null ||  $scope.cname == undefined  || $scope.cname.replace(/\s/g, '').length === 0 || $scope.topicfile == undefined || $scope.topicfile == null) 
		{ 
			if($scope.cname == null ||  $scope.cname == undefined || $scope.cname.replace(/\s/g, '').length === 0){
				$scope.error = true;
			}
			
			if($scope.topicfile == undefined || $scope.topicfile == ''){
				$scope.error1 = true;
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
    	    }else {
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
					var id =  Math.floor(Math.random()*(999-100+1)+100);

					$scope.topiclist=[];
					$scope.chapterlist=[];
					for (var i = 0; i < $scope.topics.length; i++) {
						$scope.topiclist.push($scope.topics[i].text);
					}
					for (var i = 0; i < $scope.chapters.length; i++) {
						$scope.chapterlist.push($scope.chapters[i].text);
					}
	                var body = {
						    name: $scope.cname,
	                        oid: $scope.decry.oid,
							topics:$scope.topiclist,
							chapters:$scope.chapterlist
	                };
	                
	                var additionalParams = {
                            headers: {Authorization : token
                            }
                      };
	            
	                apigClient.addCategoryPost(params, body, additionalParams)
	                    .then(function(result){
	                    	var response = JSON.stringify(result.data);
							response = JSON.parse(response);
							
							if(response.id === 1 || response.id === '1'){
								swal({title: "Oops!", text: response.msg , type: "warning",buttonsStyling:false,allowOutsideClick: false,
								allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
						   $scope.loading=false;
						   $scope.$apply();
							}	
							else{
								$scope.uploadfile($scope.topicfile, response.tid, token);
							}
	            
	                        
	                        }).catch( function(result){
	                            
	                            var json = JSON.stringify(result);
	                            var json1 = json.toString();
	                            alert('ERROR'+result);
	                            
	                            
	                        });
	            
	        
	            }
 		  	});
		})
}
        
    $scope.uploadfile = function(image, id, token){
        $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
        var filename = id+".png";
     
		var apigClient = apigClientFactory.newClient({
		    invokeUrl: $scope.decry.api,
		});
		var params = {};
		
		var body = {
				type: 'subject',
				filetype: image.type,
				filename: filename,
				oid: $scope.decry.oid
				 };
		
		 var additionalParams = {
                 headers: {Authorization : token
                 }
		   };
		   
		apigClient.getpreSignedURLPost(params, body, additionalParams)
		.then(function(result){
		    	
		   var json = JSON.stringify(result.data);
		   
		  $scope.upload(image, result.data, id);
		 
		    }).catch( function(result){
		    	
		    	var json = JSON.stringify(result);
		    	var json1 = json.toString();
		    	alert('ERROR1'+result);
		    	
		    	
		    });
	
      
	
};
$scope.upload = function(file,url) {
	      $http.put(url, file, {headers:{'Content-Type': file.type}})
	        .success(function(resp) {
	        	$scope.loading = false;
	        	$uibModalInstance.dismiss('cancel');
	        	window.navigating=false;
                	
              swal({title: "",type:"success", text: "New Subject "+$scope.cname +" added Successfully",buttonsStyling:false,allowOutsideClick: false,
	                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
              $window.location.href = '#managecontent';
	        })
	        .error(function(resp) {
	          alert("An Error Occurred Attaching Your File. Please try again or Contact production Support if problem persist");
	        });
	}
    
    $scope.close = function(){
        $uibModalInstance.close();
    };
	$scope.onTagAdded1 = function(tag, limit) {
	
		if ($scope.topics.length > limit) {
			$scope.topics.pop();
		}
	}
	$scope.onTagAdded2 = function(tag, limit) {
	
		if ($scope.chapters.length > limit) {
			$scope.chapters.pop();
		}
	}
	$scope.paste1 = function(event, limit) {
		event.preventDefault();
		
		var ttags = event.originalEvent.clipboardData.getData('text/plain').split(',')
		for (var i = 0; i < ttags.length; i++) {
			
			$scope.topics.push({"text":ttags[i]});
			
		}	
		
		if ($scope.topics.length > limit) {
			$scope.topics.length = 30;
		}	
	} 
	$scope.paste2 = function(event, limit) {
		event.preventDefault();
		
		var ttags = event.originalEvent.clipboardData.getData('text/plain').split(',')
		for (var i = 0; i < ttags.length; i++) {
			
			$scope.chapters.push({"text":ttags[i]});
			
		}	
		
		if ($scope.chapters.length > limit) {
			$scope.chapters.length = 30;
		}	
	}  
    };
    
    app.controller('addsubjectCtrl', addsubjectCtrl);
    addsubjectCtrl.$inject = ['$scope', '$http', '$location', '$window','$cookies', '$uibModalInstance', 'config','Upload', '$sce','$crypto'];
    
    