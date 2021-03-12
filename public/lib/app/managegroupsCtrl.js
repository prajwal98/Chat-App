 "use strict";
var managegroupsCtrl = function ($scope, $http, $uibModal,$location, $window, NgTableParams, groupslist, config,$crypto) {
	
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
	            	
		$scope.groups1 = JSON.parse(groupslist);
		$scope.groups1 = $scope.groups1.groups;
		$scope.groups = $scope.groups1.sort(function(x, y){
		    return x.DC - y.DC;
		});
		
		if($scope.decry["pageindex"] != undefined){
			$scope.currentPage = $scope.decry["pageindex"];
		}else
			{
			
			$scope.currentPage = 1;
			}
			
		  $scope.numPerPage = 10;
		  $scope.maxSize = 9;
		  $scope.filteredgroups = [];
		  $scope.totalgroups = $scope.groups.length + 1;
		  
		  $scope.$watch('currentPage + numPerPage', function() {
			 
			    var begin = (($scope.currentPage - 1) * $scope.numPerPage),
			    end = +begin + +$scope.numPerPage;
			   
			    $scope.filteredgroups = $scope.groups.slice(begin, end);
			    
			  });
		 $scope.$watch('globalSearchTermAuto', function(newTerm, oldTerm) {
			    
			 //$scope.groups1 = $scope.groups.filter({ $: newTerm });
			
			    var begin = (($scope.currentPage - 1) * $scope.numPerPage),
			    end = +begin + +$scope.numPerPage;
			   
			    $scope.filteredgroups = $scope.groups1.slice(begin, end);
			  }, true);
		 
		 if($window.innerWidth > 1024){
			  $scope.secondwidth = +$window.innerWidth - +224;
			  $scope.limit=9;
	    	}else{
	    		$scope.secondwidth = +$window.innerWidth - +65;
	    		$scope.limit=10;
	    	}
			$scope.second = {'width':$scope.secondwidth};
	    	$(window).resize(function() {
	    		
	    	      $scope.$apply(function() {
	    	        $scope.windowWidth = $( window ).width();
	    	        if($scope.windowWidth < 1023){
	    	        	$scope.secondwidth = +$window.innerWidth - +65;
	    	    		$scope.second = {'width':$scope.secondwidth};
	    	    		$scope.limit=9;
	    	        }
	    	        if($scope.windowWidth > 1024 ){
	    	        	$scope.secondwidth = +$window.innerWidth - +224;
	    	    		$scope.second = {'width':$scope.secondwidth};
	    	    		$scope.limit=10;
	    	        }
                   if($scope.windowWidth > 1024 && $scope.windowWidth < 1400){
	    	        	
	    	    		$scope.limit=9;
	    	        }
	    	        if($scope.windowWidth > 1400 && $scope.windowWidth < 1700){
	    	        	
	    	    		$scope.limit=8;
	    	        }
	    	      });
	    	    });
	    }
	    });
	    	$scope.decry["activemenu"] = 'groups';
            localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
	    	//localStorage.setItem("activemenu", 'groups');
		}else{
	    	localStorage.clear();
	    	$window.location.href = '#login';
	    	}
		
	    window.navigating = false;
	
	};
	$scope.pageChanged = function() {
		delete $scope.decry["pageindex"];
		localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
		  var startPos = ($scope.currentPage - 1) * 8;
		};
	$scope.musers();
	
	

	
	$scope.addgroup = function(){
		
		$scope.loading = true;
		
			$scope.Instance = $uibModal.open({
			templateUrl: 'addgroup.html',
			controller: 'addgroupCtrl',
			backdrop: 'static',
	        keyboard: false,
	        windowClass: 'addusermodal',
	        scope: $scope,
	        });
			$scope.Instance.opened.then(function () {
				$scope.loading = false;
		    });
			 $scope.Instance.result.then(function (quiz) {
				 
			    }, function () {
			   
			    });
	};
	
	$scope.viewgroup = function(group){
		$scope.loading = true;
		$scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		var json = JSON.stringify(group);
	    json = json.toString();
	    $scope.decry["group"] = json;
	    $scope.decry["pageindex"] = $scope.currentPage;
	    
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
		//localStorage.setItem("group", json);
		$window.location.href = '#groupusers';
	};

};

app.controller('managegroupsCtrl', managegroupsCtrl);
managegroupsCtrl.$inject = ['$scope', '$http','$uibModal','$location', '$window','NgTableParams', 'groupslist', 'config','$crypto'];



app.factory("getgroups", function($window, $q, config,$crypto){
    return {
    	getgroups: function(){
    		var groupslist,decry;
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
    		   groupslist = getusersession();
    		  
    	    }
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#login';
    	    }
			
			function getdata(token){
							var apigClient = apigClientFactory.newClient({ invokeUrl: decry.api, });
							var params = {};
			        	    					
			        	    					
							var body = {
								oid : decry.oid
								 };
							
							
							var additionalParams = {
						             headers: {Authorization : token
						             }
						       };
							
							var data =	apigClient.getGroupsPost(params, body, additionalParams)
							.then(function(result){
							    	
								
							   var json = JSON.stringify(result.data);
							    var groups = json.toString();
							    
							    return $q.when(groups);
							    	
							    }).catch( function(result){
							    	
							    	var json = JSON.stringify(result);
							    	var json1 = json.toString();
							    	localStorage.setItem("activemenu", 'dashboard');
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

    	    
    	    return $q.when(groupslist);
    	}
    };
});

