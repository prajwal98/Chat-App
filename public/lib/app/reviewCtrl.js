"use strict";
var reviewCtrl = function (
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
  $scope.caselists = [
    {
      img:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.webservices.ft.com%2Fv1%2Fimages%2Fraw%2Fhttp%3A%2F%2Fig.ft.com%2Fstatic%2Fsites%2Fbusiness-book-of-the-year%2Fcovers%2FCover_Move_Fast_and_Break_Things.jpg%3Fsource%3Dft_ig_business_book_award%26width%3D400%26compression%3Dbest&f=1&nofb=1",
      cid: "UCID:CB1234",
      case: "Motivation",
      Author: "Varun",
      stars: "&#9734;&#9734;&#9734;&#9734;&#9734;",
    },
    {
      img:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.creativindie.com%2Fwp-content%2Fuploads%2F2014%2F06%2FSnow-White-Must-Die-book-cover-Jan-12-p122.jpg&f=1&nofb=1",
      cid: "UCID:CB1234",
      case: "Team work",
      Author: "Varun",
      stars: "&#9734;&#9734;&#9734;&#9734;&#9734;",
    },
    {
      img:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F3.bp.blogspot.com%2F-vpM2K_Dtt5k%2FUYk0uk9jMGI%2FAAAAAAAAB7E%2FZHWz8VkFeSo%2Fs1600%2FHorrorCover017.jpg&f=1&nofb=1",
      cid: "UCID:CB1234",
      case: "Motivation",
      Author: "Varun",
      stars: "&#9734;&#9734;&#9734;&#9734;&#9734;",
    },

    {
      img:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthebookcoverdesigner.com%2Fwp-content%2Fuploads%2F2018%2F06%2FFANTASY-COVER-.jpg&f=1&nofb=1",
      cid: "UCID:CB1234",
      case: "Motivation",
      Author: "Varun",
      stars: "&#9734;&#9734;&#9734;&#9734;&#9734;",
    },
    {
      img:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthebookcoverdesigner.com%2Fwp-content%2Fuploads%2F2018%2F06%2FFANTASY-COVER-.jpg&f=1&nofb=1",
      cid: "UCID:CB1234",
      case: "Motivation",
      Author: "Varun",
      stars: "&#9734;&#9734;&#9734;&#9734;&#9734;",
    },
    {
      img:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthebookcoverdesigner.com%2Fwp-content%2Fuploads%2F2018%2F06%2FFANTASY-COVER-.jpg&f=1&nofb=1",
      cid: "UCID:CB1234",
      case: "Motivation",
      Author: "Varun",
      stars: "&#9734;&#9734;&#9734;&#9734;&#9734;",
    },
  ];
  $scope.allcourses = true;
  $scope.review = function () {
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
    //$scope.decry["activemenu"] = "review";
    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );
    //localStorage.setItem("activemenu", 'contrep');
    window.navigating = false;
  };

  $scope.review();

  $scope.goto = function (action) {
    if (action === "grouplist") {
      $scope.loading = true;
      $window.location.href = "#grouplist";
    } else if (action == "review") {
      $scope.loading = true;
      $scope.decry["activemenu"] = "review";
      localStorage.setItem(
        "786a2y1e",
        $crypto.encrypt(JSON.stringify($scope.decry), config.key)
      );
      $window.location.href = "#review";
      $scope.sideNavDrop = flase;
    }
  };
};

app.controller("reviewCtrl", reviewCtrl);
reviewCtrl.$inject = [
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
