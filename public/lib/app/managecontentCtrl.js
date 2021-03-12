"use strict";
var managecontentCtrl = function ($scope, $http,$uibModal,$location, $window,NgTableParams, config,newTopics,$crypto) {

	$scope.rotateImg=false;
	$scope.EditSubcat=false;
	$scope.subjects = function() {
		
		$scope.imgurl = config.url;
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
	        $scope.orgid = $scope.decry.oid;
			$scope.orgidlow = $scope.orgid.toLowerCase();
			
			$scope.categories = JSON.parse(newTopics);
			
			$scope.categories === null ? $scope.categories = []: '';
			$scope.orgid = $scope.decry.oid;
			$scope.tableParams = new NgTableParams({
		        page: 1,            // show first page
		        count: 10          // count per page
		    }, {
		      dataset:   $scope.categories.topics
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
	    $scope.decry["activemenu"] = 'ureport';
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
	    //localStorage.setItem("activemenu", 'contrep');
	    window.navigating = false;
	};
	
	$scope.subjects();

	$scope.addcategory = function(){

		$scope.loading = true;
		$scope.Instance = $uibModal.open({
			templateUrl: 'addsubject.html',
			controller: 'addsubjectCtrl',
			backdrop: 'static',
	        keyboard: false,
	        windowClass: 'addnuggetmodal',
	        scope: $scope,
			});
		$scope.Instance.opened.then(function () {
				$scope.loading = false;
		});
	}
	$scope.deletewarn = function(category){
	 
	    swal({
	          
	          title: 'Are you sure?',
              text: "you want to delete this category.",
              type: 'warning',	         
	          width: '400px',	         
	          customClass: 'sweetalert-lgs',
	          buttonsStyling:false,allowOutsideClick: false,
	          allowEscapeKey:false,
	          showCancelButton: true, cancelButtonText: 'No', cancelButtonClass:"button2",
			  showConfirmButton: true, confirmButtonText: 'Yes',  confirmButtonClass: 'button1'
	        }).then((result) => {
	          if (result.value) {
	                $scope.loading = true;
	                $scope.$apply();
	                $scope.cid = category.id;
	                $scope.deletecategory();
	          } else if (
	            result.dismiss === swal.DismissReason.cancel
	          ) {
	          }
	        })
	}
	$scope.deletecategory = function(){
	    
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
	            
	            $scope.getsession(cognitoUser, 'delete');
	        }else {
	            localStorage.clear();
	            $window.location.href = '#login';
	        }
	}
	$scope.getsession = function(cognitoUser, type){
		
		if($scope.online == true){
	      return new Promise((resolve, reject) => {
	             cognitoUser.getSession((err, session) =>{
	                if (err) {
	                    swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
			                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	                    localStorage.clear();
	                    $window.location.href = '#login';
	                }else{
	                    
	                    var token = session.idToken.jwtToken;
	                    if(type == 'delete')
                        {
	                    	
                            $scope.deletecategoryon(token); 
                        }
                        if(type == 'sdelete'){
                        	$scope.deleteScategoryon(token); 
                        }
	                
	                }
	            });
			})
		}else
		{
			$scope.loading = false;
			$scope.$apply();
	swal({title: "Oops!", text: "Please check your internet connection!", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
		}
	}
	$scope.deletecategoryon = function(token){
	    
	    var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});
	    var params = {};

	    var body = {
	            action: 'delete',
	            id: $scope.cid,
	            oid: $scope.decry.oid
	    };
	    
	    var additionalParams = {
                headers: {Authorization : token
                }
          };
	    
	    var topicjson = apigClient.updateCategoriesPost(params, body, additionalParams)
	        .then(function(result){

	            $window.location.href = '#categories';    
	            
	            }).catch( function(result){
	                
	                var json = JSON.stringify(result);
	                var json1 = json.toString();
	                alert('ERROR'+result);
	                
	                
	            });
	}
	
	$scope.editcategory = function(category){

		$scope.loading = true;
        $scope.categorytoedit = category;
        $scope.Instance = $uibModal.open({
            templateUrl: 'editcategory.html',
            controller: 'editcategoryCtrl',
            backdrop: 'static',
            keyboard: false,
            windowClass: 'addnuggetmodal',
            scope: $scope
            });
        $scope.Instance.opened.then(function () {
                $scope.loading = false;
        });
	}

	$scope.gettopicdata = function(topic){
		$scope.loading = true;

		$scope.decry.tid = topic.id;
		$scope.decry.tname = topic.name;
		localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
		$window.location.href = '#listtopics';    

	}
	$scope.addchapter = function(catrow, chprow){

		$scope.loading = true;
		$scope.editchapter = false;
		$scope.rowdata = catrow;
		
		$scope.Instance = $uibModal.open({
			templateUrl: 'addchapter.html',
			controller: 'addchapterCtrl',
			backdrop: 'static',
	        keyboard: false,
	        windowClass: 'addnuggetmodal',
	        scope: $scope,
			});
		$scope.Instance.opened.then(function () {
				$scope.loading = false;
		});
	}
	$scope.editchapters = function(catrow, chprow){

		$scope.loading = true;
		$scope.editchapter = true;
		$scope.rowdata = catrow;
		$scope.chrowdata = chprow;

		$scope.Instance = $uibModal.open({
			templateUrl: 'addchapter.html',
			controller: 'addchapterCtrl',
			backdrop: 'static',
	        keyboard: false,
	        windowClass: 'addnuggetmodal',
	        scope: $scope,
			});
		$scope.Instance.opened.then(function () {
				$scope.loading = false;
		});
	}
};

app.controller('managecontentCtrl', managecontentCtrl);
managecontentCtrl.$inject = ['$scope', '$http','$uibModal','$location', '$window','NgTableParams','config','newTopics' ,'$crypto'];


app.factory("getNewTopics", function($window, $q, config,$crypto){
	
    return {
    	getNewTopics: function(){
          
    		var categories,decry;
    		window.navigating=true;
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
    		   categories = getusersession();
    		}
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#login';
    	    }
			
			function getdata(token){
							var apigClient = apigClientFactory.newClient({ invokeUrl: decry.api, });
							 var params = {};
							 
							var body = {
								oid: decry.oid,
							
									 };

							var additionalParams = {
						             headers: {Authorization : token
						             }
							   };
							 
							var data =	apigClient.getCategoriesPost(params, body, additionalParams)
							.then(function(result){
							
							
							   var json = JSON.stringify(result.data);
							
							    var cate = json.toString();
							    return $q.when(cate);
							    	
							    }).catch( function(result){
							    	
							    	var json = JSON.stringify(result);
									var json1 = json.toString();
									$window.console.log("Inside the resul", json1)
							    	//localStorage.setItem("activemenu", 'dashboard');
									decry["activemenu"] = 'dashboard';
                                    localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify(decry), config.key));
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
									swal({title: "Oops!", text: "Session has been timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
						                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
									localStorage.clear();
									$window.location.href = '#login';
								}else{
									var token = session.idToken.jwtToken;
									var abcc =  getdata(token); 
									resolve(abcc)
									return $q.when(abcc);
							
								}
							});
						})
					}

    	    return $q.when(categories);
        }
    };
});