var publishtypeCtrl = function($scope, $uibModalInstance, $http, $location, $window, $cookies, tenantslist) {
	$scope.home = function() {
// alert($scope.row.TENANTS)
	$scope.error = false;
	$scope.selectAll = false;
	$scope.select = true;
	$scope.datepicker = false;
	$scope.minDate = new Date();
	$scope.myDate = {
			"date": ""
	}

	$scope.tenants = JSON.parse(tenantslist);
	$scope.tenants = $scope.tenants.tenants;
	
	// $scope.tenants = ['Marketron', 'JPTEST', 'Enhanzed', 'JSSAHER', 'ExcelSoft', 'IBM', 'Oracle', 'EnY'];
	$scope.publishToTenants = angular.copy($scope.row.TENANTS);
	$scope.cnt = 0;

	if($scope.publishToTenants.length > 0){
		for(var i=0;i<$scope.tenants.length;i++){
			if ($scope.publishToTenants.includes($scope.tenants[i].BOID)) {
				var tmp = $scope.tenants[i];
				$scope.tenants.splice(i, 1);
				$scope.tenants.unshift(tmp);
				$scope.cnt++;
			} 
		}
	}

	$scope.deleteTenants = [];
	$scope.forAllOrgs = {
		value : false,
	  };
	};
	
	$scope.options = [];

	$scope.updateTenant = function(item) {
		
		if ($scope.publishToTenants.includes(item)) {
			var index = $scope.publishToTenants.indexOf(item);
			$scope.publishToTenants.splice(index, 1);
		} else {
			$scope.publishToTenants.push(item);
		}
		
	}
	  $scope.toggleAll = function() {
		if ($scope.publishToTenants.length === $scope.tenants.length){
			$scope.publishToTenants = [];
		} else {
			$scope.publishToTenants = [];
			for (var i = 0; i < $scope.tenants.length; i++) {
                $scope.publishToTenants.push($scope.tenants[i].BOID);
              }
		}
		// for (var i = 0; i < $scope.tenants.length; i++) {
		//   $scope.options[i] = checked;
		//   $scope.publishToTenants.push($scope.options[i]);
		//   $scope.tenants[i].checked = checked;
		// }
		
	  };

	$scope.home();
		
		$scope.publish = function(){
			$scope.loading = true;
			$scope.allTenantsList = angular.copy($scope.publishToTenants);
			if ($scope.row.TENANTS.length > 0) {
				for (var i=0; i<$scope.row.TENANTS.length;i++) {
					if ($scope.publishToTenants.includes($scope.row.TENANTS[i])) {
						$scope.publishToTenants.splice($scope.publishToTenants.indexOf($scope.row.TENANTS[i]), 1);
					} else {
						$scope.deleteTenants.push($scope.row.TENANTS[i]);
					}
				}
			}
			// console.log($scope.publishToTenants);
			// console.log($scope.deleteTenants);
			var list = {
				allTenants: $scope.allTenantsList,
				deleteTenants: $scope.deleteTenants,
				newTenants: $scope.publishToTenants
			};
			$uibModalInstance.close(list);
			// if ($scope.publishToTenants.length > 0) {
			// 	$uibModalInstance.close(list);
			// } else {
			// }
			
		}
		
		$scope.close = function(){
		
			$uibModalInstance.dismiss('cancel');
	
		};
};

app.controller('publishtypeCtrl', publishtypeCtrl);
publishtypeCtrl.$inject = ['$scope', '$uibModalInstance', '$http', '$location', '$window','$cookies', 'tenantslist'];
