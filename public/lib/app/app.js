var app = angular.module("webview", [
  "ngRoute",
  "ngSanitize",
  "ui.bootstrap",
  "ngMessages",
  "ngMaterial",
  "angular-jwt",
  "nvd3",
  "ngCookies",
  "ngTable",
  "ngAnimate",
  "ngFileUpload",
  "ngFileSaver",
  "angularjs-dropdown-multiselect",
  "ngTableToCsv",
  "ngQuill",
  "mdo-angular-cryptography",
  "ngTagsInput",
  "ui.calendar",
]);
app.constant("config", {
  reg: "us-east-1",
  url: "https://d1mfzlflccym6i.cloudfront.net/",
  key: "akjcguayb976qsdn1q92y83ehqd23dsa",
  iurl:
    "https://qvymg02fy7.execute-api.us-east-1.amazonaws.com/CB-PRODAUTH1296",
  iid: "us-east-1:71ec0e53-a9fe-44a7-ab65-23027a0408ad",
  cid: "2pelocmsrs9rbeblevjla4c473",
  uid: "us-east-1_gQYyDz2sa",
  appcolor: "#636363",
  htype: 1,
  oid: "CASEBOX",
});
// Routing has been added to keep flexibility in mind. This will be used in future.
angular.module("webview").config([
  "$routeProvider",
  "$cookiesProvider",
  function ($routeProvider, $cookiesProvider) {
    $cookiesProvider.defaults.path = "/";
    var routes = [
      
      {
        url: "/login",
        template: "login.html",
        controller: "loginCtrl",
      },
      {
        url: "/livetime",
        template: "livetime.html",
        controller: "livetimeCtrl",
      },
      {
        url: "/chat",
        template: "chat.html",
        controller: "chatCtrl",
        resolve: {
          topicjson: function (listtopics) {
            return listtopics.listtopics();
          },
        },
      },
    ];

    routes.forEach(function (r, index) {
      $routeProvider.when(r.url, {
        templateUrl: r.template,
        controller: r.controller,
        resolve: r.resolve,
      });
    });

    $routeProvider.otherwise({ redirectTo: "/login" });
  },
]);

app.run(function ($window, $rootScope, config) {
  $rootScope.online = navigator.onLine;
  $rootScope.version = config.version;
  $rootScope.cright = config.cright;
  $rootScope.build = config.build;

  $window.addEventListener(
    "offline",
    function () {
      $rootScope.$apply(function () {
        $rootScope.online = false;
      });
    },
    false
  );

  $window.addEventListener(
    "online",
    function () {
      $rootScope.$apply(function () {
        $rootScope.online = true;
      });
    },
    false
  );
});

app.service("uservalues", function () {
  var values = {};

  var addvalues = function (key, value) {
    values[key] = value;
  };

  var getvalues = function () {
    return values;
  };

  return {
    addvalues: addvalues,
    getvalues: getvalues,
  };
});
