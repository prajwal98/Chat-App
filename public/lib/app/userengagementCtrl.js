 "use strict";
var userengagementCtrl = function ($scope, $http, $uibModal,$location, $window, NgTableParams,userslist, config,$crypto) {
	
	$scope.musers = function(){
	    localStorage.getItem("786a2y1e") !=null ?   $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';
		$scope.userslist = [];
		$scope.multiusers = false;
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
	            	$window.location.href = '#page';
	            }else{
			 $scope.users = JSON.parse(userslist);
			 for(var i=0; i < $scope.users.length;i++){
				 $scope.users[i].checked = false;
				 $scope.users[i].id = i;
					/*if($scope.users[i].LA == undefined){
						
					}else{
						var diff = moment.utc($scope.users[i].LA).fromNow();
						$scope.users[i].LA = diff;
					}*/
					
				}
				$scope.users = $scope.users.sort(function(x, y){
					return y.LA - x.LA;
				});
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
	    $scope.decry["activemenu"] = 'engage';  
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
	   
	    window.navigating = false;
	};

	$scope.musers();
	
	
	$scope.usersel = function(row,indexs){
		
		var EID  = row.EID;
		var EMAILID  = row.EMAILID;
		var index = $scope.userslist.findIndex(list => list.EID === EID);
		
		if(index == -1 ){
			$scope.userslist.push({"EID":EID,"EMAILID":EMAILID});
		
			 $scope.users[indexs].checked = true;
		}else{
			$scope.userslist.splice(index, 1); 
			$scope.users[indexs].checked = false;
		}
		
		if($scope.userslist.length > 0){
			$scope.multiusers = true;
		}else{
			$scope.multiusers = false;
		}
		
	}
	
	$scope.usermsg = function(row){
		$scope.multiuser = false;
		$scope.tenant = [$scope.decry.tenant];
		$scope.userslist.push({"EID":row.EID,"EMAILID":row.EMAILID});
		
		  $scope.Instance = $uibModal.open({
				templateUrl: 'sendnotification.html',
				controller: 'sendnotificationCtrl',
				backdrop: 'static',
		        keyboard: false,
		        scope: $scope,
		        windowClass: 'addnuggetmodal',
		        resolve: {
		            items: function () {
		            	
		              return $scope.object;
		            }
		          }
				});
		 $scope.Instance.result.then(function (action) {
			 
		 }, function () {
		     // alert($scope.object);
		    });
	}
	
	$scope.multiusermsg = function(){
		$scope.tenant = [$scope.decry.tenant];
		$scope.multiuser = true;
		  $scope.Instance = $uibModal.open({
				templateUrl: 'sendnotification.html',
				controller: 'sendnotificationCtrl',
				backdrop: 'static',
		        keyboard: false,
		        scope: $scope,
		        windowClass: 'addnuggetmodal',
		        resolve: {
		            items: function () {
		            	
		              return $scope.object;
		            }
		          }
				});
		 $scope.Instance.result.then(function (action) {
			 
		 }, function () {
		     // alert($scope.object);
		    });
	}
};

app.controller('userengagementCtrl', userengagementCtrl);
userengagementCtrl.$inject = ['$scope', '$http','$uibModal','$location', '$window','NgTableParams','userslist', 'config','$crypto'];

app.filter('moment', function () { return function (input, momentFn /*, param1, param2, ...param n */) 
	{ if(input != undefined){var args = Array.prototype.slice.call(arguments, 2), momentObj = moment(input);  
	return momentObj[momentFn].apply(momentObj, args); }
	
	}; 
	});


