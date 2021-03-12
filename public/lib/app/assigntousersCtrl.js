 "use strict";
var assigntousersCtrl = function ($scope, $http, $uibModal,$location, $window, NgTableParams,userslist, config,$crypto) {
	
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
			 $scope.users = JSON.parse(userslist);
			/* for(var i=0; i < $scope.users.length;i++){
					if($scope.users[i].LA == undefined){
						
					}else{
						var diff = moment.utc($scope.users[i].LA).fromNow();
						$scope.users[i].LA = diff;
					}
					
				}*/
			
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
	    $scope.decry["activemenu"] = 'ausers';
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
	    //localStorage.setItem("activemenu", 'ausers');
	    window.navigating = false;
	};

	$scope.musers();
	
	$scope.gotouser = function(row){
		$scope.loading = true;
		/*localStorage.setItem("ueid", row.EID);
		localStorage.setItem("uname", row.UNAME);*/
		$scope.decry["ueid"] =  row.EID;
		$scope.decry["uname"] =  row.UNAME;
		
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
			//$scope.uname = row.UNAME;
	/*			$scope.Instance = $uibModal.open({
				templateUrl: 'ausertopics.html',
				controller: 'ausertopicsCtrl',
				backdrop: 'static',
		        keyboard: false,
		        scope: $scope,
		        windowClass: 'ausertopicmodal',
		        resolve: {
		        	usertopics: function(getusertopics){
		                return getusertopics.getusertopics();
		        }
		        }
		        });
				$scope.Instance.opened.then(function () {
					$scope.loading = false;
			    });
				 $scope.Instance.result.then(function (quiz) {
					 
				    }, function () {
				     // alert($scope.object);
				    });*/
			
			$window.location.href = '#ausertopics';
		
		
	
	}
};

app.controller('assigntousersCtrl', assigntousersCtrl);
assigntousersCtrl.$inject = ['$scope', '$http','$uibModal','$location', '$window','NgTableParams','userslist', 'config','$crypto'];

app.filter('moment', function () { return function (input, momentFn /*, param1, param2, ...param n */) 
	{ if(input != undefined){var args = Array.prototype.slice.call(arguments, 2), momentObj = moment(input);  
	return momentObj[momentFn].apply(momentObj, args); }
	
	}; 
	});

