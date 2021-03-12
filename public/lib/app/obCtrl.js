"use strict";
var obCtrl = function (
  $scope,
  $http,
  $location,
  $window,
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
  ];
  $scope.allcourses = true;
  $scope.ob = function () {
    $scope.imgurl = config.url;
    $scope.decry = JSON.parse(
      $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
    );
    console.log($scope.decry.acassign);
    $scope.orgid = $scope.decry.oid;
    $scope.orgidlow = $scope.orgid.toLowerCase();
    // $scope.catjson = JSON.parse(catjson);
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
    $scope.decry["activemenu"] = "ob";
    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );
    //localStorage.setItem("activemenu", 'contrep');
    window.navigating = false;
  };
  $scope.ob();
  $scope.goto = function (action) {
    if (action === "casesummary") {
      $scope.loading = true;
      $window.location.href = "#casesummary";
    } else if (action === "ob") {
      $scope.loading = true;
      $window.location.href = "#ob";
    } else if (action === "viewcase") {
      
      $scope.decry["otopicid"] = "pr2385";
      localStorage.setItem(
        "786a2y1e",
        $crypto.encrypt(JSON.stringify($scope.decry), config.key)
      );
      $scope.loading = true;
      $window.location.href = "#viewcase";
    }
  };
};
app.controller("obCtrl", obCtrl);
obCtrl.$inject = [
  "$scope",
  "$http",
  "$location",
  "$window",
  "$uibModal",
  "NgTableParams",
  "config",
  "$crypto",
];
// app.factory("assigncase", function ($window, $q, config, $crypto) {
//   return {
//     assigncase: function () {
//       var topicjson, decry;
//       if (localStorage.getItem("786a2y1e") != null) {
//         decry = JSON.parse(
//           $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
//         );
//       } else {
//         localStorage.clear();
//         $window.location.href = "#login";
//       }
//       AWSCognito.config.region = config.reg;
//       AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
//         IdentityPoolId: decry.iid,
//       });
//       var poolData = { UserPoolId: decry.uid, ClientId: decry.cid };
//       var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(
//         poolData
//       );
//       var cognitoUser = userPool.getCurrentUser();
//       if (cognitoUser != null && decry.email != null) {
//         topicjson = getusersession();
//       } else {
//         localStorage.clear();
//         $window.location.href = "#login";
//       }
//       function getdata(token) {
//         var apigClient = apigClientFactory.newClient({ invokeUrl: decry.api });
//         var params = {};
//         var body = {
//           oid: config.oid,
//           admin: true,
//           tenant: decry.tenants[0],
//         };
//         var additionalParams = {
//           headers: { Authorization: token },
//         };
//         var data = apigClient
//           .getCategoriesPost(params, body, additionalParams)
//           .then(function (result) {
//             var response = JSON.stringify(result.data);
//             response = response.toString();
//             return $q.when(response);
//           })
//           .catch(function (result) {
//             var json = JSON.stringify(result);
//             var json1 = json.toString();
//             return $q.when("hello");
//           });
//         return $q.when(data);
//       }
//       function getusersession() {
//         return new Promise((resolve, reject) => {
//           cognitoUser.getSession((err, session) => {
//             if (err) {
//               swal({
//                 title: "Oops!",
//                 text: "Session has timed out, Please login again.",
//                 type: "error",
//                 buttonsStyling: false,
//                 allowOutsideClick: false,
//                 allowEscapeKey: false,
//                 width: "400px",
//                 showConfirmButton: true,
//                 confirmButtonText: "OK",
//                 customClass: "sweetalert-confirmOk",
//                 confirmButtonClass: "button1",
//               });
//               localStorage.clear();
//               $window.location.href = "#login";
//             } else {
//               var token = session.idToken.jwtToken;
//               var abcc = getdata(token);
//               resolve(abcc);
//               return $q.when(abcc);
//             }
//           });
//         });
//       }
//       return $q.when(topicjson);
//     },
//   };
// });