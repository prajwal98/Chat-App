 "use strict";
var assigngroupsCtrl = function ($scope, $http,$location, $window, config, groupslist, $uibModal,$crypto) {

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
	      			 //alert($scope.groups1.length);
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
	            }
	    	});
	    	$scope.decry["activemenu"] = 'agroups';
            localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));

	    	//localStorage.setItem("activemenu", 'agroups');
    }else{
    	localStorage.clear();
    	$window.location.href = '#login';
    	}
	    window.navigating = false;
	};
	
	$scope.settings();

	$scope.viewgroup = function(group){
		$scope.loading = true;
		var json = JSON.stringify(group);
		
	    json = json.toString();
	    $scope.decry["assigngroupid"] = json;
	    json=JSON.parse(json);
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
        
        if(json.UC != 0){
        	$window.location.href = '#grouptopicassign';
        }else
        	{
        	swal({title: "", text: "Group has no users to assign courses", type: "error",buttonsStyling:false,allowOutsideClick: false,
	              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
			$scope.loading = false;
        	}
		//localStorage.setItem("assigngroupid", json);
		
			/*	$scope.Instance = $uibModal.open({
				templateUrl: 'grouptopicassign.html',
				controller: 'grouptopicassignCtrl',
				backdrop: 'static',
		        keyboard: false,
		        windowClass: 'ausertopicmodal',
		        scope: $scope,
		        resolve: {
		        	grouptopics: function(getgrouptopics){
		                return getgrouptopics.getgrouptopics();
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
		
		
	
	}
/*	$scope.viewgroup = function(group){
		$scope.loading = true;
		var json = JSON.stringify(group);
	    json = json.toString();
		localStorage.setItem("assigngroupid", json);
		$window.location.href = '#grouptopicassign';
	}*/

};

app.controller('assigngroupsCtrl', assigngroupsCtrl);
assigngroupsCtrl.$inject = ['$scope', '$http','$location', '$window', 'config', 'groupslist', '$uibModal','$crypto'];


