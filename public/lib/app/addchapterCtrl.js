var addchapterCtrl = function ($scope, $http, $location, $window, $cookies, $uibModalInstance, config, $sce,$crypto) {
	
	
	
    $scope.home = function(){

		$scope.orgchapters = $scope.rowdata;
		$scope.sid = $scope.orgchapters.id;
		
		if($scope.editchapter == true){
			$scope.chid = $scope.chrowdata.chid;
			$scope.orgchapters.yname = $scope.chrowdata.year;
			$scope.orgchapters.semname = $scope.chrowdata.sem;
			$scope.orgchapters.clsname = $scope.chrowdata.class;
			$scope.orgchapters.stname = $scope.chrowdata.ctotal;
			// $scope.orgchapters.topics = $scope.chrowdata.topics;	
		
		} else {
			$scope.chid = '';
			$scope.orgchapters.yname = '';
			$scope.orgchapters.topics = '';
			$scope.orgchapters.semname = [];
			$scope.orgchapters.semname = [];
			$scope.orgchapters.clsname = [];
			$scope.orgchapters.stname = '';
		}
        if($scope.orgchapters.topics == undefined){
            $scope.topics = [];
        } else {
            $scope.topics = $scope.orgchapters.topics;
		}
		
		$scope.example14settings = {
			scrollableHeight: '92px',
			scrollable: true,
			enableSearch: false,
			externalIdProp: '',
			// display:contents
		};
		$scope.example15data = [{ "tid": 1, "ttitle": "Semester 1" }, { "tid": 2, "ttitle": "Semester 2" }, { "tid": 3, "ttitle": "Semester 3" }, { "tid": 4, "ttitle": "Semester 4" }, { "tid": 5, "ttitle": "Semester 5" }];
		$scope.example16data = [{ "tid": 111, "ttitle": "Class 1" }, { "tid": 112, "ttitle": "Class 2" }, { "tid": 113, "ttitle": "Class 3" }, { "tid": 114, "ttitle": "Class 4" }, { "tid": 115, "ttitle": "Class 5" }];
	};
	
	// $scope.onlyNumbers = function(event){   
	// 	var keys={
	// 		'up': 38,'right':39,'down':40,'left':37,
	// 		'escape':27,'backspace':8,'tab':9,'enter':13,'del':46,
	// 		'0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57
	// 	};
	// 	for(var index in keys) {
	// 		if (!keys.hasOwnProperty(index)) continue;
	// 		if (event.charCode==keys[index]||event.keyCode==keys[index]) {
	// 			return; //default event
	// 		}
	// 	}   
	// 	event.preventDefault();
	// };
   

    $scope.addchapter = function(){

        window.navigating=true;
    	$scope.error = false;
    	$scope.error1 = false;
		$scope.error2 = false;
		$scope.error3 = false
    	
		if ($scope.orgchapters.yname == null ||  $scope.orgchapters.yname == undefined  || $scope.orgchapters.yname.replace(/\s/g, '').length === 0) 
		{
			$scope.error = true;
		}
		else if ($scope.orgchapters.semname == null || $scope.orgchapters.semname == undefined || $scope.orgchapters.semname.length == 0)
		{
			$scope.error1 = true;
		}
		else if ($scope.orgchapters.clsname == null || $scope.orgchapters.clsname == undefined || $scope.orgchapters.clsname.length == 0)
		{
			$scope.error2 = true;
		}
		else if ($scope.orgchapters.stname == null || $scope.orgchapters.stname == undefined || $scope.orgchapters.stname == 0)	
		{
			$scope.error3 = true;
		}
		else{
            $scope.loading = true;
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
    		
    	    if (cognitoUser != null && $scope.decry.oid != null) {
    	    	
    	    	$scope.getsession(cognitoUser);
    	    }else {
    	    	localStorage.clear();
    	    	window.navigating=false;
    	    	$window.location.href = '#login';
    	    }
   
        }
 };
 
 $scope.getsession = function(cognitoUser){
		
	  return new Promise((resolve, reject) => {
			 cognitoUser.getSession((err, session) =>{
	            if (err) {
			    	swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
		                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK',customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	            	localStorage.clear();
	            	$window.location.href = '#login';
	            }else{
	                $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
	            	var token = session.idToken.jwtToken;
	            	var apigClient = apigClientFactory.newClient({
	            	    invokeUrl: $scope.decry.api,
	            	});

	                var params = {};
				
					$scope.topiclist=[];
					
					for (var i = 0; i < $scope.topics.length; i++) {
						$scope.topiclist.push($scope.topics[i].text);
					}
				
	                var body = {
						    year: $scope.orgchapters.yname,
							oid: $scope.decry.oid,
							sid: $scope.sid,
							// topics:$scope.topiclist,
							chapter: $scope.orgchapters.chname,
							sem: $scope.orgchapters.semname,
						clas: $scope.orgchapters.clsname,
						strength:$scope.orgchapters.stname,
							action: 'add' 
	                };
	                if($scope.editchapter == true){
						body.action= 'edit'; 
						body.chid= $scope.chid; 
					}
	                var additionalParams = {
                            headers: {Authorization : token
                            }
                      };
	        
	                apigClient.addChapterPost(params, body, additionalParams)
	                    .then(function(result){
	                    	var response = JSON.stringify(result.data);
							response = JSON.parse(response);
							$uibModalInstance.close();
								swal({title: "Success", text: response.msg , type: "success",buttonsStyling:false,allowOutsideClick: false,
								allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
								$window.location.href = '#managecontent';
					
	                        }).catch( function(result){
	                            
	                            var json = JSON.stringify(result);
	                            var json1 = json.toString();
	                            alert('ERROR'+result);
	                            
	                            
	                        });
	            
	        
	            }
 		  	});
		})
}
 
    
    $scope.close = function(){
        $uibModalInstance.close();
    };
	$scope.onTagAdded2 = function(tag, limit) {
	
		if ($scope.topics.length > limit) {
			$scope.topics.pop();
		}
	}

	$scope.paste2 = function(event, limit) {
		event.preventDefault();
		var ttags = event.originalEvent.clipboardData.getData('text/plain').split('/')
		
		for (var i = 0; i < ttags.length; i++) {
			
			$scope.topics.push({"text":ttags[i]});
			
		}	
		
		if ($scope.topics.length > limit) {
			$scope.topics.length = 30;
		}	
	} 
	$scope.home();	
    };
    
    app.controller('addchapterCtrl', addchapterCtrl);
    addchapterCtrl.$inject = ['$scope', '$http', '$location', '$window','$cookies', '$uibModalInstance', 'config', '$sce','$crypto'];
    
    app.directive('multiSelect', function() {

		function link(scope, element) {
		  var options = {
			enableClickableOptGroups: true,
			onChange: function() {
			  element.change();
			}
		  };
		  element.multiselect(options);
		}
  
		return {
		  restrict: 'A',
		  link: link
		};
	  });