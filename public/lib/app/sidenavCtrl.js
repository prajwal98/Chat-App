var sidenavCtrl = function (
  $scope,
  $http,
  $location,
  $window,
  $cookies,
  config,
  $crypto
) {
  $scope.sideNavDrop = true;

  $scope.dropdown = function () {
    $scope.sideNavDrop = !$scope.sideNavDrop;
  };
  $scope.header = { name: "sidenav.html", url: "sidenav.html" };

  $scope.mlistclick = function () {
    $scope.mclist == false && $window.innerWidth > 1023
      ? ($scope.mclist = true)
      : ($scope.mclist = false);
  };
  $scope.dashlistclick = function () {
    $scope.uglist == false && $window.innerWidth > 1023
      ? ($scope.uglist = true)
      : ($scope.uglist = false);
  };
  $scope.assignfunclick = function () {
    $scope.aclist == false && $window.innerWidth > 1023
      ? ($scope.aclist = true)
      : ($scope.aclist = false);
  };
  $scope.elistclick = function () {
    $scope.elist == false && $window.innerWidth > 1023
      ? ($scope.elist = true)
      : ($scope.elist = false);
  };
  $scope.alylistclick = function () {
    $scope.alylist == false && $window.innerWidth > 1023
      ? ($scope.alylist = true)
      : ($scope.alylist = false);
  };
  $scope.sidenav = function () {
    $scope.uglist = false;
    $scope.mclist = false;
    $scope.aclist = false;
    $scope.elist = false;
    $scope.alylist = false;
    localStorage.getItem("786a2y1e") != null
      ? ($scope.decry = JSON.parse(
          $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
        ))
      : ($window.location.href = "#login");

    $scope.activemenu = $scope.decry.activemenu;
    if ($window.innerWidth > 1024) {
      $scope.sscreen = false;
      $scope.lscreen = true;

      if ($scope.activemenu == "users" || $scope.activemenu == "groups") {
        $scope.uglist = true;
        $scope.optiondeg = { transform: "rotate(90deg)" };
      } else if (
        $scope.activemenu == "contrep" ||
        $scope.activemenu == "prgpath" ||
        $scope.activemenu == "catsrep" ||
        $scope.activemenu == "contentrep" ||
        $scope.activemenu == "objrep"
      ) {
        $scope.mclist = true;
        $scope.optiondeg = { transform: "rotate(90deg)" };
      } else if (
        $scope.activemenu == "agroups" ||
        $scope.activemenu == "ausers"
      ) {
        $scope.aclist = true;
        $scope.optiondeg = { transform: "rotate(90deg)" };
      } else if (
        $scope.activemenu == "gengagement" ||
        $scope.activemenu == "uengagement"
      ) {
        $scope.elist = true;
        $scope.optiondeg = { transform: "rotate(90deg)" };
      } else if (
        $scope.activemenu == "ureport" ||
        $scope.activemenu == "creport" ||
        $scope.activemenu == "greport"
      ) {
        $scope.alylist = true;
        $scope.optiondeg = { transform: "rotate(90deg)" };
      }
    } else {
      $scope.sscreen = true;
      $scope.lscreen = false;
    }
    if ($scope.activemenu == "ireview" || $scope.activemenu == "greview") {
      $scope.sideNavDrop = false;
    }

    /*$scope.orgimg = "https://www.demoadmin.enhanzed.com/ORGZ-IMAGES/"+$scope.decry.oid+"/IMAGES/"+$scope.decry.oid+".png";
	$scope.orgimgs = "https://www.demoadmin.enhanzed.com/ORGZ-IMAGES/"+$scope.decry.oid+"/IMAGES/"+$scope.decry.oid+"S.png";*/
    $scope.orgimg =
      "https://www.admin.enhanzed.com/ORGZ-IMAGES/" +
      $scope.decry.oid +
      "/IMAGES/" +
      $scope.decry.oid +
      ".png";
    $scope.orgimgs =
      "https://www.admin.enhanzed.com/ORGZ-IMAGES/" +
      $scope.decry.oid +
      "/IMAGES/" +
      $scope.decry.oid +
      "S.png";

    //alert($window.outerHeight);
    $scope.secondwidth = +$window.innerHeight - +61;

    if (navigator.userAgent.indexOf("Chrome") != -1) {
      $scope.sidedropdow = { margin: "-70px 0px 0px 48px" };
    }

    $(window).resize(function () {
      $scope.$apply(function () {
        $scope.windowWidth = $(window).width();

        if ($scope.windowWidth < 1023) {
          $scope.sscreen = true;
          $scope.lscreen = false;
          $scope.uglist = false;
          $scope.mclist = false;
          $scope.aclist = false;
          $scope.elist = false;
          $scope.alylist = false;
        }
        if ($scope.windowWidth > 1024) {
          $scope.sscreen = false;
          $scope.lscreen = true;
          if ($scope.activemenu == "users" || $scope.activemenu == "groups") {
            $scope.uglist = true;
            $scope.optiondeg = { transform: "rotate(90deg)" };
          } else if (
            $scope.activemenu == "contrep" ||
            $scope.activemenu == "prgpath" ||
            $scope.activemenu == "catsrep" ||
            $scope.activemenu == "contentrep" ||
            $scope.activemenu == "objrep"
          ) {
            $scope.mclist = true;
            $scope.optiondeg = { transform: "rotate(90deg)" };
          } else if (
            $scope.activemenu == "agroups" ||
            $scope.activemenu == "ausers"
          ) {
            $scope.aclist = true;
            $scope.optiondeg = { transform: "rotate(90deg)" };
          } else if (
            $scope.activemenu == "gengagement" ||
            $scope.activemenu == "uengagement" ||
            $scope.activemenu == "contsub" ||
            $scope.activemenu == "contstory" ||
            $scope.activemenu == "contquiz"
          ) {
            $scope.elist = true;
            $scope.optiondeg = { transform: "rotate(90deg)" };
          } else if (
            $scope.activemenu == "ureport" ||
            $scope.activemenu == "creport" ||
            $scope.activemenu == "greport"
          ) {
            $scope.alylist = true;
            $scope.optiondeg = { transform: "rotate(90deg)" };
          }
        }
        $scope.secondwidth = +$window.innerHeight - +61;
        $scope.second = { height: $scope.secondwidth + "px" };
      });
    });

    if ($scope.decry.role == "Instructors") {
      $scope.disable = "0";
    } else if ($scope.decry.role == "ContentCreators") {
      $scope.disable = "1";
    } else {
      $scope.disable = "2";
    }
  };
  $scope.sidenav();

  $scope.goto = function (action) {
    delete $scope.decry.rtype;
    delete $scope.decry.tenant;
    if ($scope.online == true) {
      window.navigating = true;
      if (action == "dash") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "dashboard";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#dashboard";
      } else if (action == "tenants") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "tenants";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#tenants";
      } else if (action == "engage") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "engage";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#engage";
      } else if (action == "musers") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "users";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#manageusers";
      } else if (action == "mgroups") {
        $scope.loading = true;

        $scope.decry["activemenu"] = "groups";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#managegroups";
      } else if (action == "ctopics") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "contrep";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );

        $window.location.href = "#listtopics";
      } else if (action == "cats") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "catsrep";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );

        $window.location.href = "#categories";
      } else if (action == "contents") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "contentrep";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );

        $window.location.href = "#managecontent";
      } else if (action == "cobjects") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "objrep";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );

        $window.location.href = "#objects";
      } else if (action == "ccourses") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "prgpath";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#programpath";
      } else if (action == "crep") {
      } else if (action == "pub0") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "agroups";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#assigngroups";
      } else if (action == "pub1") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "ausers";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#assigntousers";
      } else if (action == "aly0") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "ureport";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#managecontent";
      } else if (action == "aly1") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "creport";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#listtopics";
      } else if (action == "aly2") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "greport";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#objects";
      } else if (action == "eng0") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "gengagement";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#groupengagement";
      } else if (action == "eng1") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "uengagement";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#userengagement";
      } else if (action == "con0") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "contsub";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#managetopics";
      } else if (action == "con1") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "contstory";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#listtopics";
      } else if (action == "con2") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "contquiz";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#viewobjects";
      } else if (action == "akeys") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "accesskeys";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#generatekeys";
      } else if (action == "set") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "settings";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#settings";
      } else if (action == "events") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "events";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#viewevents";
      } else if (action == "reports") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "reports";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#viewreports";
      } else if (action == "urole") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "urole";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#levelsetting";
      } else if (action == "cassign") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "cassign";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#assigncase";
      } else if (action == "greview") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "greview";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#review";
        $scope.sideNavDrop = flase;
      } else if (action == "ireview") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "ireview";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#review";
        $scope.sideNavDrop = flase;
      } else if (action == "discussionforum") {
        $scope.loading = true;
        $scope.decry["activemenu"] = "discussionforum";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#discussionforum";
      } else if (action == "livetime") {
        $scope.loading = true;

        $window.location.href = "#livetime";
      }
    }
  };

  $scope.signout = function () {
    localStorage.getItem("786a2y1e") != null
      ? ($scope.decry = JSON.parse(
          $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
        ))
      : ($window.location.href = "#login");
    $scope.loading = true;
    if ($scope.decry.email != null) {
      var cookies = $cookies.getAll();
      angular.forEach(cookies, function (v, k) {
        $cookies.remove(k);
      });

      var poolData = {
        UserPoolId: $scope.decry.uid,
        ClientId: $scope.decry.cid,
      };
      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(
        poolData
      );
      var cognitoUser = userPool.getCurrentUser();

      if (cognitoUser != null) {
        cognitoUser.getSession(function (err, session) {
          if (err) {
            return;
          }
        });
      }

      cognitoUser.globalSignOut({
        onSuccess: function (result) {
          localStorage.clear();
          $window.location.href = "#login";
        },
        onFailure: function (err) {
          localStorage.clear();
          $window.location.href = "#login";
        },
      });
    } else {
      localStorage.clear();
      $window.location.href = "#login";
    }
  };
};
app.controller("sidenavCtrl", sidenavCtrl);
sidenavCtrl.$inject = [
  "$scope",
  "$http",
  "$location",
  "$window",
  "$cookies",
  "config",
  "$crypto",
];
