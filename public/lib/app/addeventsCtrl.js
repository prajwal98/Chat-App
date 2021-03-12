"use strict";
var addeventsCtrl = function ($scope, $http, $location, $window, $uibModal,$uibModalInstance, NgTableParams, config,$crypto) {
	
	$scope.allcourses = true;
	$scope.listevents = function(){
		$scope.imgurl = config.url;
	    $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		$scope.conducter = '';
		$scope.email = '';
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
	       
		  $scope.registration = 'No';			
		//   $scope.groups =JSON.parse(groupslist);
		//   $scope.groups = $scope.groups.groups;
		  var org={"GID":'1',"GNAME":'For Organisation'};
		//   $scope.groups.push(org);
		  $scope.eselect = 'event';
		  $scope.orgid = $scope.decry.oid;
		  $scope.orgidlow = $scope.orgid.toLowerCase();
		  
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
	    	$window.location.href = '#org';
	    	}
	    $scope.decry["activemenu"] = 'events';
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
	    //localStorage.setItem("activemenu", 'contrep');
	    window.navigating = false;
	};
	
	$scope.listevents();
	
$scope.addevents = function(){
	$scope.error = false;
	$scope.error1 = false;
	$scope.error2 = false;
	$scope.error3 = false;
	$scope.error4 = false;
	$scope.error5 = false;
	$scope.error6 = false;
	$scope.error7 = false;
	$scope.error8 = false;
	$scope.error9 = false;
	$scope.error10 = false;
	$scope.error11 = false;
	$scope.error12 = false;
	$scope.error13 = false;
	$scope.error14 = false;
	var r = new RegExp(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
	var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
	
	if($scope.title === undefined || $scope.title == '' ||
	 $scope.title.replace(/\s/g, '').length === 0 || $scope.desc == undefined 
	|| $scope.desc.replace(/\s/g, '').length === 0 || $scope.desc == ''
	|| $scope.dates == undefined || $scope.dates == ''  || $scope.dates == null || $scope.dates == 'null' 
	|| $scope.etime === undefined || $scope.etime === null){
		
	
		if($scope.title === undefined || $scope.title === '' || $scope.title.replace(/\s/g, '').length === 0 ){
			$scope.error = true;
			return;
		}
		
		if($scope.desc === undefined || $scope.desc === '' || $scope.desc.replace(/\s/g, '').length === 0 ){
			$scope.error3 = true;
			return;
		}
		if($scope.dates === undefined || $scope.dates === '' || $scope.dates === null || $scope.dates === 'null' ){
			$scope.error4 = true;
			return;
		}
		if($scope.etime === undefined || $scope.etime === null ){
			$scope.error10 = true;
			return;
		}
		
		
	}else{
		
		if($scope.eselect == 'webinar'){
			
			if($scope.etype === undefined || $scope.etype === '' ){
				$scope.error7 = true;
				return;
			}
		}
		if($scope.etype === 'others'){
			
			if($scope.links === undefined || $scope.links === '' || $scope.links.replace(/\s/g, '').length === 0 ){
				$scope.error1 = true;
				return;
			}
			
			if(!r.test($scope.links)){
				$scope.error5 = true;
				return;
			}
		}
		if($scope.etype === 'zoom'){
			
			if($scope.zoomid === undefined || $scope.zoomid === '' || $scope.zoomid.replace(/\s/g, '').length === 0 ){
				$scope.error8 = true;
				return;
			}
			if($scope.zoompwd === undefined || $scope.zoompwd === '' || $scope.zoompwd.replace(/\s/g, '').length === 0 ){
				$scope.error9 = true;
				return;
			}
		}
		if($scope.etype == 'ivs'){
			
			if($scope.playback_url === undefined || $scope.playback_url === '' || $scope.playback_url.replace(/\s/g, '').length === 0 ){
				$scope.error1 = true;
				return;
			}
			
			if(!r.test($scope.playback_url)){
				$scope.error5 = true;
				return;
			}
		}
		
		if ($scope.payment === undefined || $scope.payment == '' || $scope.registration == 'No') {
		
		} else {
			
			if (isNaN($scope.payment) || $scope.payment < 1) {
				$scope.error11 = true;
				
				return;
			}
		}
		if ($scope.limit === undefined || $scope.limit == '' || $scope.registration == 'No') {
		
		} else {
			
			if (isNaN($scope.limit) || $scope.limit < 1 || $scope.limit != Math.floor($scope.limit)) {
				// if ($scope.limit != Math.floor($scope.limit)) {
				// 	//alert("Decimal Number")
					
				// }
				$scope.error12 = true;
				
				return;
			}
		}
		// 
		// if ($scope.limit.length > 0) {
		// 	if (isNaN($scope.limit) || $scope.limit <= 0) {
		// 		$scope.error12 = true;
		// 		return;
		// 	}
		// }
		// if ($scope.eventImages == undefined || $scope.eventImages == null || $scope.eventImages == '') {
		// 	alert('no image')
		// } else {
		// 	alert($scope.eventImages)
		// 	$scope.eventimagename = new Date().getTime();
		// 	$scope.commoncognito();
		// }
		if($scope.conducter === undefined || $scope.conducter === '' || $scope.conducter.replace(/\s/g, '').length === 0 ){
			$scope.error13 = true;
			return;
		}
		if (!reg.test($scope.email)){
			$scope.error14 = true;
			return;
		}
		$scope.getEvents();
		
	}
  }
  $scope.getEvents =  function(){

	$scope.loading = true;
	var decrypted =$crypto.decrypt(localStorage.getItem("786a2y1e"), config.key);               
	$scope.decry=JSON.parse(decrypted);
	var apigClient = apigClientFactory.newClient({ });
    var params1 = {};
	$scope.dates= $('#datetimepicker').val();
	$scope.times= $('#appt').val();
	var date = new Date(($scope.dates+" "+$scope.times).split(' ').join('T'));
	date = date.getTime() / 1000;
	
	var body={
		oid: config.oid,
		tenant:$scope.decry.tenant
	}
		
	// if($scope.groupid.GID !== '1'){
	// 	body.gid = $scope.groupid.GID;
	//   }
	  

	if($scope.etype === 'others'){
		body.annjson={"start":date,"title":$scope.title,"desc":$scope.desc,"link":$scope.links,"gid":$scope.decry.tenant};
		body.action = "webinar";
		
 	} else if($scope.etype === 'zoom'){
		body.annjson={"start":date,"title":$scope.title,"desc":$scope.desc,"zoomID":$scope.zoomid,"zoomPWD":$scope.zoompwd,"gid":$scope.decry.tenant};
		body.action = "livesessions";
		
 	} else if($scope.etype === 'ivs'){
		body.annjson={"start":date,"title":$scope.title,"desc":$scope.desc,"playback_url":$scope.playback_url,"gid":$scope.decry.tenant};
		body.action = "amazonlivevideos";
		
 	}else {
		body.annjson={"start":date,"title":$scope.title,"desc":$scope.desc,"gid":$scope.decry.tenant};
	 	body.action = "events";
	
	  }
	  body.annjson.registration = $scope.registration;
	if ($scope.payment === undefined || $scope.payment == '' || $scope.registration == 'No') {
		
	} else {
		body.annjson.payment = $scope.payment;
	}
	if ($scope.limit === undefined || $scope.limit == '' || $scope.registration == 'No') {
		
	} else {
		body.annjson.limit = $scope.limit;
	}
	  
	  if ($scope.eventImages == undefined || $scope.eventImages == null || $scope.eventImages == '') { 

	  } else {
		  $scope.eventimagename = new Date().getTime();
		  $scope.eventImagesType = $scope.eventImages.name.slice((Math.max(0, $scope.eventImages.name.lastIndexOf(".")) || Infinity) + 1);
		  body.annjson.imgurl = "e"+$scope.eventimagename+"."+ $scope.eventImagesType;
	  }
	 
	$scope.eventid = new Date().getTime();
	body.annjson.eventid = "eventid"+$scope.eventid;
	  var additionalParams = {};    
	  body.annjson.conducter = $scope.conducter;
	  body.annjson.email = $scope.email;

   var topics1 = apigClient.addEventPost(params1,body,additionalParams)
               .then(function(result){
				
				   var json1 = JSON.stringify(result.data);
				  
				//    if($scope.decry.tenanttype == true) {
				// 	   $scope.decry["activemenu"] = 'tenants';
				// 	   $scope.decry.status === 'Events';
				// 	   localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
				// } else if($scope.decry.tenanttype == false) {
				// 	   $scope.decry["activemenu"] = 'events';
				// 	   localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
				// }
                  //$window.location.href="#viewevents";
				   
				   if ( $scope.eventImages == undefined || $scope.eventImages == null || $scope.eventImages == '')
				   {

					$window.location.href="#viewtenant";
					 }
				 else {
					   $scope.commoncognito();
				   }
				   
                   }).catch( function(result){
                      
                      console.log(result)
                       
                   });

	}
	

	$scope.upload = function(file,url) {
		$http.put(url, file, {headers:{'Content-Type': file.type}})
		  .success(function(resp) {
			  $window.location.href = '#viewtenant';
			//Finally, We're done
			 // $uibModalInstance.close($scope.object);
			 // alert('successfully uploaded ')
			  
		  })
		  .error(function(resp) {
			  $scope.loading = false;
			alert("An Error Occurred Attaching Your File. Please try again or Contact production Support if problem persist");
		  });
  }


	$scope.uploadfile = function(token)
	{
		var body = {};
		body.filename = "e"+$scope.eventimagename+"."+ $scope.eventImagesType;
		body.filetype = $scope.eventImages.type;
		body.oid = $scope.decry.oid;
		body.type = "eventimage";
		
		
		// var eventImagesType = $scope.eventImages.name.slice((Math.max(0, $scope.eventImages.name.lastIndexOf(".")) || Infinity) + 1);
		// var imgurl = $scope.eventimagename +"."+ eventImagesType;
		
		
		 var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});
		 var params = {};

		 var additionalParams = {
				 headers: {Authorization : token
				 }
		 };
		 
		
		 var topicjson = apigClient.getpreSignedURLPost(params, body, additionalParams)
		 .then(function(result){
				 
			
			 var json = JSON.stringify(result.data);
			

			 $scope.upload($scope.eventImages,result.data);
			
				  
			 }).catch( function(result){
				 
				 var json = JSON.stringify(result);
				 var json1 = json.toString();
				 alert('ERROR'+result);
				 $scope.loading = false;
				 $scope.$apply();
				 
			 });
	   
	}

	$scope.commoncognito = function()
	{
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
			$window.location.href = '#org';
		}
	}
	$scope.getsession = function(cognitoUser){
		
		return new Promise((resolve, reject) => {
			   cognitoUser.getSession((err, session) =>{
				  if (err) {
					  swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",allowOutsideClick: false,
						  allowEscapeKey:false,
						  width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',
							  buttonsStyling: false,confirmButtonClass: 'button1'});
					  localStorage.clear();
					  $window.location.href = '#org';
				  }else{
					  
					  var token = session.idToken.jwtToken;
					  $scope.uploadfile(token);
					  
 
				  }
			  });
		  })
  }

	$scope.deleteEvent = function (row) {

		$scope.loading = true;
		var decrypted =$crypto.decrypt(localStorage.getItem("786a2y1e"), config.key);               
        $scope.decry=JSON.parse(decrypted);
        var apigClient = apigClientFactory.newClient({ });
	   var params1 = {};
	
	var additionalParams = {};    
	var body={
		oid: $scope.decry.oid,
		eid: row.eid,
		gid: $scope.decry.group.GID
		}
	    if(row.link === undefined){
			body.action = "events"
		  } else {
			body.action = "webinar"
		  }
    var topics1 = apigClient.deleteEventPost(params1,body,additionalParams)
               .then(function(result){
            	  
                   var response = JSON.stringify(result.data);
                   if(response.id=== 0 || response.id=== '0'){
					
				   }else{

				   }
				 
				   $window.location.href="#addevents";

                   }).catch( function(result){  
                     
                   });
	}
	$scope.close = function(){
		$uibModalInstance.dismiss('cancel');
	};

$scope.checklist = function(){
	
	$scope.zoomweb = false;
	$scope.etype = undefined;
	$scope.title='';
	$scope.links = '';
	$scope.desc = '';
	$scope.dates = undefined;
	$scope.etime = undefined;
	$scope.groupid = '';
	$scope.zoomid = '';
	$scope.zoompwd = '';
	$scope.error = false;
	$scope.error1 = false;
	$scope.error2 = false;
	$scope.error3 = false;
	$scope.error4 = false;
	$scope.error5 = false;
	$scope.error6 = false;
	$scope.error7 = false;
	$scope.error8 = false;
	$scope.error9 = false;
	$scope.error10 = false;
	$scope.error11 = false;
	$scope.error12 = false;
};
$scope.checklist1 = function(){
	
	$scope.zoomweb = true;
	$scope.etype = undefined;
	$scope.title='';
	$scope.links = '';
	$scope.desc = '';
	$scope.dates = undefined;
	$scope.etime = undefined;
	$scope.groupid = '';
	$scope.zoomid = '';
	$scope.zoompwd = '';
	$scope.error = false;
	$scope.error1 = false;
	$scope.error2 = false;
	$scope.error3 = false;
	$scope.error4 = false;
	$scope.error5 = false;
	$scope.error6 = false;
	$scope.error7 = false;
	$scope.error8 = false;
	$scope.error9 = false;
	$scope.error10 = false;
	$scope.error11 = false;
	$scope.error12 = false;
};
};

app.controller('addeventsCtrl', addeventsCtrl);
addeventsCtrl.$inject = ['$scope', '$http','$location', '$window','$uibModal','$uibModalInstance', 'NgTableParams', 'config','$crypto'];

app.factory("getgroupslist", function($window, $q, config,$crypto){
    return {
    	getgroupslist: function(){
    		var listtopics1,decry;
    		
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
    		   listtopics1 = getusersession();
    		  
    	    }
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#org';
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
							
					var data =	apigClient.getGroupsPost(params, body, additionalParams)
						.then(function(result){
							var json = JSON.stringify(result.data);
							
							var res= {};
							res.groups = JSON.parse(json);
							return $q.when(JSON.stringify(res));
							
					}).catch( function(result){
						
						var json = JSON.stringify(result);
						var json1 = json.toString();
						return $q.when("hello1");
						
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

    	return $q.when(listtopics1);
    }
    };
});


