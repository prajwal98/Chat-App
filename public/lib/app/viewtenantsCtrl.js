var viewtenantsCtrl = function (
  $scope,
  $uibModalInstance,
  $http,
  $location,
  $window,
  $cookies
) {
  $scope.home = function () {
    // alert($scope.row.TENANTS)
    $scope.error = false;
    $scope.selectAll = false;
    $scope.select = true;
    $scope.datepicker = false;
    $scope.minDate = new Date();
    $scope.myDate = {
      date: "",
    };

    //$scope.tenants = JSON.parse(tenantslist1);
    // $scope.tenants = $scope.tenants.tenants;
    // $scope.tenants.unshift({ OID: "ALL INSTITUTIONS", UC: 0 });
    console.log(JSON.stringify($scope.tenants));
    $scope.orgtenants = angular.copy($scope.tenants);
    $scope.tenantssearch = "";
    $scope.$watch(
      "tenantssearch",
      function () {
        $scope.tenants = $scope.orgtenants.filter(function (item) {
          return item.DOID.toLowerCase()
            .toString()
            .includes($scope.tenantssearch.toLowerCase());
        });
        $scope.tenants.sort();
      },
      true
    );

    $scope.deleteTenants = [];
    $scope.forAllOrgs = {
      value: false,
    };
  };

  $scope.options = [];

  $scope.updateTenant = function (item) {
    if ($scope.publishToTenants.includes(item)) {
      var index = $scope.publishToTenants.indexOf(item);
      $scope.publishToTenants.splice(index, 1);
    } else {
      $scope.publishToTenants.push(item);
    }
  };
  $scope.toggleAll = function () {
    if ($scope.publishToTenants.length === $scope.tenants.length) {
      $scope.publishToTenants = [];
    } else {
      $scope.publishToTenants = angular.copy($scope.tenants);
    }
    // for (var i = 0; i < $scope.tenants.length; i++) {
    //   $scope.options[i] = checked;
    //   $scope.publishToTenants.push($scope.options[i]);
    //   $scope.tenants[i].checked = checked;
    // }
  };

  $scope.home();

  $scope.publish = function () {
    $scope.loading = true;
    $scope.allTenantsList = angular.copy($scope.publishToTenants);
    if ($scope.row.TENANTS.length > 0) {
      for (var i = 0; i < $scope.row.TENANTS.length; i++) {
        if ($scope.publishToTenants.includes($scope.row.TENANTS[i])) {
          $scope.publishToTenants.splice(
            $scope.publishToTenants.indexOf($scope.row.TENANTS[i]),
            1
          );
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
      newTenants: $scope.publishToTenants,
    };
    $uibModalInstance.close(list);
    // if ($scope.publishToTenants.length > 0) {
    // 	$uibModalInstance.close(list);
    // } else {
    // }
  };
  $scope.loadtenant = function (tenant) {
   
    $uibModalInstance.close(tenant);
  };
  $scope.close = function () {
    $uibModalInstance.close(" ");
  };
};

app.controller("viewtenantsCtrl", viewtenantsCtrl);
viewtenantsCtrl.$inject = [
  "$scope",
  "$uibModalInstance",
  "$http",
  "$location",
  "$window",
  "$cookies",
];
