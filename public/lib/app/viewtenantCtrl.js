"use strict";
var viewtenantCtrl = function (
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
  $scope.activeunique = function (utype) {
    if (utype == "active") {
      $scope.uniqueusers = false;
      $scope.activeusers = true;
    } else {
      $scope.uniqueusers = true;
      $scope.activeusers = false;
    }
  };
  $scope.tenant = function () {
    if (localStorage.getItem("786a2y1e") != null) {
      $scope.decry = JSON.parse(
        $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
      );
    } else {
      localStorage.clear();
      $window.location.href = "#login";
    }

    $scope.imgurl = config.url;
    $scope.uniqueusers = false;
    $scope.activeusers = true;
    if ($scope.decry.status === "Engage") {
      $scope.showanalytic = false;
      $scope.showcontent = false;
      $scope.showusers = false;
      $scope.showengage = true;
      $scope.showevents = false;
      $scope.objectsreport = false;
      $scope.coursesreport = false;
      $scope.activeusers = false;
      $scope.showassign = false;
    } else if ($scope.decry.status === "Events") {
      $scope.showanalytic = false;
      $scope.showcontent = false;
      $scope.showusers = false;
      $scope.showengage = false;
      $scope.showevents = true;
      $scope.objectsreport = false;
      $scope.coursesreport = false;
      $scope.activeusers = false;
      $scope.showassign = false;
    } else if ($scope.decry.status === "Content") {
      $scope.showanalytic = false;
      $scope.showcontent = true;
      $scope.showusers = false;
      $scope.showengage = false;
      $scope.showevents = false;
      $scope.objectsreport = false;
      $scope.coursesreport = true;
      $scope.activeusers = false;
      $scope.showassign = false;
    } else if ($scope.decry.status === "Analytic") {
      $scope.showanalytic = true;
      $scope.showcontent = false;
      $scope.showusers = false;
      $scope.showengage = false;
      $scope.showevents = false;
      $scope.objectsreport = false;
      $scope.coursesreport = false;
      $scope.activeusers = true;
      $scope.showassign = false;
    } else if ($scope.decry.status === "Assign") {
      $scope.showanalytic = false;
      $scope.showcontent = false;
      $scope.showusers = false;
      $scope.showengage = false;
      $scope.showevents = false;
      $scope.objectsreport = false;
      $scope.coursesreport = false;
      $scope.activeusers = false;
      $scope.showassign = true;
    } else {
      $scope.showanalytic = true;
      $scope.showcontent = false;
      $scope.showusers = false;
      $scope.showengage = false;
      $scope.showevents = false;
      $scope.objectsreport = false;
      $scope.coursesreport = false;
      $scope.activeusers = true;
      $scope.showassign = false;
    }

    $scope.getCourses();
    $scope.getObjects();

    $scope.maxDate = new Date();
    $scope.notificationlink = false;
    $scope.regex =
      "^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}";
    $scope.objurl = { url: "", mtitle: "", mdesc: "" };
    $scope.decry["activemenu"] = "tenants";

    $scope.analytics = JSON.parse(tenantdata);
    $scope.getEvents();

    $scope.tdev =
      +$scope.analytics.android +
      +$scope.analytics.iphone +
      +$scope.analytics.desktop;

    if ($scope.analytics.iphone > 0) {
      $scope.ios = (+$scope.analytics.iphone / +$scope.tdev) * 100;

      if ($scope.ios == Math.floor($scope.ios)) {
        $scope.ios = $scope.ios;
      } else {
        $scope.ios = $scope.ios.toFixed();
      }
    } else {
      $scope.ios = 0;
    }
    if ($scope.analytics.android > 0) {
      $scope.android = (+$scope.analytics.android / +$scope.tdev) * 100;
      if ($scope.android == Math.floor($scope.android)) {
        $scope.android = $scope.android;
      } else {
        $scope.android = $scope.android.toFixed();
      }
    } else {
      $scope.android = 0;
    }
    if ($scope.analytics.desktop > 0) {
      $scope.desktop = (+$scope.analytics.desktop / +$scope.tdev) * 100;
      if ($scope.desktop == Math.floor($scope.desktop)) {
        $scope.desktop = $scope.desktop;
      } else {
        $scope.desktop = $scope.desktop.toFixed();
      }
    } else {
      $scope.desktop = 0;
    }

    $scope.options1 = {
      chart: {
        type: "lineChart",
        height: 290,
        margin: {
          top: 50,
          right: 30,
          bottom: 50,
          left: 70,
        },
        showLegend: false,
        x: function (d) {
          return d.TS;
        },
        y: function (d) {
          return d.UC;
        },
        useInteractiveGuideline: true,
        xAxis: {
          tickFormat: function (d) {
            return d3.time.format("%d-%b")(new Date(d));
          },
        },
        xScale: d3.time.scale.utc(),
        yAxis: {
          axisLabel: "No. Of Users",
          tickFormat: function (d) {
            return d3.format(",.0f")(d);
          },
        },
        title: {
          enable: true,
          text: "Real-time ",
          css: {
            "text-align": "center",
            color: "black",
          },
        },
      },
    };

    $scope.options2 = {
      chart: {
        type: "lineChart",
        height: 290,
        margin: {
          top: 50,
          right: 30,
          bottom: 50,
          left: 70,
        },
        showLegend: false,
        x: function (d) {
          return d.TS;
        },
        y: function (d) {
          return d.UC;
        },
        useInteractiveGuideline: true,
        xAxis: {
          tickFormat: function (d) {
            return d3.time.format("%d-%b")(new Date(d));
          },
        },
        xScale: d3.time.scale.utc(),
        yAxis: {
          axisLabel: "No. Of Users",
          tickFormat: function (d) {
            return d3.format(",.0f")(d);
          },
        },
        title: {
          enable: true,
          text: "Real-time ",
          css: {
            "text-align": "center",
            color: "black",
          },
        },
      },
    };
    $scope.options3 = {
      chart: {
        type: "lineChart",
        height: 290,
        margin: {
          top: 50,
          right: 30,
          bottom: 50,
          left: 70,
        },
        showLegend: false,
        x: function (d) {
          return d.TS;
        },
        y: function (d) {
          return d.UC;
        },
        useInteractiveGuideline: true,
        xAxis: {
          tickFormat: function (d) {
            return d3.time.format("%d-%b")(new Date(d));
          },
          rotateLabels: 30,
          staggerLabels: true,
        },
        xScale: d3.time.scale.utc(),
        yAxis: {
          axisLabel: "No. Of Users",
          tickFormat: function (d) {
            return d3.format(",0f")(d);
          },
        },
        title: {
          enable: true,
          text: "Real-time ",
          css: {
            "text-align": "center",
            color: "black",
          },
        },
      },
    };
    $scope.options7 = {
      chart: {
        type: "lineChart",
        height: 290,
        margin: {
          top: 50,
          right: 30,
          bottom: 50,
          left: 70,
        },
        showLegend: false,
        x: function (d) {
          return d.day;
        },
        y: function (d) {
          return d.count;
        },
        useInteractiveGuideline: true,
        xAxis: {
          tickFormat: function (d) {
            return d3.time.format("%d-%b")(new Date(d));
          },
        },
        xScale: d3.time.scale.utc(),
        yAxis: {
          axisLabel: "No. Of Users",
          tickFormat: function (d) {
            return d3.format(",f")(d);
          },
        },
        title: {
          enable: true,
          text: "Real-time ",
          css: {
            "text-align": "center",
            color: "black",
          },
        },
      },
    };

    $scope.options8 = {
      chart: {
        type: "lineChart",
        height: 290,
        margin: {
          top: 50,
          right: 30,
          bottom: 50,
          left: 70,
        },
        showLegend: false,
        x: function (d) {
          return d.day;
        },
        y: function (d) {
          return d.count;
        },
        useInteractiveGuideline: true,
        xAxis: {
          tickFormat: function (d) {
            return d3.time.format("%d-%b")(new Date(d));
          },
        },
        xScale: d3.time.scale.utc(),
        yAxis: {
          axisLabel: "No. Of Users",
          tickFormat: function (d) {
            return d3.format(",f")(d);
          },
        },
        title: {
          enable: true,
          text: "Real-time ",
          css: {
            "text-align": "center",
            color: "black",
          },
        },
      },
    };
    $scope.options9 = {
      chart: {
        type: "lineChart",
        height: 290,
        margin: {
          top: 50,
          right: 30,
          bottom: 50,
          left: 70,
        },
        showLegend: false,
        x: function (d) {
          return d.day;
        },
        y: function (d) {
          return d.count;
        },
        useInteractiveGuideline: true,
        xAxis: {
          tickFormat: function (d) {
            return d3.time.format("%d-%b")(new Date(d));
          },
          rotateLabels: 30,
          staggerLabels: true,
        },
        xScale: d3.time.scale.utc(),
        yAxis: {
          axisLabel: "No. Of Users",
          tickFormat: function (d) {
            return d3.format(",f")(d);
          },
        },
        title: {
          enable: true,
          text: "Real-time ",
          css: {
            "text-align": "center",
            color: "black",
          },
        },
      },
    };

    $scope.options6 = {
      chart: {
        height: 150,
        type: "pieChart",
        donut: true,
        donutRatio: 0.83,
        x: function (d) {
          return d.key;
        },
        y: function (d) {
          return d.y;
        },
        showLabels: false,

        pie: {
          startAngle: function (d) {
            return d.startAngle / 2 - Math.PI / 2;
          },
          endAngle: function (d) {
            return d.endAngle / 2 - Math.PI / 2;
          },
        },
        duration: 500,
        legend: {
          maxKeyLength: 12,
          margin: {
            top: 3,
            right: 0,
            bottom: 0,
            left: 40,
          },
          rightAlign: false,
          align: true,
        },

        margin: {
          top: 10,
          right: 0,
          bottom: -150,
          left: 0,
        },
        showLegend: true,
        legendPosition: "top",
        labelsOutside: false,
        padAngle: 0.01,
      },
    };

    $scope.data6 = [
      {
        key: "Male",
        y: $scope.analytics.male,
        color: "#666666",
      },
      {
        key: "Female",
        y: $scope.analytics.female,
        color: "#527f80",
      },
      {
        key: "Unknown",
        y: $scope.analytics.unknown,
        color: "#ef6565",
      },
    ];

    var aaa = $scope.analytics.usercount.length;
    if (aaa > 0) {
      aaa--;
      $scope.ausers = $scope.analytics.usercount[aaa].UC;
    } else {
      $scope.ausers = 0;
    }

    $scope.analytics.userlist = $scope.analytics.userlist.sort(function (x, y) {
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

    $scope.usercount = $scope.analytics.usercount;
    $scope.activeusers = true;
    $scope.week = true;
    $scope.month = false;
    $scope.year = false;
    $scope.data3 = [
      {
        color: "#6E8EA5",
        key: "No. of Users",
        values: $scope.usercount,
      },
    ];
    if ($scope.usercount.length > 30) {
      var c = $scope.usercount.length;
      var d = c - 30;
      $scope.monthdata = $scope.usercount.slice(d, c);
    } else {
      $scope.monthdata = $scope.usercount;
    }
    $scope.data2 = [
      {
        color: "#6E8EA5",
        key: "No. of Users",
        values: $scope.monthdata,
      },
    ];
    $scope.user = true;
    $scope.content = false;

    // if($scope.usercount.length > 7){
    // 	var a = $scope.usercount.length;
    // 	var b = a - 7;
    // 	$scope.weekdata = $scope.usercount.slice(b, a);
    // }else{
    // 	$scope.weekdata = $scope.usercount;
    // }

    // $scope.data1 = [{
    // 	color: "#6E8EA5",
    // 	key: "No. of Users",
    // 	values: $scope.weekdata
    // }];

    var lday =
      $scope.usercount.length === 0
        ? ""
        : $scope.usercount[$scope.usercount.length - 1].day;
    var ddateb = moment.utc(lday).toDate().getTime();
    var ddatea = moment.utc(lday).subtract(6, "d").toDate().getTime();

    $scope.nusercount = $scope.analytics.ncount;
    $scope.dhandler(ddatea, ddateb);
    $scope.week1 = true;
    $scope.month1 = false;
    $scope.year1 = false;
    $scope.data23 = [
      {
        color: "#6E8EA5",
        key: "No. of Users",
        values: $scope.nusercount,
      },
    ];
    if ($scope.nusercount.length > 30) {
      var c = $scope.nusercount.length;
      var d = c - 30;
      $scope.monthdata = $scope.nusercount.slice(d, c);
    } else {
      $scope.monthdata = $scope.nusercount;
    }
    $scope.data22 = [
      {
        color: "#6E8EA5",
        key: "No. of Users",
        values: $scope.monthdata,
      },
    ];

    if ($scope.nusercount.length > 7) {
      var a = $scope.nusercount.length;
      var b = a - 7;
      $scope.weekdata = $scope.nusercount.slice(b, a);
    } else {
      $scope.weekdata = $scope.nusercount;
    }

    $scope.data21 = [
      {
        color: "#6E8EA5",
        key: "No. of Users",
        values: $scope.weekdata,
      },
    ];

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
  $scope.dhandler = function (ddatea, ddateb) {
    if (ddatea !== undefined && ddateb !== undefined) {
      var a = new Date(ddatea);
      var b = new Date(ddateb);
      var aday = new Date(
        a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate()
      );
      var bday = new Date(
        b.getFullYear() + "-" + (b.getMonth() + 1) + "-" + b.getDate()
      );

      if (aday > bday) {
        swal({
          title: "",
          text: "From Date should be less than To Date",
          type: "warning",
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
        if ($scope.datea != "" && $scope.dateb != "") {
          $scope.userdata = [];
          if ($scope.usercount.length > 0) {
            for (var i = 0; i < $scope.usercount.length; i++) {
              var c = new Date($scope.usercount[i].TS);
              var cday = new Date(
                c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate()
              );
              if (cday >= aday && cday <= bday) {
                console.log(c + "<=" + b);
                $scope.userdata.push($scope.usercount[i]);
              }
            }
          }
          if ($scope.userdata.length == 0) {
            var dat = a.getTime();
            $scope.userdata.push({ TS: dat, UC: 0 });
            var dat1 = b.getTime();
            $scope.userdata.push({ TS: dat1, UC: 0 });
          }

          $scope.data1 = [
            {
              color: "#6E8EA5",
              key: "No. of Users",
              values: $scope.userdata,
            },
          ];
        }
      }

      $scope.userdata1 = [];
      if ($scope.nusercount.length > 0) {
        for (var i = 0; i < $scope.nusercount.length; i++) {
          var c = new Date($scope.nusercount[i].day);
          var cday = new Date(
            c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate()
          );
          if (cday >= aday && cday <= bday) {
            $scope.userdata1.push($scope.nusercount[i]);
          }
        }
      }
      if ($scope.userdata1.length == 0) {
        var dat = a.getTime();
        $scope.userdata1.push({ day: dat, count: 0 });
        var dat1 = b.getTime();
        $scope.userdata1.push({ day: dat1, count: 0 });
      }

      $scope.data21 = [
        {
          color: "#6E8EA5",
          key: "No. of Users",
          values: $scope.userdata1,
        },
      ];
    }
  };
  $scope.coursecontent = function (ccval) {
    if (ccval == "content") {
      $scope.coursesreport = false;
      $scope.objectsreport = true;
    } else {
      $scope.coursesreport = true;
      $scope.objectsreport = false;
    }
  };
  $scope.exportcsv = function () {
    var type = "auser";

    if ($scope.showcontent == false && $scope.uniqueusers == true) {
      type = "uuser";
    } else if ($scope.showcontent == true && $scope.coursesreport == true) {
      type = "ccontent";
    } else if ($scope.showcontent == true && $scope.objectsreport == true) {
      type = "ocontent";
    } else if ($scope.showusers == true) {
      type = "users";
    }

    //var data = $scope.usercount;
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
    if ($scope.datea !== undefined && $scope.dateb !== undefined) {
      var a = $scope.datea;
      var b = $scope.dateb;
      //bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
      var bd =
        b.getDate().toString().length > 1 ? b.getDate() : "0" + b.getDate();
      var aday =
        a.getDate() + "-" + months[a.getMonth()] + "-" + a.getFullYear();
      var bday = bd + "-" + months[b.getMonth()] + "-" + b.getFullYear();
    } else {
      var a = new Date();
      var b = new Date();
      b.setDate(b.getDate() - 6);
      //bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
      var bd =
        b.getDate().toString().length > 1 ? b.getDate() : "0" + b.getDate();
      var bday =
        a.getDate() + "-" + months[a.getMonth()] + "-" + a.getFullYear();
      var aday = bd + "-" + months[b.getMonth()] + "-" + b.getFullYear();
    }

    //data = $scope.weekdata;
    var json_pre = [],
      larr = $scope.userdata,
      tnm = "ACTIVE-USERS";
    let arrHeader = ["date", "count"];
    if (type == "uuser") {
      larr = $scope.userdata1;
      tnm = "UNIQUE-USERS";
    }
    if (type == "users") {
      larr = $scope.newuserlist;
      tnm = "ALL-USERS";
      arrHeader = ["name", "email", "lastactive"];
    }
    if (type == "ccontent") {
      larr = $scope.topics;
      tnm = "COURSES";
      arrHeader = ["coursename", "userstarted", "usercomepleted", "rating"];
    }
    if (type == "ocontent") {
      larr = $scope.objects;
      tnm = "CONTENT & COLLATERAL";
      arrHeader = [
        "title",
        "view",
        "uniqueview",
        "bounceview",
        "usersrated",
        "linkviews",
        "rating",
      ];
    }

    if (type == "uuser") {
      for (var dat of larr) {
        var obj = {};
        var g = new Date(dat.day);
        var gm =
          (g.getMonth() + 1).toString().length > 1
            ? g.getMonth() + 1
            : "0" + (g.getMonth() + 1);
        var gd =
          g.getDate().toString().length > 1 ? g.getDate() : "0" + g.getDate();
        var tsday = gm + "-" + gd + "-" + b.getFullYear();
        obj.date = tsday;
        obj.count = dat.count;
        json_pre.push(obj);
      }
    } else if (type == "users") {
      for (var dat of larr) {
        var obj = {};
        var g = new Date(dat.LA);
        var gm =
          (g.getMonth() + 1).toString().length > 1
            ? g.getMonth() + 1
            : "0" + (g.getMonth() + 1);
        var gd =
          g.getDate().toString().length > 1 ? g.getDate() : "0" + g.getDate();
        var tsday = gm + "-" + gd + "-" + b.getFullYear();
        obj.name = dat.UNAME;
        obj.email = dat.EMAILID;
        obj.ur = dat.UR;
        obj.lastactive = tsday;
        json_pre.push(obj);
      }
    } else if (type == "ccontent") {
      for (var dat of larr) {
        var obj = {};
        // 	var g = new Date(dat.LA);
        // var gm = (g.getMonth() + 1).toString().length > 1 ? (g.getMonth() + 1) : "0"+(g.getMonth() + 1);
        // var	gd = g.getDate().toString().length > 1 ? g.getDate() : "0"+g.getDate();
        // var tsday =   gm +"-"+ gd +"-"+b.getFullYear();
        if (dat.PUB == 1 || dat.PUB == "1") {
          obj.coursename = dat.TN;
          obj.userstarted = dat.SUBCOUNT;
          obj.usercomepleted = dat.COMPCOUNT;
          obj.rating = dat.STAR === undefined ? 0 : dat.STAR.avg;
          json_pre.push(obj);
        }
      }
    } else if (type == "ocontent") {
      for (var dat of larr) {
        var obj = {};
        // 	var g = new Date(dat.LA);
        // var gm = (g.getMonth() + 1).toString().length > 1 ? (g.getMonth() + 1) : "0"+(g.getMonth() + 1);
        // var	gd = g.getDate().toString().length > 1 ? g.getDate() : "0"+g.getDate();
        // var tsday =   gm +"-"+ gd +"-"+b.getFullYear();
        obj.title = dat.OD.ON;
        obj.view = dat.views;
        obj.uniqueview = dat.unique;
        obj.bounceview = dat.bounce;
        obj.usersrated = dat.CSUBS;
        obj.linkviews = dat.shared;
        obj.rating = dat.STAR === undefined ? 0 : dat.STAR;
        json_pre.push(obj);
      }
    } else {
      for (var dat of larr) {
        var obj = {};
        var g = new Date(dat.TS);
        var gm =
          (g.getMonth() + 1).toString().length > 1
            ? g.getMonth() + 1
            : "0" + (g.getMonth() + 1);
        var gd =
          g.getDate().toString().length > 1 ? g.getDate() : "0" + g.getDate();
        var tsday = gm + "-" + gd + "-" + b.getFullYear();
        obj.date = tsday;
        obj.count = dat.UC;
        json_pre.push(obj);
      }
    }

    let csvData = this.ConvertToCSV(json_pre, arrHeader, type);
    console.log(csvData);
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
    if (type == "uuser" || type == "auser") {
      dwldLink.setAttribute(
        "download",
        $scope.decry.tenant + "-" + tnm + "-" + aday + "-" + bday + ".csv"
      );
    } else {
      var e = new Date();
      var ed =
        e.getDate().toString().length > 1 ? e.getDate() : "0" + e.getDate();
      var eday = ed + "-" + months[e.getMonth()] + "-" + e.getFullYear();
      dwldLink.setAttribute(
        "download",
        $scope.decry.tenant + "-" + tnm + "-" + eday + ".csv"
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

    let newHeaders = ["Date", "Count"];
    if (type == "users") {
      newHeaders = ["Name", "Email", "Last Active"];
    } else if (type == "ccontent") {
      newHeaders = [
        "course Name",
        "Users Started",
        "Users Completed",
        "Ratings",
      ];
    } else if (type == "ocontent") {
      newHeaders = [
        "Title",
        "Views",
        "Unique Views",
        "Bounce Views",
        "Users Rated",
        "Link Views",
        "Rating",
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
  $scope.addevent = function (type) {
    $scope.decry["etype"] = type;

    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );
    $scope.fromTenant = true;
    $scope.loading = true;
    $scope.Instance = $uibModal.open({
      templateUrl: "addevents.html",
      controller: "addeventsCtrl",
      backdrop: "static",
      keyboard: false,
      windowClass: "addobjectmodal",
      scope: $scope,
      resolve: {
        groupslist: function (getgroupslist) {
          return getgroupslist.getgroupslist();
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
      function () {}
    );
  };
  $scope.handler = function (event) {
    $scope.dateb = event;
    if ($scope.datea != undefined) {
      var a = new Date($scope.datea);
      var b = new Date($scope.dateb);

      var aday = new Date(
        a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate()
      );
      var bday = new Date(
        b.getFullYear() + "-" + (b.getMonth() + 1) + "-" + b.getDate()
      );

      if (aday > bday) {
        swal({
          title: "",
          text: "From Date should be less than To Date",
          type: "warning",
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
        if ($scope.datea != "" && $scope.dateb != "") {
          $scope.userdata = [];
          if ($scope.usercount.length > 0) {
            for (var i = 0; i < $scope.usercount.length; i++) {
              var c = new Date($scope.usercount[i].TS);
              var cday = new Date(
                c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate()
              );
              if (cday >= aday && cday <= bday) {
                $scope.userdata.push($scope.usercount[i]);
              }
            }
          }
          if ($scope.userdata.length == 0) {
            var dat = a.getTime();
            $scope.userdata.push({ TS: dat, UC: 0 });
            var dat1 = b.getTime();
            $scope.userdata.push({ TS: dat1, UC: 0 });
          }

          $scope.weekdata = $scope.userdata;
          $scope.data1 = [
            {
              color: "#6E8EA5",
              key: "No. of Users",
              values: $scope.weekdata,
            },
          ];
          $scope.userdata1 = [];
          if ($scope.nusercount.length > 0) {
            for (var i = 0; i < $scope.nusercount.length; i++) {
              var c = new Date($scope.nusercount[i].day);
              var cday = new Date(
                c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate()
              );
              if (cday >= aday && cday <= bday) {
                $scope.userdata1.push($scope.nusercount[i]);
              }
            }
          }
          if ($scope.userdata1.length == 0) {
            var dat = a.getTime();
            $scope.userdata1.push({ day: dat, count: 0 });
            var dat1 = b.getTime();
            $scope.userdata1.push({ day: dat1, count: 0 });
          }
          $scope.weekdata = $scope.userdata1;
          $scope.data21 = [
            {
              color: "#6E8EA5",
              key: "No. of Users",
              values: $scope.weekdata,
            },
          ];
        }
      }
    }
  };

  $scope.handler1 = function (event) {
    $scope.datea = event;
    if ($scope.dateb != undefined) {
      var a = new Date($scope.datea);
      var b = new Date($scope.dateb);
      var aday = new Date(
        a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate()
      );
      var bday = new Date(
        b.getFullYear() + "-" + (b.getMonth() + 1) + "-" + b.getDate()
      );

      if (aday > bday) {
        swal({
          title: "",
          text: "From Date should be less than To Date",
          type: "warning",
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
        if ($scope.datea != "" && $scope.dateb != "") {
          $scope.userdata = [];
          if ($scope.usercount.length > 0) {
            for (var i = 0; i < $scope.usercount.length; i++) {
              var c = new Date($scope.usercount[i].TS);
              var cday = new Date(
                c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate()
              );
              if (cday >= aday && cday <= bday) {
                console.log(c + "<=" + b);
                $scope.userdata.push($scope.usercount[i]);
              }
            }
          }
          if ($scope.userdata.length == 0) {
            var dat = a.getTime();
            $scope.userdata.push({ TS: dat, UC: 0 });
            var dat1 = b.getTime();
            $scope.userdata.push({ TS: dat1, UC: 0 });
          }

          $scope.data1 = [
            {
              color: "#6E8EA5",
              key: "No. of Users",
              values: $scope.userdata,
            },
          ];
          $scope.userdata1 = [];
          if ($scope.nusercount.length > 0) {
            for (var i = 0; i < $scope.nusercount.length; i++) {
              var c = new Date($scope.nusercount[i].day);
              var cday = new Date(
                c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate()
              );
              if (cday >= aday && cday <= bday) {
                $scope.userdata1.push($scope.nusercount[i]);
              }
            }
          }
          if ($scope.userdata1.length == 0) {
            var dat = a.getTime();
            $scope.userdata1.push({ day: dat, count: 0 });
            var dat1 = b.getTime();
            $scope.userdata1.push({ day: dat1, count: 0 });
          }
          $scope.weekdata = $scope.userdata1;
          $scope.data21 = [
            {
              color: "#6E8EA5",
              key: "No. of Users",
              values: $scope.weekdata,
            },
          ];
        }
      }
    }
  };
  $scope.sendNotification = function () {
    $scope.error = false;
    $scope.error1 = false;
    $scope.error4 = false;

    var regexQuery =
      "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
    var url = new RegExp(regexQuery, "g");

    if (
      $scope.objurl.mtitle == "" ||
      $scope.objurl.mtitle == undefined ||
      $scope.objurl.mtitle.replace(/\s/g, "").length === 0 ||
      $scope.objurl.mdesc == "" ||
      $scope.objurl.mdesc == undefined ||
      $scope.objurl.mdesc.replace(/\s/g, "").length === 0 ||
      $scope.objurl.type == "" ||
      $scope.objurl.type == undefined
    ) {
      if ($scope.objurl.type == "" || $scope.objurl.type == undefined) {
        $scope.error4 = true;
      }
      if (
        $scope.objurl.mtitle == "" ||
        $scope.objurl.mtitle == undefined ||
        $scope.objurl.mtitle.replace(/\s/g, "").length === 0
      ) {
        $scope.error = true;
      }
      if (
        $scope.objurl.mdesc == "" ||
        $scope.objurl.mdesc == undefined ||
        $scope.objurl.mdesc.replace(/\s/g, "").length === 0
      ) {
        $scope.error1 = true;
      }
    } else {
      if ($scope.notificationlink == true) {
        if (
          $scope.objurl.url == "" ||
          $scope.objurl.url == undefined ||
          $scope.objurl.url.replace(/\s/g, "").length === 0 ||
          !url.test($scope.objurl.url)
        ) {
          $scope.error3 = true;
          return;
        }
      }
      $scope.decry = JSON.parse(
        $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
      );
      $scope.loading = true;
      AWSCognito.config.region = config.reg;
      AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: $scope.decry.iid,
      });

      var poolData = {
        UserPoolId: $scope.decry.uid,
        ClientId: $scope.decry.cid,
      };

      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(
        poolData
      );

      var cognitoUser = userPool.getCurrentUser();

      if (cognitoUser != null && $scope.decry.oid != null) {
        $scope.getsession(cognitoUser);
      } else {
        localStorage.clear();
        $window.location.href = "#login";
      }
    }
  };

  $scope.getsession = function (cognitoUser) {
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
          $scope.sendmsgon(token);
          resolve();
        }
      });
    });
  };

  $scope.sendmsgon = function (token) {
    $scope.decry = JSON.parse(
      $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
    );
    var apigClient = apigClientFactory.newClient({
      invokeUrl: $scope.decry.api,
    });
    var params = {};

    var body = {
      // gid:  [$scope.decry.tenant],
      title: $scope.objurl.mtitle,
      message: $scope.objurl.mdesc,
      oid: $scope.decry.oid,
      action: $scope.objurl.type,
      tenants: [$scope.decry.tenant],
    };
    if ($scope.notificationlink == true) {
      body.link = true;
      body.url = $scope.objurl.url;
    }
    var additionalParams = {
      headers: { Authorization: token },
    };

    apigClient
      .groupNotificationPost(params, body, additionalParams)
      .then(function (result) {
        $scope.loading = false;
        $scope.$apply();

        swal({
          title: "Notification sent",
          type: "success",
          text: "Notification sent to users",
          buttonsStyling: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          width: "400px",
          showConfirmButton: true,
          confirmButtonText: "OK",
          customClass: "sweetalert-confirmOk",
          confirmButtonClass: "button1",
        });
        $scope.decry["status"] = "Engage";
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#viewtenant";
      })
      .catch(function (result) {
        $scope.loading = false;
        swal({
          title: "Notification not sent.",
          type: "error",
          text:
            "Notification not sent to users. Please Contact Production Support Team.",
          buttonsStyling: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          width: "400px",
          showConfirmButton: true,
          confirmButtonText: "OK",
          customClass: "sweetalert-confirmOk",
          confirmButtonClass: "button1",
        });
        $uibModalInstance.close();
      });
  };

  $scope.viewuser = function (user) {
    if ($scope.online == true) {
      $scope.loading = true;
      //localStorage.setItem("userinfoid", user.EID);
      $scope.decry["userinfoid"] = user.EID;
      $scope.decry["id"] = user.UID;
      $scope.decry["User"] = user.UNAME;
      $scope.decry["mail"] = user.EMAILID;
      $scope.decry["reports"] = false;
      delete $scope.decry["GID"];
      delete $scope.decry["GNAME"];
      if (user.LA == undefined || user.LA == "") {
        $scope.decry["las"] = "-";
      } else {
        $scope.decry["las"] = user.LA;
      }

      $scope.decry.status = undefined;
      localStorage.setItem(
        "786a2y1e",
        $crypto.encrypt(JSON.stringify($scope.decry), config.key)
      );
      $window.location.href = "#userinfo";
    }
  };

  $scope.url = function () {
    $scope.error3 = false;
    if ($scope.notificationlink == false) {
      $scope.notificationlink = true;
    } else {
      $scope.notificationlink = false;
    }
  };

  $scope.getEvents = function () {
    // var apigClient = apigClientFactory.newClient();
    // var params = {};
    // var body = {
    // 	oid : $scope.decry.tenant,
    // 	admin: true,
    // };
    // var additionalParams = {};
    // apigClient.getEventsPost(params, body, additionalParams)
    // .then(function(result){
    // 	var json = JSON.stringify(result.data);
    //$scope.events = JSON.parse(json);

    $scope.events = $scope.analytics.events;

    $scope.eventsList = [];
    $scope.SelectedEvent = null;
    if ($scope.events.events !== undefined && $scope.events.events.length > 0) {
      for (var n = 0; n < $scope.events.events.length; n++) {
        var obj = {};

        obj.start = new Date($scope.events.events[n].start * 1000);
        obj.title = $scope.events.events[n].title;
        obj.desc = $scope.events.events[n].desc;
        obj.eid = $scope.events.events[n].eid;
        obj.gid = $scope.events.events[n].gid;
        obj.gname = $scope.events.events[n].gname;
        obj.color = $scope.decry.appcolor;
        obj.link = $scope.events.events[n].link;
        obj.zoomID = $scope.events.events[n].zoomID;
        obj.conducter = $scope.events.events[n].conducter;
        obj.email = $scope.events.events[n].email;
        $scope.eventsList.push(obj);
      }
    }

    $scope.eventSources = [$scope.eventsList];

    $scope.uiConfig = {
      calendar: {
        height: 450,
        editable: true,
        displayEventTime: false,
        eventLimit: 2,
        header: {
          right: "today prev,next",
        },
        buttonText: {
          today: "Today",
        },
        dayClick: function (day) {
          $scope.SelectedEvent = $scope.eventsList;
          $scope.SelectedEvent = $scope.SelectedEvent.filter(function (item) {
            return (
              moment.utc(item.start).format("ddd MMM DD YYYY") ==
              day.format("ddd MMM DD YYYY")
            );
          });
          if ($scope.SelectedEvent.length > 0) {
            $scope.decry["groups"] = $scope.groups;
            localStorage.setItem(
              "786a2y1e",
              $crypto.encrypt(JSON.stringify($scope.decry), config.key)
            );

            $scope.Instance = $uibModal.open({
              templateUrl: "eventview.html",
              controller: "eventviewCtrl",
              backdrop: "static",
              keyboard: false,
              windowClass: "addobjectmodal",
              scope: $scope,
            });
          }
        },
        eventClick: function (event) {
          $scope.SelectedEvent = $scope.eventsList;
          $scope.SelectedEvent = $scope.SelectedEvent.filter(function (item) {
            return (
              moment.utc(item.start).format("ddd MMM DD YYYY") ==
              event.start.format("ddd MMM DD YYYY")
            );
          });

          if ($scope.SelectedEvent.length > 0) {
            $scope.Instance = $uibModal.open({
              templateUrl: "eventview.html",
              controller: "eventviewCtrl",
              backdrop: "static",
              keyboard: false,
              windowClass: "addobjectmodal",
              scope: $scope,
            });
          }
        },
      },
    };

    //$scope.$apply();
    // }).catch( function(result){
    // 	var json = JSON.stringify(result);
    // 	var json1 = json.toString();
    // });
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
          } else {
            $scope.topics[l].STAR = {};
            $scope.topics[l].STAR.avg = 0;
          }
        }
        $scope.topics = $scope.topics.filter(function (item) {
          return item.PUB == 1;
        });

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

        $scope.toptopics = coursedata.toptopics;
        $scope.topiccolors = [
          "#5fc1ed",
          "#ff7b7b",
          "#4a7ea5",
          "#626262",
          "#d62728",
        ];
        $scope.data = [];
        var tplength =
          $scope.toptopics.TT.length > 4 ? 5 : $scope.toptopics.TT.length;
        for (var i = 0; i < tplength; i++) {
          var jsonObj = {
            color: $scope.topiccolors[i],
            values: [
              {
                label: $scope.toptopics.TT[i].ttitle,
                value: $scope.toptopics.TT[i].ct,
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

        $scope.$apply();
      })
      .catch(function (result) {
        var json = JSON.stringify(result);
        var json1 = json.toString();
      });
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
                    $scope.objects[i].uviews[j].shared === undefined
                      ? 0
                      : parseInt($scope.objects[i].shared) +
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

  $scope.loadPage = function () {
    $scope.loading = true;
    $window.location.href = "#tenants";
  };

  $scope.viewrating = function (tid, tn) {
    $scope.loading = true;
    $scope.decry["tid"] = tid;
    $scope.decry["tn"] = tn;
    $scope.decry["rpath"] = false;
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
      function () {}
    );
  };
  $scope.showanalytics = function () {
    $scope.showanalytic = true;
    $scope.showusers = false;
    $scope.showcontent = false;
    $scope.showengage = false;
    $scope.showevents = false;
    $scope.notificationlink = false;
    $scope.objurl.mtitle = undefined;
    $scope.objurl.mdesc = undefined;
    $scope.objurl.type = undefined;
    $scope.error = false;
    $scope.error1 = false;
    $scope.error4 = false;
    $scope.activeusers = true;
    $scope.showassign = false;
  };
  $scope.showuser = function () {
    $scope.showanalytic = false;
    $scope.showusers = true;
    $scope.showcontent = false;
    $scope.showengage = false;
    $scope.showevents = false;
    $scope.notificationlink = false;
    $scope.objurl.mtitle = undefined;
    $scope.objurl.mdesc = undefined;
    $scope.objurl.type = undefined;
    $scope.error = false;
    $scope.error1 = false;
    $scope.error4 = false;
    $scope.uniqueusers = false;
    $scope.showassign = false;
  };
  $scope.showcontents = function () {
    $scope.showanalytic = false;
    $scope.showusers = false;
    $scope.showcontent = true;
    $scope.showengage = false;
    $scope.showevents = false;
    $scope.notificationlink = false;
    $scope.objurl.mtitle = undefined;
    $scope.objurl.mdesc = undefined;
    $scope.objurl.type = undefined;
    $scope.error = false;
    $scope.error1 = false;
    $scope.error4 = false;
    $scope.coursesreport = true;
    $scope.objectsreport = false;
    $scope.showassign = false;
  };
  $scope.showengages = function () {
    $scope.showanalytic = false;
    $scope.showusers = false;
    $scope.showcontent = false;
    $scope.showengage = true;
    $scope.showevents = false;
    $scope.notificationlink = false;
    $scope.showassign = false;
  };
  $scope.showevent = function () {
    $scope.showanalytic = false;
    $scope.showusers = false;
    $scope.showcontent = false;
    $scope.showengage = false;
    $scope.showevents = true;
    $scope.notificationlink = false;
    $scope.objurl.mtitle = undefined;
    $scope.objurl.mdesc = undefined;
    $scope.objurl.type = undefined;
    $scope.error = false;
    $scope.error1 = false;
    $scope.error4 = false;
    $scope.showassign = false;
  };
  $scope.showassigns = function () {
    $scope.showanalytic = false;
    $scope.showusers = false;
    $scope.showcontent = false;
    $scope.showengage = false;
    $scope.showevents = false;
    $scope.notificationlink = false;
    $scope.showassign = true;
  };
  $scope.tenant();
  $scope.viewuserlist = function (userrow, action) {
    $scope.loading = true;

    if (action == "0") {
      $scope.decry["ctid"] = userrow.TID;
      $scope.decry["ctn"] = userrow.TN;
      $scope.decry["caction"] = action;
    } else {
      $scope.decry["ctid"] = userrow.OBJID;
      $scope.decry["ctn"] = userrow.OD.ON;
      $scope.decry["caction"] = action;
    }
    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );
    $window.location.href = "#courseusers";
  };
  $scope.viewucaselist = function (userrow, action) {
    $scope.loading = true;

    if (action == "0") {
      $scope.decry["ctid"] = userrow.TID;
      $scope.decry["ctn"] = userrow.TN;
      $scope.decry["caction"] = action;
    } else {
      $scope.decry["ctid"] = userrow.OBJID;
      $scope.decry["ctn"] = userrow.OD.ON;
      $scope.decry["caction"] = action;
    }
    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );
    $window.location.href = "#caseusers";
  };
  $scope.adduser = function () {
    $scope.loading = true;
    $scope.bulkuploads = false;
    $scope.Instance = $uibModal.open({
      templateUrl: "adduser.html",
      controller: "adduserCtrl",
      backdrop: "static",
      keyboard: false,
      windowClass: "addusermodal",
      scope: $scope,
    });
    $scope.Instance.opened.then(function () {
      $scope.loading = false;
    });
    $scope.Instance.result.then(
      function (quiz) {},
      function () {
        // alert($scope.object);
      }
    );
  };
  $scope.bulkupload = function () {
    $scope.loading = true;
    $scope.bulkuploads = true;
    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );
    $scope.Instance = $uibModal.open({
      templateUrl: "adduser.html",
      controller: "adduserCtrl",
      backdrop: "static",
      keyboard: false,
      windowClass: "addusermodal",
      scope: $scope,
    });
    $scope.Instance.opened.then(function () {
      $scope.loading = false;
    });
    $scope.Instance.result.then(
      function () {
        $scope.loading = true;
        $window.location.href = "#viewtenant";
      },
      function () {
        // alert($scope.object);
      }
    );
  };
};

app.controller("viewtenantCtrl", viewtenantCtrl);
viewtenantCtrl.$inject = [
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

app.factory("gettenantdata", function ($window, $q, config, $crypto) {
  return {
    gettenantdata: function () {
      var tenantdata, decry;
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
        tenantdata = getusersession();
      } else {
        localStorage.clear();
        $window.location.href = "#login";
      }

      function getdata(token) {
        var apigClient = apigClientFactory.newClient({ invokeUrl: decry.api });
        var params = {};

        var body = {
          oid: decry.tenant,
          ulist: "1",
        };

        var additionalParams = {
          headers: { Authorization: token },
        };

        var data = apigClient
          .getUserCountPost(params, body, additionalParams)
          .then(function (result) {
            var json = JSON.stringify(result.data);
            var users = json.toString();
            var apigClient = apigClientFactory.newClient();
            var params = {};
            var body = {
              oid: config.oid,
              tenant: decry.tenant,
              admin: true,
              groupid: [decry.tenant],
              //allOrg:"EDDEV"
            };

            var additionalParams = {};
            console.log(body);
            var data1 = apigClient
              .getEventsPost(params, body, additionalParams)
              .then(function (result) {
                var json = JSON.stringify(result.data);
                users = JSON.parse(users);
                users.events = JSON.parse(json);
                users = JSON.stringify(users);
                return $q.when(users);
              })
              .catch(function (result) {
                var json = JSON.stringify(result);
                var json1 = json.toString();
              });
            return $q.when(data1);
          })
          .catch(function (result) {
            var json = JSON.stringify(result);
            var json1 = json.toString();
            localStorage.clear();
            $window.location.href = "#login";
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

      return $q.when(tenantdata);
    },
  };
});
