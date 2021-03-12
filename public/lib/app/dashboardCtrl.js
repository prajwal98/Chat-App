var dashboardCtrl = function (
  $scope,
  $http,
  $location,
  $window,
  $uibModal,
  jwtHelper,
  $cookies,
  config,
  usercount,
  $crypto
) {
  $scope.dash = function () {
    $scope.decry = JSON.parse(
      $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
    );
    $scope.maxDate = new Date();
    if ($scope.decry.role == "Admin") {
      $scope.selectedTenant = "ALLTENANT";
      $scope.tenants = ["ALLTENANT"];
    } else {
      if (
        $scope.decry.tenants !== undefined &&
        $scope.decry.tenants.length > 0
      ) {
        $scope.selectedTenant = $scope.decry.tenants[0].ttitle;
        $scope.tenants = [$scope.decry.tenants[0].ttitle];
      }
    }
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
      $scope.sessionexpired = true;
      cognitoUser.getSession(function (err, session) {
        if (err) {
          swal({
            title: "Oops!",
            text: "Session has expired. Please Login again now.",
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

          $window.location.href = "#login";
          return;
        } else {
          $scope.token = session.idToken.jwtToken;
          $scope.sessionexpired = false;
          $scope.loaddashboard();
          $scope.getTenants();
          var lday = new Date();
          $scope.mdateb = moment.utc(lday).toDate().getTime();
          $scope.mdatea = moment.utc(lday).subtract(30, "d").toDate().getTime();
          $scope.mhandler($scope.mdatea);
        }
      });
      if ($scope.sessionexpired == true && $scope.decry.email != null) {
        $scope.loaddashboard();
        $scope.getTenants();
      }
    } else {
      $window.location.href = "#login";
    }
    $scope.mdateb = undefined;
    $scope.mdatea = undefined;
    swal.close();
    $scope.decry["activemenu"] = "dashboard";
    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );
    // localStorage.setItem("activemenu", 'dashboard');
    window.navigating = false;
  };

  $scope.getTenants = function () {
    var apigClient = apigClientFactory.newClient({
      invokeUrl: $scope.decry.api,
    });
    var params = {};
    var body = {
      oid: config.oid,
    };
    var additionalParams = {};
    if ($scope.decry.role == "Admin") {
      apigClient
        .getTenantsPost(params, body, additionalParams)
        .then(function (result) {
          var json = JSON.stringify(result.data);

          json = json.toString();

          json = JSON.parse(json);

          $scope.tenants = json.tenants;
          $scope.tenants.unshift({ BOID: "ALLTENANT", DOID: "ALLTENANT" });

          //$scope.orgtenants = angular.copy($scope.tenants);
          // $scope.tenantssearch = "";
          // $scope.$watch(
          //   "tenantssearch",
          //   function () {
          //     $scope.tenants = $scope.orgtenants.filter(function (item) {
          //       return item
          //         .toLowerCase()
          //         .toString()
          //         .includes($scope.tenantssearch.toLowerCase());
          //     });
          //     $scope.tenants.sort();
          //   },
          //   true
          // );
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
  $scope.getTenantData = function (tenantid) {
    if (tenantid.DOID === $scope.selectedTenant) {
    } else {
      $scope.selectedTenant = tenantid.DOID;
      $scope.loading = true;
      var apigClient = apigClientFactory.newClient({});
      var params = {};
      var body = {
        oid: tenantid.BOID,
      };

      var additionalParams = {};

      apigClient
        .getUserCountPost(params, body, additionalParams)
        .then(function (result) {
          var json = JSON.stringify(result.data);
          json = json.toString();

          $scope.analytics = JSON.parse(json);
          $scope.usercount = $scope.analytics.usercount;
          $scope.musercount = $scope.analytics.musers;
          $scope.tusers = $scope.analytics.users;
          $scope.ttopics = $scope.analytics.topics;

          var aaa = $scope.usercount.length;
          if (aaa > 0) aaa--;

          $scope.ausers =
            aaa == 0
              ? $scope.usercount === undefined || $scope.usercount.length === 0
                ? 0
                : $scope.usercount[0].UC
              : $scope.usercount[aaa].UC;
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
          var lday = new Date();
          $scope.mdateb = moment.utc(lday).toDate().getTime();
          $scope.mdatea = moment.utc(lday).subtract(30, "d").toDate().getTime();
          $scope.mhandler($scope.mdatea);
          $scope.user = true;
          $scope.content = false;
          //alert($scope.usercount.length)
          if ($scope.usercount.length > 7) {
            var a = $scope.usercount.length;
            var b = a - 7;
            $scope.weekdata = $scope.usercount.slice(b, a);
          } else {
            $scope.weekdata = $scope.usercount;
          }

          $scope.data1 = [
            {
              color: "#6E8EA5",
              key: "No. of Users",
              values: $scope.weekdata,
            },
          ];
          $scope.loading = false;
          $scope.$apply();
        })
        .catch(function (result) {
          var json = JSON.stringify(result);
          var json1 = json.toString();
          $scope.loading = false;
          // localStorage.clear();
          // $window.location.href = '#login';
        });
    }
  };

  $scope.mactiveusere = function () {
    $scope.tactive = false;
    $scope.mactive = true;
  };

  $scope.tactiveusere = function () {
    $scope.tactive = true;
    $scope.mactive = false;
  };

  $scope.loaddashboard = function () {
    var decoded = jwtHelper.decodeToken($scope.token);
    var userrole = decoded["cognito:groups"];
    $scope.analytics = JSON.parse(usercount);

    $scope.usercount = $scope.analytics.usercount;
    $scope.musercount = $scope.analytics.musers;
    $scope.tusers = $scope.analytics.users;
    $scope.ttopics = $scope.analytics.topics;

    $scope.tdev =
      +$scope.analytics.android +
      +$scope.analytics.iphone +
      +$scope.analytics.desktop;

    if ($scope.analytics.iphone > 0) {
      $scope.ios = (+$scope.analytics.iphone / +$scope.tdev) * 100;

      if ($scope.ios == Math.floor($scope.ios)) {
        $scope.ios = $scope.ios;
      } else {
        $scope.ios = $scope.ios.toFixed(2);
      }
    } else {
      $scope.ios = 0;
    }
    if ($scope.analytics.android > 0) {
      $scope.android = (+$scope.analytics.android / +$scope.tdev) * 100;
      if ($scope.android == Math.floor($scope.android)) {
        $scope.android = $scope.android;
      } else {
        $scope.android = $scope.android.toFixed(2);
      }
    } else {
      $scope.android = 0;
    }
    if ($scope.analytics.desktop > 0) {
      $scope.desktop = (+$scope.analytics.desktop / +$scope.tdev) * 100;
      if ($scope.desktop == Math.floor($scope.desktop)) {
        $scope.desktop = $scope.desktop;
      } else {
        $scope.desktop = $scope.desktop.toFixed(2);
      }
    } else {
      $scope.desktop = 0;
    }

    function utcformat(d) {
      d = new Date(d);
      var tail = "GMT",
        D = [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()],
        T = [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()];
      if (+T[0] > 12) {
        T[0] -= 12;
        tail = " pm " + tail;
      } else tail = " am " + tail;
      var i = 3;
      while (i) {
        --i;
        if (D[i] < 10) D[i] = "0" + D[i];
        if (T[i] < 10) T[i] = "0" + T[i];
      }
      return D.join("/") + " " + T.join(":") + tail;
    }
    $scope.tactive = true;
    $scope.mactive = false;
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
          /*staggerLabels: true,
			        	wrapLabels: true,*/
          tickFormat: function (d) {
            return d3.time.format.utc("%d-%b")(new Date(d));
          },
        },
        xScale: d3.time.scale.utc(),
        yAxis: {
          axisLabel: "No. Of Users",
        },
        title: {
          enable: true,
          text: "Real-time ",
          css: {
            "text-align": "center",
            color: "#fff",
          },
        },
      },
    };

    $scope.moptions1 = {
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
          /*staggerLabels: true,
			        	wrapLabels: true,*/
          tickFormat: function (d) {
            return d3.time.format.utc("%d-%b")(new Date(d));
          },
        },
        xScale: d3.time.scale.utc(),
        yAxis: {
          axisLabel: "No. Of Users",
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
          /*staggerLabels: true,
			        	wrapLabels: true,*/
          tickFormat: function (d) {
            return d3.time.format("%d-%b")(new Date(d));
          },
        },
        xScale: d3.time.scale.utc(),
        yAxis: {
          axisLabel: "No. Of Users",
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
          /*staggerLabels: true,
			        	wrapLabels: true,*/
          tickFormat: function (d) {
            return d3.time.format("%d-%b")(new Date(d));
          },
          rotateLabels: 30,
          staggerLabels: true,
        },
        xScale: d3.time.scale.utc(),
        yAxis: {
          axisLabel: "No. Of Users",
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
        color: " #B3BCC1",
      },
      {
        key: "Female",
        y: $scope.analytics.female,
        color: "#ABCCE8",
      },
      {
        key: "Unknown",
        y: $scope.analytics.unknown,
        color: "#D3B0B0",
      },
    ];

    var aaa = $scope.usercount.length;
    if (aaa > 0) aaa--;

    $scope.ausers =
      aaa == 0 ? $scope.usercount[0].UC : $scope.usercount[aaa].UC;

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
    //alert($scope.usercount.length)
    if ($scope.usercount.length > 7) {
      var a = $scope.usercount.length;
      var b = a - 7;
      $scope.weekdata = $scope.usercount.slice(b, a);
    } else {
      $scope.weekdata = $scope.usercount;
    }

    if ($scope.musercount.length > 30) {
      var a = $scope.musercount.length;
      var b = a - 30;
      $scope.mdata = $scope.musercount.slice(b, a);
    } else {
      $scope.mdata = $scope.musercount;
    }

    $scope.data1 = [
      {
        color: "#6E8EA5",
        key: "No. of Users",
        values: $scope.weekdata,
      },
    ];

    $scope.mdata1 = [
      {
        color: "#6E8EA5",
        key: "No. of Users",
        values: $scope.mdata,
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

  $scope.exportcsv = function (type) {
    var data = $scope.usercount;
    var months = [
      "JAN",
      "FEB",
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
    if (
      type != "dash" &&
      (($scope.datea !== undefined && $scope.dateb !== undefined) ||
        ($scope.mdatea !== undefined && $scope.mdateb !== undefined))
    ) {
      var a = $scope.datea;
      var b = $scope.dateb;
      if (type == "mon") {
        a = $scope.mdatea;
        b = $scope.mdateb;
      }

      //bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
      var bd =
        b.getDate().toString().length > 1 ? b.getDate() : "0" + b.getDate();
      var aday =
        a.getDate() + "-" + months[a.getMonth()] + "-" + a.getFullYear();
      var bday = bd + "-" + months[b.getMonth()] + "-" + b.getFullYear();
    } else {
      var a = new Date();
      var b = new Date();

      if (type == "mon") {
        b.setDate(b.getDate() - 30);
      } else {
        b.setDate(b.getDate() - 6);
      }
      //bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
      var bd =
        b.getDate().toString().length > 1 ? b.getDate() : "0" + b.getDate();
      var aday =
        a.getDate() + "-" + months[a.getMonth()] + "-" + a.getFullYear();
      var bday = bd + "-" + months[b.getMonth()] + "-" + b.getFullYear();
    }

    data = $scope.weekdata;
    var json_pre = [],
      larr = $scope.weekdata,
      tnm = "USER-ACTIVITY-DAILY";
    if (type == "mon") {
      larr = $scope.mdata;
      tnm = "USER-ACTIVITY-30-DAY-ROLLING";
    }
    let arrHeader = ["date", "count"];
    if (type == "dash") {
      var obj = {};
      obj.totalusers = $scope.tusers;
      obj.totalcourses = $scope.ttopics;
      obj.useractivetoday = $scope.ausers;
      obj.coursestartedtoday = $scope.analytics.tstarted;
      json_pre.push(obj);

      arrHeader = [
        "totalusers",
        "totalcourses",
        "useractivetoday",
        "coursestartedtoday",
      ];
      tnm = "DASHBOARD";
      var b = new Date();
      var bd =
        b.getDate().toString().length > 1 ? b.getDate() : "0" + b.getDate();
      var bday = bd + "-" + months[b.getMonth()] + "-" + b.getFullYear();
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
    if (type == "dash") {
      dwldLink.setAttribute(
        "download",
        $scope.selectedTenant + "-" + tnm + "-" + bday + ".csv"
      );
    } else if (
      ($scope.datea !== undefined && $scope.dateb !== undefined) ||
      ($scope.mdatea !== undefined && $scope.mdateb !== undefined)
    ) {
      dwldLink.setAttribute(
        "download",
        $scope.selectedTenant + "-" + tnm + "-" + aday + "-" + bday + ".csv"
      );
    } else {
      dwldLink.setAttribute(
        "download",
        $scope.selectedTenant + "-" + tnm + "-" + bday + "-" + aday + ".csv"
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
    if (type == "dash") {
      newHeaders = [
        "Total Users",
        "Total Courses",
        "User Active Today",
        "Course Started Today",
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

  $scope.comparedate = function (date1, date2) {
    if (date1.getUTCFullYear() > date2.getFullYear()) {
      return true;
    } else if (
      date1.getUTCFullYear() == date2.getFullYear() &&
      date1.getUTCMonth() > date2.getMonth()
    ) {
      return true;
    } else if (
      date1.getUTCFullYear() == date2.getFullYear() &&
      date1.getUTCMonth() == date2.getMonth() &&
      date1.getUTCDate() >= date2.getDate()
    ) {
      return true;
    } else {
      return false;
    }
  };
  $scope.comparedate1 = function (date1, date2) {
    if (date1.getUTCFullYear() < date2.getFullYear()) {
      return true;
    } else if (
      date1.getUTCFullYear() == date2.getFullYear() &&
      date1.getUTCMonth() < date2.getMonth()
    ) {
      return true;
    } else if (
      date1.getUTCFullYear() == date2.getFullYear() &&
      date1.getUTCMonth() == date2.getMonth() &&
      date1.getUTCDate() <= date2.getDate()
    ) {
      return true;
    } else {
      return false;
    }
  };
  $scope.comparedate2 = function (date1, date2) {
    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    ) {
      return true;
    } else {
      return false;
    }
  };
  $scope.handler = function (event) {
    $scope.dateb = event;
    if ($scope.datea != undefined) {
      var a = new Date($scope.datea.toDateString());
      var b = new Date($scope.dateb.toDateString());
      console.log(a + "=====" + b);
      if (a > b) {
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
            var adateflg = 0,
              bdateflg = 0;
            for (var i = 0; i < $scope.usercount.length; i++) {
              var c = new Date($scope.usercount[i].TS);

              //console.log($scope.comparedate(c,a) , $scope.comparedate1(c,b),$scope.usercount[i].TS)
              if ($scope.comparedate(c, a) && $scope.comparedate1(c, b)) {
                // if($scope.comparedate2(c,a)){
                // 	adateflg = 1;
                // }
                // if($scope.comparedate2(c,b)){
                // 	bdateflg = 1;
                // }
                //console.log($scope.usercount[i])
                $scope.userdata.push($scope.usercount[i]);
              }
              // if(cday >= aday && cday <= bday) {

              // 	$scope.userdata.push($scope.usercount[i]);
              // }
            }
          }
          if ($scope.userdata.length == 0) {
            //var dat = aday.getTime();
            $scope.userdata.push({ TS: a.getTime(), UC: 0 });
            //var dat1 = bday.getTime();
            $scope.userdata.push({ TS: b.getTime(), UC: 0 });
          }
          // if(adateflg == 0){

          // 	$scope.userdata.push({"TS":a.getTime(),"UC":0});
          // }
          // if(bdateflg == 0){
          // 	$scope.userdata.push({"TS":b.getTime(),"UC":0});
          // }
          $scope.userdata.sort(function (a, b) {
            return a.TS - b.TS;
          });
          //console.log(JSON.stringify($scope.userdata))
          $scope.weekdata = $scope.userdata;
          $scope.data1 = [
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
      // bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
      // bd = b.getDate().toString().length > 1 ? b.getDate() : "0"+b.getDate();
      // var aday = new Date(a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate());
      // var bday = new Date(b.getFullYear() + "-" + bm + "-" + bd);
      // aday = Date.UTC(aday.getUTCFullYear(),aday.getUTCMonth(), aday.getUTCDate());
      // bday = Date.UTC(bday.getUTCFullYear(),bday.getUTCMonth(), bday.getUTCDate());

      if (a > b) {
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
              if ($scope.comparedate(c, a) && $scope.comparedate1(c, b)) {
                $scope.userdata.push($scope.usercount[i]);
              }
            }
          }
          if ($scope.userdata.length == 0) {
            var dat = aday.getTime();
            $scope.userdata.push({ TS: a.getTime(), UC: 0 });
            var dat1 = bday.getTime();
            $scope.userdata.push({ TS: b.getTime(), UC: 0 });
          }
          $scope.weekdata = $scope.userdata;
          $scope.data1 = [
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
  $scope.mhandler = function (event) {
    $scope.mdatea = event;
    if ($scope.mdateb != undefined) {
      var a = new Date($scope.mdatea);
      var b = new Date($scope.mdateb);

      // bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
      // bd = b.getDate().toString().length > 1 ? b.getDate() : "0"+b.getDate();
      // var aday = new Date(a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate());
      // var bday = new Date(b.getFullYear() + "-" + bm + "-" + bd);
      // aday = Date.UTC(aday.getUTCFullYear(),aday.getUTCMonth(), aday.getUTCDate());
      // bday = Date.UTC(bday.getUTCFullYear(),bday.getUTCMonth(), bday.getUTCDate());

      if (a > b) {
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
        if ($scope.mdatea != "" && $scope.mdateb != "") {
          $scope.muserdata = [];
          if ($scope.musercount.length > 0) {
            var adateflg = 0;
            for (var i = 0; i < $scope.musercount.length; i++) {
              // var c = new Date($scope.musercount[i].TS);
              // cm = (c.getMonth() + 1).toString().length > 1 ? (c.getMonth() + 1) : ("0"+(c.getMonth() + 1));
              // cd = c.getDate().toString().length > 1 ? c.getDate() : "0"+c.getDate();
              // var cday = new Date(c.getFullYear() + "-" + cm + "-" + cd);
              // cday = Date.UTC(cday.getUTCFullYear(),cday.getUTCMonth(), cday.getUTCDate());
              // if(cday >= aday && cday <= bday) {
              // 	$scope.muserdata.push($scope.musercount[i]);
              // }

              var c = new Date($scope.musercount[i].TS);

              if ($scope.comparedate2(c, a)) {
                adateflg = 1;
              }
              if ($scope.comparedate(c, a) && $scope.comparedate1(c, b)) {
                $scope.muserdata.push($scope.musercount[i]);
              }
            }
            if (adateflg === 0) {
              $scope.muserdata.push({ TS: a.getTime(), UC: 0 });
            }
          }
          if ($scope.muserdata.length == 0) {
            //var dat = aday.getTime();
            $scope.muserdata.push({ TS: a.getTime(), UC: 0 });
            //var dat1 = bday.getTime();
            $scope.muserdata.push({ TS: b.getTime(), UC: 0 });
          }
          $scope.muserdata.sort(function (a, b) {
            return a.TS - b.TS;
          });
          $scope.mdata = $scope.muserdata;
          $scope.mdata1 = [
            {
              color: "#6E8EA5",
              key: "No. of Users",
              values: $scope.mdata,
            },
          ];
        }
      }
    }
  };
  $scope.mhandler1 = function (event) {
    $scope.mdateb = event;
    if ($scope.mdatea != undefined) {
      var a = new Date($scope.mdatea);
      var b = new Date($scope.mdateb);
      // bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
      // bd = b.getDate().toString().length > 1 ? b.getDate() : "0"+b.getDate();
      // var aday = new Date(a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate());
      // var bday = new Date(b.getFullYear() + "-" + bm + "-" + bd);
      // aday = Date.UTC(aday.getUTCFullYear(),aday.getUTCMonth(), aday.getUTCDate());
      // bday = Date.UTC(bday.getUTCFullYear(),bday.getUTCMonth(), bday.getUTCDate());

      if (a > b) {
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
        if ($scope.mdatea != "" && $scope.mdateb != "") {
          $scope.muserdata = [];
          if ($scope.musercount.length > 0) {
            var adateflg = 0;
            for (var i = 0; i < $scope.musercount.length; i++) {
              var c = new Date($scope.musercount[i].TS);

              if ($scope.comparedate2(c, a)) {
                adateflg = 1;
              }
              if ($scope.comparedate(c, a) && $scope.comparedate1(c, b)) {
                $scope.muserdata.push($scope.musercount[i]);
              }
            }

            if (adateflg === 0) {
              $scope.muserdata.push({ TS: a.getTime(), UC: 0 });
            }
          }
          if ($scope.muserdata.length == 0) {
            //var dat = aday.getTime();
            $scope.muserdata.push({ TS: a.getTime(), UC: 0 });
            //var dat1 = bday.getTime();
            $scope.muserdata.push({ TS: b.getTime(), UC: 0 });
          }

          $scope.muserdata.sort(function (a, b) {
            return a.TS - b.TS;
          });
          $scope.mdata = $scope.muserdata;
          $scope.mdata1 = [
            {
              color: "#6E8EA5",
              key: "No. of Users",
              values: $scope.mdata,
            },
          ];
        }
      }
    }
  };
  $scope.dash();
  $scope.gettenants1 = function () {
    $scope.loading = true;
    $scope.Instance = $uibModal.open({
      templateUrl: "viewtenants.html",
      controller: "viewtenantsCtrl",
      backdrop: "static",
      backdropClass: "modal1",
      keyboard: false,
      windowClass: "addnuggetmodal1",
      scope: $scope,
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
};

app.controller("dashboardCtrl", dashboardCtrl);
dashboardCtrl.$inject = [
  "$scope",
  "$http",
  "$location",
  "$window",
  "$uibModal",
  "jwtHelper",
  "$cookies",
  "config",
  "usercount",
  "$crypto",
];

app.factory("getusercount", function ($window, $q, config, $crypto) {
  return {
    getusercount: function () {
      var usercount, decry;

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
        usercount = getusersession();
      } else {
        localStorage.clear();
        $window.location.href = "#login";
      }

      function getdata(token) {
        var apigClient = apigClientFactory.newClient({ invokeUrl: decry.api });
        var params = {};

        var body = {
          oid: "ALLTENANT",
        };

        var additionalParams = {
          headers: { Authorization: token },
        };

        var data = apigClient
          .getUserCountPost(params, body, additionalParams)
          .then(function (result) {
            var json = JSON.stringify(result.data);
            var users = json.toString();

            return $q.when(users);
          })
          .catch(function (result) {
            var json = JSON.stringify(result);
            var json1 = json.toString();
            localStorage.clear();
            //	alert(json1)
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

      return $q.when(usercount);
    },
  };
});
