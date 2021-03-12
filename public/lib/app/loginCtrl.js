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
        $scope.pwd == null ||
        $scope.email == "" ||
        $scope.pwd == "" ||
        $scope.pwd.length < 8
      ) {
        if (
          ($scope.email == null || $scope.email == "") &&
          ($scope.pwd == null || $scope.pwd == "")
        ) {
          $scope.error = 1;
          return;
        } else if ($scope.email == null || $scope.email == "") {
          $scope.error = 1;
          return;
        } else if ($scope.pwd == null || $scope.pwd == "") {
          $scope.error = 6;
          return;
        } else if ($scope.pwd.length < 8) {
          $scope.error = 2;
          return;
        }
      } else {
        if (!reg.test($scope.email)) {
          $scope.error = true;
          return;
        }
        $scope.loading = true;

        AWSCognito.config.region = config.reg;
        AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: config.iid,
        });

        var authenticationData = {
          Username: $scope.email,
          Password: $scope.pwd,
        };
        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(
          authenticationData
        );
        var poolData = { UserPoolId: config.uid, ClientId: config.cid };

        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(
          poolData
        );

        var userData = {
          Username: $scope.email,
          Pool: userPool,
        };

        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(
          userData
        );

        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            if ($scope.pwdreset == true) {
              $scope.loading = false;

              $scope.pwd = "";
              $scope.$apply();
              swal({
                title: "",
                text: "Password reset completed.",
                type: "success",
                buttonsStyling: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                width: "400px",
                showConfirmButton: true,
                confirmButtonText: "Login Now",
                customClass: "sweetalert-confirmOk",
                confirmButtonClass: "button1",
              });
            } else {
              $scope.result = result;
              cognitoUser.getUserAttributes(function (err, result1) {
                if (err) {
                  alert("login" + err);
                  return;
                } else {
                  if (result1 != null) {
                    for (var i = 0; i < result1.length; i++) {
                      if (result1[i].getName() === "name") {
                        $scope.username = result1[i].getValue();
                      }
                    }

                    AWS.config.region = config.reg;
                    var cognitoidentity = new AWS.CognitoIdentity();
                    var decoded = jwtHelper.decodeToken(
                      result.getIdToken().getJwtToken()
                    );
                    var userrole = decoded["cognito:groups"];
                    if (decoded["cognito:groups"] == null) {
                      $scope.loading = false;
                      $scope.$apply();

                      swal({
                        title: "Oops!",
                        text: "You are not Authorized to Enter!",
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
                    } else {
                      $scope.userrole = [];
                      for (
                        var i = 0;
                        i < decoded["cognito:groups"].length;
                        i++
                      ) {
                        var role = decoded["cognito:groups"][i];
                        var value1 = role.indexOf("-");
                        //$scope.orgid = role.substring(0, value1);
                        //localStorage.setItem("orgid", $scope.orgid);
                        $scope.role = role.substring(value1 + 1, role.length);

                        if (
                          $scope.role == "Admin" ||
                          $scope.role == "Instructors" ||
                          $scope.role == "ContentCreators" ||
                          $scope.role == "MIDLEVELADMIN" ||
                          $scope.role == "Teachers"
                        ) {
                          if ($scope.role == "Admin") {
                            $scope.obj = { role: "Admin" };
                            $scope.role = "Admin";
                            $scope.userrole.push($scope.obj);
                          }
                          if ($scope.role == "Teachers") {
                            $scope.obj = { role: "Teachers" };
                            if (decoded.locale === undefined) {
                              $scope.obj.tenant = "CASEBOX-EXCELSOFT";
                            } else {
                              $scope.obj.tenant = decoded.locale.toUpperCase();
                            }
                            $scope.role = "Teachers";
                            $scope.userrole.push($scope.obj);
                          }
                          if ($scope.role == "Instructors") {
                            $scope.obj = { role: "Instructors" };
                            $scope.role = "Instructors";
                            $scope.userrole.push($scope.obj);
                          }
                          if ($scope.role == "ContentCreators") {
                            $scope.obj = { role: "ContentCreators" };
                            $scope.role = "ContentCreators";
                            $scope.userrole.push($scope.obj);
                          }
                          if ($scope.role == "MIDLEVELADMIN") {
                            $scope.obj = { role: "MIDLEVELADMIN" };
                            $scope.role = "MIDLEVELADMIN";
                            $scope.userrole.push($scope.obj);
                          }
                        }
                      }
                      if ($scope.role !== undefined) {
                        var logins =
                          "cognito-idp.us-east-1.amazonaws.com/" + config.uid;

                        $scope.logins = {};
                        $scope.logins[
                          logins
                        ] = result.getIdToken().getJwtToken();

                        var params = {
                          IdentityPoolId: config.iid,
                          Logins: $scope.logins,
                        };
                        cognitoidentity.getId(params, function (err, data) {
                          if (err) {
                            alert("Cognito Error1" + err);
                            console.log(err, err.stack);
                          } // an error occurred
                          else {
                            AWS.config.region = config.reg;
                            var cognitoidentity = new AWS.CognitoIdentity();

                            var params2 = {
                              IdentityId: data.IdentityId,

                              Logins: $scope.logins,
                            };
                            AWS.config.credentials = new AWS.CognitoIdentityCredentials(
                              {
                                IdentityPoolId: config.iid,
                                Logins: {
                                  "www.amazon.com": result
                                    .getIdToken()
                                    .getJwtToken(),
                                },
                              }
                            );
                            cognitoidentity.getCredentialsForIdentity(
                              params2,
                              function (err, data2) {
                                if (err) {
                                  alert("Cognito Error" + err);
                                } else {
                                  var accessKeyId =
                                    data2.Credentials.AccessKeyId;
                                  var secretAccessKey =
                                    data2.Credentials.SecretKey;
                                  var sessionToken =
                                    data2.Credentials.SessionToken;
                                  $scope.decry = {};
                                  $scope.decry.uid = config.uid;
                                  $scope.decry.iid = config.iid;
                                  $scope.decry.api = config.iurl;
                                  $scope.decry.cid = config.cid;
                                  $scope.decry.oid = "CASEBOX";
                                  $scope.decry.htype = config.htype;
                                  $scope.decry.username = $scope.username;
                                  $scope.decry.appcolor = config.appcolor;
                                  $scope.decry.email = $scope.email;
                                  $scope.decry.role = $scope.role;
                                  $scope.decry.activemenu = "dashboard";

                                  $scope.getadminuserrole($scope.role);
                                }
                              }
                            );
                          }
                        });
                      } else {
                        $scope.loading = false;
                        $scope.$apply();

                        swal({
                          title: "Oops!",
                          text: "You are not Authorized to Enter!",
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
                      }
                    }
                  }
                }
              });
            }
          },

          onFailure: function (err) {
            $scope.loading = false;
            $scope.$apply();

            if (err == "UserNotFoundException: User does not exist.") {
              $scope.error = 3;
              $scope.$apply();
              //swal({title: "Oops!", text: "Invalid Usermail or password!", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', confirmButtonColor: "#fcc917"});
            } else if (err == "NetworkingError: Network Failure") {
              $scope.error = 7;
              $scope.$apply();
              //swal({title: "Oops!", text: "Please check your internet connection!", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', confirmButtonColor: "#fcc917"});
            } else if (
              err == "NotAuthorizedException: Incorrect username or password."
            ) {
              $scope.error = 4;
              $scope.$apply();
            } else if (
              err ==
              "InvalidPasswordException: Password does not conform to policy: Password must have lowercase characters"
            ) {
              $scope.error = 4;
              $scope.$apply();
            } else {
              $scope.error = 4;
              $scope.$apply();
              //swal({title: "Oops!", text: "Invalid Usermail or password!", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', confirmButtonColor: "#fcc917"});
            }
          },

          newPasswordRequired: function (userAttributes, requiredAttributes) {
            $scope.loading = false;
            $scope.$apply();
            $scope.obj = this;
            swal({
              title: "Change Password",
              html:
                '<p ng-app="" style="text-align: right;width:30%;float:left;font-size: 14px;margin-top:4px;">User Name</p>' +
                '<p style="width:3%;float:left;font-size: 14px;margin:4px 4px 0 0;">:</p>' +
                '<input id="name" name="ntitle" rows="1" wrap="soft" ng-model="ntitle" style="float:left;border: 1px solid #ccc;width:60%;overflow:hidden; resize:none;margin-bottom:10px;font-size:14px;" ></input>' +
                "</br>" +
                '<p style="text-align:right;width:30%;float:left;font-size: 14px;margin-top:4px;">Password</p>' +
                '<p style="width:3%;float:left;font-size: 14px;margin:4px 4px 0 0;">:</p>' +
                '<input type="password" id="pwd" name="nduration" rows="1" wrap="soft" ng-model="nduration" style="border: 1px solid #ccc;float:left;width:60%;overflow:hidden;margin-bottom:10px;font-size:14px;"></input>' +
                "</br>" +
                '<p style="text-align:right;width:30%;float:left;font-size: 14px;margin-top:4px;">Confirm Password</p>' +
                '<p style="width:3%;float:left;font-size: 14px;margin:4px 4px 0 0;">:</p>' +
                '<input type="password" id="cpwd" name="nduration" rows="1" wrap="soft" ng-model="nduration" style="border: 1px solid #ccc;float:left;width:60%;overflow:hidden;font-size:14px;margin-bottom:10px;"></input>' +
                "</br>" +
                "</br>" +
                '<div style="width:96%;font-family:MyWebFont1;margin-right: 8px;float: right;">* Password should be at least 8 characters, contain at least one lowercase letter & one number & one special character.</div>' +
                "</br>",
              closeOnCancel: false,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showCancelButton: true,
              cancelButtonText: "Cancel",
              showConfirmButton: true,
              confirmButtonText: "Next",
              width: "450px",
              height: "450px",
              customClass: "sweetalertPass",
              buttonsStyling: false,
              cancelButtonClass: "button2",
              confirmButtonClass: "button1",
              preConfirm: function () {
                return new Promise(function (resolve) {
                  if (
                    $("#name").val() != "" &&
                    $("#cpwd").val() != "" &&
                    $("#pwd").val() != ""
                  ) {
                    var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
                    var format1 = /[ 1234567890]/;
                    var format2 = /[ abcdefghijklmnopqrstuvwxyz]/;
                    if (
                      $("#cpwd").val().indexOf(" ") >= 0 ||
                      $("#cpwd").val().indexOf(" ") >= 0
                    ) {
                      swal.showValidationError(
                        "Password should not contain space"
                      );
                      resolve();
                    } else if (
                      !format.test($("#pwd").val()) ||
                      !format1.test($("#pwd").val()) ||
                      !format2.test($("#pwd").val()) ||
                      !format.test($("#cpwd").val()) ||
                      !format1.test($("#cpwd").val()) ||
                      !format2.test($("#cpwd").val())
                    ) {
                      swal.showValidationError("Invalid password format");
                      resolve();
                    } else if ($("#pwd").val().length == 0) {
                      swal.showValidationError(
                        "Password must be at least 8 characters"
                      );
                      resolve();
                    } else if ($("#cpwd").val() === $("#pwd").val()) {
                      resolve([$("#name").val(), $("#pwd").val()]);
                    } else {
                      swal.showValidationError("Passwords do not match");
                      resolve();
                    }
                  } else {
                    swal.showValidationError(
                      "Please enter the required fields"
                    );
                    resolve();
                  }
                });
              },
            }).then(function (result) {
              var json = JSON.stringify(result);
              $scope.ndesc = JSON.parse(json);
              $scope.code = $scope.ndesc.value[0];
              $scope.npwd = $scope.ndesc.value[1];
              $scope.pwdreset = true;
              $scope.$apply();
              var attributesData = {
                name: $scope.code,
              };

              cognitoUser.completeNewPasswordChallenge(
                $scope.npwd,
                attributesData,
                $scope.obj
              );
            });
          },
        });
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
