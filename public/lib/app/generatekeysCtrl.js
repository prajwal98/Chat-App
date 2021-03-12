 "use strict";
var generatekeysCtrl = function ($scope, $http,$location, $window, $cookies, config,$crypto) {

	$scope.generatekeys = function() {
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

		
    }else{
    	localStorage.clear();
    	$window.location.href = '#login';
    	}
	    window.navigating = false;
	};
	
	$scope.generatekeys();
	/*$scope.dash = function(){
		
			if(localStorage.getItem("email") == null || localStorage.getItem("email") == ''){
			
			$window.location.href = '#login';
			
		}else{
			$scope.loading = false;
			$scope.users = JSON.parse(topicskeys);

    
			 $scope.tableParams = new NgTableParams({
			        page: 1,            // show first page
			        count: 5          // count per page
			    }, {
			      dataset:   $scope.users
			    });

			  
			  
			  $scope.$watch('globalSearchTermAuto', function(newTerm, oldTerm) {
				    
				    $scope.tableParams.filter({ $: newTerm });
				  }, true);
     
		}
		
	};
	
	$scope.dash();
	
	
	
	$scope.generate = function(topicid){ 
		swal({
	   		  title: "Generate Access Keys",
	   		  
				  html:
					'<p style="text-align: left;color:#767676;width:65%;float:left;font-size: 14px;margin-top:4px;">No. of Access keys to be Generated</p>' +
					'<p style="color:#767676;width:5%;float:left;font-size: 14px;margin:4px 4px 0 0;">:</p>' +
					'<input id="ncount" type="number" name="ntitle" rows="1" wrap="soft" ng-model="ntitle" style="float:left;width:26%;overflow:hidden; resize:none;line-height:25px;margin-bottom:10px;font-size:14px;border: 1px solid #ccc;" ></input>',
				    closeOnCancel: true,
				    showCancelButton: true, 
				    showCloseButton: true,
				    allowOutsideClick: false,
				    allowEscapeKey:false,
				    showConfirmButton: true, confirmButtonText: 'Generate', confirmButtonColor: "#fb6142",
				    width: '400px',
				    
				    preConfirm: function () {
				    return new Promise(function (resolve) {
				    	
				    	
				    	if ($('#ncount').val() != '') {
				    		if($('#ncount').val() > 50){
				    			swal.showValidationError('You can generate only 50 keys at a time');
					        	  resolve();
				    		}else{
				    			resolve([
							        $('#ncount').val()
							      ]); 
				    		}
				    		 
				        } else {
				        	
				        	  swal.showValidationError('Please enter the count');
				        	  resolve();
				        }
				     
				    });
				  }
				}).then(function (result) {
					 var json = JSON.stringify(result);
					  $scope.keyscount = JSON.parse(json);
					
					if (result != null){
						if ($scope.keyscount.value[0] > 50){alert('Not above 50');}else{
							$scope.loading = true;
							$scope.$apply();
							$scope.generatekeys($scope.keyscount.value[0],topicid);
						}
						
					}else {}
					 
				});
	};
	
	$scope.generatekeys = function(count,topic){

			var email = localStorage.getItem("email");;
			var emails = [];
			emails.push(email);
			var topics = [];
			topics.push(topic.TOPICID);
			
			var apigClient = apigClientFactory.newClient({
				//accessKey:  accessKeyId,
				//secretKey:  secretAccessKey,
				//sessionToken:  sessionToken
			});
			var params = {};

			var body = {
					emailid: emails,
					topic: topic.TOPICNAME,
					count: count,
					topicids: topics,
					adid: "a00001"
					 };
			
			var additionalParams = {};
			var topicjson =	apigClient.generateAccessKeysPost(params, body, additionalParams)
			.then(function(result){

				 $scope.loading = false;
				   $scope.$apply();
			   swal({
					  title: 'Access Keys Generated',
					  text: "Access Keys will be generated and sent your registered Email ID",
					 width: '400px',
					  showCancelButton: false, cancelButtonText: 'No, cancel!',
					})
			   
			    }).catch( function(result){
			    	
			    	var json = JSON.stringify(result);
			    	var json1 = json.toString();
			    	alert('ERROR'+json1);
			    	
			    	
			    });
		
	};*/
};

app.controller('generatekeysCtrl', generatekeysCtrl);
generatekeysCtrl.$inject = ['$scope', '$http','$location', '$window','$cookies','config','$crypto'];


app.factory("gettopicskeys", function($window, $q,config,$crypto){
    return {
    	gettopicskeys: function(){
    	    var decry;
    	    if(localStorage.getItem("786a2y1e") != null)
            {
               decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
            }else
            {
                localStorage.clear();
                $window.location.href = '#login';
            }
			/*var identityId = $cookies.get("identityId");
			var tokenId = $cookies.get("tokenId");
			var accessKeyId = $cookies.get("accessKeyId");
			var secretAccessKey = $cookies.get("secretAccessKey");
			var sessionToken = $cookies.get("sessionToken");
			var orgid = $cookies.get("orgid");*/
    		var orgid = decry.orgid;
			var apigClient = apigClientFactory.newClient({
							//accessKey:  accessKeyId,
							//secretKey:  secretAccessKey,
							//sessionToken:  sessionToken
			                invokeUrl: decry.api,
						});
				
					  var params = {};

						var body = {
								ORGID : orgid
								 };

						var additionalParams = {};
						
						var topicslist =	apigClient.listTopicsPost(params, body, additionalParams)
							.then(function(result){
							    	
								
							   var json = JSON.stringify(result.data);
							    var topics = json.toString();
							  
							    return $q.when(topics);
							    	
							    }).catch( function(result){
							    	
							    	var json = JSON.stringify(result);
							    	var json1 = json.toString();
							    	//localStorage.setItem("json", JSON.stringify(result));
							    	alert('ERROR'+json1);
							    	return $q.when("hello");
							    	
							    });
		   
           return topicslist;
        }
    };
});


