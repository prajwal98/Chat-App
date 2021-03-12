"use strict";
var vieweventsCtrl = function ($scope, $http, $location, $window, groupslist, $uibModal, NgTableParams, config,$crypto,uiCalendarConfig) {

	$scope.allcourses =true;
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
	     
			$scope.groups = JSON.parse(groupslist);
			// $scope.gps = $scope.groups.groups;
			$scope.events = $scope.groups;
			$scope.eventsList=[];
		  var oid= angular.lowercase($scope.decry.oid)
		  $scope.orgid = $scope.decry.oid;
		  $scope.orgidlow = $scope.orgid.toLowerCase();

		  $scope.SelectedEvent = null;  
		 var isFirstTime = true;  

    var responsearray = [];
    // if($scope.groups.events['events'][$scope.decry.oid.toLowerCase()] !== undefined && $scope.groups.events['events'][$scope.decry.oid.toLowerCase()].length > 0)
    // {
    //     responsearray = $scope.groups.events['events'][$scope.decry.oid.toLowerCase()];
    // }
    
    // if($scope.gps.length > 0)
    //  {
		
    //   for(let j = 0; j < $scope.gps.length;j++)
    //    { 
	
    //     if($scope.groups.events['events'][$scope.gps[j].GID] !== undefined && $scope.groups.events['events'][$scope.gps[j].GID].length > 0)
    //    {
    //         responsearray =  responsearray.concat($scope.groups.events['events'][$scope.gps[j].GID]);
    //     }  
    //     }
    //  }
	 
    // if($scope.groups.events['webinar'][$scope.decry.oid.toLowerCase()] !== undefined && $scope.groups.events['webinar'][$scope.decry.oid.toLowerCase()].length > 0)
    // {
    //     responsearray = responsearray.concat($scope.groups.events['webinar'][$scope.decry.oid.toLowerCase()]);
       
    //      for(let j = 0;j<$scope.gps.length;j++)
    //      {
    //          if($scope.groups.events['webinar'][$scope.gps[j].GID] !== undefined && $scope.groups.events['webinar'][$scope.gps[j].GID].length > 0)
    //         {
    //           responsearray = responsearray.concat($scope.groups.events['webinar'][$scope.gps[j].GID]);
    //         }
    //      }
    // }

        if($scope.events.events.length > 0)
        {
                for(var n=0;n < $scope.events.events.length;n++){
                  
                    var obj = {};
                    obj.start = new Date($scope.events.events[n].start);
					obj.title =  $scope.events.events[n].title;
					obj.desc =  $scope.events.events[n].desc;
					obj.eid =  $scope.events.events[n].eid;
					obj.gid =  $scope.events.events[n].gid;
					obj.gname = $scope.events.events[n].gname;
                    obj.color = $scope.decry.appcolor;
                    obj.link =  $scope.events.events[n].link;
                    $scope.eventsList.push(obj);    
            }
        }

		  $scope.eventSources = [$scope.eventsList]; 
		 //alert(JSON.stringify($scope.eventSources))
		  $scope.uiConfig = {  
			  calendar: {  
				  height: 450,  
				  editable: true,  
				  displayEventTime: false, 
				  eventLimit: 2,
				  header: {  
				   right:'today prev,next'  
				  },buttonText: {
					  today: 'Today'
				  },  
				  dayClick: function (day) {   
						  $scope.SelectedEvent = $scope.eventsList;
						  $scope.SelectedEvent = $scope.SelectedEvent.filter(function(item) {	
							return moment.utc(item.start).format('ddd MMM DD YYYY') == day.format('ddd MMM DD YYYY');  
						});
						if($scope.SelectedEvent.length > 0){
							$scope.decry["groups"] = $scope.groups;
        					localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
							$scope.loading = true;
							$scope.allOrg = true;
							$scope.Instance = $uibModal.open({
								templateUrl: 'eventview.html',
								controller: 'eventviewCtrl',
								backdrop: 'static',
								keyboard: false,
								windowClass: 'addobjectmodal',
								scope: $scope
								});
								$scope.Instance.opened.then(function () {
									$scope.loading = false;
								});
						}
				  },
				  eventClick: function (event) {
					  
					$scope.SelectedEvent = $scope.eventsList;
					$scope.SelectedEvent = $scope.SelectedEvent.filter(function(item) {	
					  return moment.utc(item.start).format('ddd MMM DD YYYY') == event.start.format('ddd MMM DD YYYY');  
				  });

				  if($scope.SelectedEvent.length > 0){
					$scope.loading = true;
					$scope.allOrg = true;
					  $scope.Instance = $uibModal.open({
						  templateUrl: 'eventview.html',
						  controller: 'eventviewCtrl',
						  backdrop: 'static',
						  keyboard: false,
						  windowClass: 'addobjectmodal',
						  scope: $scope
						  });
						  $scope.Instance.opened.then(function () {
							$scope.loading = false;
						});
				  }
				  }
			  }  
		  };

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
	    $scope.decry["activemenu"] = 'events';
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
	    //localStorage.setItem("activemenu", 'contrep');
	    window.navigating = false;
	};
	
	$scope.addevent = function(type){
		$scope.decry["etype"] = type;
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
		$scope.loading = true;
		$scope.allOrg = true;
        $scope.Instance = $uibModal.open({
            templateUrl: 'addevents.html',
            controller: 'addeventsCtrl',
            backdrop: 'static',
            keyboard: false,
            windowClass: 'addobjectmodal',
			scope: $scope, 
			// resolve: {
            //     groupslist: function (getgroupslist) {
            //       return getgroupslist.getgroupslist();
            //     }
            //   }
			});
			$scope.Instance.opened.then(function () {
				$scope.loading = false;
			});
     $scope.Instance.result.then(function (selectedItem) {
        var json1 = JSON.stringify(selectedItem);

        }, function () {
         // alert($scope.object);
		});
		
		
	}
	
	$scope.deleteEvent = function(row){
		$scope.loading = true;
		var decrypted =$crypto.decrypt(localStorage.getItem("786a2y1e"), config.key);               
        $scope.decry=JSON.parse(decrypted);
        var apigClient = apigClientFactory.newClient({ });
	   var params1 = {};
	
	var additionalParams = {};    
	var body={
		oid: $scope.decry.oid
		}
	  if(row.link === undefined){
		body.eid= row.eid,
		body.action = "events"
	  } else {
		body.eid= row.eid,
		body.action = "webinar"
		
	  }

    var topics1 = apigClient.deleteEventPost(params1,body,additionalParams)
               .then(function(result){
            	  
                   var response = JSON.stringify(result.data);
                   if(response.id=== 0 || response.id=== '0'){
					
				   }else{

				   }
				   $window.location.href="#viewevents";

                   }).catch( function(result){  
                      alert(JSON.stringify(result)) 
                   });
	}
	$scope.listtopics();
};

app.controller('vieweventsCtrl', vieweventsCtrl);
vieweventsCtrl.$inject = ['$scope', '$http','$location', '$window','groupslist','$uibModal', 'NgTableParams', 'config','$crypto','uiCalendarConfig'];

app.factory("getgroups", function($window, $q, config,$crypto){
    return {
    	getgroups: function(){
    		var listtopics1,decry;
    		
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
    		   listtopics1 = getusersession();
    		  
    	    }
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#login';
    	    }
			
			function getdata(token){
						
						var apigClient = apigClientFactory.newClient({invokeUrl: decry.api,});
						  var params = {};

							var body = {
								oid : decry.oid
									 };
							
							var additionalParams = {
						             headers: {Authorization : token
						             }
							   };
						
							var apigClient = apigClientFactory.newClient({invokeUrl: decry.api,});
							var params = {};
							var body = {
								oid : decry.oid,
								allOrg: true,
								admin: true,
							};
								
								var additionalParams = {
										headers: {Authorization : token
										}
								};
								
								var data = apigClient.getEventsPost(params, body, additionalParams)
									.then(function(result){
										var response = JSON.stringify(result.data);
										response=JSON.parse(response);
										
										return $q.when(JSON.stringify(response));

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

    	return $q.when(listtopics1);
    }
    };
});


