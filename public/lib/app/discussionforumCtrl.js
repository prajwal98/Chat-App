"use strict";
var discussionforumCtrl = function (
  $scope,
  $http,
  $location,
  $window,
  topicjson,
  $uibModal,
  NgTableParams,
  config,
  $crypto
) {
  $scope.allcourses = true;
  $scope.discussionforum = function () {
    $scope.imgurl = config.url;
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
          $scope.orgid = $scope.decry.oid;
          $scope.orgidlow = $scope.orgid.toLowerCase();

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
        }
      });
    } else {
      localStorage.clear();
      $window.location.href = "#login";
    }
    $scope.decry["activemenu"] = "discussionforum";
    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );
    //localStorage.setItem("activemenu", 'contrep');
    window.navigating = false;
  };

  $scope.discussionforum();
};

app.controller("discussionforumCtrl", discussionforumCtrl);
discussionforumCtrl.$inject = [
  "$scope",
  "$http",
  "$location",
  "$window",
  "topicjson",
  "$uibModal",
  "NgTableParams",
  "config",
  "$crypto",
];
