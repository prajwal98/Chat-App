"use strict";
var managetenantsCtrl = function (
  $scope,
  $http,
  $uibModal,
  $location,
  $window,
  NgTableParams,
  tenantslist,
  config,
  $crypto
) {
  $scope.musers = function () {
    $scope.decry = JSON.parse(
      $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
    );

    AWSCognito.config.region = config.reg;
    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: $scope.decry.iid,
    });

    var poolData = { UserPoolId: $scope.decry.uid, ClientId: $scope.decry.cid };

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(
      poolData
    );

    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null && $scope.decry.email != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          localStorage.clear();
          $window.location.href = "#login";
        } else {
          $scope.tenants = JSON.parse(tenantslist);

          $scope.tenants = $scope.tenants.tenants;
          $scope.tableParams = new NgTableParams(
            {
              page: 1, // show first page
              count: 10, // count per page
            },
            {
              dataset: $scope.tenants,
            }
          );

          $scope.$watch(
            "globalSearchTermAuto",
            function (newTerm, oldTerm) {
              $scope.tableParams.filter({ $: newTerm });
            },
            true
          );

          if ($window.innerWidth > 1024) {
            $scope.secondwidth = +$window.innerWidth - +224;
            $scope.limit = 9;
          } else {
            $scope.secondwidth = +$window.innerWidth - +65;
            $scope.limit = 10;
          }
          $scope.second = { width: $scope.secondwidth };
          $(window).resize(function () {
            $scope.$apply(function () {
              $scope.windowWidth = $(window).width();
              if ($scope.windowWidth < 1023) {
                $scope.secondwidth = +$window.innerWidth - +65;
                $scope.second = { width: $scope.secondwidth };
                $scope.limit = 9;
              }
              if ($scope.windowWidth > 1024) {
                $scope.secondwidth = +$window.innerWidth - +224;
                $scope.second = { width: $scope.secondwidth };
                $scope.limit = 10;
              }
              if ($scope.windowWidth > 1024 && $scope.windowWidth < 1400) {
                $scope.limit = 9;
              }
              if ($scope.windowWidth > 1400 && $scope.windowWidth < 1700) {
                $scope.limit = 8;
              }
            });
          });
        }
      });
      $scope.decry["activemenu"] = "tenants";
      localStorage.setItem(
        "786a2y1e",
        $crypto.encrypt(JSON.stringify($scope.decry), config.key)
      );
      //localStorage.setItem("activemenu", 'groups');
    } else {
      localStorage.clear();
      $window.location.href = "#login";
    }

    window.navigating = false;
  };
  $scope.musers();

  $scope.viewtenant = function (tenant) {
    $scope.loading = true;
    $scope.decry = JSON.parse(
      $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
    );
    $scope.decry.tenant = tenant;
    delete $scope.decry.tname;
    $scope.decry.status = undefined;
    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );
    $window.location.href = "#viewtenant";
  };
  $scope.exportcsv = function (type) {
    var data = $scope.tenants;
    var months = [
      "JAN",
      "FAB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    var a = new Date();

    var aday = a.getDate() + "-" + months[a.getMonth()] + "-" + a.getFullYear();

    var json_pre = [],
      larr = data,
      tnm = "ALLTENANT-USERS-COUNT";

    let arrHeader = ["tenantname", "count"];
    for (var dat of larr) {
      var obj = {};

      obj.tenantname = dat.OID;
      obj.count = dat.UC;
      json_pre.push(obj);
    }
    let csvData = this.ConvertToCSV(json_pre, arrHeader, type);

    let blob = new Blob(["\ufeff" + csvData], {
      type: "text/csv;charset=utf-8;",
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser =
      navigator.userAgent.indexOf("Safari") != -1 &&
      navigator.userAgent.indexOf("Chrome") == -1;
    if (isSafariBrowser) {
      //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }

    dwldLink.setAttribute("href", url);

    dwldLink.setAttribute("download", tnm + "-" + aday + ".csv");

    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  };
  $scope.strRep = function (data) {
    if (typeof data == "string") {
      let newData = data.replace(/,/g, " ");
      return newData;
    } else if (typeof data == "undefined") {
      return "-";
    } else if (typeof data == "number") {
      return data.toString();
    } else {
      return data;
    }
  };
  $scope.ConvertToCSV = function (objArray, headerList, type) {
    let array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    let str = "";
    let row = "";

    let newHeaders = ["Tenant Name", "No Of Users"];

    for (let index in newHeaders) {
      row += newHeaders[index] + ",";
    }
    row = row.slice(0, -1);
    str += row + "\r\n";
    for (let i = 0; i < array.length; i++) {
      //let line = (i + 1) + '';
      let line = "";
      for (let index in headerList) {
        let head = headerList[index];

        line +=
          headerList[headerList.length - 1] == headerList[index]
            ? $scope.strRep(array[i][head])
            : $scope.strRep(array[i][head]) + ",";
      }
      str += line + "\r\n";
    }
    return str;
  };
};

app.controller("managetenantsCtrl", managetenantsCtrl);
managetenantsCtrl.$inject = [
  "$scope",
  "$http",
  "$uibModal",
  "$location",
  "$window",
  "NgTableParams",
  "tenantslist",
  "config",
  "$crypto",
];

app.factory("gettenants", function ($window, $q, config, $crypto) {
  return {
    gettenants: function () {
      var tenants, decry;
      if (localStorage.getItem("786a2y1e") != null) {
        decry = JSON.parse(
          $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
        );
      } else {
        localStorage.clear();
        $window.location.href = "#login";
      }
      AWSCognito.config.region = config.reg;
      AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: decry.iid,
      });

      var poolData = { UserPoolId: decry.uid, ClientId: decry.cid };

      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(
        poolData
      );

      var cognitoUser = userPool.getCurrentUser();

      if (cognitoUser != null && decry.email != null) {
        tenants = getusersession();
      } else {
        localStorage.clear();
        $window.location.href = "#login";
      }
      function getdata(token) {
        var apigClient = apigClientFactory.newClient({ invokeUrl: decry.api });
        var params = {};

        var body = { oid: config.oid };
       
        var additionalParams = {
          headers: { Authorization: token },
        };
        var data = apigClient
          .getTenantsPost(params, body, additionalParams)
          .then(function (result) {
            var json = JSON.stringify(result.data);
            var tenant = json.toString();

            if (
              decry.tenants !== undefined &&
              decry.tenants.length > 0 &&
              decry.role != "Admin"
            ) {
              var tenanttmp = [];
              tenant = JSON.parse(tenant);
              for (var l = 0; l < decry.tenants.length; l++) {
                for (var m = 0; m < tenant.tenants.length; m++) {
                  if (
                    tenant.tenants[m].OID.toLowerCase() ==
                    decry.tenants[l].ttitle.toLowerCase()
                  ) {
                    tenanttmp.push(tenant.tenants[m]);
                  }
                }
                if (decry.tenants.length - 1 == l) {
                  var obj = {};
                  obj.tenants = tenanttmp;
                  return $q.when(JSON.stringify(obj));
                }
              }
            } else {
              return $q.when(json);
            }
          })
          .catch(function (result) {
            var json = JSON.stringify(result);
            var json1 = json.toString();
            localStorage.setItem("activemenu", "dashboard");
            $window.location.href = "#dashboard";
          });
        return $q.when(data);
      }

      function getusersession() {
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
              var token = session.idToken.jwtToken;
              var abcc = getdata(token);
              resolve(abcc);
              return $q.when(abcc);
            }
          });
        });
      }

      return $q.when(tenants);
    },
  };
});
