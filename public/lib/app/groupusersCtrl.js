 "use strict";
var groupusersCtrl = function ($scope, $http, $uibModal,$location, $window, NgTableParams,groupusers, config,$crypto) {
	
	$scope.musers = function(){
		
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
	    	cognitoUser.getSession(function(err, session) {
	            if (err) {
	            	localStorage.clear();
	            	$window.location.href = '#login';
	            }else{
	               
	             $scope.users = JSON.parse(groupusers);
	             
	             /*for(var i=0; i < $scope.users.length;i++){
	 				if($scope.users[i].LA == undefined){
	 					
	 				}else{
	 					var diff = moment.utc($scope.users[i].LA).fromNow();
	 					$scope.users[i].LA = diff;
	 				}
	 				
	 			}*/
				 $scope.delgroup = false;
				 
	             if($scope.users.length == 0){
	            	 $scope.delgroup = true;
	             }
	          
	       		 $scope.groupdetails = $scope.decry.group;
	       		 $scope.groupdetails = JSON.parse( $scope.groupdetails);
	       		 $scope.gname =  $scope.groupdetails.GNAME;
	       		 $scope.tableParams = new NgTableParams({
	       		        page: 1,            // show first page
	       		        count: 10          // count per page
	       		    }, {
	       		      dataset:   $scope.users
	       		    });
	       		   
	       	
	       		  $scope.$watch('globalSearchTermAuto', function(newTerm, oldTerm) {
	       		
	       			    $scope.tableParams.filter({ $: newTerm });
	       			  }, true);
	       		  
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
	       	    	        }
	       	    	        if($scope.windowWidth > 1024 ){
	       	    	        	$scope.secondwidth = +$window.innerWidth - +224;
	       	    	    		$scope.second = {'width':$scope.secondwidth};
	       	    	        }
	       	    	      });
	       	    	    });
	        
	       		
	            }
	    	});
	    }else{
	    	localStorage.clear();
	    	$window.location.href = '#login';
	    	}
		
	};

	$scope.musers();
	
	$scope.back = function(){
		if($scope.online == true){
			$scope.loading = true;
			$window.location.href = '#managegroups';
		}
		
	};
	$scope.loadPage = function(){
		if($scope.online == true){
			$scope.loading = true;
			$window.location.href = '#managegroups';
		}
		
	};
	$scope.adduser = function(){
		
		swal({
	   		 
				title: 'Add User',
				  html:
					/*'<p style="text-align: left;color:#767676;width:20%;float:left;font-size: 14px;margin-top:9px;margin-left: 10px;">Email</p>' +					
					'<input id="email" name="email" rows="1" wrap="soft" ng-model="ntitle" style="text-transform: lowercase;font-size:14px;border: 1px solid #ccc;float:left;width:95%;margin-left: 10px;overflow:hidden; resize:none;margin-bottom:10px;" ></input>'*/
					  '<p style="color:#767676;float:left;font-size: 14px;margin: 0px 4px 0 38px;line-height: 25px;">Email</p>'
					  +'<input id="email" name="email" rows="1" wrap="soft" ng-model="ntitle" style="border-radius:2px;font-size:14px;border: 1px solid #ccc;float:left;width:80%;overflow:hidden; resize:none;line-height:20px;margin: 0px 20px 5px 38px;" ></input></div>',			
					closeOnCancel: false,
				    showCancelButton: true,
				    showCloseButton: false,
				    allowOutsideClick: false,
				    allowEscapeKey:false,
				    customClass: 'sweetalertevent',
				    showConfirmButton: true, confirmButtonText: 'Add', 
				    buttonsStyling:false,allowOutsideClick: false,
			          allowEscapeKey:false,
			          cancelButtonClass:"button2",
				    confirmButtonClass: 'button1',
				   
				    
				    preConfirm: function () {
				    return new Promise(function (resolve) {
				    	
				    	
				    	if ($('#email').val() != '') {
				    		
				    		 resolve([
							        $('#email').val()
							      ]); 
				        } else {
				        	
				        	  swal.showValidationError('Please enter the user email id');
				        	  resolve();
				        }
				     
				    });
				  }
				}).then(function (result) {
					 var json = JSON.stringify(result);
					  $scope.ndesc = JSON.parse(json);
					  	if (result != null){
						
						 $scope.eid = $scope.ndesc.value[0];
						
						 $scope.addusertogroup();
						 
					}else {
						
					}
					 
				});
	};
	
	$scope.addusertogroup = function(action){ 
		 $scope.loading = true;
		 $scope.$apply();
		 AWSCognito.config.region =  config.reg;
		    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
		        IdentityPoolId: $scope.decry.iid
		    });
		   
			var poolData = { UserPoolId : $scope.decry.uid,
			        ClientId : $scope.decry.cid
			    };
			
			var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
			
			var cognitoUser = userPool.getCurrentUser();
			
		    if (cognitoUser != null && $scope.decry.group != null) {
		    	$scope.getsession(cognitoUser, 'adduser');
		    }else{
		    	localStorage.clear();
		    	$window.location.href = '#login';
		    	}
		
	};
	
	
	$scope.addusertogroupon = function(token){
		
			var apigClient = apigClientFactory.newClient({invokeUrl: $scope.decry.api,});
			var params = {};

			var body = {
					eid: $scope.eid,
					gid	: $scope.groupdetails.GID,
					oid: $scope.decry.oid,
					action: '1'
			};
			
			var additionalParams = {
		             headers: {Authorization : token
		             }
		       };
			
			apigClient.updateUserGroupPost(params, body, additionalParams)
				.then(function(result){

						var json = JSON.stringify(result);
						var json1 = json.toString();
						
						json1 = JSON.parse(json1);
					    
					    $scope.loading = false;
						$scope.$apply();
						
					    if(json1.data.Code == "2"){
				        	swal({title: "",type:"success", text: "User successfully added to this group",buttonsStyling:false,allowOutsideClick: false,
					              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
				        	$window.location.href = '#groupusers';	
					    }
					    else if(json1.data.Code == "1"){
				        	swal({title: "", type: "error", text: "User does not exist",buttonsStyling:false,allowOutsideClick: false,
     			                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					    }
					    else if(json1.data.Code == "0"){
				        	swal({title: "", type: "error", text: "User already exists in the group",buttonsStyling:false,allowOutsideClick: false,
     			                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					    }else{
				        	swal({title: "", type: "error", text: "Not able to add the user to group. Please contact production support team",buttonsStyling:false,allowOutsideClick: false,
     			                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					    }
				    	$window.$location = '#groupusers';
				    }).catch( function(result){
				    	
				    	var json = JSON.stringify(result);
				    	var json1 = json.toString();
				    	
				    	
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
	 	            	 if(type == 'adduser'){
							   $scope.addusertogroupon(token); 
						   }else if(type == 'removeuser'){
							   $scope.removeuseron(token); 
						   }else if(type == 'delgroup'){
							   $scope.deletegrouponon(token); 
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
						   if(type == 'adduser'){
							   $scope.addusertogroupon(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken); 
						   }else if(type == 'removeuser'){
							   $scope.removeuseron(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken); 
						   }else if(type == 'delgroup'){
							   $scope.deletegrouponon(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken); 
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
	$scope.removeuserConf = function(user){
        swal({
              title: 'Are you sure?',
              text: "You want to remove the user",
              type: 'warning',
              width: '400px',
              customClass: 'sweetalert-lgs',
              buttonsStyling:false,allowOutsideClick: false,
              allowEscapeKey:false,
              showCancelButton: true, cancelButtonText: 'No', cancelButtonColor: "#ffffff",cancelButtonClass:"button2",
    		  showConfirmButton: true, confirmButtonText: 'Yes', confirmButtonColor: " #f5a138", confirmButtonClass: 'button1'
            }).then((result) => {
              if (result.value) {
                 $scope.loading = true;
                 $scope.$apply();
                 $scope.removeuser(user)
              }
            })
    }
	$scope.removeuser = function(user){ 
	    
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
		
	    if (cognitoUser != null && $scope.decry.group != null) {
	    	$scope.deluser = user;
	    	$scope.getsession(cognitoUser, 'removeuser');
	    	
	    }else{
	    	localStorage.clear();
	    	$window.location.href = '#login';
	    	}
	    
	};
	
	$scope.removeuseron = function(token){
		
			var apigClient = apigClientFactory.newClient({invokeUrl: $scope.decry.api,});
			var params = {};

			var body = {
					eid: $scope.deluser.EMAILID,
					gid	: $scope.groupdetails.GID,
					oid: $scope.decry.oid,
					action: '0'
			};
			
			var additionalParams = {
		             headers: {Authorization : token
		             }
		       };
			  
			var topicjson =	apigClient.updateUserGroupPost(params, body, additionalParams)
				.then(function(result){
						
						var json = JSON.stringify(result);
						var json1 = json.toString();
						 
						json1 = JSON.parse(json1);
					    $scope.loading = false;
					    $scope.$apply();
					   
					    if(json1.data.Code == "2"){
				        	swal({title: "", type: "success", text: "User successfully removed from the group",buttonsStyling:false,allowOutsideClick: false,
					              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
				        	$window.location.href = '#groupusers';	
					    }
					    else if(json1.data.Code == "1"){
				        	swal({title: "", type: "error", text: "User does not exist",buttonsStyling:false,allowOutsideClick: false,
					              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					    }
					    else if(json1.data.Code == "0"){
				        	swal({title: "", type: "error", text: "User does not exists in the group",buttonsStyling:false,allowOutsideClick: false,
					              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					    }else{
				        	swal({title: "", type: "error", text: "Not able to add the user to group. Please contact production support team",buttonsStyling:false,allowOutsideClick: false,
					              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					    }
				    
				    }).catch( function(result){
				    	
				    	var json = JSON.stringify(result);
				    	var json1 = json.toString();
				    	alert('ERROR'+result);
				    });
	}
	
	$scope.deletegroup = function() {
		swal({
			  
			  text: "Do you want to delete this group ?",
			  type: 'warning',
			  width: '400px',
			  customClass: 'sweetalert-lgs',
              buttonsStyling:false,allowOutsideClick: false,
              allowEscapeKey:false,
              showCancelButton: true, cancelButtonText: 'No', cancelButtonClass:"button2",
    		  showConfirmButton: true, confirmButtonText: 'Yes', confirmButtonClass: 'button1',
			}).then((result) => {
			  if (result.value) {
				  	$scope.loading = true;
					$scope.$apply();
					$scope.deletegroupon();
			  } else if (
			    result.dismiss === swal.DismissReason.cancel
			  ) {
			  }
			})
	};
	$scope.deletegroupon = function(){
		
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
		
	    if (cognitoUser != null) {
	    	$scope.getsession(cognitoUser, 'delgroup');
	    }else{
	    	localStorage.clear();
	    	$window.location.href = '#login';
	    	}
	}
	
	$scope.deletegrouponon = function(token){
		
		var apigClient = apigClientFactory.newClient({invokeUrl: $scope.decry.api,});
		var params = {};

		var body = {
				oid: $scope.decry.oid,
				gid	: $scope.groupdetails.GID,
				action: '0'
		};
		
		var additionalParams = {
	             headers: {Authorization : token
	             }
	       };
		
		var topicjson =	apigClient.createGroupPost(params, body, additionalParams)
			.then(function(result){
				$window.location.href = '#managegroups';		
			    }).catch( function(result){
			    	
			    	var json = JSON.stringify(result);
			    	var json1 = json.toString();
			    	alert('ERROR'+result);
			    	
			    	
			    });
	}
};

app.controller('groupusersCtrl', groupusersCtrl);
groupusersCtrl.$inject = ['$scope', '$http','$uibModal','$location', '$window','NgTableParams','groupusers', 'config','$crypto'];


app.factory("getgroupusers", function($window, $q, config,$crypto){
    return {
    	getgroupusers: function(){
    		var groupusers,decry;
    	
    		if(localStorage.getItem("786a2y1e") != null)
		    {
		       decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		    }else
	        {
		        localStorage.clear();
                $window.location.href = '#login';
	        }
    		
    		 

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
    		   groupusers = getusersession();
    		  
    	    }
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#login';
    	    }
			
			function getdata(token){
							var apigClient = apigClientFactory.newClient({invokeUrl: decry.api,});
							var params = {};
    					  	var group = decry.group;
    					  
    					  	group = JSON.parse(group);
    					  	var groupid = group.GID;
    						var body = {
    								groupid : groupid,
    								oid: decry.oid
    								 };
    						
    						var additionalParams = {
    					             headers: {Authorization : token
    					             }
							   };
							 
    						var data = apigClient.getGroupUsersPost(params, body, additionalParams)
    							.then(function(result){
    							    	
    							   var json = JSON.stringify(result.data);
    							    var users = json.toString();
    							    
    							    return $q.when(users);
    							    	
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
									swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
						                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
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
			
			return $q.when(groupusers);
        }
    };
});

app.filter('moment', function () { return function (input, momentFn /*, param1, param2, ...param n */) 
	{ if(input != undefined){var args = Array.prototype.slice.call(arguments, 2), momentObj = moment(input);  
	return momentObj[momentFn].apply(momentObj, args); }
	
	}; 
	});
