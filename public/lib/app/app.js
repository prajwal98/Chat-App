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
        url: "/dashboard",
        template: "dashboard.html",
        controller: "dashboardCtrl",
        resolve: {
          usercount: function (getusercount) {
            return getusercount.getusercount();
          },
        },
      },
      {
        url: "/login",
        template: "login.html",
        controller: "loginCtrl",
      },
      {
        url: "/org",
        template: "org.html",
        controller: "orgCtrl",
      },
      {
        url: "/analytics",
        template: "analytics.html",
        controller: "analyticsCtrl",
      },
      {
        url: "/groupengagement",
        template: "groupengagement.html",
        controller: "groupengagementCtrl",
        resolve: {
          groupslist: function (getgroups) {
            return getgroups.getgroups();
          },
        },
      },
      {
        url: "/engage",
        template: "engageusers.html",
        controller: "engageusersCtrl",
        resolve: {
          tenantslist: function (gettenants) {
            return gettenants.gettenants();
          },
        },
      },
      {
        url: "/tenants",
        template: "managetenants.html",
        controller: "managetenantsCtrl",
        resolve: {
          tenantslist: function (gettenants) {
            return gettenants.gettenants();
          },
        },
      },
      {
        url: "/viewtenant",
        template: "viewtenant.html",
        controller: "viewtenantCtrl",
        resolve: {
          tenantdata: function (gettenantdata) {
            return gettenantdata.gettenantdata();
          },
        },
      },
      {
        url: "/userreport",
        template: "userreport.html",
        controller: "userreportCtrl",
        resolve: {
          usercount: function (getuserreport) {
            return getuserreport.getuserreport();
          },
        },
      },
      {
        url: "/contentreport",
        template: "contentreport.html",
        controller: "contentreportCtrl",
        resolve: {
          topicjson: function (contentreport) {
            return contentreport.contentreport();
          },
        },
      },
      {
        url: "/groupreport",
        template: "groupreport.html",
        controller: "groupreportCtrl",
        resolve: {
          usercount: function (getgroupreport) {
            return getgroupreport.getgroupreport();
          },
        },
      },
      {
        url: "/userengagement",
        template: "userengagement.html",
        controller: "userengagementCtrl",
        resolve: {
          userslist: function (getusers) {
            return getusers.getusers();
          },
        },
      },
      {
        url: "/generatekeys",
        template: "generatekeys.html",
        controller: "generatekeysCtrl",
      },
      {
        url: "/settings",
        template: "settings.html",
        controller: "settingsCtrl",
      },
      {
        url: "/manageusers",
        template: "manageusers.html",
        controller: "manageusersCtrl",
        resolve: {
          userslist: function (getusers) {
            return getusers.getusers();
          },
        },
      },
      {
        url: "/categories",
        template: "categories.html",
        controller: "categoriesCtrl",
        resolve: {
          categories: function (getcategories) {
            return getcategories.getcategories();
          },
        },
      },
      {
        url: "/objects",
        template: "viewfreeobjects.html",
        controller: "viewfreeobjectsCtrl",
        resolve: {
          objectjson: function (listobjects) {
            return listobjects.listobjects();
          },
        },
      },
      {
        url: "/addobjects",
        template: "addfreeobjects.html",
        controller: "addfreeobjectsCtrl",
      },
      {
        url: "/managegroups",
        template: "managegroups.html",
        controller: "managegroupsCtrl",
        resolve: {
          groupslist: function (getgroups) {
            return getgroups.getgroups();
          },
        },
      },
      {
        url: "/groupreport",
        template: "groupreport.html",
        controller: "groupreportCtrl",
        resolve: {
          groupslist: function (getgroups) {
            return getgroups.getgroups();
          },
        },
      },
      {
        url: "/managecontent",
        template: "managecontent.html",
        controller: "managecontentCtrl",
        resolve: {
          newTopics: function (getNewTopics) {
            return getNewTopics.getNewTopics();
          },
        },
      },
      {
        url: "/groupusers",
        template: "groupusers.html",
        controller: "groupusersCtrl",
        resolve: {
          groupusers: function (getgroupusers) {
            return getgroupusers.getgroupusers();
          },
        },
      },
      {
        url: "/viewgroupreport",
        template: "viewgroupreport.html",
        controller: "viewgroupreportCtrl",
        resolve: {
          usercount: function (getgroupreport) {
            return getgroupreport.getgroupreport();
          },
        },
      },
      {
        url: "/listtopics",
        template: "listtopics.html",
        controller: "listtopicsCtrl",
        resolve: {
          topicjson: function (listtopics) {
            return listtopics.listtopics();
          },
        },
      },
      {
        url: "/assigngroups",
        template: "assigngroups.html",
        controller: "assigngroupsCtrl",
        resolve: {
          groupslist: function (getgroups) {
            return getgroups.getgroups();
          },
        },
      },
      {
        url: "/assigntousers",
        template: "assigntousers.html",
        controller: "assigntousersCtrl",
        resolve: {
          userslist: function (getusers) {
            return getusers.getusers();
          },
        },
      },
      {
        url: "/addtopic",
        template: "addtopic.html",
        controller: "addtopicCtrl",
        resolve: {
          topicjson: function (listtopics) {
            return listtopics.listtopics();
          },
        },
      },
      {
        url: "/wetemplate",
        template: "wetemplate.html",
        controller: "wetemplateCtrl",
        resolve: {
          template: function (gettemplate) {
            return gettemplate.gettemplate();
          },
        },
      },

      {
        url: "/batchcoursereports",
        template: "batchcoursereports.html",
        controller: "batchcoursereportsCtrl",
        resolve: {
          batchreports: function (getbatchcoursereports) {
            return getbatchcoursereports.getbatchcoursereports();
          },
        },
      },
      {
        url: "/addcourse",
        template: "addcourse.html",
        controller: "addcourseCtrl",
      },
      {
        url: "/viewevents",
        template: "viewevents.html",
        controller: "vieweventsCtrl",
        resolve: {
          groupslist: function (getgroups) {
            return getgroups.getgroups();
          },
        },
      },
      {
        url: "/ausertopics",
        template: "ausertopics.html",
        controller: "ausertopicsCtrl",
        resolve: {
          usertopics: function (getusertopics) {
            return getusertopics.getusertopics();
          },
        },
      },
      {
        url: "/viewtopic",
        template: "viewtopic.html",
        controller: "viewtopicCtrl",
        resolve: {
          topicslist: function (gettopics) {
            return gettopics.gettopics();
          },
        },
      },
      {
        url: "/grouptopicassign",
        template: "grouptopicassign.html",
        controller: "grouptopicassignCtrl",
        resolve: {
          grouptopics: function (getgrouptopics) {
            return getgrouptopics.getgrouptopics();
          },
        },
      },
      {
        url: "/managetopic",
        template: "managetopic.html",
        controller: "managetopicCtrl",
        resolve: {
          topicjson: function (topicjson) {
            return topicjson.topicjson();
          },
        },
      },
      {
        url: "/viewreports",
        template: "viewreports.html",
        controller: "viewreportsCtrl",
        resolve: {
          tenantdata: function (gettenantdata) {
            return gettenantdata.gettenantdata();
          },
        },
      },
      {
        url: "/reports",
        template: "reports.html",
        controller: "reportsCtrl",
        resolve: {
          instructor: function (getinstructor) {
            return getinstructor.getinstructor();
          },
        },
      },
      {
        url: "/createcampaign",
        template: "createcampaign.html",
        controller: "createcampaignCtrl",
        resolve: {
          segment: function (getsegment) {
            return getsegment.getsegment();
          },
        },
      },
      {
        url: "/managebatches",
        template: "managebatches.html",
        controller: "managebatchesCtrl",
        resolve: {
          batches: function (getbatches) {
            return getbatches.getbatches();
          },
        },
      },
      {
        url: "/managebatch",
        template: "managebatch.html",
        controller: "managebatchCtrl",
        resolve: {
          batch: function (getbatch) {
            return getbatch.getbatch();
          },
        },
      },
      {
        url: "/managecourses",
        template: "managecourses.html",
        controller: "managecoursesCtrl",
        resolve: {
          courses: function (getcourses) {
            return getcourses.getcourses();
          },
        },
      },
      {
        url: "/viewcourse",
        template: "viewcourse.html",
        controller: "viewcourseCtrl",
        resolve: {
          course: function (getviewcourse) {
            return getviewcourse.getviewcourse();
          },
        },
      },
      {
        url: "/viewuserreports",
        template: "viewuserreports.html",
        controller: "viewuserreportsCtrl",
        resolve: {
          userreport: function (getuserreports) {
            return getuserreports.getuserreports();
          },
        },
      },
      {
        url: "/programpath",
        template: "programpath.html",
        controller: "programpathCtrl",
      },
      {
        url: "/userinfo",
        template: "userinfo.html",
        controller: "userinfoCtrl",
        resolve: {
          userinfo: function (getuserinfo) {
            return getuserinfo.getuserinfo();
          },
        },
      },
      {
        url: "/courseusers",
        template: "courseviewedusers.html",
        controller: "courseviewedusersCtrl",
        resolve: {
          ulist: function (viewusersdata) {
            return viewusersdata.viewusersdata();
          },
        },
      },
      {
        url: "/caseusers",
        template: "caseviewedusers.html",
        controller: "caseviewedusersCtrl",
        resolve: {
          ulist: function (viewusersdata) {
            return viewusersdata.viewusersdata();
          },
        },
      },
      {
        url: "/viewtenantreport",
        template: "viewtenantreport.html",
        controller: "viewtenantreportCtrl",
        resolve: {
          ulists: function (viewuserdata) {
            return viewuserdata.viewuserdata();
          },
        },
      },
      {
        url: "/grouptopicassign",
        template: "grouptopicassign.html",
        controller: "grouptopicassignCtrl",
        resolve: {
          grouptopics: function (getgrouptopics) {
            return getgrouptopics.getgrouptopics();
          },
        },
      },
      {
        url: "/levelsetting",
        template: "userrole.html",
        controller: "userroleCtrl",
        resolve: {
          topicjson: function (listurole) {
            return listurole.listurole();
          },
        },
      },
      {
        url: "/assigncase",
        template: "assigncase.html",
        controller: "assigncaseCtrl",
        resolve: {
          catjson: function (assigncase) {
            return assigncase.assigncase();
          },
          tenantdata: function (gettenantdata) {
            return gettenantdata.gettenantdata();
          },
        },
      },
      {
        url: "/review",
        template: "gpcaselist.html",
        controller: "reviewCtrl",
        resolve: {
          topicjson: function (listtopics) {
            return listtopics.listtopics();
          },
        },
      },
      {
        url: "/notification",
        template: "notification.html",
        controller: "assigncaseCtrl",
        resolve: {
          topicjson: function (listtopics) {
            return listtopics.listtopics();
          },
        },
      },
      {
        url: "/ob",
        template: "ob.html",
        controller: "obCtrl",
        resolve: {
          topicjson: function (listtopics) {
            return listtopics.listtopics();
          },
        },
      },
      {
        url: "/casesummary",
        template: "casesummary.html",
        controller: "obCtrl",
        resolve: {
          topicjson: function (listtopics) {
            return listtopics.listtopics();
          },
        },
      },
      {
        url: "/viewcase",
        template: "assigncasedetail.html",
        controller: "assigncasedetailCtrl",
        resolve: {
          topic: function (getTopic) {
            return getTopic.getTopic();
          },
        },
      },
      {
        url: "/grouplist",
        template: "grouplist.html",
        controller: "reviewCtrl",
        resolve: {
          topicjson: function (listtopics) {
            return listtopics.listtopics();
          },
        },
      },
      {
        url: "/discussionforum",
        template: "discussionforum.html",
        controller: "discussionforumCtrl",
        resolve: {
          topicjson: function (listtopics) {
            return listtopics.listtopics();
          },
        },
      },
      {
        url: "/individuallyassigncase",
        template: "individuallyassigncase.html",
        controller: "assigncaseCtrl",
        resolve: {
          topicjson: function (listtopics) {
            return listtopics.listtopics();
          },
        },
      },
      {
        url: "/livetime",
        template: "livetime.html",
        controller: "livetimeCtrl",
        resolve: {
          topicjson: function (listtopics) {
            return listtopics.listtopics();
          },
        },
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
