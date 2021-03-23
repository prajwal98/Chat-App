var loginCtrl = function (
  $scope,
  $http,
  $location,
  $window,
  $timeout,
  $cookies,
  jwtHelper,
  $uibModal,
  config,
  $crypto
) {
  $scope.login = function () {
    //  localStorage.getItem("786a2y1e") !=null ?   $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';
  
    if($location.search().uname !== undefined || $window.location.search !== undefined){
      var pr1 = $window.location.search.split('=');
      console.log(pr1[1])
    $scope.decry = {};
    $scope.decry.username = $location.search().uname === undefined ? pr1[1].replace('%20',' ') : $location.search().uname;
    
    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );
    $window.location.href = "#livetime";
  }
    
    $scope.inputType = "password";

    if (
      localStorage.getItem("786a2y1e") === null ||
      localStorage.getItem("786a2y1e") === undefined
    ) {
      // $window.location.href = '#login';
    } else {
      $scope.decry = JSON.parse(
        $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
      );
      $scope.orgid = "PEARSON";
      AWSCognito.config.region = config.reg;
      AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.iid,
      });

      var poolData = { UserPoolId: config.uid, ClientId: config.cid };

      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(
        poolData
      );
      var cognitoUser = userPool.getCurrentUser();
      if (cognitoUser != null && $scope.decry.email != null) {
        cognitoUser.getSession(function (err, session) {
          if (err) {
            //$window.location.href = '#login';
          } else {
            $window.location.href = "#dashboard";
          }
        });
      } else {
        $scope.orgimg =
          config.url +
          $scope.orgid.toLowerCase() +
          "-resources/images/org-images/" +
          $scope.orgid +
          ".png";
      }
    }
  };
 
  $scope.login();

  $scope.myFunct = function (keyEvent) {
    if (keyEvent.which === 13) $scope.logon();
  };

  $scope.logon = function () {
    $scope.pwdreset = false;
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    $scope.error = false;
    if ($scope.email == null || $scope.email == "") {
      $scope.email = "naresh@enhanzed.com";
      $scope.pwd = "qwerty@1";
    }

    if ($scope.online == true) {
      if (
        $scope.email == null ||
        $scope.email == "" 
      ) {
        if (
          ($scope.email == null || $scope.email == "")
        ) {
          $scope.error = 1;
          return;
        } else if ($scope.email == null || $scope.email == "") {
          $scope.error = 1;
          return;
        } 
      } else {
        
        $scope.loading = true;

    
        $scope.decry = {};
        $scope.decry.username = $scope.email;
        $location.search().uname
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#livetime";
      
      }
    } else {
      $scope.error = 7;
    }
  };
  $scope.getadminuserrole = function (role) {
    if (role == "Teachers") {
      $scope.decry.tenants = [$scope.userrole[0].tenant];
      $scope.decry.menus = [];
      $scope.decry.role = $scope.userrole[0].role;
      $scope.decry.menus.push($scope.userrole[0].role);
      $http.get("lib/resource/masterconfig.json").success(function (data) {
        $scope.decry.masterConfig = data;
        $scope.username = $scope.email;
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#livetime";
      });
    } else {
      var apigClient = apigClientFactory.newClient({});

      var params = {};
      var body = {
        oid: config.oid,
      };

      var additionalParams = {};

      apigClient
        .listUsersTenantPost(params, body, additionalParams)
        .then(function (result) {
          var response = JSON.stringify(result.data);

          response = JSON.parse(response);

          if (response.id === 0) {
            $scope.decry.menus = [];
            $scope.decry.role = $scope.userrole[0].role;
            $scope.decry.menus.push($scope.userrole[0].role);
            $http
              .get("lib/resource/masterconfig.json")
              .success(function (data) {
                $scope.decry.masterConfig = data;
                localStorage.setItem(
                  "786a2y1e",
                  $crypto.encrypt(JSON.stringify($scope.decry), config.key)
                );
                $window.location.href = "#dashboard";
              });
          } else {
            response.roles = Object.keys(response.roles).map(function (_) {
              return response.roles[_];
            });
            var flg = 0;
            for (var i = 0; i < response.roles.length; i++) {
              if (
                response.roles[i].rname.toLowerCase() ==
                role.replaceAll("-", " ").toLowerCase()
              ) {
                if (response.utenants.length > 0) {
                  for (var k = 0; k < response.utenants.length; k++) {
                    if (
                      response.utenants[k].RID == response.roles[i].rid &&
                      response.utenants[k].EMAILID == $scope.email
                    ) {
                      $scope.decry.tenants = response.utenants[k].TENANTS;
                      break;
                    }
                  }
                }
                $scope.decry.menus = [];
                flg = 1;
                for (var j = 0; j < response.roles[i].rtabs.length; j++) {
                  $scope.decry.menus.push(response.roles[i].rtabs[j].ttitle);
                }

                $http
                  .get("lib/resource/masterconfig.json")
                  .success(function (data) {
                    $scope.decry.masterConfig = data;
                    console.log($scope.decry.tenants);

                    localStorage.setItem(
                      "786a2y1e",
                      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
                    );
                    $window.location.href = "#dashboard";
                  });
              }
              if (response.roles.length - 1 == i && flg === 0) {
                $scope.decry.menus = [];
                $scope.decry.role = $scope.userrole[0].role;
                $scope.decry.menus.push($scope.userrole[0].role);
                $http
                  .get("lib/resource/masterconfig.json")
                  .success(function (data) {
                    $scope.decry.masterConfig = data;
                    localStorage.setItem(
                      "786a2y1e",
                      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
                    );
                    $window.location.href = "#dashboard";
                  });
              }
            }
          }
        })
        .catch(function (result) {
          var json = JSON.stringify(result);
          var json1 = json.toString();
        });
    }
  };
  $scope.forgotpwd = function () {
    // localStorage.getItem("786a2y1e") !=null ?   $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';

    $scope.Instance = $uibModal.open({
      templateUrl: "forgotpwd.html",
      controller: "forgotpwdCtrl",
      backdrop: "static",
      scope: $scope,
      keyboard: false,
      windowClass: "forgotmodal",
    });
  };
  $scope.changeorg = function () {
    $window.location.href = "#login";
  };
};

app.controller("loginCtrl", loginCtrl);
loginCtrl.$inject = [
  "$scope",
  "$http",
  "$location",
  "$window",
  "$timeout",
  "$cookies",
  "jwtHelper",
  "$uibModal",
  "config",
  "$crypto",
];
