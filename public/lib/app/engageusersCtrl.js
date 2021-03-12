 "use strict";
var engageusersCtrl = function ($scope, $http, $uibModal,$location, $window, NgTableParams, tenantslist, config,$crypto) {
	
	$scope.musers = function(){
	    $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		$scope.multigroups = false;
		$scope.tenantlist = [];
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
		$scope.tenants = JSON.parse(tenantslist);

		$scope.tenants = $scope.tenants.tenants;
		
		$scope.tableParams = new NgTableParams({
			page: 1,            // show first page
			count: 10          // count per page
		}, {
		  dataset:   $scope.tenants
			
			});
		 
		$scope.$watch('globalSearchTermAuto', function(newTerm, oldTerm) {
				
			$scope.tableParams.filter({ $: newTerm });
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
	    	$scope.decry["activemenu"] = 'engage';
            localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
	    	//localStorage.setItem("activemenu", 'groups');
		}else{
	    	localStorage.clear();
	    	$window.location.href = '#login';
	    	}
		
	    window.navigating = false;
	
	};
	$scope.musers();
	
	
	$scope.viewtenant = function(tenant){
		$scope.loading = true;
		$scope.gid = tenant;
		$scope.decry["tenant"] = tenant;
		localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
		$window.location.href = '#userengagement';
		// $scope.Instance = $uibModal.open({
		// 	templateUrl: 'sendnotification.html',
		// 	controller: 'sendnotificationCtrl',
		// 	backdrop: 'static',
		// 	keyboard: false,
		// 	windowClass: 'addgroupmodal',
		// 	scope: $scope,
		// 	resolve: {
				
		// 	}
		// 	});
		// $scope.Instance.opened.then(function () {
		// 		$scope.loading = false;
		// 	});
		// $scope.Instance.result.then(function (ntitle) {
			
		// 	if (ntitle != null && ntitle != undefined){
								
						
									
		// 		}

		// 	}, function () {
		// 	// alert($scope.object);
		// 	});
	};
	$scope.sendmail = function(row){

		var index = $scope.tenantlist.indexOf(row);
		if(index == -1){
			$scope.tenantlist.push(row);
			 
		}else{
			$scope.tenantlist.splice(index, 1); 
		}
	
		if($scope.tenantlist.length > 0){
			$scope.multigroups = true;
		}else{
			$scope.multigroups = false;
		}
		
	}
	$scope.viewmail = function(){
		// $scope.gid = $scope.userslist;

		$scope.toTenants = true;
		$scope.Instance = $uibModal.open({
			templateUrl: 'sendnotification.html',
			controller: 'sendnotificationCtrl',
			backdrop: 'static',
			keyboard: false,
			windowClass: 'addgroupmodal',
			scope: $scope,
			resolve: {
				
			}
			});
		$scope.Instance.opened.then(function () {
				$scope.loading = false;
			});
		$scope.Instance.result.then(function (ntitle) {
			
			if (ntitle != null && ntitle != undefined){
								
						
									
				}

			}, function () {
			// alert($scope.object);
			});
	}
};

app.controller('engageusersCtrl', engageusersCtrl);
engageusersCtrl.$inject = ['$scope', '$http','$uibModal','$location', '$window','NgTableParams', 'tenantslist', 'config','$crypto'];
