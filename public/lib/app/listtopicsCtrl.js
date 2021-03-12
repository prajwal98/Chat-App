 "use strict";
var listtopicsCtrl = function ($scope, $http, $location, $window, topicjson, $uibModal, NgTableParams, config,$crypto) {

$scope.allcourses = true;
	$scope.listtopics = function(){
		
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
	    	cognitoUser.getSession(function(err, session) {
	            if (err) {
	            	localStorage.clear();
	            	$window.location.href = '#login';
	            }else{
	       
		/*	$scope.cname = localStorage.getItem("contentcname");
			$scope.oneAtATime = true;
			
		    $scope.topicname = $scope.topic.ttitle;
		    $scope.description = $scope.topic.tdescription;
		    $scope.duration = $scope.topic.tduration;
		    $scope.navigation = $scope.topic.freenavigation;
		    $scope.authority = $scope.topic.tcertauth;
		    $scope.noofcredit = $scope.topic.tnoofcredits;
		    $scope.certification = 'No';
		    $scope.noofnuggets = $scope.topic.noofnuggets;
		    $scope.nuggets = $scope.topic.nuggets;
		    $scope.batchcid = localStorage.getItem("managebatchcourse");*/
			 
		    $scope.topics = JSON.parse(topicjson);
	
		    if($scope.topics.courses.length>0){
		    	for(var i=0;i<$scope.topics.courses.length;i++){
		    	
				    $scope.topics.courses[i].PUB=$scope.topics.courses[i].PUB.toString();
		    	}
		    }
		    // if($scope.decry.role != 'Admin' && $scope.decry.role != 'Instructors'){
		    // 	  $scope.topics = $scope.topics.courses.filter(function(item) { 
		    		 
			// 		    return item.CBYID == $scope.decry.email;  
			// 		 });	 
		    //   }
			
		   
		    $scope.tableParams = new NgTableParams({
		        page: 1,            // show first page
		        count: 10          // count per page
		    }, {
		      dataset:   $scope.topics.courses
			});

			if($scope.topics.objects.length>0){
		    	for(var i=0;i<$scope.topics.objects.length;i++){
		    	
					$scope.topics.objects[i].STAR=Math.round($scope.topics.objects[i].STAR);
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
	    $scope.decry["activemenu"] = 'creport';
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
			   $window.location='#listtopics';
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
	   	               $window.location='#listtopics';
	   	            }
	               });
	            
	            }else{
	                
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
		$scope.loading =true;
		$scope.publishunpublishcourses(row, tenants.newTenants, tenants.allTenants, tenants.deleteTenants);

		}, function () {
			// alert($scope.object);
		});
		
	}

	$scope.publishunpublishcourses = function(row, newtenants, alltenants, deletetenants){
		// $scope.loading = true;
		var apigClient = apigClientFactory.newClient({
		    invokeUrl: $scope.decry.api,
		});

		var params = {};
        var body = {
			oid: config.oid,
			tid: row.TID,
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
			   swal({title: "",type:"success", text: "Case published/unpublished successfully",buttonsStyling:false,allowOutsideClick: false,
		              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
			   $window.location.href = '#listtopics';
				}).catch( function(result){
			    	
			    	var json = JSON.stringify(result);
			    	var json1 = json.toString();
			    	//localStorage.setItem("json", JSON.stringify(result));
			    	alert('ERROR'+json1);
			    	return $q.when("hello");
			    	
			    });
	}

	$scope.publishObject = function(row){
		
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
				
				if (tenants.length > 0){
					$scope.loading = true;
					$scope.publishObjectsToTenants(row, tenants);
					
					}else{

					}

			    }, function () {
			     // alert($scope.object);
			    });
		
	}
	$scope.publishObjectsToTenants = function(row, tenants) {
		var decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		var apigClient = apigClientFactory.newClient({invokeUrl: decry.api,});
		
		 
		  var params = {};

			var body = {
                     oid: decry.oid,
					 tenants,
                     tid: row.OBJID
                    
                      };
			
			var additionalParams = {
		           
		       };
			
			var data =	apigClient.indexObjectsPost(params, body, additionalParams)
			.then(function(result){

			   var json = JSON.stringify(result.data);
			    var topic = json.toString();
			    // swal({title: "", text: "Object published successfully", type: "success",buttonsStyling:false,allowOutsideClick: false,
		        //       allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', confirmButtonColor: "#f5a138",customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
				window.location.href="#listtopics";
				
			    }).catch( function(result){
			    	
			    	var json = JSON.stringify(result);
			    	var json1 = json.toString();
			    	return $q.when("hello");
			    	
			    });

	}
$scope.unPublishObject = function(row){
	$scope.loading = true;
		var decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		var apigClient = apigClientFactory.newClient({invokeUrl: decry.api,});
		
		 
		  var params = {};

			var body = {
                    
                     tid: row.OBJID,
                    cid: $scope.decry.tid,
                    oid: decry.oid
                      };
			
			var additionalParams = {
		           
		       };
		
			var data =	apigClient.deleteIndexTopicPost(params, body, additionalParams)
			.then(function(result){
			    	
				
			   var json = JSON.stringify(result.data);
			
			    var topic = json.toString();
			
	            // swal({title: "", text: "Object unpublished successfully", type: "success",buttonsStyling:false,allowOutsideClick: false,
		        //       allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', confirmButtonColor: "#f5a138",customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	           
			   window.location.href="#listtopics";
			    	
			    }).catch( function(result){
			    	
			    	var json = JSON.stringify(result);
			    	var json1 = json.toString();
			    	return $q.when("hello");
			    	
			    });
	}
	$scope.viewobjects = function(){
		$scope.loading = true;
		window.location.href="#objects";
	}
	$scope.listtopics();
};

app.controller('listtopicsCtrl', listtopicsCtrl);
listtopicsCtrl.$inject = ['$scope', '$http','$location', '$window','topicjson','$uibModal', 'NgTableParams', 'config','$crypto'];

app.factory("listtopics", function($window, $q, config,$crypto){
    return {
    	listtopics: function(){
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
									oid : config.oid,
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
app.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
            /*scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };*/
        }
    }
});

