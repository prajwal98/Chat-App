var duedateCtrl = function($scope, $uibModalInstance, $http, $location, $window, $cookies) {

	$scope.error = false;

	$scope.select = true;
	$scope.datepicker = false;
	$scope.minDate = new Date();
	$scope.myDate = {
			"date": ""
	}
	$scope.onDateChanged = function() {
	    };
		$scope.addnugget = function(){
			
		
			if ($scope.ntitle == null ||  $scope.ntitle == undefined || $scope.ntitle.replace(/\s/g, '').length === 0) 
			{ 
				$scope.error = true;
			} else 
				{
				$scope.error = false;
				 $uibModalInstance.close($scope.ntitle);
				}
			
		};
		
		$scope.assign = function(){
			$scope.error = false;
			if($scope.myDate.date == ""){
				$scope.error = true;
			}else{
				var date = new Date($scope.myDate.date);
				var timestamp = date.getTime();
				$uibModalInstance.close(timestamp);
			}
			
		}
		
		$scope.assign1 = function(){
				$uibModalInstance.close();
		}
		
		$scope.close = function(){
		
			$uibModalInstance.dismiss('cancel');
	
		};
		
		$scope.pickdate = function(){
			
			$scope.select = false;
			$scope.datepicker = true;
	
		};

};

app.controller('duedateCtrl', duedateCtrl);
duedateCtrl.$inject = ['$scope', '$uibModalInstance', '$http', '$location', '$window','$cookies'];
