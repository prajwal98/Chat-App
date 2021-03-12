"use strict";
var assigncaseCtrl = function (
  $scope,
  $http,
  $location,
  $window,
  catjson,
  $uibModal,
  NgTableParams,
  config,
  $crypto
) {
  $scope.allcourses = true;

  $scope.assigncase = function () {
    $scope.imgurl = config.url;
    $scope.decry = JSON.parse(
      $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
    );

    $scope.orgid = $scope.decry.oid;
    $scope.orgidlow = $scope.orgid.toLowerCase();

    $scope.catjson = JSON.parse(catjson);
    if ($window.innerWidth > 1024) {
      $scope.secondwidth = +$window.innerWidth - +224;
    } else {
      $scope.secondwidth = +$window.innerWidth - +65;
    }
    $scope.second = { width: $scope.secondwidth };
    $(window).resize(function () {
      $scope.$apply(function () {
        $scope.windowWidth = $(window).width();
        if ($scope.windowWidth < 1023) {
          $scope.secondwidth = +$window.innerWidth - +65;
          $scope.second = { width: $scope.secondwidth };
          $scope.sscreen = true;
          $scope.lscreen = false;
        }
        if ($scope.windowWidth > 1024) {
          $scope.secondwidth = +$window.innerWidth - +239;
          $scope.second = { width: $scope.secondwidth };
          $scope.sscreen = false;
          $scope.lscreen = true;
        }
      });
    });

    $scope.decry["activemenu"] = "cassign";
    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );
    //localStorage.setItem("activemenu", 'contrep');
    window.navigating = false;
  };
  $scope.subjectchange = function () {
    var row = JSON.parse($scope.item);

    $scope.yearjson = row.chapters;
    return row.name;
  };

  $scope.yearchange = function () {
    var row = JSON.parse($scope.yitem);

    $scope.subjects = {};
    $scope.semjson = row.sem;
    $scope.classjson = row.class;
    return row.year;
  };

  $scope.checkSemJson = function () {
    // alert($scope.semester);
    var row = JSON.parse($scope.semester);

    return row.ttitle;
  };

  $scope.onClassChange = function () {
    var row = JSON.parse($scope.class);
    return row.ttitle;
  };

  $scope.assigncase();

  $scope.next = function () {
    var cassign = {
      subject: $scope.subjectchange(),
      year: $scope.yearchange(),
      semester: $scope.checkSemJson(),
      class: $scope.onClassChange(),
    };
    $scope.decry["acassign"] = cassign;
    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );

    $scope.loading = true;
    $window.location.href = "#ob";
  };

  $scope.goto = function (action) {
    if (action === "casesummary") {
      $scope.loading = true;
      $window.location.href = "#casesummary";
    } else if (action === "ob") {
      $scope.loading = true;
      $window.location.href = "#ob";
    }
  };
};

app.controller("assigncaseCtrl", assigncaseCtrl);
assigncaseCtrl.$inject = [
  "$scope",
  "$http",
  "$location",
  "$window",
  "catjson",
  "$uibModal",
  "NgTableParams",
  "config",
  "$crypto",
];

app.factory("assigncase", function ($window, $q, config, $crypto) {
  return {
    assigncase: function () {
      var topicjson, decry;
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
        topicjson = getusersession();
      } else {
        localStorage.clear();
        $window.location.href = "#login";
      }

      function getdata(token) {
        var apigClient = apigClientFactory.newClient({ invokeUrl: decry.api });

        var params = {};

        var body = {
          oid: config.oid,
          admin: true,
          tenant: decry.tenants[0],
        };

        var additionalParams = {
          headers: { Authorization: token },
        };

        var data = apigClient
          .getCategoriesPost(params, body, additionalParams)
          .then(function (result) {
            var response = JSON.stringify(result.data);

            response = response.toString();
            return $q.when(response);
          })
          .catch(function (result) {
            var json = JSON.stringify(result);
            var json1 = json.toString();
            return $q.when("hello");
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

      return $q.when(topicjson);
    },
  };
});
