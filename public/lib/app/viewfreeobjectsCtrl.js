 "use strict";
var viewfreeobjectsCtrl = function ($scope, $http, $location, $window, objectjson, $uibModal, NgTableParams, config,$crypto) {
	$scope.allcourses = false;
	$scope.allobjects = true;
	$scope.listtopics = function(){
		$scope.featuredContentLoaded = false;
		$scope.featuredContent = [];
		$scope.imgurl = config.url;
	    $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
	    $scope.getFeaturedContent();
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
	       
	
			 
		    $scope.topics = JSON.parse(objectjson);
	
		    if($scope.topics.courses.length>0){
		    	for(var i=0;i<$scope.topics.courses.length;i++){
		    	
				    $scope.topics.courses[i].PUB=$scope.topics.courses[i].PUB.toString();
		    	}
		    }
		
		    $scope.tableParams = new NgTableParams({
		        page: 1,            // show first page
		        count: 10          // count per page
		    }, {
		      dataset:   $scope.topics.courses
			});

			if($scope.topics.objects.length>0){
		    	for(var i=0;i<$scope.topics.objects.length;i++){
		    	
					$scope.topics.objects[i].STAR=Math.round($scope.topics.objects[i].STAR);
					if($scope.topics.objects[i].OD.MON == undefined){
						$scope.topics.objects[i].OD.MON = 	$scope.topics.objects[i].OD.CON;
					}
		    	}
		    }
			$scope.tableParams1 = new NgTableParams({
		        page: 1,            // show first page
		        count: 10          // count per page
		    }, {
		      dataset:   $scope.topics.objects
		    });
		 
		  $scope.orgid = $scope.decry.oid;
		  $scope.orgidlow = $scope.orgid.toLowerCase();
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
	        	$scope.secondwidth = +$window.innerWidth - +239;
	    		$scope.second = {'width':$scope.secondwidth};
	        	$scope.sscreen = false;
	    		$scope.lscreen = true;
	        }
	      });
	    });
	    }
	});
		}else{
	    	localStorage.clear();
	    	$window.location.href = '#login';
	    	}
	    $scope.decry["activemenu"] = 'greport';
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
	    //localStorage.setItem("activemenu", 'contrep');
	    window.navigating = false;
	};
	
	$scope.addtopic = function(){
		$scope.loading = true;
		$window.location.href = '#addtopic';
	};
	$scope.addobject = function(){
	
		$scope.Instance = $uibModal.open({
			templateUrl: 'addfreeobjects.html',
			controller: 'addfreeobjectsCtrl',
			backdrop: 'static',
			keyboard: false,
			windowClass: 'addobjectmodal',
			scope: $scope,
			resolve: {
				items: function () {
					
				  return $scope.object;
				}
			  }
			});
	 $scope.Instance.result.then(function (selectedItem) {
		  
		 if(selectedItem == 'Object already present' ){
				
				 $scope.loading = false;
			}else{
				 $scope.object = selectedItem; 
				 $scope.loading = true;
			   $window.location='#objects';
			}
		 
		}, function () {
		 // alert($scope.object);
		});
	};
	$scope.parseDate = function (date) {
		  return new Date(Date.parse(date));
		} 
	$scope.topicdetail=function(tip){
		$scope.loading = true;
		 $scope.decry["topicid"] = tip.TID;
         localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
		// localStorage.setItem("topicid", tip.TID);
		$window.location.href = '#viewtopic';
	};
	$scope.loadPage = function(){
		if($scope.online == true){
			$scope.loading = true;
			$window.location.href = '#managecontent';
		}
		
	};

	$scope.selectedRow = function(row) {
		var index = $scope.featuredContent.indexOf(row.OBJID);
		if (index === -1) {
			$scope.featuredContent.push(row.OBJID);
			$scope.updateFeaturedContent();
			if ($scope.featuredContent.length >= 10) {
				$scope.featuredContentLoaded = false;
			}
			$scope.$apply();
		} else {
			$scope.featuredContent.splice(index, 1);
			$scope.featuredContentLoaded = true;
			$scope.updateFeaturedContent();
			$scope.$apply();
		}
	};

	$scope.updateFeaturedContent = function() {
		var apigClient = apigClientFactory.newClient();
		var params = {};
		var body = {
			content: $scope.featuredContent,
		};
		var additionalParams = {};
		var data =	apigClient.updateFeaturedContentPost(params, body, additionalParams)
		.then(function(result){

		}).catch( function(result){
			$scope.featuredContentLoaded = false;
			// do nothing
		});
	};

	$scope.getFeaturedContent = function() {
		var apigClient = apigClientFactory.newClient();
		var params = {};
		var body = {
			admin: true,
		};
		var additionalParams = {};
		var data =	apigClient.getFeaturedContentPost(params, body, additionalParams)
		.then(function(result){
			var json = JSON.stringify(result.data);
			json = json.toString();
			json = JSON.parse(json);
			$scope.featuredContent = json.content;
			if ($scope.featuredContent.length >= 10) {
				$scope.featuredContentLoaded = false;
			}else
			{
				$scope.featuredContentLoaded = true;
			}
			
			$scope.$apply();
		}).catch( function(result){
			$scope.featuredContentLoaded = false;
			// do nothing
		});
	};

	$scope.viewobject = function(object)
	{
		
		$scope.decry["obid"]  = object.OBJID;
        $scope.decry["ofilename"] = object.OD.OURL;
        $scope.decry["otype"] = object.OD.OTYPE;
        
       localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
       $scope.objectdetails = object;
      
	        $scope.loading = true;
	      
	        	if(object.OD.OTYPE=="quiz")
	            {
	        		
	        		 $scope.decry["qaction"] = 1;
	        		 $scope.decry["PUB"] = object.PUB;
	        		 localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
	                $scope.Instance = $uibModal.open({
	                    templateUrl: 'viewquiz.html',
	                    controller: 'viewquizCtrl',   
	                      resolve: {
	                    	  quizJson: function(getquiz){
	                              return getquiz.getquiz();
	                      }
	                      },
	                    backdrop: 'static',
	                    scope: $scope,
	                    keyboard: true,
	                    }); 
	               $scope.Instance.opened.then(function () {
	                    $scope.loading = false;
	                });
	               
	               $scope.Instance.result.then(function (selectedItem) {
	            	   
	   	            if(selectedItem == 'Object already present' ){
	   	            	
	   	            	 $scope.loading = false;
	   	            }else{
	   	            	 $scope.object = selectedItem; 
	   	            	 $scope.loading = true;
	   	               $window.location='#objects';
	   	            }
	               });
	            
	            }else{
					$scope.objtenants = object.TENANTS;
	            	 $scope.Instance = $uibModal.open({
	                     templateUrl: 'viewindividualobject.html',
	                     controller: 'viewindividualobjectCtrl',   
	                       resolve: {
	                           
	                           objectsimg: function(getobjects){
	                               return getobjects.getobjects();
	                       }
	                       },
	                     backdrop: 'static',
	                     scope: $scope,
	                     windowClass: 'addobjectmodal',
	                     keyboard: true
	                     }); 
	            $scope.Instance.opened.then(function () {
	                $scope.loading = false; 
	            
	            });
	             $scope.Instance.result.then(function (selectedItem) {
	            
	            if(selectedItem == 'Object already present' ){
	            	
	            	 $scope.loading = false;
	            }else{
	            	 $scope.object = selectedItem; 
	            	 $scope.loading = true;
	            }
	            	
	                });
	            
	            }
	    
	    
	}
	$scope.viewtopics = function(){
		$scope.loading = true;
		window.location.href="#listtopics";
	}
	$scope.publishTopic = function(row){
		$scope.row = row;
		$scope.obj = "Course";
		$scope.loading = true;
		$scope.Instance = $uibModal.open({
			templateUrl: 'publishtype.html',
			controller: 'publishtypeCtrl',
			backdrop: 'static',
			keyboard: false,
			windowClass: 'addnuggetmodal',
			scope: $scope,
			resolve: {
				tenantslist: function(gettenants){
					return gettenants.gettenants();
				}
				}
			// resolve: {
			//     items: function () {
			//       return $scope.object;
			//     }
			//   }
			});
			$scope.Instance.opened.then(function () {
				$scope.loading = false;
			});
		$scope.Instance.result.then(function (tenants) {
		// if (tenants.newTenants.length > 0 || tenants.deleteTenants.length > 0) {
		// 	if (tenants.newTenants.length > 0) {
		// 		$scope.loading = true;
		// 		$scope.publishunpublishcourses(row, tenants.newTenants, tenants.allTenants);	
		// 	}
		// 	$scope.unPublishObject(row, tenants.deleteTenants);	
		// }
		$scope.publishunpublishcourses(row, tenants.newTenants, tenants.allTenants, tenants.deleteTenants);

		}, function () {
			// alert($scope.object);
		});
		
	}

	$scope.publishunpublishcourses = function(row, newtenants, alltenants, deletetenants){
		$scope.loading = true;
		var apigClient = apigClientFactory.newClient({
		    invokeUrl: $scope.decry.api,
		});

		var params = {};
        var body = {
			oid: 'MARKETRON',
			tid: row.TID,
			// action: "1",
			// type: "1",
			newtenants,
			alltenants,
			deletetenants
		};
		var additionalParams = {};
	
		apigClient.publishUnpublishTopicPost(params, body, additionalParams)
			.then(function(result){
			    	
			   var json = JSON.stringify(result.data);
			   $scope.loading = false;
			   $scope.$apply();
			   swal({title: "",type:"success", text: "Course published/unpublished successfully",buttonsStyling:false,allowOutsideClick: false,
		              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
			   $window.location.href = '#listtopics';
				}).catch( function(result){
			    	
			    	var json = JSON.stringify(result);
			    	var json1 = json.toString();
			    	
			    	
			    });
	}


	$scope.publishObject = function(row){
		$scope.row = row;
		$scope.loading = true;
		$scope.Instance = $uibModal.open({
			templateUrl: 'publishtype.html',
			controller: 'publishtypeCtrl',
			backdrop: 'static',
			keyboard: false,
			windowClass: 'addnuggetmodal',
			scope: $scope,
			resolve: {
				tenantslist: function(gettenants){
					return gettenants.gettenants();
				}
				}
			// resolve: {
			//     items: function () {
			//       return $scope.object;
			//     }
			//   }
			});
			$scope.Instance.opened.then(function () {
				$scope.loading = false;
			});
		$scope.Instance.result.then(function (tenants) {
			$scope.loading =true;
		if (tenants.newTenants.length > 0 || tenants.deleteTenants.length > 0) {
			// if (tenants.newTenants.length > 0 || tenants.allTenants.length > 0) {
			// 	$scope.loading = true;
			// 	$scope.publishObjectsToTenants(row, tenants.newTenants, tenants.allTenants, tenants.deleteTenants);	
			// }
			// $scope.unPublishObject(row, tenants.deleteTenants);	
			$scope.publishObjectsToTenants(row, tenants.newTenants, tenants.allTenants, tenants.deleteTenants);	
		}
		

		}, function () {
			// alert($scope.object);
		});
		
	}
	$scope.publishObjectsToTenants = function(row, newtenants, alltenants, deletetenants) {
		var decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		var apigClient = apigClientFactory.newClient({invokeUrl: decry.api,});
		
		 
		  var params = {};

			var body = {
                     oid: decry.oid,
					 newtenants,
					 tid: row.OBJID,
					 alltenants,
					 deletetenants,
                      };
			console.log(body)
			var additionalParams = {
		           
		       };
		
			var data =	apigClient.indexObjectsPost(params, body, additionalParams)
			.then(function(result){

			   var json = JSON.stringify(result.data);
				$scope.loading = false;
				$scope.$apply();
				swal({title: "",type:"success", text: "Content published/unpublished successfully",buttonsStyling:false,allowOutsideClick: false,
					   allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
			   window.location.href="#objects";
				
			    }).catch( function(result){
			    	
			    	var json = JSON.stringify(result);
					var json1 = json.toString();
					
			    });

	}
$scope.unPublishObject = function(row, tenants){
	$scope.loading = true;
		var decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		var apigClient = apigClientFactory.newClient({invokeUrl: decry.api,});
		
		 
		  var params = {};
			if (row.TENANTS === undefined) {
				row.TENANTS = [];
			}
			var body = {
                    
                     	tid: row.OBJID,
						cid: $scope.decry.tid,
						oid: decry.oid,
						tenants: tenants
                      };
			
			var additionalParams = {
		           
		       };
	
			var data =	apigClient.deleteIndexTopicPost(params, body, additionalParams)
			.then(function(result){
			    	
				
			   var json = JSON.stringify(result.data);
			
			    var topic = json.toString();
			
	            // swal({title: "", text: "Object unpublished successfully", type: "success",buttonsStyling:false,allowOutsideClick: false,
		        //       allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', confirmButtonColor: "#f5a138",customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	           
			   window.location.href="#objects";
			    	
			    }).catch( function(result){
			    	
			    	var json = JSON.stringify(result);
			    	var json1 = json.toString();
			    	return $q.when("hello");
			    	
			    });
	}

	$scope.listtopics();
};

app.controller('viewfreeobjectsCtrl', viewfreeobjectsCtrl);
viewfreeobjectsCtrl.$inject = ['$scope', '$http','$location', '$window','objectjson','$uibModal', 'NgTableParams', 'config','$crypto'];

app.factory("listobjects", function($window, $q, config,$crypto){
    return {
    	listobjects: function(){
    		var topicjson,decry;
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
    		   topicjson = getusersession();
    		  
    	    }
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#login';
    	    }
			
			function getdata(token){
							var apigClient = apigClientFactory.newClient({invokeUrl: decry.api,});

						  var params = {};

							var body = {
									oid : decry.oid,
									tid : decry.tid,
									admin: true
									 };
							
							var additionalParams = {
						             headers: {Authorization : token
						             }
							   };
						
							var data =	apigClient.getCategoryDataPost(params, body, additionalParams)
								.then(function(result){
								    	
									
								   var response = JSON.stringify(result.data);
								
								   response = response.toString();
								    return $q.when(response);
								    	
								    }).catch( function(result){
								    	
								    	var json = JSON.stringify(result);
								    	var json1 = json.toString();
								    	return $q.when("hello");
								    	
								    });
							
							
							return $q.when(data);
			}

			function getusersession(){
						 return new Promise((resolve, reject) => {
							 cognitoUser.getSession((err, session) =>{
								if (err) {
									swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",
										buttonsStyling:false,allowOutsideClick: false,
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

    	return $q.when(topicjson);
    }
    };
});


