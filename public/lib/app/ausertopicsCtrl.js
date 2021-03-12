 "use strict";
var ausertopicsCtrl = function ($scope, $http,$location, $window, NgTableParams, config, usertopics,$uibModal,uibDateParser,$crypto) {
	
	$scope.musers = function(){
	    $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
	    $scope.imgurl = config.url;
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
	             $scope.topics = JSON.parse(usertopics);
	            // alert(usertopics)
	             $scope.orgid = $scope.decry.oid;
	             $scope.orgidlow = $scope.orgid.toLowerCase();
	             if( $scope.topics == null){
	            	 $scope.alltopicsnew = [];
	            	 $scope.usertopicsnew = [];
	             }else{
	            	 $scope.alltopics = $scope.topics.alltopics;
		             $scope.usertopicsnew = [];
		             if($scope.topics.usertopics != undefined ){
		            	 
		            	 $scope.usertopics = $scope.topics.usertopics;
		            	 for (var j=0; j < $scope.usertopics.length ; j++){
		            		
		                     var topicid = $scope.usertopics[j].id;
		                  
		                     if(topicid in  $scope.alltopics){
		                    	 $scope.deletethis = $scope.alltopics[topicid]
		                     
		                       $scope.usertopicsnew.push($scope.alltopics[topicid]);
		                    	 delete $scope.alltopics[topicid];
		                     //$scope.alltopics[topicid].assigned = "1";
                    	
		                     }
		                     
		                  }
		             }else{
		            	 //$scope.grouptopics = [];
		             }
		             //alert($scope.alltopics.keys.length)
		             $scope.alltopicsnew = [];
		            
		             for (var key in  $scope.alltopics) {
		                
		            	 $scope.alltopicsnew.push($scope.alltopics[key]);
		            	// alert(JSON.stringify($scope.alltopicsnew));
		            	}
		            
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
	       		      dataset:   $scope.usertopicsnew
	       		    });
	             $scope.delgroup = false;
	       		
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
	    	$window.location.href = '#login';
	    	}
	    
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
	    $scope.loading = false;
	    $scope.alltopics = true;
	    $scope.assigntopics = false;
	    $scope.username = $scope.decry.uname;
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
	    var duedate = null;
    	    for(var k=0; k < $scope.alltopicsnew.length;k++)
            {
    	    
              if($scope.alltopicsnew[k].tid == row.tid)
                  {
        
    	              var date = new Date($scope.alltopicsnew[k].date);
    	                 duedate = date.getTime();
    	                 break;
                  }
            }

        if (duedate != null && duedate != undefined){
            $scope.duedate = duedate;
            $scope.assigntopic(row, duedate)         
            
            }else{
                
                $scope.duedate = false;
                $scope.assigntopic(row, false)
            }
	    
		/*  $scope.Instance = $uibModal.open({
				templateUrl: 'duedate.html',
				controller: 'duedateCtrl',
				backdrop: 'static',
		        keyboard: false,
		        windowClass: 'duedatemodal',
		        scope: $scope,
		        resolve: {
		            items: function () {
		            	
		              return $scope.object;
		            }
		          }
				});
		 $scope.Instance.result.then(function (duedate) {
			
			if (duedate != null && duedate != undefined){
				$scope.duedate = duedate;
				$scope.assigntopic(tid, duedate)		 
				
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
		    	$scope.getsession(cognitoUser, "assign", row);
		    }else{
		    	localStorage.clear();
		    	$window.location.href = '#login';
		    	}
		
	
	}
	
	$scope.assigntopicon = function(token, row){
		
		var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});
		var params = {};
			
			var body = {
					eid: $scope.decry.ueid,
					tid: row.tid,
					tn: row.ttitle,
					action: '1',
					 oid : $scope.decry.oid,
					duedate: $scope.duedate
			};
			
			var additionalParams = {
		             headers: {Authorization : token
		             }
		       };
			
			apigClient.assignTopicstoUsersPost(params, body, additionalParams)
				.then(function(result){

						var json = JSON.stringify(result);
						var json1 = json.toString();
						json1 = JSON.parse(json1);
						
					    $scope.loading = false;
					    $scope.$apply();
					    if(json1.data.result == "1"){
							
				        	swal({title: "", type: 'success', text: "Course successfully assigned to the User",buttonsStyling:false,allowOutsideClick: false,
				                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
				        	$scope.getnewdata(token);
					    }
				    	
				    }).catch( function(result){
				    	
				    	var json = JSON.stringify(result);
				    	var json1 = json.toString();
				    	alert('ERROR'+result);
				    	
				    	
				    });
	}
	
	$scope.getnewdata = function(token){
		
		var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});

    	var params = {};
	  	
		var body = {
				eid : $scope.decry.ueid,
				oid: $scope.decry.oid
				 };
		
		var additionalParams = {
	             headers: {Authorization : token
	             }
	       };
		
		var groupu = apigClient.getuserTopicsPost(params, body, additionalParams)
			.then(function(result){
			    	
			
			    var json = JSON.stringify(result.data);
			    var users = json.toString();
			    $scope.topics = JSON.parse(users);	
			    $scope.alltopics = $scope.topics.alltopics;
	             $scope.usertopicsnew = [];
	            
	             
	             if($scope.topics.usertopics != undefined ){
	            	 
	            	 $scope.usertopics = $scope.topics.usertopics;
	            	 for (var j=0; j < $scope.usertopics.length ; j++){
	            		
	                     var topicid = $scope.usertopics[j].id;
	                   
	                     if(topicid in  $scope.alltopics){
	                    	 $scope.deletethis = $scope.alltopics[topicid]
	                       $scope.usertopicsnew.push($scope.alltopics[topicid]);
	                    	 
	                    	 delete $scope.alltopics[topicid];
	                    	 
	                    	 //$scope.alltopics[topicid].assigned = "1";
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
	       		      dataset:   $scope.usertopicsnew
	       		    });
	             $scope.loading = false;
	          
	             if($scope.assigntopics == false)
	                 {
    	                 $scope.alltopics = true;
    	                 $scope.assigntopics = false;
	                 }
	          
                 
				    $scope.$apply();
			    
			    }).catch( function(result){
			    	
			    	var json = JSON.stringify(result);
			    	var json1 = json.toString();
			    	$scope.decry["activemenu"] = 'dashboard';
			        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
			    	//localStorage.setItem("activemenu", 'dashboard');
					$window.location.href = '#dashboard';
			    	
			    });
	
	}
	
	$scope.unassign = function(row,index){
		
		let index1 = $scope.topics.usertopics.findIndex( record => record.id === row.tid);
		
		if($scope.topics.usertopics[index1].gid == false || $scope.topics.usertopics[index1].gid == 'false'){
			
			
			swal({
				  title: 'Are you sure?',
				  text: "You want to unassign the course for this user!",
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
		
		}else{
			swal({title: "",type: 'warning', text: "Course assigned to group members",buttonsStyling:false,allowOutsideClick: false,
                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
		}
			
		
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
		    	$scope.getsession(cognitoUser, "unassign", row);
		    	
		    }else{
		    	localStorage.clear();
		    	$window.location.href = '#login';
		    	}
		
	
	}
	
	$scope.unassigntopicon = function(token, row){
		
		var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});
		
		var params = {};

			var body = {
					eid: $scope.decry.ueid,
					tid: row.tid,
					action: '0',
					oid : $scope.decry.oid,
			};
			
			var additionalParams = {
		             headers: {Authorization : token
		             }
		       };
			
			var topicjson =	apigClient.assignTopicstoUsersPost(params, body, additionalParams)
				.then(function(result){

						var json = JSON.stringify(result);
						var json1 = json.toString();
						json1 = JSON.parse(json1);
						
					    $scope.loading = false;
					    $scope.$apply();
					    if(json1.data.result == "1"){
					        $scope.alltopics = false;
			                 $scope.assigntopics = true;
				        	swal({title: "",type: 'success', text: "Course successfully unassigned for the User",buttonsStyling:false,allowOutsideClick: false,
				                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
				        	
				        	$scope.getnewdata(token);
					    }
				    	
				    }).catch( function(result){
				    	
				    	var json = JSON.stringify(result);
				    	var json1 = json.toString();
				    	alert('ERROR'+result);
				    	
				    	
				    });
		
	}
	
	$scope.getsession = function(cognitoUser, type, row){
		
		  return new Promise((resolve, reject) => {
	 			 cognitoUser.getSession((err, session) =>{
	 	            if (err) {
				    	swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
				            allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	 	            	localStorage.clear();
	 	            	$window.location.href = '#login';
	 	            }else{
	 	            	
	 	            	var token = session.idToken.jwtToken;
	 	            	 if(type == "assign"){
							   $scope.assigntopicon(token, row);   
						   }else if(type == "unassign"){
							   $scope.unassigntopicon(token, row);   
						   }else{
							   
						   }
		            	/*var apigClient = apigClientFactory.newClient({});
		    			var params1 = {};
		    			var body = {type: '0',token : token,oid : localStorage.getItem("oid"),admin: 0};
		    			var additionalParams = {};
		            	apigClient.getCredentialsPost(params1, body, additionalParams)
						.then(function(result1){
						   var tjson = JSON.stringify(result1.data);
						   tjson = tjson.toString();
						   
						   tjson = JSON.parse(tjson);
						   if(type == "assign"){
							   $scope.assigntopicon(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken, tid);   
						   }else if(type == "unassign"){
							   $scope.unassigntopicon(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken, tid);   
						   }else{
							   
						   }
						   
						   resolve();	
						    }).catch( function(result){
						    	swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', confirmButtonColor: "#fcc917"});
				        		localStorage.clear();
				    	    	$window.location.href = '#login';
						    })*/
	 	        
	 	            }
	  		  	});
	 		})
	}
	
/*	$scope.close = function(){
		$uibModalInstance.close();
	};*/
	
};

app.controller('ausertopicsCtrl', ausertopicsCtrl);
ausertopicsCtrl.$inject = ['$scope', '$http','$location', '$window','NgTableParams', 'config', 'usertopics','$uibModal','uibDateParser','$crypto'];


app.factory("getusertopics", function($window, $q, config,$crypto){
    return {
    	getusertopics: function(){
    		var usertopics,decry;
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
    		   usertopics = getusersession();
    		  
    	    }
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#login';
    	    }
			
			function getdata(token){
							var apigClient = apigClientFactory.newClient({ invokeUrl: decry.api,});
							var params = {};
    					  	
    						var body = {
        								eid : decry.ueid,
        								oid: decry.oid
    								 };
    					
    						var additionalParams = {
    					             headers: {Authorization : token
    					             }
    					       };
    						var data = apigClient.getuserTopicsPost(params, body, additionalParams)
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
									$window.location.href = '#login';
									
								})
							return $q.when(abcd);
					   }*/
						
			function getusersession(){
						 return new Promise((resolve, reject) => {
							 cognitoUser.getSession((err, session) =>{
								if (err) {
									swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
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
			
			return $q.when(usertopics);
        }
    };
});


