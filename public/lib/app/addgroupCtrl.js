var addgroupCtrl = function ($scope, $http, $location, $window, $cookies, $uibModalInstance, config,$crypto) {
	
$scope.home = function(){
	
};

$scope.home();	

$scope.onlyNumbers = function(event){   
    var keys={
        'up': 38,'right':39,'down':40,'left':37,
        'escape':27,'backspace':8,'tab':9,'enter':13,'del':46,
        '0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57
    };
    for(var index in keys) {
        if (!keys.hasOwnProperty(index)) continue;
        if (event.charCode==keys[index]||event.keyCode==keys[index]) {
            return; //default event
        }
    }   
    event.preventDefault();
};

$scope.creategroup = function(){
	$scope.error=false;
    $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
	if($scope.gname == undefined || $scope.gname == ''){
		$scope.error=true;
		return;
		/*swal({title: "Oops!", text: "You need to enter the Group Name!", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'OK', confirmButtonColor: "#f5a138",customClass: 'swal-wide'});*/
	}else{
		$scope.loading = true;
		AWSCognito.config.region =  config.reg;
	    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
	        IdentityPoolId: $scope.decry.iid
	    });
	   
		var poolData = { UserPoolId :$scope.decry.uid,
		        ClientId : $scope.decry.cid
		    };
		
		var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
		
		var cognitoUser = userPool.getCurrentUser();
		
	    if (cognitoUser != null) {
	    	$scope.getsession(cognitoUser);
	    }else{
	    	localStorage.clear();
	    	$window.location.href = '#login';
	    	}
		
	}		
		
};
	
$scope.getsession = function(cognitoUser){
	
	  return new Promise((resolve, reject) => {
			 cognitoUser.getSession((err, session) =>{
	            if (err) {
			    	swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",allowOutsideClick: false,
			              allowEscapeKey:false,
			              width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',
			            	  buttonsStyling: false,confirmButtonClass: 'button1'});
	            	localStorage.clear();
	            	$window.location.href = '#login';
	            }else{
	            	
	            	var token = session.idToken.jwtToken;
	            	$scope.creategroupon(token); 
	            	/*var apigClient = apigClientFactory.newClient({});
	    			var params1 = {};
	    			var body = {type: '0',token : token,oid : localStorage.getItem("oid"),admin: 0};
	    			var additionalParams = {};
	            	apigClient.getCredentialsPost(params1, body, additionalParams)
					.then(function(result1){
					   var tjson = JSON.stringify(result1.data);
					   tjson = tjson.toString();
					   
					   tjson = JSON.parse(tjson);
					   $scope.creategroupon(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken); 
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

$scope.creategroupon = function(token){
	var apigClient = apigClientFactory.newClient({
	    invokeUrl: $scope.decry.api,
	});
	$scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
	var params = {};

	var body = {
			oid: $scope.decry.oid,
			gname: $scope.gname,
			action: '1'
	};
	
	 var additionalParams = {
             headers: {Authorization : token
             }
       };
	
	apigClient.createGroupPost(params, body, additionalParams)
		.then(function(result){
			
			var id = JSON.stringify(result.data);
        	var res=JSON.parse(id);
        	
			if(res!="Group already present"){
				$scope.loading = false;
				$scope.$apply();
				$uibModalInstance.dismiss('cancel');
				  
	        	swal({title: "", text: "New Group "+$scope.gname +" created Successfully",type:"success",allowOutsideClick: false,
		              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk'
		            	  ,buttonsStyling: false,confirmButtonClass: 'button1'});
	        	$window.location.href = '#managegroups';
	        	
            }else{
          	  swal({title: "Oops!", text: "Group already exist", type: "warning",buttonsStyling:false,allowOutsideClick: false,
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

$scope.close = function(){
	$uibModalInstance.close();
};

	
};
app.controller('addgroupCtrl', addgroupCtrl);
addgroupCtrl.$inject = ['$scope', '$http', '$location', '$window','$cookies', '$uibModalInstance', 'config','$crypto'];

