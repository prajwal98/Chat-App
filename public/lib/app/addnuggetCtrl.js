var addnuggetCtrl = function($scope, $uibModalInstance, $http, $location, $window, $cookies,config,$crypto) {

	$scope.error = false;
	$scope.error1 = false;
	$scope.error2 = false;

		$scope.addnugget = function(){
			
		
			if ($scope.ntitle == null ||  $scope.ntitle == undefined || $scope.ntitle.replace(/\s/g, '').length === 0
			|| $scope.ndescription == null ||  $scope.ndescription == undefined || $scope.ndescription.replace(/\s/g, '').length === 0 ) 
			{ 
				if($scope.ntitle == null ||  $scope.ntitle == undefined || $scope.ntitle.replace(/\s/g, '').length === 0){
					$scope.error = true;
				}
				if($scope.ndescription == null ||  $scope.ndescription == undefined || $scope.ndescription.replace(/\s/g, '').length === 0){
					$scope.error1 = true;
				}
				// if($scope.nduration == null ||  $scope.nduration == undefined || $scope.nduration.replace(/\s/g, '').length === 0){
				// 	$scope.error2 = true;
				// }
				
			} else 
				{
				$scope.error = false;
				
				var obj = {

					"ntitle": $scope.ntitle,
					"ndescription": $scope.ndescription,
					"ourl": $scope.nfile.name
					// "nduration": $scope.nduration,
				}
				 $uibModalInstance.close(obj);
				}
		};
		
		$scope.close = function(){
		
			$uibModalInstance.dismiss('cancel');
	
		};
		$scope.nugimageupload = function(nuggetfile) {
			if(nuggetfile == null){
				return;
			}
			//5242880 1048576
			if(nuggetfile.size > 5242880){
				$scope.nfile = null;
				 swal({title: "", text: "Image size is too large. File size cannot be greater than 5mb.",type:'error',buttonsStyling:false,allowOutsideClick: false,
						allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK',customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
				 return;
			}else{
				$scope.nfile = nuggetfile;
				$scope.uploadfile($scope.nfile);
			}
			
		};
		$scope.uploadfile = function(image){
			$scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
			var filename = image.name;
		 
			var apigClient = apigClientFactory.newClient({
				invokeUrl: $scope.decry.api,
			});
			var params = {};
			
			var body = {
					folder: "nuggetimages",
					filetype: image.type,
					filename: filename,
					oid: config.oid
				};
			
			 var additionalParams = {
					
			   };
			   
			apigClient.getpreSignedURLPost(params, body, additionalParams)
			.then(function(result){
					
			   var json = JSON.stringify(result.data);
			
			  $scope.upload(image, result.data);
			 
				}).catch( function(result){
					
					var json = JSON.stringify(result);
					var json1 = json.toString();
					alert('ERROR1'+result);
					
					
				});
		
		  
		
	};
	$scope.upload = function(file,url) {
			  $http.put(url, file, {headers:{'Content-Type': file.type}})
				.success(function(resp) {
				
				})
				.error(function(resp) {
				  alert("An Error Occurred Attaching Your File. Please try again or Contact production Support if problem persist");
				});
		}
};

app.controller('addnuggetCtrl', addnuggetCtrl);
addnuggetCtrl.$inject = ['$scope', '$uibModalInstance', '$http', '$location', '$window','$cookies','config','$crypto'];
