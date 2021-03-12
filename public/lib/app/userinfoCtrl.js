 "use strict";
var userinfoCtrl = function ($scope, $http,$location, $window, NgTableParams, config, userinfo,$uibModal,uibDateParser,$crypto) {
	
	$scope.userinfo = function(){
		
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
	            	
	                if(userinfo != false)
	                {
	                	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            	             $scope.userdetails = JSON.parse(userinfo);
							$scope.coursesreport = true;
							$scope.objectsreport = false;
							//alert($scope.coursesreport)
            	             $scope.ctype = $scope.decry.ctype;
            	             $scope.orgid = $scope.decry.oid;
            	             $scope.orgidlow = $scope.orgid.toLowerCase();
            	             $scope.user=$scope.userdetails.UNAME;
            	             $scope.email=$scope.userdetails.EMAILID;
            	             $scope.LA= $scope.userdetails.LA;
            	             
            	             $scope.overview = true;
            	             $scope.certlist = false;
            	             $scope.tcompleted = 0;
            	             $scope.tinprogress = 0;
            	             
            	            //  if($scope.userdetails.certlist.length > 0){
            	            // 	 for(var k=0; k < $scope.userdetails.certlist.length;k++){
            	            		 
            	            // 		 var date = new Date($scope.userdetails.certlist[k].CDATE*1000);
                            //          var year = date.getFullYear();
                            //           var month = months[date.getMonth()];
                            //           var date1 = date.getDate();
                            //           var hour = date.getHours();
                            //           var min = date.getMinutes();
                            //           var sec = date.getSeconds();
                            //           var time = "Completed on " +  month +  '-' + date1 +"-"+ year;
                               
            	            // 		 $scope.userdetails.certlist[k].CDATE =  time;
            		        //      }
            	            //  }
            	             if($scope.userdetails.TOPICS == undefined){
            	            	 
            	             }else{
            	            	 
            	            	 for(var i=0; i < $scope.userdetails.TOPICS.length;i++){
            	            		 
            		            	 if( $scope.userdetails.TOPICS[i].CS == 1 || $scope.userdetails.TOPICS[i].CS == "1"){
            		            		 $scope.tcompleted++;
            		            	 }else{
            		            		 $scope.tinprogress++;
									 }
									
            		             $scope.userdetails.assignedtopics = $scope.userdetails.assignedtopics.filter(function(item) {
                                        return item.id  != $scope.userdetails.TOPICS[i].TID;
                                     });
									
            		            	    $scope.date= $scope.userdetails.TOPICS[i].SON.split('.');
            						    var dateTime = Date.parse($scope.date[2]+"-"+$scope.date[1]+"-"+$scope.date[0]);
            						   
            						    $scope.userdetails.TOPICS[i].SON=dateTime;
            						   
            						    if($scope.userdetails.TOPICS[i].CON == ' ' || $scope.userdetails.TOPICS[i].CON == null){
            						    	$scope.userdetails.TOPICS[i].CON=null;
            						    }else
            						    	{
            						    	 $scope.date= $scope.userdetails.TOPICS[i].CON.split('.');
                  						    var dateTime = Date.parse($scope.date[2]+"-"+$scope.date[1]+"-"+$scope.date[0]);
                  						     
                  						    $scope.userdetails.TOPICS[i].CON=dateTime;
            						    	}
            						   
            						    
            		             }
								//  $scope.tns = $scope.tns - ($scope.tinprogress + $scope.tcompleted);
								//alert(JSON.stringify($scope.userdetails.assignedtopics))
								$scope.tns=$scope.userdetails.assignedtopics.length;
            	             }
            	            
            	             
            	             if( $scope.userdetails.LA == undefined){
            	                 
            	             }else{
            	               
            	                 var diff = moment.utc($scope.userdetails.LA).fromNow();
            	       
            	                 $scope.LA = diff;
            	             }
            	             
            	             $scope.tableParams = new NgTableParams({
            	                 page: 1,            // show first page
            	                 count: 5          // count per page
            	             }, {
            	               dataset:   $scope.userdetails.TOPICS === undefined ? [] : $scope.userdetails.TOPICS
							 });
							 
							 if($scope.userdetails.OBJECTS != undefined && $scope.userdetails.OBJECTS.length > 0){
								
								for(var i=0;i<$scope.userdetails.OBJECTS.length;i++){
									
									$scope.userdetails.OBJECTS[i].CON = $scope.userdetails.OBJECTS[i].CON.split('-');
									var cdate = new Date($scope.userdetails.OBJECTS[i].CON[2]+"/"+$scope.userdetails.OBJECTS[i].CON[1]+"/"+$scope.userdetails.OBJECTS[i].CON[0]);
									$scope.userdetails.OBJECTS[i].CON = cdate;
									$scope.time  = $scope.userdetails.OBJECTS[i].DUR.toFixed();
										
										var min = ~~(($scope.time % 3600) / 60);
										var sec = $scope.time % 60;
										
										$scope.userdetails.OBJECTS[i].mins = min;
										$scope.userdetails.OBJECTS[i].secs = sec;
									}
									$scope.userdetails.OBJECTS = $scope.userdetails.OBJECTS.sort(function(x, y){
										return y.CON - x.CON;
									});
									$scope.tableParams1 = new NgTableParams({
										page: 1,            // show first page
										count: 5          // count per page
									}, {
									  dataset:   $scope.userdetails.OBJECTS === undefined ? [] : $scope.userdetails.OBJECTS
									});     
								}	
							
            	             $scope.$watch('globalSearchTermAuto', function(newTerm, oldTerm) {
            	                 
            	                 $scope.tableParams.filter({ $: newTerm });
							   }, true);
						
	            }else
	                { 
	            	
	                	$scope.user=$scope.decry["User"];
   	             		$scope.email=$scope.decry["mail"];
   	             		$scope.LA= $scope.decry["las"];
   	             		
   	          		 $scope.tns=0;
	            	 $scope.userdetails = JSON.parse(userinfo);
    	             $scope.ctype = $scope.decry.ctype;
    	             $scope.orgid = $scope.decry.oid;
    	             $scope.orgidlow = $scope.orgid.toLowerCase();
    	         
	            			$scope.tcompleted = 0;
	            			$scope.tinprogress = 0;
	            		
    	                $scope.overview = true;
						$scope.certlist = false;
						$scope.coursesreport = true;
						$scope.objectsreport = false;
                        $scope.tableParams = new NgTableParams({
                            page: 1,            // show first page
                            count: 5          // count per page
                        }, {
                          dataset:   null
                        });
                        $scope.userdetails = { "certlist" : "" } ;
					}
				
	       		  if($window.innerWidth > 1024){
	       			  $scope.secondwidth = +$window.innerWidth - +244;
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
	       	    	        	$scope.secondwidth = +$window.innerWidth - +244;
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

	
	};
	$scope.viewtenant = function(){
		$scope.loading=true;
		
		if($scope.decry.reports == true){
			$window.location.href = '#viewreports';
		} else {
			$window.location.href = '#viewtenant';
		}
		
	}
	$scope.viewgroupreport = function(){
		$scope.loading=true;
		$window.location.href = '#viewgroupreport';
	}
	$scope.userreport = function(){
		$scope.loading=true;
		$window.location.href = '#userreport';
	}
	$scope.topicuserview = function(row)
		{
	   
			$scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
			$scope.decry["topicid"] = row.TID;
			$scope.decry["obtime"] = row.obtime;
			$scope.topicname = row.TN;
			localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
			$scope.loading = true;
		   $scope.Instance = $uibModal.open({
		   templateUrl: 'usertopicinfo.html',
		   controller: 'usertopicinfoCtrl',
		   backdrop: 'static',
		   keyboard: false,
		   scope: $scope,
		   windowClass: 'viewusertopicmodal',
		   resolve: {
			   topicslistview: function(gettopicsview){
				   return gettopicsview.gettopicsview();
		   }
		   }
		   });
		   $scope.Instance.opened.then(function () {
			   $scope.loading = false;
		   });
			$scope.Instance.result.then(function (quiz) {
				
			   }, function () {
				// alert($scope.object);
			   });
	   
		}
		$scope.exportcsv = function(){
			var type = '';
			if($scope.coursesreport == true){
				type = 'creport';
			} else if($scope.objectsreport == true) {
				type = 'contentreport';
			}
				
			var months = ['JAN','FAB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
			
		   var json_pre = [],larr = $scope.userdetails.TOPICS,tnm = 'ACTIVITY-USERS';
		   let arrHeader = ["coursename","startedon", "status","completedon"];
		  
		   if(type == 'creport'){
			   larr = $scope.userdetails.TOPICS ;
		   }
		   if(type == 'contentreport'){
			larr = $scope.userdetails.OBJECTS;
			arrHeader = [ "contentname","vieweddate","duration"];
		   }
		   console.log(type)
		  
		   if(type == 'creport'){
			if(larr === undefined){
				var obj = {};
				obj.coursename = '';
				obj.startedon = '';
				obj.status = '';
				obj.completedon = ''  ;
				json_pre.push(obj);
			} else {
				for(var dat of larr){
					
					var obj = {};
					var tsday = '',stday = '';
					if(dat.CON !== undefined && dat.CON !== null){
					var g = new Date(dat.CON);
				   var gm = (g.getMonth() + 1).toString().length > 1 ? (g.getMonth() + 1) : "0"+(g.getMonth() + 1);
				var	gd = g.getDate().toString().length > 1 ? g.getDate() : "0"+g.getDate();
				 tsday =   gm +"-"+ gd +"-"+g.getFullYear();
					}
					if(dat.SON !== undefined && dat.SON !== null){
						var g = new Date(dat.SON);
					   var gm = (g.getMonth() + 1).toString().length > 1 ? (g.getMonth() + 1) : "0"+(g.getMonth() + 1);
					var	gd = g.getDate().toString().length > 1 ? g.getDate() : "0"+g.getDate();
					stday =   gm +"-"+ gd +"-"+g.getFullYear();
						}
				
					
					obj.coursename = dat.TN;
					obj.startedon = stday;
					obj.status = dat.CS == 0 ? "In-Progress" : "Completed";
					obj.completedon = tsday ;
					json_pre.push(obj);
				}
			}
			
			
		   } else if(type == 'contentreport'){
			if(larr === undefined){
				var obj = {};
				obj.contentname = '';
				obj.vieweddate = '';
				obj.duration = '';
				json_pre.push(obj);
			} else {
				for(var dat of larr){
					var obj = {};
					var tsday = '';
					if(dat.CON !== undefined){
						var g = dat.CON;
						var gm = (g.getMonth() + 1).toString().length > 1 ? (g.getMonth() + 1) : "0"+(g.getMonth() + 1);
						 var	gd = g.getDate().toString().length > 1 ? g.getDate() : "0"+g.getDate();
						 tsday =   gm +"-"+ gd +"-"+g.getFullYear();
					}
			
					obj.contentname = dat.ON;
					obj.vieweddate = tsday;
					obj.duration = dat.mins+" min "+dat.secs+" sec";
					json_pre.push(obj);
				}
			}
			
			
		   }  
			   
	  
		let csvData = this.ConvertToCSV(json_pre, arrHeader,type);
		console.log(csvData)
		let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
		let dwldLink = document.createElement("a");
		let url = URL.createObjectURL(blob);
		let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
		if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
		 dwldLink.setAttribute("target", "_blank");
		}
		
		dwldLink.setAttribute("href", url);
		var e = new Date();
			var ed = e.getDate().toString().length > 1 ? e.getDate() : "0"+e.getDate();
			var eday =   ed +"-"+ months[e.getMonth()] +"-"+e.getFullYear();
		if(type == 'creport' && $scope.decry.reports == true){
			dwldLink.setAttribute("download", "REPORTS-USERBASED-"+$scope.user+"-COURSE-"+eday+".csv");
		} else if(type == 'creport' && $scope.decry.reports == false){
			dwldLink.setAttribute("download", $scope.decry.tenant+"-USERS-"+$scope.user+"-COURSE-"+eday+".csv");
		}  else if(type == 'contentreport' && $scope.decry.reports == false){
			dwldLink.setAttribute("download", $scope.decry.tenant+"-USERS-"+$scope.user+"-CONTENT&COLLATERAL-"+eday+".csv");
		} else {
			
			dwldLink.setAttribute("download", "REPORTS-USERBASED-"+$scope.user+"-CONTENT&COLLATERAL-"+eday+".csv");
		}
		
		dwldLink.style.visibility = "hidden";
		document.body.appendChild(dwldLink);
		dwldLink.click();
		document.body.removeChild(dwldLink);
		   
		}
		$scope.strRep = function(data) {
		   if(typeof data == "string") {
			 let newData = data.replace(/,/g, " ");
			  return newData;
		   }
		   else if(typeof data == "undefined") {
			 return "-";
		   }
		   else if(typeof data == "number") {
			 return  data.toString();
		   }
		   else {
			 return data;
		   }
		 }
		$scope.ConvertToCSV = function(objArray, headerList,type) {
		   console.log(objArray);
		   console.log(headerList);
		   let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
		   let str = '';
		   let row = '';
		
		   let newHeaders = ["Course Name","Started on", "Status","Completed on"];;
		  
		   if(type == 'contentreport'){
			newHeaders = [ "Content Name","Viewed Date","Duration"];
		   }
		  
		   for (let index in newHeaders) {
			 row += newHeaders[index] + ',';
		   }
		   row = row.slice(0, -1);
		   str += row + '\r\n';
		   for (let i = 0; i < array.length; i++) {
			 //let line = (i + 1) + '';
			  let line = '';
			 for (let index in headerList) {
			   let head = headerList[index];
		
			   line += headerList[headerList.length -1] == headerList[index] ? $scope.strRep(array[i][head])   :  $scope.strRep(array[i][head]) +',';
			 }
			 str += line + '\r\n';
		   }
		   return str;
		 }
	$scope.userinfo();
	$scope.loadPage = function() {
		$scope.loading = true;
		if($scope.decry.reports){
			$window.location.href = '#viewreports';
		} else {
			$window.location.href = '#tenants';
		}
	}
	$scope.showlist = function(type){
		if(type === 'course'){
		 $scope.coursesreport = true;
		 $scope.objectsreport = false;
		} else {
		 $scope.coursesreport = false;
		 $scope.objectsreport = true;
		}
	 }
};

app.controller('userinfoCtrl', userinfoCtrl);
userinfoCtrl.$inject = ['$scope', '$http','$location', '$window','NgTableParams', 'config', 'userinfo','$uibModal','uibDateParser','$crypto'];


app.factory("getuserinfo", function($window, $q, config,$crypto){
   
    return {
    	getuserinfo: function(){
    		var userinfo,decry;
    		localStorage.getItem("786a2y1e") !=null ?   decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';

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
    		   userinfo = getusersession();
    		  
    	    }
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#login';
    	    }
			
			function getdata(token){
			
			    
			    var apigClient = apigClientFactory.newClient({
	                   invokeUrl: decry.api,
	               });
	               
	               var params1 = {};
	               
	                   var body = { 
	                           id : decry.id,
	                           iid : decry.iid
	                           };
	               
	                   var additionalParams = {
	                           headers: {Authorization : token
	                           }
	                     };
	                 
	                 
	                   var to = apigClient.getUserDataWebPost(params1, body, additionalParams)
	                   .then(function(result){
	                       var json = JSON.stringify(result.data);
                           var topic = json.toString();
                          
                           if(topic.substring(1, 10) == "No Topics" || topic == null || topic == 'null'){
							var apigClient = apigClientFactory.newClient({invokeUrl: decry.api,});
							var params = {};
							  
							var body = {
									eid : decry.userinfoid,
									oid: decry.oid
									 };
						
							var additionalParams = {
									 headers: {Authorization : token
									 }
							   };
							  topic = JSON.parse(topic);
							
							 body.oid = decry.tname != undefined ?  decry.tname : decry.tenant;
							
							var data = apigClient.getUserInfoPost(params, body, additionalParams)
								.then(function(result){
								  
								
								   var json = JSON.stringify(result.data);
								   
									var users = json.toString();
								
									var users = JSON.parse(users);
								 
									users = JSON.stringify(users);
						   
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
                           }else
                               {
                                      
        							var apigClient = apigClientFactory.newClient({invokeUrl: decry.api,});
        							var params = {};
            					  	
            						var body = {
            								eid : decry.userinfoid,
            								oid: decry.oid
            								 };
            					
            						var additionalParams = {
            					             headers: {Authorization : token
            					             }
            					       };
            						  topic = JSON.parse(topic);
            						 var tp = [];
            	                        
                                     for(var i =0;i < topic.Records.length;i++ ){
                                       
                                        var abc = topic.Records[i].Value;
                                        var bcd  = JSON.parse(abc);
                                        var obj = {
                                                tid: topic.Records[i].Key,
                                                obtime : bcd.time
                                        }
                                        tp.push(obj);
									 }
									 body.oid = decry.tname != undefined ?  decry.tname : decry.tenant;
									
            						var data = apigClient.getUserInfoPost(params, body, additionalParams)
            							.then(function(result){
            							  
            							
										   var json = JSON.stringify(result.data);
										   
            							    var users = json.toString();
            							
            							    var users = JSON.parse(users);
            	                           if(users.TOPICS !== undefined){
											for(var k=0; k < users.TOPICS.length;k++){
                                                for(var m=0; m < tp.length ;m++){
                                                   
                                                    if(users.TOPICS[k].TID == tp[m].tid){
                                                        
                                                        users.TOPICS[k].obtime =  tp[m].obtime;
                                                      
                                                    }
                                                }
                                            }
										   }
                                            
                                            users = JSON.stringify(users);
                                   
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
							
	                   }).catch( function(result){
	                       
	                       var json = JSON.stringify(result.data);
	                       var topic1 = json.toString();
	                       var topic2 = JSON.parse(topic1);
	                        
	                         
	                       return $q.when(topic2);
	                       
	                   });
	               return $q.when(to);
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
			
			return $q.when(userinfo);
        }
    };

});


