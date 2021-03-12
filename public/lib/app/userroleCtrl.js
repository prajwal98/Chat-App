"use strict";
var userroleCtrl = function ($scope, $http, $location, $window, topicjson, $uibModal, NgTableParams, config,$crypto) {

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
					} else {
			   
				
				$scope.rolelist = JSON.parse(topicjson);
		
				if($scope.rolelist.id === 0){
					$scope.rolelist.roles = [];
				} else {
					$scope.rolelist.roles = Object.keys($scope.rolelist.roles).map(function(_) { return $scope.rolelist.roles[_]; })
				}
				
			   
				$scope.tableParams = new NgTableParams({
					page: 1,            // show first page
					count: 10          // count per page
				}, {
				  dataset:   $scope.rolelist.roles
				});
				$scope.rnameFilter = {
					rname: {
						id: 'text',
						placeholder: 'Role'
					}
					};
	
				
				
				
				$scope.tableParams1 = new NgTableParams({
					page: 1,            // show first page
					count: 10          // count per page
				}, {
				  dataset:   $scope.rolelist.utenants
				});
				$scope.unameFilter = {
					UNAME: {
						id: 'text',
						placeholder: 'User '
					}
					};
					$scope.eidFilter = {
						EMAILID: {
							id: 'text',
							placeholder: 'EmailID'
						}
						};
						$scope.rname1Filter = {
							RNAME: {
								id: 'text',
								placeholder: ' Role'
							}
							};
			  $scope.orgid = $scope.decry.oid;
			  $scope.orgidlow = $scope.orgid.toLowerCase();
			  $scope.$watch('globalSearchTermAuto', function(newTerm, oldTerm) {
					
					$scope.tableParams.filter({ $: newTerm  });
				  }, true);
				
			  if($window.innerWidth > 1024){
				  $scope.secondwidth = +$window.innerWidth - +224;
				}else{
					$scope.secondwidth = +$window.innerWidth - +65;
				}
				$scope.allroles = true;
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
			$scope.decry["activemenu"] = 'urole';
			localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
			//localStorage.setItem("activemenu", 'contrep');
			window.navigating = false;
		};
		
		$scope.addrole = function(){
			$scope.action = 'new';
			$scope.Instance = $uibModal.open({
				templateUrl: 'addrole.html',
				controller: 'addroleCtrl',
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
			$scope.loading = false;
			}, function () {
			
			});
		};
		$scope.roleedit = function(row){
			
			$scope.action = 'edit';
			$scope.addrdeatils = {};
			$scope.addrdeatils.tabs = angular.copy(row.rtabs);
			$scope.addrdeatils.rname =  angular.copy(row.rname);
			$scope.addrdeatils.rid = row.rid;
			$scope.Instance = $uibModal.open({
				templateUrl: 'addrole.html',
				controller: 'addroleCtrl',
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
			  
			$scope.loading = false;
			 
			}, function () {
			
			});
		};
		$scope.roledelete = function(row){
			
			$scope.action = 'delete';
			
			swal({
				text: 'Are you sure you want to delete this role?',
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
						$scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
					
						var apigClient = apigClientFactory.newClient({
						});
	
						var params = {};
						//var id =  Math.floor(Math.random()*(999-100+1)+100);
						var body = {
								oid: $scope.decry.oid,
								rid: row.rid,
								rname: row.rname,
								action: 'delete'
								
						};
						var additionalParams = {
								
						  };
					
						apigClient.updateUserRolePost(params, body, additionalParams)
							.then(function(result){
								var response = JSON.stringify(result.data);
								if(response == null || response == 'null')
									{
										$scope.loading=true;
										$window.location.href = '#levelsetting';
									} else {
										if(response.id == 0 || response.id == '0'){
											swal({title: "Oops!", text: response.msg , type: "warning",buttonsStyling:false,allowOutsideClick: false,
											allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
									   $scope.loading=false;
									   $scope.$apply();
										} else {
											$scope.loading=true;
											$window.location.href = '#levelsetting';
										}
									}						
								
								
								}).catch( function(result){
									var json = JSON.stringify(result);
									var json1 = json.toString();
								});
			
				} else if (
				  result.dismiss === swal.DismissReason.cancel
				) {
				}
			  })
			
		};
		$scope.adduser = function(){
			$scope.action = 'new';
			$scope.Instance = $uibModal.open({
				templateUrl: 'adduserrole.html',
				controller: 'adduserroleCtrl',
				backdrop: 'static',
				keyboard: false,
				windowClass: 'addobjectmodal',
				scope: $scope,
				resolve: {
					tenantslist: function (gettenants) {
					  return gettenants.gettenants();
					}
				  }
				});
		 $scope.Instance.result.then(function () {
			$scope.loading = false;
			}, function () {
			
			});
		};
		$scope.userroleedit = function(row){
			
			$scope.action = 'edit';
			$scope.addrdeatils = {};
			$scope.productList = {};
		
			$scope.addrdeatils.tabs = angular.copy(row.TENANTS);
			
			$scope.rtabs = row.RID;
			$scope.addrdeatils.rid = row.RID;
			$scope.addrdeatils.uname = row.UNAME;
			for(var k = 0;k<$scope.rolelist.roles.length;k++){
			
				if($scope.rolelist.roles[k].rid == row.RID){
					$scope.productList = $scope.rolelist.roles[k];
				}
			}
			$scope.addrdeatils.emailid = row.EMAILID;
			$scope.addrdeatils.eid = row.EID;
			$scope.loading = true;
			$scope.Instance = $uibModal.open({
				templateUrl: 'adduserrole.html',
				controller: 'adduserroleCtrl',
				backdrop: 'static',
				keyboard: false,
				windowClass: 'addobjectmodal',
				scope: $scope,
				resolve: {
					tenantslist: function (gettenants) {
					  return gettenants.gettenants();
					}
				  }
				});
				$scope.Instance.opened.then(function () {
					$scope.loading = false;
				});
			$scope.Instance.result.then(function () {
				$scope.loading = false;
					
				}, function () {
				
				});
		};
		$scope.userroledelete = function(row){
			
			swal({
				text: 'Are you sure you want to delete this user?',
				type: 'warning',
				width: '400px',
				customClass: 'sweetalert-lgs',
				buttonsStyling:false,allowOutsideClick: false,
				allowEscapeKey:false,
				showCancelButton: true, cancelButtonText: 'No', cancelButtonClass:"button2",
				showConfirmButton: true, confirmButtonText: 'Yes',  confirmButtonClass: 'button1'
			  }).then((result) => {
				if (result.value) {
					$scope.action = 'delete';
			$scope.addrdeatils = {};
			$scope.addrdeatils.tabs = row.tenants;
			$scope.rtabs = row.rid;
			$scope.addrdeatils.rid = row.rid;
			$scope.addrdeatils.rname = row.rname;
			$scope.addrdeatils.eid = row.EID;
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
			} else {
				console.log("please check error")
			}
					  $scope.$apply();
					  
				} else if (
				  result.dismiss === swal.DismissReason.cancel
				) {
				}
			  })
			
		
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
						  //var id =  Math.floor(Math.random()*(999-100+1)+100);
						  var body = {
								  oid: $scope.decry.oid,
								  rname: $scope.addrdeatils.rname,
								  eid: $scope.addrdeatils.eid,
								  action: 'delete'
								  
						  };
						  var additionalParams = {
								  headers: {Authorization : token
								  }
							};
						
						  apigClient.addUserToRolePost(params, body, additionalParams)
							  .then(function(result){
								  var response = JSON.stringify(result.data);
								  response = JSON.parse(response);
								  
								  if(response.id === 0 || response.id === '0'){
									  swal({title: "Oops!", text: response.msg , type: "warning",buttonsStyling:false,allowOutsideClick: false,
									  allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
								 $scope.loading=false;
								 $scope.$apply();
								  }	
								  else{
									  $scope.loading=true;
									  $window.location.href = '#levelsetting';
								  }
								  }).catch( function(result){
									  var json = JSON.stringify(result);
									  var json1 = json.toString();
								  });
						  
					  }
					 });
			  })
	  }
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
			$scope.publishunpublishcourses(row, tenants.newTenants, tenants.allTenants, tenants.deleteTenants);
	
			}, function () {
				
			});
			
		}
	
		$scope.publishunpublishcourses = function(row, newtenants, alltenants, deletetenants){
			// $scope.loading = true;
			var apigClient = apigClientFactory.newClient({
				invokeUrl: $scope.decry.api,
			});
	
			var params = {};
			var body = {
				oid: 'EDDEV',
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
				   swal({title: "",type:"success", text: "Course published/unpublished successfully",buttonsStyling:false,allowOutsideClick: false,
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
	
	app.controller('userroleCtrl', userroleCtrl);
	userroleCtrl.$inject = ['$scope', '$http','$location', '$window','topicjson','$uibModal', 'NgTableParams', 'config','$crypto'];
	
	app.factory("listurole", function($window, $q, config,$crypto){
		return {
			listurole: function(){
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
									      oid: config.oid
										 };
								
								var additionalParams = {
								   };
							
								var data =	apigClient.listUsersTenantPost(params, body, additionalParams)
									.then(function(result){
											
										
									   var response = JSON.stringify(result.data);
									   console.log('loadding')
										  console.log(response)
									   //response = response.toString();
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

