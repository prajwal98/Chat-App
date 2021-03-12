 "use strict";
var wetemplateCtrl = function ($scope, $http,$uibModal,$location, $window, config, template,$crypto) {

	$scope.settings = function() {
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
		
	    if (cognitoUser != null && $scope.decry.email != null) {
			
			$scope.template = JSON.parse(template);
			$scope.subject = $scope.template.subject;
			$scope.body = $scope.template.body;
			$scope.disabled = true;
			$scope.edit = false;
			 if($window.innerWidth > 1024){
				  $scope.secondwidth = +$window.innerWidth - +224;
		    	}else{
		    		$scope.secondwidth = +$window.innerWidth - +65;
		    	}
		$scope.second = {'width':$scope.secondwidth};
    	$(window).resize(function() {
    		
    	      $scope.$apply(function() {
    	        $scope.windowWidth = $( window ).width();
    	        if($scope.windowWidth < 1023){
    	        	$scope.secondwidth = +$window.innerWidth - +65;
    	    		$scope.second = {'width':$scope.secondwidth};
    	        	$scope.sscreen = true;
    	    		$scope.lscreen = false;
    	        }
    	        if($scope.windowWidth > 1024 ){
    	        	$scope.secondwidth = +$window.innerWidth - +224;
    	    		$scope.second = {'width':$scope.secondwidth};
    	        	$scope.sscreen = false;
    	    		$scope.lscreen = true;
    	        }
    	      });
    	    });
    	/*$scope.$watch('$parent.asd', function(newVal) {
    	    var newVal= newVal.replace(/\r?\n/g, '<br />');
    	    $scope.$parent.comments = newVal;
    	},true); */
		
    }else{
    	localStorage.clear();
    	$window.location.href = '#login';
    	}
	    window.navigating=false;
	};
	
	$scope.settings();

	$scope.editmail = function(){
		$scope.disabled = false;
		$scope.edit = true;
	}
	$scope.reset = function(){
		$scope.error = false;
		$scope.error1 = false;
		$scope.disabled = true;
		$scope.edit = false;
		$scope.subject = $scope.template.subject;
		$scope.body = $scope.template.body;
	}
	$scope.savemail = function(){
		$scope.error2 = false;
		$scope.error = false;
		$scope.error1 = false;
		$scope.msg= "";
		$scope.name = 0;
		$scope.user = 0;
		$scope.pwd = 0;
		if($scope.subject == null ||  $scope.subject == undefined || $scope.subject.replace(/\s/g, '').length === 0 || 
				$scope.body == null ||  $scope.body == undefined || $scope.body.replace(/\s/g, '').length === 0){
			if($scope.subject == null ||  $scope.subject == undefined || $scope.subject.replace(/\s/g, '').length === 0){
				$scope.error = true;
				
			}
			if($scope.body == null ||  $scope.body == undefined || $scope.body.replace(/\s/g, '').length === 0){
				$scope.error1 = true;
				
			}
			
		}else{
			
			$scope.name = $scope.body.indexOf("$name");
			$scope.user = $scope.body.indexOf("$user");
			$scope.pwd = $scope.body.indexOf("$pwd");
		
			if($scope.name != -1 && $scope.user != -1 && $scope.pwd != -1){

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
		    
			}else{
				if($scope.name == -1 ){
					
					$scope.error2 = true;
					$scope.msg = "$name is missing";
					
				}
				else if($scope.user == -1){
					
					$scope.error2 = true;
					$scope.msg = "$user is missing";
					
					
				}else{
					$scope.error2 = true;
					$scope.msg = "$pwd is missing";
					
				}
			}
			
		}
		
	}
	
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
	 	            	$scope.savemailon(token); 
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
						   $scope.savemailon(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken); 
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
	
$scope.savemailon = function(token){
		
		var apigClient = apigClientFactory.newClient({
		    invokeUrl: $scope.decry.api,
		    
		});
		var params = {};
		  
		var body = {
			subject: $scope.subject,
			body: $scope.body,
			oid: $scope.decry.oid
				 };

		var additionalParams = {
	             headers: {Authorization : token
	             }
	       };
			template =	apigClient.updatemailTemplatesPost(params, body, additionalParams)
			.then(function(result){
				$window.location.href = '#settings';
				
			   
			    	
			    }).catch( function(result){
			    	
			    	var json = JSON.stringify(result);
					var json1 = json.toString();
					$scope.decry["activemenu"] = 'dashboard';
                    localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify(decry), config.key));
			    	//localStorage.setItem("activemenu", 'dashboard');
					$window.location.href = '#dashboard';
					
			    	
			    });
	
}
};

app.controller('wetemplateCtrl', wetemplateCtrl);
wetemplateCtrl.$inject = ['$scope', '$http','$uibModal','$location', '$window','config', 'template','$crypto'];

app.factory("gettemplate", function($window, $q, config,$crypto){
	$window.console.log("Inside settings ctrl")
    return {
		gettemplate: function(){
    		var template,decry;
    		localStorage.getItem("786a2y1e") !=null ?   decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login'; 

			AWSCognito.config.region =  config.reg;
    	    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
    	        IdentityPoolId: decry.iid
    	    });
    	   
    		var poolData = { UserPoolId : decry.uid,
    		        ClientId : decry.cid
    		    };
    		
    		
    		var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    		
    		var cognitoUser = userPool.getCurrentUser();
    		
    	   if (cognitoUser != null && decry.email != null) {
    		   template = getusersession();
    		  
    	    }
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#login';
    	    }
			
			function getdata(token){
							var apigClient = apigClientFactory.newClient({
							    invokeUrl: decry.api,
							});
							var params = {};
												
												
							var body = {
								oid : decry.oid
								 };
							
							
							var additionalParams = {
						             headers: {Authorization : token
						             }
						       };
							
							var data =	apigClient.getmailTemplatesPost(params, body, additionalParams)
							.then(function(result){
						    	
								
								   var json = JSON.stringify(result.data);
								    var cate = json.toString();
								    return $q.when(cate);
								    	
								    }).catch( function(result){
								    	
								    	var json = JSON.stringify(result);
										var json1 = json.toString();
										decry["activemenu"] = 'dashboard';
                                        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify(decry), config.key));
								    	//localStorage.setItem("activemenu", 'dashboard');
										$window.location.href = '#dashboard';
									});
							
							return $q.when(data);
			}

			/*function gettoken(token, id){
						  
						  var apigClient = apigClientFactory.newClient({});
							var params1 = {};
							var body = {type: id,token : token,oid : localStorage.getItem("oid"),admin: 0};
							var additionalParams = {};
							var abcd = apigClient.getCredentialsPost(params1, body, additionalParams)
							.then(function(result1){
							   var tjson = JSON.stringify(result1.data);
							   tjson = tjson.toString();
							   
							   tjson = JSON.parse(tjson);
							  var abc = getdata(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken); 
							  
								return $q.when(abc);
									
								}).catch( function(result){
									swal({title: "Oops!", text: "Session has been timed out, Please login again.", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', confirmButtonColor: "#fcc917"});
									localStorage.clear();
									$window.location.href = '#login';
									
								})
							return $q.when(abcd);
					   }*/
						
			function getusersession(){
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
									var abcc = getdata(token); 
									resolve(abcc)
									return $q.when(abcc);
							
								}
							});
						})
					}
			return $q.when(template);
			
        }
    };
});
