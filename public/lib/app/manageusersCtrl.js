"use strict";
var manageusersCtrl = function ($scope, $http, $uibModal,$location, $window, NgTableParams,userslist, config,$crypto) {
	
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
		
	    if (cognitoUser != null && $scope.decry.email != null && $scope.decry.oid != null) {

	    	cognitoUser.getSession(function(err, session) {
	            if (err) {
	            	localStorage.clear();
	            	$window.location.href = '#page';
	            }else{
	             
			 $scope.users = JSON.parse(userslist);
			 
/*			for(var i=0; i < $scope.users.length;i++){
				if($scope.users[i].LA == undefined){
					
				}else{
					var diff = moment.utc($scope.users[i].LA).fromNow();
					$scope.users[i].LA = diff;
				}
				
			}*/
			//alert(JSON.stringify($scope.users))
			
			    
			 $scope.tableParams = new NgTableParams({
			        page: 1,            // show first page
			        count: 10          // count per page
			    }, {
			      dataset:   $scope.users
			    	
			    	});

			  
			  
			/*  $scope.$watch('globalSearchTermAuto', function(newTerm, oldTerm) {
				    
				    $scope.tableParams.filter({ $: newTerm });
				  }, true);*/
			  
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
	    	 $scope.decry["activemenu"] = 'users';
	         localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
	    	//localStorage.setItem("activemenu", 'users');
	    }else{
	    	localStorage.clear();
	    	$window.location.href = '#login';
	    	}
	    window.navigating = false;
	    
	    $scope.nameFilter = {
	    		UNAME: {
	    		id: "text",
	    		placeholder: "",
	    		}
	    		};
	};

	$scope.musers();
	

	$scope.adduser = function(){
		
		$scope.loading = true;
		
			$scope.Instance = $uibModal.open({
			templateUrl: 'adduser.html',
			controller: 'adduserCtrl',
			backdrop: 'static',
	        keyboard: false,
	        windowClass: 'addusermodal',
	        scope: $scope,
	        resolve: {
	        	groupslist: function(getgroups){
	                return getgroups.getgroups();
	        }
	        }
	        });
			$scope.Instance.opened.then(function () {
				$scope.loading = false;
		    });
			 $scope.Instance.result.then(function (quiz) {
				 
			    }, function () {
			     // alert($scope.object);
			    });
	};
	
	$scope.viewuser = function(userrow){ 
		 $scope.loading = true;
	    $scope.userrow = userrow;
		$scope.Instance = $uibModal.open({
		templateUrl: 'viewuser.html',
		controller: 'viewuserCtrl',
		backdrop: 'static',
        keyboard: false,
        scope: $scope,
        windowClass: 'addusermodal',
        });
		$scope.Instance.opened.then(function () {
			$scope.loading = false;
	    });
		 $scope.Instance.result.then(function (quiz) {
			 
		    }, function () {
		     // alert($scope.object);
		    });
	};

};

app.controller('manageusersCtrl', manageusersCtrl);
manageusersCtrl.$inject = ['$scope', '$http','$uibModal','$location', '$window','NgTableParams','userslist', 'config','$crypto'];


app.factory("getusers", function($window, $q, config,$crypto){
    return {
    	getusers: function(){
    		var userslist,decry;   
    		localStorage.getItem("786a2y1e") !=null ?  decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';
   
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
    		   userslist = getusersession();
    		  
    	    }
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#page';
    	    }
			
			function getdata(token){
							var apigClient = apigClientFactory.newClient({invokeUrl: decry.api,});
							var params = {};
			        	    					
			        	    				
							var body = {
								   oid : decry.tenant
								 };
							
							
							var additionalParams = {
						             headers: {Authorization : token
						             }
						       };
							
							var data =	apigClient.getUsersPost(params, body, additionalParams)
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
			 				    	swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', confirmButtonColor: "#fcc917"});
			 		        		localStorage.clear();
			 		    	    	$window.location.href = '#page';
			 				    	
			 				    })
			 				return $q.when(abcd);
			 	 	   }*/
						
			function getusersession(){
			 	    	 return new Promise((resolve, reject) => {
			 	 			 cognitoUser.getSession((err, session) =>{
			 	 	            if (err) {
			 				    	swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",
			 				    		buttonsStyling:false,allowOutsideClick: false,
			 			                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
			 	 	            	localStorage.clear();
			 	 	            	$window.location.href = '#page';
			 	 	            }else{
			 	 	            	var token = session.idToken.jwtToken;
			 	 	            	var abcc = getdata(token); 
			 	 	            	resolve(abcc)
			 	 	            	return $q.when(abcc);
			 	 	        
			 	 	            }
			 	  		  	});
			 	 		})
			 	    }

    		
			return $q.when(userslist);
        }
    };
});

app.filter('moment', function () { return function (input, momentFn /*, param1, param2, ...param n */) 
	{ if(input != undefined){var args = Array.prototype.slice.call(arguments, 2), momentObj = moment(input);  
	return momentObj[momentFn].apply(momentObj, args); }
	
	}; 
	});

