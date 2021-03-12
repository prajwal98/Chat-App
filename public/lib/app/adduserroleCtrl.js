var adduserroleCtrl = function (
  $scope,
  $http,
  $location,
  $window,
  $cookies,
  $uibModalInstance,
  config,
  $sce,
  $crypto,
  tenantslist
) {
  $scope.home = function () {
    if ($scope.action == "new") {
      $scope.addrdeatils = {};
      $scope.addrdeatils.tabs = [];
    } else {
      $scope.orgrname = angular.copy($scope.addrdeatils.uname);
    }
    $scope.addrdeatils.rolelist = [];

    $scope.tenant = JSON.parse(tenantslist);

    for (var i = 0; i < $scope.tenant.tenants.length; i++) {
      var obj = {};

      obj.ttitle = $scope.tenant.tenants[i]["BOID"].replace(" ", "");
      obj.tid = $scope.tenant.tenants[i]["BOID"].replace(" ", "");
      $scope.addrdeatils.rolelist.push(obj);
    }
    if (
      $scope.addrdeatils.tabs.length - 1 ==
      $scope.addrdeatils.rolelist.length
    ) {
      for (var l = 0; l < $scope.addrdeatils.tabs.length; l++) {
        if ($scope.addrdeatils.tabs[l].tid == "ALLTENANT") {
          $scope.addrdeatils.tabs.splice(l, 1);
        }
      }
    }
    //$scope.addrdeatils.rolelist.sort((a, b) => b.ttitle - a.ttitle)

    // $scope.tenant1 = [{"tid":"Tenants","ttitle":"Tenants"},
    // {"tid":"Events","ttitle":"Events"},{"tid":"Content","ttitle":"Content"},
    // {"tid":"Engage","ttitle":"Engage"},{"tid":"User Role","ttitle":"User Role"} ];
    $scope.example2settings = {
      displayProp: "tid",
    };
    $scope.addrdeatils.rolelist.sort(function (a, b) {
      return a.ttitle.localeCompare(b.ttitle);
    });

    //$scope.addrdeatils.rolelist.sort((a, b) => a.ttitle - b.ttitle);
    $scope.example13data = $scope.addrdeatils.rolelist;

    $scope.example14settings = {
      scrollableHeight: "170px",
      scrollable: true,
      enableSearch: true,
      showCheckAll: true,
      showUncheckAll: true,
      externalIdProp: "",
    };
  };

  $scope.home();

  $scope.catimageupload = function (topicfile) {
    if (topicfile == null) {
      return;
    }
    //5242880 1048576
    if (topicfile.size > 5242880) {
      $scope.topicfile = null;
      swal({
        title: "",
        text: "Image size is too large. File size cannot be greater than 5mb.",
        type: "error",
        buttonsStyling: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        width: "400px",
        showConfirmButton: true,
        confirmButtonText: "OK",
        customClass: "sweetalert-confirmOk",
        confirmButtonClass: "button1",
      });
      return;
    } else {
      $scope.topicfile = topicfile;
    }
  };

  $scope.onCategoryChange = function (itemSelected) {
    $scope.rname = itemSelected.rname;
    $scope.rtabsid = itemSelected.rid;
  };

  $scope.saverole = function () {
    window.navigating = true;
    $scope.error = false;
    $scope.error4 = false;
    $scope.aerror1 = false;
    $scope.aerror2 = false;
    $scope.error5 = false;
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (
      $scope.addrdeatils.uname == null ||
      $scope.addrdeatils.uname == undefined ||
      $scope.addrdeatils.uname.replace(/\s/g, "").length === 0 ||
      $scope.addrdeatils.emailid == null ||
      $scope.addrdeatils.emailid == undefined ||
      $scope.addrdeatils.emailid.replace(/\s/g, "").length === 0 ||
      $scope.addrdeatils.tabs == undefined ||
      $scope.addrdeatils.tabs == null ||
      $scope.addrdeatils.tabs.length === 0 ||
      $scope.productList === undefined
    ) {
      if (
        $scope.addrdeatils.emailid == null ||
        $scope.addrdeatils.emailid == undefined ||
        $scope.addrdeatils.emailid.replace(/\s/g, "").length === 0
      ) {
        $scope.error = true;
      }
      if (
        $scope.addrdeatils.uname == null ||
        $scope.addrdeatils.uname == undefined ||
        $scope.addrdeatils.uname.replace(/\s/g, "").length === 0
      ) {
        $scope.error4 = true;
      }
      if ($scope.productList === undefined) {
        $scope.aerror2 = true;
      }
      if (
        $scope.addrdeatils.tabs == undefined ||
        $scope.addrdeatils.tabs == "" ||
        $scope.addrdeatils.tabs.length === 0
      ) {
        $scope.aerror1 = true;
      }
    } else if (!reg.test($scope.addrdeatils.emailid)) {
      $scope.error5 = true;
    } else {
      $scope.loading = true;
      $scope.decry = JSON.parse(
        $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
      );
      AWSCognito.config.region = config.reg;
      AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: $scope.decry.iid,
      });

      var poolData = {
        UserPoolId: $scope.decry.uid,
        ClientId: $scope.decry.cid,
      };

      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(
        poolData
      );

      var cognitoUser = userPool.getCurrentUser();

      if (cognitoUser != null && $scope.decry.oid != null) {
        $scope.getsession(cognitoUser);
      } else {
        localStorage.clear();
        window.navigating = false;
        $window.location.href = "#login";
      }
    }
  };

  $scope.getsession = function (cognitoUser) {
    return new Promise((resolve, reject) => {
      cognitoUser.getSession((err, session) => {
        if (err) {
          swal({
            title: "Oops!",
            text: "Session has timed out, Please login again.",
            type: "error",
            buttonsStyling: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            width: "400px",
            showConfirmButton: true,
            confirmButtonText: "OK",
            customClass: "sweetalert-confirmOk",
            confirmButtonClass: "button1",
          });
          localStorage.clear();
          $window.location.href = "#login";
        } else {
          $scope.decry = JSON.parse(
            $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
          );
          var token = session.idToken.jwtToken;
          var apigClient = apigClientFactory.newClient({
            invokeUrl: $scope.decry.api,
          });

          var params = {};

          var body = {
            uname: $scope.addrdeatils.uname,
            rname: $scope.productList.rname,
            tenants: $scope.addrdeatils.tabs,
            oid: $scope.decry.oid,
            rid: $scope.productList.rid,
            eid: $scope.addrdeatils.emailid,
            tid: new Date().getTime(),
            action: "new",
          };
          if (
            $scope.addrdeatils.rolelist.length == $scope.addrdeatils.tabs.length
          ) {
            body.tenants.unshift({ ttitle: "ALLTENANT", tid: "ALLTENANT" });
          }

          if ($scope.action == "edit") {
            body.action = "edit";
            body.eid = $scope.addrdeatils.eid;
          }

          var additionalParams = {
            headers: { Authorization: token },
          };
          alert(JSON.stringify(body));
          apigClient
            .addUserToRolePost(params, body, additionalParams)
            .then(function (result) {
              var response = JSON.stringify(result.data);
              console.log(response);
              response = JSON.parse(response);

              if (response.id == 0 || response.id == "0") {
                swal({
                  title: "Oops!",
                  text: response.msg,
                  type: "warning",
                  buttonsStyling: false,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  width: "400px",
                  showConfirmButton: true,
                  confirmButtonText: "OK",
                  customClass: "sweetalert-confirmOk",
                  confirmButtonClass: "button1",
                });
                $scope.loading = false;
                $scope.$apply();
              } else {
                $scope.loading = true;
                $window.location.href = "#levelsetting";
                //$scope.$apply();
              }
            })
            .catch(function (result) {
              var json = JSON.stringify(result);
              var json1 = json.toString();
              // alert('ERROR'+result);
            });
        }
      });
    });
  };

  $scope.close = function () {
    $uibModalInstance.close();
  };
};

app.controller("adduserroleCtrl", adduserroleCtrl);
adduserroleCtrl.$inject = [
  "$scope",
  "$http",
  "$location",
  "$window",
  "$cookies",
  "$uibModalInstance",
  "config",
  "$sce",
  "$crypto",
  "tenantslist",
];
