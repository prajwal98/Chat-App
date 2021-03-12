 "use strict";
var grouptopicassignCtrl = function ($scope, $http, $uibModal,$location, $window, NgTableParams, config, grouptopics,$crypto) {
	
	$scope.musers = function(){
	    localStorage.getItem("786a2y1e") !=null ?   $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#org';
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
	            	$window.location.href = '#org';
	            }else{
	             $scope.topics = JSON.parse(grouptopics);
	             $scope.orgid = $scope.decry.oid;
	             $scope.orgidlow = $scope.orgid.toLowerCase();
	             $scope.imgurl = config.url;
	             if($scope.topics == null){
	            	 $scope.alltopicsnew = [];
	            	 $scope.grouptopicsnew = [];
	             }else{
	            	 $scope.alltopics = $scope.topics.alltopics;
		             $scope.grouptopicsnew = [];
	            	 if($scope.topics.grouptopics != undefined ){
		            	 $scope.grouptopics = $scope.topics.grouptopics;
		            	 for (var j=0; j < $scope.grouptopics.length ; j++){
		                     var topicid = $scope.grouptopics[j].id;
		                   
		                     if(topicid in  $scope.alltopics){
		                    	 $scope.deletethis = $scope.alltopics[topicid]
		                       $scope.grouptopicsnew.push($scope.alltopics[topicid]);
		                    	 delete $scope.alltopics[topicid];
		                     }
		                     
		                  }
		             }else{
		            	 //$scope.grouptopics = [];
		             }
	            	 
	            	 $scope.alltopicsnew = [];
		             for (var key in  $scope.alltopics) {
		            	 $scope.alltopicsnew.push($scope.alltopics[key]);
		            	}
	             }
	            
	             //alert($scope.alltopics.keys.length)
	             $scope.orgid = $scope.decry.oid;
		   		 $scope.orgidlow = $scope.orgid.toLowerCase();

	             $scope.tableParams = new NgTableParams({
	       		        page: 1,            // show first page
	       		        count: 5          // count per page
	       		    }, {
	       		      dataset:   $scope.alltopicsnew
	       		    });
	             $scope.tableParams1 = new NgTableParams({
	       		        page: 1,            // show first page
	       		        count: 5          // count per page
	       		    }, {
	       		      dataset:   $scope.grouptopicsnew
	       		    });
	             $scope.delgroup = false;
	       		 $scope.groupdetails = $scope.decry.assigngroupid;
	       		 $scope.groupdetails = JSON.parse( $scope.groupdetails);
	       		 $scope.gname =  $scope.groupdetails.GNAME;
	       		

	       		  
	       		  
	       		  $scope.$watch('globalSearchTermAuto', function(newTerm, oldTerm) {
	       			    
	       			    $scope.tableParams.filter({ $: newTerm });
	       			  }, true);
	       		  
	       		  $scope.$watch('globalSearchTermAuto1', function(newTerm, oldTerm) {
	       			    
	       			    $scope.tableParams1.filter({ $: newTerm });
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
	    	$window.location.href = '#org';
	    	}
		$scope.alltopics = true;
		$scope.assigntopics = false;
		$scope.minDate = new Date();
	};

	$scope.musers();
	
	$scope.back = function(){
		if($scope.online == true){
			$scope.loading = true;
			$window.location.href = '#managegroups';
		}
		
	};
	
	$scope.assign = function(row,index){

   $scope.duedate = null;
       
        if($scope.alltopicsnew[index].date != undefined)
            {
                var date = new Date($scope.alltopicsnew[index].date);
                $scope.duedate = date.getTime();
            }	 
	    if ($scope.duedate != null && $scope.duedate != undefined){
           
            $scope.assigntopic(row, $scope.duedate);        
            
            }else{
                $scope.duedate = false;
                $scope.assigntopic(row, false)
            }
	    
/*		  $scope.Instance = $uibModal.open({
				templateUrl: 'duedate.html',
				controller: 'duedateCtrl',
				backdrop: 'static',
		        keyboard: false,
		        windowClass: 'duedatemodal',
		        resolve: {
		            items: function () {
		            	
		              return $scope.object;
		            }
		          }
				});
		 $scope.Instance.result.then(function (duedate) {
			
			if (duedate != null && duedate != undefined){
				$scope.duedate = duedate;
				$scope.assigntopic(tid, duedate);		 
				
				}else{
					$scope.duedate = false;
					$scope.assigntopic(tid, false)
				}

		    }, function () {
		     // alert($scope.object);
		    });*/
		 
		
	}
	
	$scope.assigntopic = function(row, duedate){
		 
		 $scope.loading = true;
		 AWSCognito.config.region =  config.reg;
		    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
		        IdentityPoolId: $scope.decry.iid
		    });
		   
			var poolData = { UserPoolId : $scope.decry.uid,
			        ClientId : $scope.decry.cid
			    };
			
			var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
			
			var cognitoUser = userPool.getCurrentUser();
			
		    if (cognitoUser != null) {
		    	$scope.getsession(cognitoUser, 'assign', row);
		    }else{
		    	localStorage.clear();
		    	$window.location.href = '#org';
		    	}
		
	
	}
	
	$scope.assigntopicon = function(token, row){
		
		var apigClient = apigClientFactory.newClient({invokeUrl: $scope.decry.api,});
		var params = {};
		
			var body = {
					gid	: $scope.groupdetails.GID,
					tid: row.tid,
					tn: row.ttitle,
					action: '1',
					oid : $scope.decry.oid,
					duedate: row.date
			};
			body.duedate = body.duedate === undefined ? false: row.date;
			var additionalParams = {
		             headers: {Authorization : token
		             }
		       };

			apigClient.assignTopictoGroupPost(params, body, additionalParams)
				.then(function(result){

						var json = JSON.stringify(result);
						var json1 = json.toString();
						json1 = JSON.parse(json1);
					    if(json1.data.result == "1"){
				        	swal({title: "",type:"success", text: "Course successfully assigned to the group",buttonsStyling:false,allowOutsideClick: false,
				                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
				        	$scope.getnewdata(token);
					    }
				    	
				    }).catch( function(result){
				    	
				    	var json = JSON.stringify(result);
				    	var json1 = json.toString();
				    	alert('ERROR'+result);
				    	
				    	
				    });
	}
	$scope.unassign = function(row){
		
		swal({
			  title: 'Are you sure?',
			  text: "You want to unassign the course for this group!",
			  type: 'warning',
			  width: '400px',
			  customClass: 'sweetalert-lgs',
	          buttonsStyling:false,allowOutsideClick: false,
	          allowEscapeKey:false,
	          showCancelButton: true, cancelButtonText: 'No', cancelButtonClass:"button2",
			  showConfirmButton: true, confirmButtonText: 'Yes', confirmButtonClass: 'button1'
			}).then((result) => {
			  if (result.value) {
				  $scope.loading = true;
				  $scope.$apply();
				  $scope.unassigntopic(row)
			  }
			})
	}
	
	$scope.unassigntopic = function(row){
		 
		 $scope.loading = true;
		 AWSCognito.config.region =  config.reg;
		    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
		        IdentityPoolId: $scope.decry.iid
		    });
		   
			var poolData = { UserPoolId : $scope.decry.uid,
			        ClientId : $scope.decry.cid
			    };
			
			var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
			
			var cognitoUser = userPool.getCurrentUser();
			
		    if (cognitoUser != null) {
		    	$scope.getsession(cognitoUser, 'unassign', row);
		    }else{
		    	localStorage.clear();
		    	$window.location.href = '#org';
		    	}
		
	
	}
	
	$scope.getnewdata = function(token){
		var apigClient = apigClientFactory.newClient({invokeUrl: $scope.decry.api,});

    	var params = {};
	  	
		var body = {
				gid : $scope.groupdetails.GID,
				oid: $scope.decry.oid
				 };
		
		var additionalParams = {
	             headers: {Authorization : token
	             }
	       };
		var groupu = apigClient.getgrouptopicsPost(params, body, additionalParams)
			.then(function(result){
				 	var json = JSON.stringify(result.data);
				    var topics = json.toString();
				    $scope.topics = JSON.parse(topics);	
				    $scope.alltopics = $scope.topics.alltopics;
		             $scope.grouptopicsnew = [];
		            

		             if($scope.topics.grouptopics != undefined ){
		            	 $scope.grouptopics = $scope.topics.grouptopics;
		            	 for (var j=0; j < $scope.grouptopics.length ; j++){
		                     var topicid = $scope.grouptopics[j].id;
		                   
		                     if(topicid in  $scope.alltopics){
		                    	 $scope.deletethis = $scope.alltopics[topicid]
		                       $scope.grouptopicsnew.push($scope.alltopics[topicid]);
		                    	 delete $scope.alltopics[topicid];
		                     }
		                     
		                  }
		             }else{
		            	 //$scope.grouptopics = [];
		             }
		             //alert($scope.alltopics.keys.length)
		             $scope.alltopicsnew = [];
		             for (var key in  $scope.alltopics) {
		            	 $scope.alltopicsnew.push($scope.alltopics[key]);
		            	}
		             $scope.tableParams = new NgTableParams({
		       		        page: 1,            // show first page
		       		        count: 5          // count per page
		       		    }, {
		       		      dataset:   $scope.alltopicsnew
		       		    });
		             $scope.tableParams1 = new NgTableParams({
		       		        page: 1,            // show first page
		       		        count: 5          // count per page
		       		    }, {
		       		      dataset:   $scope.grouptopicsnew
		       		    });
		             $scope.loading = false;
		             if($scope.assigntopics == false)
                     {
                         $scope.alltopics = true;
                         $scope.assigntopics = false;
                     }
					    $scope.$apply();
			});
	}
	
	$scope.getsession = function(cognitoUser, type, row){
		
		  return new Promise((resolve, reject) => {
	 			 cognitoUser.getSession((err, session) =>{
	 	            if (err) {
				    	swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
			                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	 	            	localStorage.clear();
	 	            	$window.location.href = '#org';
	 	            }else{
	 	            	
	 	            	var token = session.idToken.jwtToken;
	 	            	if(type == "unassign"){
							   $scope.unassigntopicon(token, row); 
						   }else if(type == "assign"){
							   $scope.assigntopicon(token, row); 
						   }else {
							   
						   }
						 resolve();	
		            	/*var apigClient = apigClientFactory.newClient({});
		    			var params1 = {};
		    			var body = {type: '0',token : token,oid : localStorage.getItem("oid"),admin: 0};
		    			var additionalParams = {};
		            	apigClient.getCredentialsPost(params1, body, additionalParams)
						.then(function(result1){
						   var tjson = JSON.stringify(result1.data);
						   tjson = tjson.toString();
						   
						   tjson = JSON.parse(tjson);
						 
						   if(type == "unassign"){
							   
							   $scope.unassigntopicon(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken, tid); 
						   }else if(type == "assign"){
							   $scope.assigntopicon(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken, tid); 
						   }else {
							   
						   }
						   
						   resolve();	
						    }).catch( function(result){
						    	swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', confirmButtonColor: "#fcc917"});
				        		localStorage.clear();
				    	    	$window.location.href = '#org';
						    })*/
	 	        
	 	            }
	  		  	});
	 		})
	}
	
	$scope.unassigntopicon = function(token, row){
		
			var apigClient = apigClientFactory.newClient({invokeUrl: $scope.decry.api,});
			var params = {};

			var body = {
					gid	: $scope.groupdetails.GID,
					tid: row.tid,
					action: '0',
					 oid : $scope.decry.oid
			};
			
			var additionalParams = {
		             headers: {Authorization : token
		             }
		       };
			
			var topicjson =	apigClient.assignTopictoGroupPost(params, body, additionalParams)
				.then(function(result){

						var json = JSON.stringify(result.data);
						var json1 = json.toString();
						json1 = JSON.parse(json1);
						
					    if(json1.result == "1"){
					        $scope.alltopics = false;
                            $scope.assigntopics = true;
				        	swal({title: "",type:"success", text: "Course successfully unassigned from the group",buttonsStyling:false,allowOutsideClick: false,
				                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
				        	$scope.getnewdata(token);
					    }
				    	
				    }).catch( function(result){
				    	
				    	var json = JSON.stringify(result);
				    	var json1 = json.toString();
				    	alert('ERROR'+result);
				    	
				    	
				    });
	}
	/*$scope.close = function(){
		$uibModalInstance.close();
	};*/
	
};

app.controller('grouptopicassignCtrl', grouptopicassignCtrl);
grouptopicassignCtrl.$inject = ['$scope', '$http','$uibModal','$location', '$window','NgTableParams', 'config', 'grouptopics','$crypto'];


app.factory("getgrouptopics", function($window, $q, config,$crypto){
    return {
    	getgrouptopics: function(){
    		var grouptopics,decry;
    		
    		if(localStorage.getItem("786a2y1e") != null)
            {
               decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
            }else
            {
                localStorage.clear();
                $window.location.href = '#org';
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
    		   grouptopics = getusersession();
    		  
    	    }
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#org';
    	    }
    	  
			function getdata(token){
			    
							var apigClient = apigClientFactory.newClient({invokeUrl: decry.api,});
							var params = {};
    					  	var group = decry.assigngroupid;
    					  	group = JSON.parse(group);
    					  	var groupid = group.GID;
    					  	
    						var body = {
    								oid: decry.oid,
    								gid : groupid
    								 };
    						
    						var additionalParams = {
    					             headers: {Authorization : token
    					             }
    					       };
    						var data = apigClient.getgrouptopicsPost(params, body, additionalParams)
    							.then(function(result){
    							    	
    								
    							   var json = JSON.stringify(result.data);
    							    var users = json.toString();
    							    return $q.when(users);
    							    	
    							    }).catch( function(result){
    							    	
    							    	var json = JSON.stringify(result);
    							    	var json1 = json.toString();
    							    	decry["activemenu"] = 'dashboard';
    							    	localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify(decry), config.key));
    							    	//localStorage.setItem("activemenu", 'dashboard');
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
									swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', confirmButtonColor: "#fcc917"});
									localStorage.clear();
									$window.location.href = '#org';
									
								})
							return $q.when(abcd);
					   }*/
						
			function getusersession(){
						 return new Promise((resolve, reject) => {
							 cognitoUser.getSession((err, session) =>{
								if (err) {
									swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",
										buttonsStyling:false,allowOutsideClick: false,
		     			                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
									localStorage.clear();
									$window.location.href = '#org';
								}else{
									var token = session.idToken.jwtToken;
									var abcc = getdata(token); 
									resolve(abcc)
									return $q.when(abcc);
							
								}
							});
						})
					}
			
    	    return $q.when(grouptopics);
        }
    };
});


