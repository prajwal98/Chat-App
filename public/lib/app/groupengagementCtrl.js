 "use strict";
var groupengagementCtrl = function ($scope, $http,$location, $window, $cookies, NgTableParams, config, groupslist, $uibModal,$crypto) {
	
	$scope.engagement = function() {
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
		
	    if (cognitoUser != null && $scope.decry.email != null) {
	    	
			$scope.groups1 = JSON.parse(groupslist);
			$scope.groups1 = $scope.groups1.groups;
    		$scope.groups = $scope.groups1.sort(function(x, y){
    		    return x.DC - y.DC;
    		});
    		$scope.currentPage = 1;
  		  $scope.numPerPage = 8;
  		  $scope.maxSize = 5;
  		  $scope.filteredgroups = [];
  		  $scope.totalgroups = $scope.groups.length + 8;
  		 $scope.$watch('currentPage + numPerPage', function() {
  			    var begin = (($scope.currentPage - 1) * $scope.numPerPage),
  			    end = +begin + +$scope.numPerPage;
  			   
  			    $scope.filteredgroups = $scope.groups.slice(begin, end);
  			    
  			  });
  		 $scope.$watch('globalSearchTermAuto', function(newTerm, oldTerm) {
  			    
  			 $scope.groups1 = $scope.groups.filter({ $: newTerm });
  			 
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
    	        	$scope.sscreen = true;
    	    		$scope.lscreen = false;
    	    		$scope.limit=9;
    	        }
    	        if($scope.windowWidth > 1024 ){
    	        	$scope.secondwidth = +$window.innerWidth - +224;
    	    		$scope.second = {'width':$scope.secondwidth};
    	        	$scope.sscreen = false;
    	    		$scope.lscreen = true;
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
    	$scope.decry["activemenu"] = 'gengagement';  
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
    	
    }else{
    	localStorage.clear();
    	$window.location.href = '#login';
    	}
	    window.navigating = false;
	};
	
	$scope.engagement();
	
	$scope.viewgroup = function(group){
		$scope.loading = true;
		$scope.groupnotify = group;
		
		if($scope.groupnotify.UC > 0){
			
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
		}else
			{
			swal({title: "", text: "Group has no users", type: "error",buttonsStyling:false,allowOutsideClick: false,
	              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
			$scope.loading = false;
			}
		
		 //localStorage.setItem("teamname", group.GNAME)
		// localStorage.setItem("teamid", group.GID)
		/*$scope.decry["teamid"] = group.GID;
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));*/
		
		 
		
	};
};

app.controller('groupengagementCtrl', groupengagementCtrl);
groupengagementCtrl.$inject = ['$scope', '$http','$location', '$window','$cookies','NgTableParams', 'config', 'groupslist', '$uibModal','$crypto'];



