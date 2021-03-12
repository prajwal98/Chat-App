var editcategoryCtrl = function ($scope, $http, $location, $window, $cookies, $uibModalInstance, config, Upload, $sce,$crypto) {
	
    $scope.home = function(){
    $scope.edit = true;
    $scope.topicchanged = false;
    
    $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
    $scope.orgid = $scope.decry.oid;
    $scope.cname = $scope.categorytoedit.name;
    $scope.cname1 = $scope.cname;
    $scope.cid = $scope.categorytoedit.id;
    $scope.origCat = angular.copy($scope.cname);
    
    
    $scope.oldedittopicfile = config.url+$scope.orgid.toLowerCase()+"-resources/images/category-images/"+$scope.cid+".png";
    $scope.$watch('cname', function() {
  	  $scope.checkcategory();
     }, true);
    };

    $scope.home();	

    $scope.checkcategory = function(){
    	$scope.topicchangedcheck =  angular.equals($scope.cname, $scope.origCat);
    	
    	
        if($scope.topicchangedcheck){
        	
        	$scope.edit = true;
       	 	$scope.topicchanged = false;
        }else{
        	 $scope.edit = false;
        	 $scope.topicchanged = true;
        }
    }
    
    $scope.catimageupload = function(topicfile) {
    	if(topicfile == null){
    		return;
    	}
    	//5242880 1048576
    	if(topicfile.size > 5242880){
    		swal({title: "", text: "Image size is too large. File size cannot be greated than 5mb.",type:'error',buttonsStyling:false,allowOutsideClick: false,
                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK',customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
    		 return;
		}
		
    	$scope.edit = false;
   	 	$scope.topicchanged = true;
    	$scope.oldedittopicfile = topicfile;
    	$scope.edittopicfile = topicfile;
    };
    
    $scope.editcategory = function(){
    	$scope.error = false;
    	$scope.error1 = false;
    	if ($scope.cname == null ||  $scope.cname == undefined || $scope.cname.replace(/\s/g, '').length === 0) 
		{ 
			if($scope.cname == null ||  $scope.cname == undefined || $scope.cname.replace(/\s/g, '').length === 0){
				$scope.error = true;
			}
		}else{
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
    	    	
    	    	$scope.getsession(cognitoUser, 'edit');
    	    }else {
    	    	localStorage.clear();
    	    	$window.location.href = '#login';
    	    }
            
        }
};

$scope.editcategoryon = function(token){
	
	var apigClient = apigClientFactory.newClient({invokeUrl: $scope.decry.api,});
	var params = {};

    
    if($scope.edittopicfile != null || $scope.edittopicfile != undefined){

		 var body = {
                   
                    name: $scope.cname,
                    tid: $scope.cid,
                    image : true,
                    oid : $scope.decry.oid
            };
	}else{
		 var body = {
                
                 name: $scope.cname,
                 tid: $scope.cid,
                 oid : $scope.decry.oid
         };
	}
    var additionalParams = {
            headers: {Authorization : token
            }
      };
    
   apigClient.editCategoryPost(params, body, additionalParams)
        .then(function(result){
        	
        	if($scope.edittopicfile != null || $scope.edittopicfile != undefined){
        		
        		$scope.uploadfile($scope.edittopicfile, $scope.cid, token);
        	}else{
        		$scope.loading = false;
	        	$uibModalInstance.dismiss('cancel');	
                var response = JSON.stringify(result.data);
					response = JSON.parse(response);
			
					if(response.id === 1 || response.id === '1'){
						swal({title: "",type:"error", text: response.msg,buttonsStyling:false,allowOutsideClick: false,
						allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
				   $scope.loading=false;
				   
				   $scope.$apply();
					}	
					else{
						swal({title: "",type:"success", text: response.msg ,buttonsStyling:false,allowOutsideClick: false,
       	                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
                 	 $scope.loading=false;
                 	 $window.location.href = '#managecontent'; 
                 	 $scope.$apply();
					}
  	        
        		
        	}
        	
            
            }).catch( function(result){
                
                var json = JSON.stringify(result);
                var json1 = json.toString();
                alert('ERROR'+result);
                
                
            });
}
        
    $scope.uploadfile = function(image, id, token){
		
        var filename = id+".png";
       // image.name = filename;
       
		
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
	        
              swal({title: "",type:"success", text: "Topic edited successfully",buttonsStyling:false,allowOutsideClick: false,
	                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					$window.location.href = '#managecontent';
	        	
	        })
	        .error(function(resp) {
	          alert("An Error Occurred Attaching Your File. Please try again or Contact production Support if problem persist");
	        });
	}
    
$scope.deletewarn = function(){
	swal({
		  
		  title: '<p style="color:#b2b2b2;margin:30px 0;padding:0;fontsize:16px;">Are you sure you want to delete this category?</p>',
		  width: '400px',
		  type:"warning",
		  customClass: 'sweetalert-lgs',
          buttonsStyling:false,allowOutsideClick: false,
          allowEscapeKey:false,
          showCancelButton: true, cancelButtonText: 'No', cancelButtonClass:"button2",
		  showConfirmButton: true, confirmButtonText: 'Yes',  confirmButtonClass: 'button1'
		}).then((result) => {
		  if (result.value) {
			  	$scope.loading = true;
				$scope.$apply();
				$scope.deletecategory();
		  } else if (
		    result.dismiss === swal.DismissReason.cancel
		  ) {
		  }
		})
}

$scope.deletecategory = function(){
	
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
	    	
	    	$scope.getsession(cognitoUser, 'delete');
	    }else {
	    	localStorage.clear();
	    	$window.location.href = '#login';
	    }

    
}

$scope.deletecategoryon = function(token){
	
	var apigClient = apigClientFactory.newClient({invokeUrl: $scope.decry.api,});
	var params = {};

    var body = {
            action: 'delete',
            id: $scope.cid,
            oid: $scope.decry.oid
    };
    
    var additionalParams = {
            headers: {Authorization : token
            }
      };
    
   apigClient.updateCategoriesPost(params, body, additionalParams)
        .then(function(result){

	        	$uibModalInstance.dismiss('cancel');
                $window.location.href = '#categories';	
        		swal({title: "",type:"success", text: "Category deleted successfully",buttonsStyling:false,allowOutsideClick: false,
	                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
        	
        	
            
            }).catch( function(result){
                
                var json = JSON.stringify(result);
                var json1 = json.toString();
                alert('ERROR'+result);
                
                
            });
}
$scope.getsession = function(cognitoUser, type){
	
	  return new Promise((resolve, reject) => {
			 cognitoUser.getSession((err, session) =>{
	            if (err) {
			    	swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
		                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK',customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	            	localStorage.clear();
	            	$window.location.href = '#login';
	            }else{
	            	
	            	var token = session.idToken.jwtToken;
	            	
	            	if(type == 'edit')
	            	{
					    $scope.editcategoryon(token); 
	            	}else  if(type == 'delete')
	            	{
	            		$scope.deletecategoryon(token); 
		            }else {
		            		
		            	}
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
					   if(type == 'edit')
		            	{
						    $scope.editcategoryon(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken); 
		            	}else  if(type == 'delete')
		            	{
		            		$scope.deletecategoryon(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken); 
			            }else {
			            		
			            	}
					  
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

    $scope.close = function(){
        $uibModalInstance.close();
    };
    
        
    };
    app.controller('editcategoryCtrl', editcategoryCtrl);
    editcategoryCtrl.$inject = ['$scope', '$http', '$location', '$window','$cookies', '$uibModalInstance', 'config','Upload', '$sce','$crypto'];
    
    