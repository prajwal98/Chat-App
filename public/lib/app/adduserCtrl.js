var adduserCtrl = function ($scope, $http, $location, $window, $cookies, $uibModalInstance, config,$crypto) {
	
$scope.home = function(){
   // $scope.fileContent = [];
	
};

$scope.home();	

$scope.onlyNumbers = function(event){   
    var keys={
        'up': 38,'right':39,
        'escape':27,'backspace':8,'tab':9,'enter':13,
        '0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57
    };
    for(var index in keys) {
        if (!keys.hasOwnProperty(index)) continue;
        if (event.charCode==keys[index]||event.keyCode==keys[index]) {
            return; //default event
        }
    }   
    event.preventDefault();
};

$scope.createuser = function(){

    
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

	if($scope.online == true){
	var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
	$scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));

	if($scope.uname == undefined || $scope.ugender == undefined || $scope.uname.replace(/\s/g, '').length === 0 
			|| $scope.eid == undefined || $scope.eid.replace(/\s/g, '').length === 0 || $scope.urole == undefined ||
			$scope.uname == '' || $scope.eid == '' || $scope.urole == '' ||  $scope.ugender == '' ){
		
		if($scope.uname == undefined || $scope.uname == '' || $scope.uname.replace(/\s/g, '').length === 0 ){
			$scope.error = true;
			return;
		}
		
		if($scope.eid == undefined || $scope.eid == '' || $scope.eid.replace(/\s/g, '').length === 0 ){
			$scope.error1 = true;
			return;
		}
		if (!reg.test($scope.eid)){
			$scope.error7 = true;
			return;
		}
		
		if($scope.ugender == undefined || $scope.ugender == '' ){
			$scope.error2 = true;
			return;
		}

		if($scope.urole == undefined || $scope.urole == '' ){
			$scope.error3 = true;
			return;
		}
		
	}else{
		
		if (!reg.test($scope.eid)){
			$scope.error7 = true;
			return;
		}
	
		
		$scope.loading = true;
	
		if($scope.groupid != undefined){
			
			$scope.groupstoadd.push($scope.groupid.GID);
		}
	
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
	    	$window.location.href = '#login';
	    }
	 
	}
	}else{
		$scope.error9 = true;
	}
	};
	
	
	$scope.getsession = function(cognitoUser){
		
		  return new Promise((resolve, reject) => {
	 			 cognitoUser.getSession((err, session) =>{
	 	            if (err) {
				    	swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
				              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	 	            	localStorage.clear();
	 	            	$window.location.href = '#login';
	 	            }else{
	 	            	
	 	            	var token = session.idToken.jwtToken;
	 	            	$scope.adduser(token); 
	 	        
	 	            }
	  		  	});
	 		})
	}
	
	$scope.adduser = function(token){
	    $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});
		var params = {};
		$scope.eid = $scope.eid.toLowerCase();
		if( $scope.ugender == '0'){
			$scope.ugender = "Male";
		}else if( $scope.ugender == '1'){
			$scope.ugender = "Female";
		}else{
			$scope.ugender = "Unknown";
		}
		var body = {
				tenant: $scope.decry.tenant,
				oid: config.oid,
				uname: $scope.uname,
				eid: $scope.eid,
				urole: $scope.urole,
				gender: $scope.ugender,
				address: $scope.address,
				contactno: $scope.contactno,
				
		};
		
		
		var additionalParams = {
	             headers: {Authorization : token
	             }
	       };
	
		var topicjson =	apigClient.addUserPost(params, body, additionalParams)
			.then(function(result){
				var json = JSON.stringify(result);
		    	var json1 = json.toString();
		    	json1 = JSON.parse(json1);
		    	
		    	if(json1.data.Code == "2"){
		    		$uibModalInstance.dismiss('cancel');
		    		$scope.loading = false;
		    		$scope.$apply();
		        	swal({title: "",type: "success", text: "New User "+$scope.uname +" created Successfully",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
		        	$window.location.href = '#manageusers';	
		    	}else if(json1.data.Code == "0"){
		    		$scope.loading = false;
		    		$scope.$apply();
	        		swal({title: "Oops!", text: "User already exist!", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
		    	}else{
		    		$scope.loading = false;
		    		$scope.$apply();
	        		swal({title: "Oops!", text: "Error creating user Please contact Production support.", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK',customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
		    	}
				
			    }).catch( function(result){
			    	$scope.loading = false;
			    	$scope.$apply();
	        		swal({title: "Oops!", text: "Error creating user! Please contact Production support.", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	        		$window.location.href = '#manageusers';	
			    	
			    	
			    });
	}
	$scope.bulkupload = function () {
		
		var array = $scope.CSVToArray($scope.fileContent);
		var objArray = [];
		for (var i = 1; i < array.length; i++) {
			objArray[i - 1] = {};
			for (var k = 0; k < array[0].length && k < array[i].length; k++) {
				var key = array[0][k];
				objArray[i - 1][key] = array[i][k]
			}
		}
		
		$scope.bulkregister(objArray);
	}
	$scope.CSVToArray= function(strData, strDelimiter) {
		
		strDelimiter = (strDelimiter || ",");

		var objPattern = new RegExp((
		
		"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
		
		"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
		
		"([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
		
		var arrData = [[]];
		
		var arrMatches = null;
		
		while (arrMatches = objPattern.exec(strData)) {
		
			var strMatchedDelimiter = arrMatches[1];
		
			if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
				
				arrData.push([]);
			}
			
			if (arrMatches[2]) {
				
				var strMatchedValue = arrMatches[2].replace(
				new RegExp("\"\"", "g"), "\"");
			} else {
				// We found a non-quoted value.
				var strMatchedValue = arrMatches[3];
			}
			
			arrData[arrData.length - 1].push(strMatchedValue);
		}
		
		return (arrData);
}
	$scope.bulkregister = function(afile){
		
		$scope.fileErr = undefined;
		if(afile != undefined && afile != null && afile.length > 0){
		$scope.loading =true;
		var apigClient = apigClientFactory.newClient();
		var params = {};
	
		var body = {
					oid : $scope.decry.tenant,
					jsonfile: afile,
					role: 'User'
				};
				
		var additionalParams = {};
	
		apigClient.addBulkUsersPost(params, body, additionalParams)
		.then(function(result){
			$scope.loading = false;
			$scope.$apply();
			$uibModalInstance.close();
			swal({title: "Add User Done",type:"success", text: "Users Successfully Added",buttonsStyling:false,allowOutsideClick: false,
			allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', confirmButtonColor: "#6E2B69",customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
			}).catch( function(result){
				$scope.loading = false;
				$scope.$apply();
				swal({title: "Error",type:"error", text: "Error while adding users. Please contact production support",buttonsStyling:false,allowOutsideClick: false,
				allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', confirmButtonColor: "#6E2B69",customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
				$uibModalInstance.close();
			});
		} else {
			$scope.fileErr = 'Please select a file to upload';
		}
	};

$scope.close = function(){
	$uibModalInstance.dismiss('cancel');
};

	
};
app.controller('adduserCtrl', adduserCtrl);
adduserCtrl.$inject = ['$scope', '$http', '$location', '$window','$cookies', '$uibModalInstance', 'config','$crypto'];

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
	app.directive('fileReader', function() {
		return {
		  scope: {
			fileReader:"="
		  },
		  link: function(scope, element) {
			$(element).on('change', function(changeEvent) {
			  var files = changeEvent.target.files;
			  if (files.length) {
				var r = new FileReader();
				r.onload = function(e) {
					var contents = e.target.result;
					scope.$apply(function () {
					  scope.fileReader = contents;
					});
				};
				
				r.readAsText(files[0]);
			  }
			});
		  }
		};
	  });