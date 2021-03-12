"use strict";
var viewreportsCtrl = function (
  $scope,
  $http,
  $location,
  $window,
  tenantdata,
  $uibModal,
  NgTableParams,
  config,
  $crypto
) {
  $scope.tenant = function () {
    if (localStorage.getItem("786a2y1e") != null) {
      $scope.decry = JSON.parse(
        $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
      );
    } else {
      localStorage.clear();
      $window.location.href = "#login";
    }
    $scope.selectedTenant = "ALLTENANT";
    $scope.tenants = ["ALLTENANT"];
    if ($scope.decry["tenant"] !== undefined) {
      $scope.selectedTenant = $scope.decry["tenant"];
      $scope.tenants = [$scope.decry["tenant"]];
    }
    if ($scope.decry.role == "Admin") {
      $scope.selectedTenant = "ALLTENANT";
      $scope.tenants = ["ALLTENANT"];
    } else {
      $scope.selectedTenant = $scope.decry.tenants[0].ttitle;
      $scope.tenants = $scope.decry.tenants[0].ttitle;
    }

    $scope.imgurl = config.url;

    if ($scope.decry.status === "Content") {
      $scope.showcontentbased = true;
      $scope.showusersbased = false;
      $scope.coursesreport = true;
      $scope.objectsreport = false;
    } else {
      $scope.showcontentbased = true;
      $scope.coursesreport = true;
      $scope.objectsreport = false;
      $scope.showusersbased = false;
    }
    if ($scope.decry.rtype !== undefined && $scope.decry.rtype == "CB") {
      $scope.showcontentbased = true;
      $scope.showusersbased = false;

      if ($scope.decry.cbtype !== undefined && $scope.decry.cbtype == 0) {
        $scope.coursesreport = true;
        $scope.objectsreport = false;
      } else if (
        $scope.decry.cbtype !== undefined &&
        $scope.decry.cbtype == 1
      ) {
        $scope.coursesreport = false;
        $scope.objectsreport = true;
      }
    }
    if ($scope.decry.rtype !== undefined && $scope.decry.rtype == "UB") {
      $scope.showcontentbased = false;
      $scope.showusersbased = true;
      $scope.coursesreport = true;
      $scope.objectsreport = false;
    }
    $scope.getTenantCourseData($scope.selectedTenant);
    $scope.getTenantContentData($scope.selectedTenant);
    $scope.getTenants();
    $scope.getTenantUsers($scope.selectedTenant);
    $scope.maxDate = new Date();
    $scope.notificationlink = false;
    $scope.regex =
      "^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}";
    $scope.objurl = { url: "", mtitle: "", mdesc: "" };
    $scope.decry["activemenu"] = "reports";
    $scope.analytics = JSON.parse(tenantdata);

    $scope.analytics.userlist = $scope.analytics.userlist.sort(function (x, y) {
      return y.LA - x.LA;
    });

    $scope.content = false;
    // $scope.newuserlist = $scope.analytics.userlist;
    // $scope.usertableParams = new NgTableParams({
    //     page: 1,            // show first page
    //     count: 10          // count per page
    // }, {
    //   dataset:   $scope.newuserlist
    // });

    if ($window.innerWidth > 1024) {
      $scope.sscreen = false;
      $scope.lscreen = true;
      $scope.secondwidth = +$window.innerWidth - +224;
    } else {
      $scope.sscreen = true;
      $scope.lscreen = false;
      $scope.secondwidth = +$window.innerWidth - +65;
    }
    $scope.secondwidth1 = +$window.innerHeight - +61;
    $scope.second1 = { height: $scope.secondwidth1, width: "224px" };
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
          $scope.secondwidth = +$window.innerWidth - +224;
          $scope.second = { width: $scope.secondwidth };
          $scope.sscreen = false;
          $scope.lscreen = true;
        }
        $scope.secondwidth1 = +$window.innerHeight - +61;
        $scope.second1 = { height: $scope.secondwidth1, width: "224px" };
      });
    });
  };

  $scope.getTenants = function () {
    var apigClient = apigClientFactory.newClient({
      invokeUrl: $scope.decry.api,
    });
    var params = {};
    var body = {};
    var additionalParams = {};

    if ($scope.decry.role == "Admin") {
      apigClient
        .getTenantsPost(params, body, additionalParams)
        .then(function (result) {
          var json = JSON.stringify(result.data);
          json = json.toString();

          json = JSON.parse(json);
          $scope.tenants = json.tenants;
          if ($scope.selectedTenant == "ALLTENANT") {
            $scope.tenants.unshift($scope.selectedTenant);
          } else {
            $scope.tenants.push("ALLTENANT");
          }
          $scope.orgtenants = angular.copy($scope.tenants);
          $scope.tenantssearch = "";
          $scope.$watch(
            "tenantssearch",
            function () {
              $scope.tenants = $scope.orgtenants.filter(function (item) {
                return item
                  .toLowerCase()
                  .toString()
                  .includes($scope.tenantssearch.toLowerCase());
              });
              $scope.tenants.sort();
            },
            true
          );

          $scope.$apply();
        })
        .catch(function (result) {
          var json = JSON.stringify(result);
          var json1 = json.toString();
        });
    } else {
      $scope.tenants = [];

      for (var j = 0; j < $scope.decry.tenants.length; j++) {
        $scope.tenants.push($scope.decry.tenants[j].ttitle);
      }
      $scope.orgtenants = angular.copy($scope.tenants);

      $scope.tenantssearch = "";
      $scope.$watch(
        "tenantssearch",
        function () {
          $scope.tenants = $scope.orgtenants.filter(function (item) {
            return item
              .toLowerCase()
              .toString()
              .includes($scope.tenantssearch.toLowerCase());
          });
        },
        true
      );
      $scope.tenants.sort();
    }
  };
  $scope.getTenantUsers = function (tenant) {
    var apigClient = apigClientFactory.newClient({
      invokeUrl: $scope.decry.api,
    });
    var params = {};
    var body = {
      oid: tenant,
    };
    var additionalParams = {};
    $scope.showusersbasedload = true;

    apigClient
      .getAllTenantUsersPost(params, body, additionalParams)
      .then(function (result) {
        var json = JSON.stringify(result.data);

        json = json.toString();
        $scope.analytics = JSON.parse(json);

        $scope.analytics.userlist = $scope.analytics.userlist.sort(function (
          x,
          y
        ) {
          return y.LA - x.LA;
        });

        $scope.content = false;
        $scope.newuserlist = $scope.analytics.userlist;
        $scope.usertableParams = new NgTableParams(
          {
            page: 1, // show first page
            count: 10, // count per page
          },
          {
            dataset: $scope.newuserlist,
          }
        );
        $scope.showusersbasedload = false;
        $scope.$apply();
      })
      .catch(function (result) {
        $scope.loading = false;
        var json = JSON.stringify(result);
        var json1 = json.toString();
      });
  };
  $scope.viewuser = function (user) {
    $scope.loading = true;
    //localStorage.setItem("userinfoid", user.EID);
    $scope.decry["userinfoid"] = user.EID;
    $scope.decry["id"] = user.UID;
    $scope.decry["User"] = user.UNAME;
    $scope.decry["mail"] = user.EMAILID;
    $scope.decry["tname"] = user.OID;
    $scope.decry["reports"] = true;
    delete $scope.decry["GID"];
    delete $scope.decry["GNAME"];
    if (user.LA == undefined || user.LA == "") {
      $scope.decry["las"] = "-";
    } else {
      $scope.decry["las"] = user.LA;
    }
    $scope.decry["tenant"] = $scope.selectedTenant;
    $scope.decry["rtype"] = "UB";
    $scope.decry.status = undefined;
    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );
    $window.location.href = "#userinfo";
  };

  $scope.getCourses = function () {
    var apigClient = apigClientFactory.newClient();
    var params = {};
    var body = {
      orgid: $scope.decry.tenant,
      ttopic: "1",
    };
    var additionalParams = {};

    apigClient
      .listTopicsPost(params, body, additionalParams)
      .then(function (result) {
        var json = JSON.stringify(result.data);
        var coursedata = JSON.parse(json);

        $scope.topics = coursedata.topiclist;

        for (var l = 0; l < $scope.topics.length; l++) {
          var subcount = 0;
          var compcount = 0;
          if ($scope.topics[l].SUBS != undefined) {
            for (var k = 0; k < $scope.topics[l].SUBS.length; k++) {
              subcount = +subcount + +$scope.topics[l].SUBS[k].CT;
            }
            $scope.topics[l].SUBCOUNT = subcount;
          } else {
            $scope.topics[l].SUBCOUNT = 0;
          }
          if ($scope.topics[l].COMP != undefined) {
            for (var m = 0; m < $scope.topics[l].COMP.length; m++) {
              compcount = +compcount + +$scope.topics[l].COMP[m].CT;
            }
            $scope.topics[l].COMPCOUNT = compcount;
          } else {
            $scope.topics[l].COMPCOUNT = 0;
          }
          if ($scope.topics[l].STAR != undefined) {
            $scope.topics[l].STAR.avg = Math.round($scope.topics[l].STAR.avg);
          }
        }
        $scope.CourseReportParams = new NgTableParams(
          {
            page: 1, // show first page
            count: 10, // count per page
          },
          {
            dataset: $scope.topics,
          }
        );
        $scope.total = 0;

        for (var k in $scope.topics) {
          if ($scope.topics[k].PUB == 1 || $scope.topics[k].PUB == "1") {
            $scope.total++;
          }
        }
        $scope.$apply();
      })
      .catch(function (result) {
        var json = JSON.stringify(result);
        var json1 = json.toString();
      });
  };
  $scope.myFilter = function (item) {
    return item.TENANTS === undefined || item.TENANTS.length > 0;
  };
  $scope.getObjects = function () {
    var apigClient = apigClientFactory.newClient();
    var params = {};

    var body = {
      oid: $scope.decry.tenant,
    };

    var additionalParams = {};

    var data = apigClient
      .listObjectsPost(params, body, additionalParams)
      .then(function (result) {
        var json = JSON.stringify(result.data);
        $scope.objects = JSON.parse(json);
        $scope.activeObjects = 0;
        if ($scope.objects.length > 0) {
          for (var i = 0; i < $scope.objects.length; i++) {
            if ($scope.objects[i].PUB === 1) {
              +$scope.activeObjects++;
            }
            if ($scope.objects[i].SUBS != undefined) {
              if ($scope.objects[i].SUBS.length > 0) {
                for (var k = 0; k < $scope.objects[i].SUBS.length; k++) {
                  $scope.objects[i].CSUBS =
                    $scope.objects[i].CSUBS === undefined
                      ? parseInt($scope.objects[i].SUBS[k].CT)
                      : parseInt($scope.objects[i].CSUBS) +
                        parseInt($scope.objects[i].SUBS[k].CT);
                }
              } else {
                $scope.objects[i].CSUBS = 0;
              }
            } else {
              $scope.objects[i].CSUBS = 0;
            }
            if (
              $scope.objects[i].TV != undefined &&
              $scope.objects[i].TV.length > 0
            ) {
              for (var m = 0; m < $scope.objects[i].TV.length; m++) {
                $scope.objects[i].CTV =
                  $scope.objects[i].CTV === undefined
                    ? parseInt($scope.objects[i].TV[m].CT)
                    : parseInt($scope.objects[i].CTV) +
                      parseInt($scope.objects[i].TV[m].CT);
              }
            } else {
              $scope.objects[i].CTV = 0;
            }
            if ($scope.objects[i].SHRD != undefined) {
              $scope.objects[i].SHRD = parseInt($scope.objects[i].SHRD);
            } else {
              $scope.objects[i].SHRD = 0;
            }
            if ($scope.objects[i].STAR != undefined) {
              $scope.objects[i].STAR = Math.round($scope.objects[i].STAR);
            }
            if ($scope.objects[i].uviews != undefined) {
              if ($scope.objects[i].uviews.length > 0) {
                $scope.objects[i].views = 0;
                $scope.objects[i].unique = 0;
                $scope.objects[i].bounce = 0;
                $scope.objects[i].shared = 0;
                for (var j = 0; j < $scope.objects[i].uviews.length; j++) {
                  $scope.objects[i].views =
                    parseInt($scope.objects[i].views) +
                    parseInt($scope.objects[i].uviews[j].view);
                  $scope.objects[i].unique =
                    parseInt($scope.objects[i].unique) +
                    parseInt($scope.objects[i].uviews[j].unique);
                  $scope.objects[i].bounce =
                    parseInt($scope.objects[i].bounce) +
                    parseInt($scope.objects[i].uviews[j].bounce);
                  $scope.objects[i].shared =
                    parseInt($scope.objects[i].shared) +
                    parseInt($scope.objects[i].uviews[j].shared);
                }
              } else {
                $scope.objects[i].views = 0;
                $scope.objects[i].unique = 0;
                $scope.objects[i].bounce = 0;
                $scope.objects[i].shared = 0;
              }
            } else {
              $scope.objects[i].views = 0;
              $scope.objects[i].unique = 0;
              $scope.objects[i].bounce = 0;
              $scope.objects[i].shared = 0;
            }

            $scope.objects[i].views =
              parseInt($scope.objects[i].views) +
              parseInt($scope.objects[i].CTV);
          }
        }

        $scope.tableParams1 = new NgTableParams(
          {
            page: 1, // show first page
            count: 10, // count per page
          },
          {
            dataset: $scope.objects,
          }
        );

        $scope.$apply();
      })
      .catch(function (result) {
        var json = JSON.stringify(result);
        var json1 = json.toString();
      });
  };
  $scope.getTenantData = function (tenant) {
    $scope.usertableParams.settings().dataset = [];
    $scope.usertableParams.reload();
    $scope.getTenantContentData(tenant);
    $scope.getTenantCourseData(tenant);
    $scope.getTenantUsers(tenant);
    // if($scope.objectsreport == true){
    // 	$scope.getTenantContentData(tenant);
    // 	$scope.getTenantUsers(tenant);
    // } else if($scope.coursesreport == true){
    // 	$scope.getTenantCourseData(tenant);
    // 	$scope.getTenantUsers(tenant);
    // }
  };
  $scope.showlist = function (type) {
    if (type === "course") {
      $scope.coursesreport = true;
      $scope.objectsreport = false;
    } else {
      $scope.coursesreport = false;
      $scope.objectsreport = true;
    }
  };
  $scope.getTenantCourseData = function (tenant) {
    $scope.loading = true;
    $scope.selectedTenant = tenant;
    var apigClient = apigClientFactory.newClient();
    var params = {};
    var body = {
      orgid: tenant,
      ttopic: "1",
    };
    body.orgid = tenant == "ALL INSTITUTIONS" ? "PEARSON" : tenant;
    var additionalParams = {};

    apigClient
      .listTopicsPost(params, body, additionalParams)
      .then(function (result) {
        var json = JSON.stringify(result.data);
        var coursedata = JSON.parse(json);
        $scope.topics = coursedata.topiclist;

        $scope.topics1 = [];
        $scope.total = 0;

        for (var l = 0; l < $scope.topics.length; l++) {
          var subcount = 0,
            concount = 0;

          if ($scope.topics[l].TSCB != undefined) {
            for (var k = 0; k < $scope.topics[l].TSCB.length; k++) {
              subcount = +subcount + +$scope.topics[l].TSCB[k].SUB;
            }
            $scope.topics[l].SUBCOUNT = subcount;
          } else {
            $scope.topics[l].SUBCOUNT = 0;
          }
          if ($scope.topics[l].TSCB != undefined) {
            for (var k = 0; k < $scope.topics[l].TSCB.length; k++) {
              if (
                $scope.topics[l].TSCB[k].CON !== undefined &&
                $scope.topics[l].TSCB[k].CON != " "
              ) {
                concount = +concount + +$scope.topics[l].TSCB[k].CON;
              }

              if ($scope.topics[l].TSCB.length - 1 == k) {
                $scope.topics[l].COMPCOUNT = concount;
              }
            }
          } else {
            $scope.topics[l].COMPCOUNT = 0;
          }

          if ($scope.topics[l].STAR != undefined) {
            $scope.topics[l].STAR.avg = Math.round($scope.topics[l].STAR.avg);
          } else {
            $scope.topics[l].STAR = {};
            $scope.topics[l].STAR.avg = 0;
          }

          if (tenant !== "ALLTENANT") {
            if ($scope.topics[l].PUB == 1 || $scope.topics[l].PUB == "1") {
              $scope.topics1.push($scope.topics[l]);
            }
          }
          if (tenant == "ALLTENANT") {
            if (
              $scope.topics[l].TENANTS != undefined &&
              $scope.topics[l].TENANTS.length > 0
            ) {
              $scope.topics1.push($scope.topics[l]);
            }
          }
        }
        $scope.total = $scope.topics1.length;
        $scope.topics = $scope.topics1;

        $scope.CourseReportParams = new NgTableParams(
          {
            page: 1, // show first page
            count: 10, // count per page
          },
          {
            dataset: $scope.topics,
          }
        );

        $scope.toptopics = angular.copy($scope.topics);
        $scope.toptopics = $scope.toptopics.sort(
          (a, b) => b.SUBCOUNT - a.SUBCOUNT
        );
        $scope.topiccolors = [
          "#5fc1ed",
          "#ff7b7b",
          "#4a7ea5",
          "#626262",
          "#d62728",
        ];
        $scope.data = [];
        var tplength =
          $scope.toptopics.length > 4 ? 5 : $scope.toptopics.length;
        for (var i = 0; i < tplength; i++) {
          var jsonObj = {
            color: $scope.topiccolors[i],
            values: [
              {
                label: $scope.toptopics[i].TN,
                value: $scope.toptopics[i].SUBCOUNT,
              },
            ],
          };
          $scope.data.push(jsonObj);
        }
        $scope.options = {
          chart: {
            type: "multiBarHorizontalChart",
            height: 190,
            x: function (d) {
              return d.label;
            },
            y: function (d) {
              return d.value;
            },
            valueFormat: function (d) {
              return d3.format(".0f")(d);
            },
            showControls: false,
            showValues: true,
            showLegend: false,
            groupSpacing: 0.2,
            margin: {
              left: 400,
              bottom: 20,
            },
            xAxis: {
              showMaxMin: false,
            },
            yAxis: {
              showMaxMin: true,
              tickFormat: function (d) {
                return d3.format(",f")(d);
              },
            },
          },
        };

        $scope.loading = false;
        $scope.$apply();
      })
      .catch(function (result) {
        var json = JSON.stringify(result);
        var json1 = json.toString();
      });
  };

  $scope.getTenantContentData = function (tenant) {
    $scope.loading = true;
    $scope.selectedTenant = tenant;
    var apigClient = apigClientFactory.newClient();
    var params = {};
    $scope.contentbasedload = true;
    var body = {
      oid: tenant,
    };

    var additionalParams = {};
    body.oid = tenant == "ALL INSTITUTIONS" ? "PEARSON" : tenant;

    var data = apigClient
      .listObjectsPost(params, body, additionalParams)
      .then(function (result) {
        var json = JSON.stringify(result.data);
        $scope.objects = JSON.parse(json);
        $scope.tobjects = [];
        $scope.activeObjects = 0;

        if ($scope.objects.length > 0) {
          for (var i = 0; i < $scope.objects.length; i++) {
            if ($scope.objects[i].SUBS != undefined) {
              if ($scope.objects[i].SUBS.length > 0) {
                for (var k = 0; k < $scope.objects[i].SUBS.length; k++) {
                  $scope.objects[i].CSUBS =
                    $scope.objects[i].CSUBS === undefined
                      ? parseInt($scope.objects[i].SUBS[k].CT)
                      : parseInt($scope.objects[i].CSUBS) +
                        parseInt($scope.objects[i].SUBS[k].CT);
                }
              } else {
                $scope.objects[i].CSUBS = 0;
              }
            } else {
              $scope.objects[i].CSUBS = 0;
            }
            if (
              $scope.objects[i].TV != undefined &&
              $scope.objects[i].TV.length > 0
            ) {
              for (var m = 0; m < $scope.objects[i].TV.length; m++) {
                $scope.objects[i].CTV =
                  $scope.objects[i].CTV === undefined
                    ? parseInt($scope.objects[i].TV[m].CT)
                    : parseInt($scope.objects[i].CTV) +
                      parseInt($scope.objects[i].TV[m].CT);
              }
            } else {
              $scope.objects[i].CTV = 0;
            }

            if ($scope.objects[i].STAR != undefined) {
              $scope.objects[i].STAR = Math.round($scope.objects[i].STAR);
            }
            if ($scope.objects[i].uviews != undefined) {
              if ($scope.objects[i].uviews.length > 0) {
                $scope.objects[i].views = 0;
                $scope.objects[i].unique = 0;
                $scope.objects[i].bounce = 0;
                $scope.objects[i].shared = 0;
                for (var j = 0; j < $scope.objects[i].uviews.length; j++) {
                  $scope.objects[i].views =
                    parseInt($scope.objects[i].views) +
                    parseInt($scope.objects[i].uviews[j].view);
                  $scope.objects[i].unique =
                    parseInt($scope.objects[i].unique) +
                    parseInt($scope.objects[i].uviews[j].unique);
                  $scope.objects[i].bounce =
                    parseInt($scope.objects[i].bounce) +
                    parseInt($scope.objects[i].uviews[j].bounce);
                  $scope.objects[i].shared =
                    parseInt($scope.objects[i].shared) +
                    ($scope.objects[i].uviews[j].shared === undefined
                      ? 0
                      : parseInt($scope.objects[i].uviews[j].shared));
                  if ($scope.objects[i].uviews[j].sharedotv != undefined) {
                    $scope.objects[i].shared =
                      parseInt($scope.objects[i].shared) +
                      parseInt($scope.objects[i].uviews[j].sharedotv);
                  }
                }
              } else {
                $scope.objects[i].views = 0;
                $scope.objects[i].unique = 0;
                $scope.objects[i].bounce = 0;
                $scope.objects[i].shared = 0;
              }
            } else {
              $scope.objects[i].views = 0;
              $scope.objects[i].unique = 0;
              $scope.objects[i].bounce = 0;
              $scope.objects[i].shared = 0;
            }

            $scope.objects[i].views =
              parseInt($scope.objects[i].views) +
              parseInt($scope.objects[i].CTV);
            if (tenant != "ALLTENANT") {
              if ($scope.objects[i].PUB == 1 && $scope.objects[i].PUB == "1") {
                $scope.tobjects.push($scope.objects[i]);
                +$scope.activeObjects++;
              }
            }
            if (tenant == "ALLTENANT") {
              if (
                $scope.objects[i].TENANTS != undefined &&
                $scope.objects[i].TENANTS.length > 0
              ) {
                $scope.tobjects.push($scope.objects[i]);
                +$scope.activeObjects++;
              }
            }
          }
        }
        $scope.objects = $scope.tobjects;
        $scope.tableParams1 = new NgTableParams(
          {
            page: 1, // show first page
            count: 10, // count per page
          },
          {
            dataset: $scope.objects,
          }
        );

        $scope.contentbasedload = false;
        $scope.objectList = angular.copy($scope.objects);
        $scope.objectList = $scope.objectList.sort((a, b) => b.views - a.views);
        $scope.topiccolors = [
          "#5fc1ed",
          "#ff7b7b",
          "#4a7ea5",
          "#626262",
          "#d62728",
        ];
        $scope.data11 = [];

        var objlength =
          $scope.objectList.length > 4 ? 5 : $scope.objectList.length;
        for (var i = 0; i < objlength; i++) {
          var jsonObj = {
            color: $scope.topiccolors[i],
            values: [
              {
                label: $scope.objectList[i].OD.ON,
                value: $scope.objectList[i].views,
              },
            ],
          };
          $scope.data11.push(jsonObj);
        }
        $scope.options11 = {
          chart: {
            type: "multiBarHorizontalChart",
            height: 190,
            x: function (d) {
              return d.label;
            },
            y: function (d) {
              return d.value;
            },
            valueFormat: function (d) {
              return d3.format(".0f")(d);
            },
            showControls: false,
            showValues: true,
            showLegend: false,
            groupSpacing: 0.2,
            margin: {
              left: 520,
              bottom: 20,
            },
            xAxis: {
              showMaxMin: false,
            },
            yAxis: {
              showMaxMin: true,
              tickFormat: function (d) {
                return d3.format(",f")(d);
              },
            },
          },
        };
        $scope.loading = false;
        $scope.$apply();
      })
      .catch(function (result) {
        var json = JSON.stringify(result);
        var json1 = json.toString();
      });
  };
  $scope.loadPage = function () {
    $scope.loading = true;
    $window.location.href = "#tenants";
  };

  $scope.viewrating = function (tid, tn) {
    $scope.loading = true;
    $scope.decry["tid"] = tid;
    $scope.decry["tn"] = tn;
    $scope.decry["rpath"] = true;
    $scope.decry["tenant"] = $scope.selectedTenant;
    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );

    $scope.Instance = $uibModal.open({
      templateUrl: "viewuserratings.html",
      controller: "viewuserratingsCtrl",
      backdrop: "static",
      keyboard: false,
      windowClass: "addobjectmodal",
      scope: $scope,
      resolve: {
        items: function (viewrating) {
          return viewrating.viewrating();
        },
      },
    });
    $scope.Instance.opened.then(function () {
      $scope.loading = false;
    });
    $scope.Instance.result.then(
      function (selectedItem) {
        var json1 = JSON.stringify(selectedItem);
      },
      function () {
        // alert($scope.object);
      }
    );
  };

  $scope.showcontents = function () {
    $scope.showcontentbased = true;
    $scope.showusersbased = false;
    $scope.coursesreport = true;
    $scope.objectsreport = false;
  };

  $scope.showusers = function () {
    $scope.showcontentbased = false;
    $scope.showusersbased = true;
    $scope.coursesreport = true;
    $scope.objectsreport = false;
  };
  $scope.tenant();
  $scope.viewuserlist = function (userrow, action) {
    $scope.loading = true;

    if (action == "0") {
      $scope.decry["ctid"] = userrow.TID;
      $scope.decry["ctn"] = userrow.TN;
      $scope.decry["caction"] = action;
      $scope.decry["userrow"] = userrow;
    } else {
      $scope.decry["ctid"] = userrow.OBJID;
      $scope.decry["ctn"] = userrow.OD.ON;
      $scope.decry["caction"] = action;
      $scope.decry["userrow"] = userrow;
    }
    $scope.decry["rtype"] = "CB";
    $scope.decry["cbtype"] = action;
    $scope.decry["tenant"] = $scope.selectedTenant;
    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );
    $window.location.href = "#viewtenantreport";
  };
  $scope.gettenants = function () {
    $scope.obj = "Course";
    $scope.loading = true;
    $scope.Instance = $uibModal.open({
      templateUrl: "viewtenants.html",
      controller: "viewtenantsCtrl",
      backdrop: "static",
      backdropClass: "modal1",
      keyboard: false,
      windowClass: "addnuggetmodalreports",
      scope: $scope,
      resolve: {
        tenantslist1: function (gettenants1) {
          return gettenants1.gettenants1();
        },
      },
    });
    $scope.Instance.opened.then(function () {
      $scope.loading = false;
    });
    $scope.Instance.result.then(
      function (tenants) {
        if (tenants != " ") {
          $scope.getTenantData(tenants);
        }
      },
      function () {
        // alert($scope.object);
      }
    );
  };

  $scope.exportcsv = function () {
    var type = "";

    if ($scope.coursesreport == true || $scope.coursesreport == "true") {
      type = "course";
    }
    if ($scope.objectsreport == true || $scope.coursesreport == "true") {
      type = "object";
    }
    if ($scope.showusersbased == true || $scope.coursesreport == "true") {
      type = "user";
    }
    // var type = 'auser';
    // if($scope.uniqueusers == true){
    // 	type = 'uuser';
    // }

    // //var data = $scope.usercount;
    // var months = ['JAN','FAB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    // if($scope.datea !== undefined && $scope.dateb !== undefined){
    //    var a = new Date($scope.datea);
    //    var b = new Date($scope.dateb);
    //    //bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
    // var  bd = b.getDate().toString().length > 1 ? b.getDate() : "0"+b.getDate();
    //    var aday = new Date(a.getFullYear() + "-" + months[a.getMonth()] + "-" + a.getDate());
    //    var bday = new Date(b.getFullYear() + "-" + months[b.getMonth()] + "-" + bd);
    // } else {
    //    var a = new Date();
    //    var b = new Date();
    //    b.setDate(b.getDate()-7);
    //    //bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
    //    var bd = b.getDate().toString().length > 1 ? b.getDate() : "0"+b.getDate();
    //    var aday =   a.getDate() +"-" +months[a.getMonth()] +"-"+a.getFullYear();
    //    var bday =   bd +"-"+ months[b.getMonth()] +"-"+b.getFullYear();

    // }
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

    //data = $scope.weekdata;
    var json_pre = [],
      larr = $scope.topics,
      tnm = "COURSES";
    if (type == "object") {
      larr = $scope.objects;
      tnm = "CONTENT & COLLATERAL";
    }
    if (type == "user") {
      larr = $scope.newuserlist;
      tnm = "ALL USERS";
    }

    let arrHeader = [];
    if (type == "user") {
      arrHeader = ["Name", "Email", "Last_Active"];

      for (var dat of larr) {
        var obj = {};
        // var g = new Date(dat.day);
        // var gm = (g.getMonth() + 1).toString().length > 1 ? (g.getMonth() + 1) : "0"+(g.getMonth() + 1);
        // var	gd = g.getDate().toString().length > 1 ? g.getDate() : "0"+g.getDate();
        // var tsday =   gm +"-"+ gd +"-"+b.getFullYear();
        // obj.date = tsday;
        // obj.count = dat.count;
        let a = new Date(dat.LA);
        let aday = a.getMonth() + 1 + "-" + a.getDate() + "-" + a.getFullYear();
        obj.Name = dat.UNAME;
        obj.Email = dat.EMAILID;
        obj.Last_Active = aday;
        json_pre.push(obj);
      }
    }
    if (type == "object") {
      arrHeader = [
        "title",
        "views",
        "unique",
        "bounce",
        "CSUBS",
        "shared",
        "STAR",
      ];

      for (var dat of larr) {
        var obj = {};
        //alert(JSON.stringify(dat))
        //let t = JSON.parse(JSON.stringify(dat.OD));
        if (dat.OD !== undefined) {
          obj.title = dat.OD === undefined ? "" : dat.OD.ON;
          obj.views = dat.views;
          obj.unique = dat.unique;
          obj.bounce = dat.bounce;
          obj.CSUBS = dat.CSUBS;
          obj.shared = dat.shared;
          obj.STAR = dat.STAR === undefined ? "" : dat.STAR;
          json_pre.push(obj);
        }
      }
    }
    if (type == "course") {
      arrHeader = ["TN", "SUBCOUNT", "COMPCOUNT", "STAR"];

      for (var dat of larr) {
        var obj = {};
        obj.TN = dat.TN;
        obj.SUBCOUNT = dat.SUBCOUNT;
        obj.COMPCOUNT = dat.COMPCOUNT;
        obj.STAR = dat.STAR === undefined ? "0" : dat.STAR.avg;
        json_pre.push(obj);
      }
    }

    let csvData = this.ConvertToCSV(json_pre, arrHeader, type);
    //console.log(csvData)
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
    if (type == "user") {
      dwldLink.setAttribute(
        "download",
        "REPORTS" +
          "-" +
          $scope.selectedTenant +
          "-" +
          tnm +
          "-" +
          aday +
          ".csv"
      );
    }
    if (type == "object") {
      dwldLink.setAttribute(
        "download",
        "REPORTS" +
          "-" +
          $scope.selectedTenant +
          "-CONTENT-BASED-" +
          tnm +
          "-" +
          aday +
          ".csv"
      );
    }
    if (type == "course") {
      dwldLink.setAttribute(
        "download",
        "REPORTS" +
          "-" +
          $scope.selectedTenant +
          "-CONTENT-BASED-" +
          tnm +
          "-" +
          aday +
          ".csv"
      );
    }
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
    console.log(objArray);
    console.log(headerList);
    let array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    let str = "";
    let row = "";

    let newHeaders = [];

    if (type == "user") {
      newHeaders = ["Name", "Email", "Last Active"];
    }

    if (type == "object") {
      newHeaders = [
        "Title",
        "Views",
        "Unique Views",
        "Bounce Views",
        "Users Rated",
        "Link Views",
        "Ratings",
      ];
    }

    if (type == "course") {
      newHeaders = [
        "Course Name",
        "Users Started",
        "Users Completed",
        "Ratings",
      ];
    }

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

app.controller("viewreportsCtrl", viewreportsCtrl);
viewreportsCtrl.$inject = [
  "$scope",
  "$http",
  "$location",
  "$window",
  "tenantdata",
  "$uibModal",
  "NgTableParams",
  "config",
  "$crypto",
];
