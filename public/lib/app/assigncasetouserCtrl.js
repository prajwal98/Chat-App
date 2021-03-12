var assigncasetouserCtrl = function($scope, $uibModalInstance, $http, NgTableParams, $window, $cookies, $crypto,config) {

	$scope.addfaculty = function () {
		
		// if(localStorage.getItem("786a2y1e") != null) {
			
		$scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		
		// } else {
		// 	localStorage.clear();
		// 	$window.location.href = '#login';
		// }
		// $scope.facultylist=JSON.parse(facultylist);
		$scope.newfacultyList = [];
		$scope.NDirectors = [];
		
		for (var i = 0; i < $scope.decry.alrassign.length;i++) {   
			 $scope.NDirectors.push($scope.decry.alrassign[i].EID);
			
		 }

		$scope.tableParams = new NgTableParams({
            page: 1,            // show first page
            count: 10          // count per page
        }, {
          dataset:   $scope.decry.usr
        });
        $scope.$watch('globalSearch', function(newTerm, oldTerm) {
				    
            $scope.tableParams.filter({ $: newTerm });
          }, true);
	}
	$scope.addfaculty();

	$scope.selectedRow = function(row) {
        var index = $scope.newfacultyList.indexOf(row.EID);
        
		if (index === -1) {
			$scope.newfacultyList.push(row.EID);
			$scope.$apply();
		} else {
			$scope.newfacultyList.splice(index, 1);
			$scope.$apply();
		}
	};

	$scope.error = false;
	$scope.assignCaseToUser = function(){
		$scope.loading =true;
        var apigClient = apigClientFactory.newClient();
	
        var params = {};
        var body = {
					oid : $scope.decry.oid,
					list: $scope.newfacultyList,
					tenant: $scope.decry.tenant,
					cid: $scope.decry.ctid
                };
               
        var additionalParams = {};

        apigClient.assignCaseToUserPost(params, body, additionalParams)
			.then(function (result) {
			
			$scope.loading = false;
			$window.location.href = '#caseusers';
			$scope.$apply();
			$uibModalInstance.close();
			swal({title: "User Added",type:"success", text: "User Added successfully",buttonsStyling:false,allowOutsideClick: false,
			allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', confirmButtonColor: "#6E2B69",customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
            }).catch( function(result){
				$scope.loading = false;
				$scope.$apply();
				swal({title: "Error",type:"error", text: "Error while adding User. Please contact production support",buttonsStyling:false,allowOutsideClick: false,
				allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', confirmButtonColor: "#6E2B69",customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
				$uibModalInstance.close();
            });
		
	};
	
	$scope.close = function(){
	
		$uibModalInstance.dismiss('cancel');

	};

};

app.controller('assigncasetouserCtrl', assigncasetouserCtrl);
assigncasetouserCtrl.$inject = ['$scope', '$uibModalInstance', '$http', 'NgTableParams', '$window','$cookies','$crypto','config'];

// app.factory("getfacultylist", function($window, $q, config,$crypto){
//     return {
//         getfacultylist: function(){
            
//             var batches,decry;
//             if(localStorage.getItem("786a2y1e") != null)
//             {
//                decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
//             }else
//             {
//                 localStorage.clear();
//                 $window.location.href = '#org';
//             }
//             AWSCognito.config.region =  config.reg;
//             AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
//                 IdentityPoolId: decry.iid
//             });
           
//             var poolData = { UserPoolId : decry.uid,
//                     ClientId : decry.cid
//                 };
            
            
//             var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
            
//             var cognitoUser = userPool.getCurrentUser();
            
//            if (cognitoUser != null && decry.email != null) {
//                batches = getusersession();
              
//             }
//             else {
//                 localStorage.clear();
//                 $window.location.href = '#org';
//             }
            
//             function getdata(token){
//                             var apigClient = apigClientFactory.newClient({invokeUrl: decry.api,});

//                           var params = {};

//                             var body = {
//                                     type : decry.facultytype
//                                      };
//                             var additionalParams = {
//                                      headers: {Authorization : token
//                                      }
//                                };
//                             var data =  apigClient.getFacultyListPost(params, body, additionalParams)
//                                 .then(function(result){
                                        
                                    
//                                    var json = JSON.stringify(result.data);
// 									var topic = json.toString();
//                                     return $q.when(topic);
                                        
//                                     }).catch( function(result){
                                        
//                                         var json = JSON.stringify(result);
//                                         var json1 = json.toString();
//                                         return $q.when("hello");
                                        
//                                     });
                            
                            
//                             return $q.when(data);
//             }

      
                        
//             function getusersession(){
//                          return new Promise((resolve, reject) => {
//                              cognitoUser.getSession((err, session) =>{
//                                 if (err) {
//                                     swal({title: "Oooops!", text: "Session has timed out, Please login again.", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'OK', confirmButtonColor: "#fcc917",customClass: 'swal-wide'});
//                                     localStorage.clear();
//                                     $window.location.href = '#org';
//                                 }else{
//                                     var token = session.idToken.jwtToken;
//                                     var abcc = getdata(token); 
//                                     resolve(abcc)
//                                     return $q.when(abcc);
                            
//                                 }
//                             });
//                         })
//                     }

//         return $q.when(batches);
//     }
//     };
// });