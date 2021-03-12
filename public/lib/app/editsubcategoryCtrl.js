var editsubcategoryCtrl = function ($scope, $http, $location, $window, $cookies, $uibModalInstance, config, Upload, $sce,$crypto) {
	
    $scope.home = function(){
    $scope.edit = true;
    $scope.topicchanged = false;
    
    $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
    $scope.orgid = $scope.decry.oid;
    
    $scope.scname = $scope.subcat.scat;
    $scope.sid = $scope.categorytoedit.subcategories.id;
    $scope.cname = $scope.scname;
    $scope.cid = $scope.categorytoedit.id;
    $scope.origCat = angular.copy($scope.cname);
    
    $scope.oldeditcategoryfile = config.url+$scope.orgid.toLowerCase()+"-resources/images/category-images/"+$scope.cid+".png";
    
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

$scope.editsubcategoryon = function(token){
	
	
	var apigClient = apigClientFactory.newClient({invokeUrl: $scope.decry.api,});
	var params = {};
	
		 var body = {
				 
				subcategory: $scope.cname,
   	            cid: $scope.categorytoedit.id,
   	            oid: $scope.decry.oid,
   	            action:"edit",
   	            index: $scope.index,
   	            sid: $scope.subcat.id
         };
	
    var additionalParams = {
           
      };
    
   apigClient.updateSubCategoryPost(params, body, additionalParams)
        .then(function(result){
        	$scope.loading = false;
        	$uibModalInstance.dismiss('cancel');
        	
                var json = JSON.stringify(result.data);
                var res = JSON.parse(json);
                
  	        	if(res!="Sub category already exist"){
  	        		
  	        		 swal({title: "",type:"success", text: "Sub category edited Successfully",buttonsStyling:false,allowOutsideClick: false,
       	                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
                 	 $scope.loading=false;
                 	 $window.location.href = '#categories'; 
                 	 $scope.$apply();
                  }else{
                	  swal({title: "Oops!", text: "Sub category already exist", type: "warning",buttonsStyling:false,allowOutsideClick: false,
	  		                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	                	 $scope.loading=false;
	                	 $scope.$apply();
                  }
        
            
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
		                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	            	localStorage.clear();
	            	$window.location.href = '#login';
	            }else{
	            	
	            	var token = session.idToken.jwtToken;
	            	
	            	if(type == 'edit')
	            	{
					    $scope.editsubcategoryon(token); 
	            	}else {
		            		
		            	}
	            	resolve();	
	            
	        
	            }
		  	});
		})
}

$scope.editsubcategory = function(){
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
    $scope.close = function(){
        $uibModalInstance.close();
    };
    
        
    };
    app.controller('editsubcategoryCtrl', editsubcategoryCtrl);
    editsubcategoryCtrl.$inject = ['$scope', '$http', '$location', '$window','$cookies', '$uibModalInstance', 'config','Upload', '$sce','$crypto'];
    
    