var viewuserCtrl = function ($scope, $http, $location, $window, $cookies, $uibModalInstance, config,$crypto) {
	
$scope.home = function(){
	$scope.edituser = false;
	//$scope.userinfo = localStorage.getItem("viewuser");
	$scope.userinfo = $scope.userrow;
	$scope.uname = $scope.userinfo.UNAME;
	$scope.eid = $scope.userinfo.EMAILID;
	$scope.urole = $scope.userinfo.UR;
	
	if($scope.userinfo.CNO!=undefined){
		$scope.contactno = $scope.userinfo.CNO;
		$scope.contactno =$scope.contactno.trim();
	}
	else
		{
		$scope.contactno = $scope.userinfo.CNO;
		}
	
	if($scope.userinfo.ADS!=undefined){
		$scope.address = $scope.userinfo.ADS;
		$scope.address =$scope.address.trim();
	}
	else
		{
		$scope.address = $scope.userinfo.ADS;
		}
	
	
	$scope.ustatus = $scope.userinfo.US;
	$scope.ugen = $scope.userinfo.GEN;
	
};

$scope.home();	

$scope.disable = function(){
    var msg=$scope.ustatus == '1' ? "disable" : "enable";
	swal({
	    /* title: 'Are you sure?',*/
         text: "Do you want to "+ msg +" this user",
		  width: '400px',
		  type: 'warning',
		  customClass: 'sweetalert-lgs',
		  buttonsStyling:false,allowOutsideClick: false,
          allowEscapeKey:false,
		  showCancelButton: true, cancelButtonText: 'No', cancelButtonColor: "#ffffff",cancelButtonClass:"button2",
		  showConfirmButton: true, confirmButtonText: 'Yes', confirmButtonColor: " #f5a138", confirmButtonClass: 'button1',
		}).then((result) => {
		  if (result.value) {
			  	$scope.loading = true;
			
				$scope.disableuser();
			    $scope.$apply();
		  } else if (
		    result.dismiss === swal.DismissReason.cancel
		  ) {
		  }
		})
};

$scope.disableuser = function(){
	if($scope.online == true){
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
    	$scope.getsession(cognitoUser, 'ustatus');
    }else {
    	localStorage.clear();
    	$window.location.href = '#login';
	}
}else
{
	$uibModalInstance.dismiss('cancel');
	swal({title: "Oops!", text: "Please check your internet connection!", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
}
};


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
	            	 if(type == 'ustatus')
					   { 
						 $scope.disableuseron(token); 
					   }else if(type == 'edit')
					   { 
						   $scope.updateuseron(token); 
					   }else{
						   
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
					   if(type == 'ustatus')
					   { 
						
						   $scope.disableuseron(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken); 
					   
					   }else if(type == 'edit')
					   { 
						   $scope.updateuseron(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken); 
					   
					   }else{
						   
					   }
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


$scope.disableuseron = function(token){ 

	
	localStorage.getItem("786a2y1e") !=null ?   $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';
	var apigClient = apigClientFactory.newClient({
        invokeUrl: $scope.decry.api,
    });
	var params = {};
	var additionalParams = {
            headers: {Authorization : token
            }
      };
	var action;
	
	var body1 = {
			eid: $scope.userinfo.EID,
			action: $scope.ustatus,
			oid: $scope.decry.oid,
			urole:$scope.urole
			 };
	
	apigClient.updateUserStatusPost(params, body1, additionalParams)
	.then(function(result){
		
	    	$scope.loading = false; 
			if($scope.ustatus == '0'){
				swal({title: "",type: "success", text: "User enabled successfully",buttonsStyling:false,allowOutsideClick: false,
		              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
			}else{
				
				swal({title: "",type: "success", text: "User disabled successfully",buttonsStyling:false,allowOutsideClick: false,
		              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});

			}
			$uibModalInstance.dismiss('cancel');
        	$window.location.href = '#manageusers';
		}).catch( function(result){
			$window.location.href = '#dashboard';
	    });
}
$scope.reset = function(){
	$scope.error = false;
	$scope.error1 = false;
	$scope.error2 = false;
	$scope.error3 = false;
	$scope.error4 = false;
	$scope.error5 = false;
	$scope.error6 = false;
	$scope.uname = $scope.userinfo.UNAME;
	$scope.eid = $scope.userinfo.EMAILID;
	$scope.contactno = $scope.userinfo.CNO;
	$scope.contactno =$scope.contactno.trim();
	$scope.address = $scope.userinfo.ADS;
	$scope.address =$scope.address.trim();
	$scope.ugen = $scope.userinfo.GEN;
    $scope.editdata = false;
};
$scope.updateuser = function(){

	$scope.error = false;
	$scope.error1 = false;
	$scope.error2 = false;
	$scope.error3 = false;
	$scope.error4 = false;
	$scope.error5 = false;
	$scope.error6 = false;
	
	/*var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
*/	if($scope.uname == undefined || $scope.ugen == undefined || $scope.uname.replace(/\s/g, '').length === 0 || $scope.userinfo.EID == undefined || $scope.eid.replace(/\s/g, '').length === 0 || 
			$scope.uname == '' || $scope.eid == '' || $scope.ugen == ''){
	
		if($scope.uname == undefined || $scope.uname == '' || $scope.uname.replace(/\s/g, '').length === 0 ){
			$scope.error = true;
			return;
		}
		if($scope.userinfo.EID == undefined || $scope.userinfo.EID == '' || $scope.userinfo.EID.replace(/\s/g, '').length === 0 ){
			$scope.error1 = true;
			return;
		}
		/*if($scope.contactno == undefined || $scope.contactno == '' ){
			$scope.error3 = true;
			return;
		}*/
		if($scope.ugen == undefined || $scope.ugen == '' ){
			$scope.error2 = true;
			return;
		}
		/*if($scope.address == undefined || $scope.address == '' ){
			$scope.error4 = true;
			return;
		}*/
	}else{ 
		
		/*if (!reg.test($scope.eid)){
			$scope.error5 = true;
			return;
		}*/
		/*if($scope.contactno.length != 10 ){
			$scope.error6 = true;
			return;
		}
		if($scope.address == undefined || $scope.address == '' || $scope.address.replace(/\s/g, '').length === 0 ){
			$scope.error4 = true;
			return;
		}*/
		
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
	    	$scope.getsession(cognitoUser, 'edit');
	    }else {
		localStorage.clear();
		$window.location.href = '#login';
	}
	}
	
};

$scope.updateuseron = function(token){
    localStorage.getItem("786a2y1e") !=null ?   $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';
	var apigClient = apigClientFactory.newClient({
	    invokeUrl: $scope.decry.api,
	});
	
	var params = {};
	
	if($scope.address == null || $scope.address == ''){
		$scope.address = ' ';
	}
	if($scope.contactno == null || $scope.contactno == ''){
		$scope.contactno = ' ';
	}
	
	var body2 = {
			uname: $scope.uname,
			eid: $scope.userinfo.EID,
			address: $scope.address,
			contactno: $scope.contactno,
			gender: $scope.ugen,
			oid: $scope.decry.oid,
			urole: $scope.userrow.UR
			 };
	var additionalParams = {
            headers: {Authorization : token
            }
      };
	
	apigClient.updateUserDetailsPost(params, body2, additionalParams)
	.then(function(result){
	    	
			var topicid = JSON.stringify(result.data);
			
			
			$scope.loading = false; 
	    	swal({title: "", text: "User details updated successfully",type:"success",allowOutsideClick: false,
	              allowEscapeKey:false,
	              width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',
	            	  buttonsStyling: false,confirmButtonClass: 'button1'});
	    	$uibModalInstance.dismiss('cancel');
			
			$window.location.href = '#manageusers';
		}).catch( function(result){
			$window.location.href = '#dashboard';
	    });
}

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


$scope.close = function(){
	$uibModalInstance.close();
};

	
};
app.controller('viewuserCtrl', viewuserCtrl);
viewuserCtrl.$inject = ['$scope', '$http', '$location', '$window','$cookies', '$uibModalInstance', 'config','$crypto'];

