var assigncasedetailCtrl = function (
  $scope,
  $http,
  $location,
  $window,
  $uibModal,
  topic,
  config,
  $crypto,
  NgTableParams
) {
  $scope.getsessioncongnito = function (cognitoUser) {
    return new Promise((resolve, reject) => {
      cognitoUser.getSession((err, session) => {
        if (err) {
          swal({
            title: "Oops!",
            text: "Session has timed out, Please login again.",
            type: "error",
            width: "400px",
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonClass: "confirmClass",
            allowOutsideClick: false,
            allowEscapeKey: false,
            buttonsStyling: false,
          });
          localStorage.clear();
          $window.location.href = "#login";
        } else {
          var token = session.idToken.jwtToken;
          $scope.Credentialsweb("a", "a", "a", token);
        }
      });
    });
  };
  $scope.Credentialsweb = function (
    accessKeyId,
    secretAccessKey,
    sessionToken,
    token
  ) {
    if ($scope.decry.api === undefined) {
      var apigClient = apigClientFactory.newClient({});
    } else {
      var apigClient = apigClientFactory.newClient({
        invokeUrl: $scope.decry.api,
      });
    }
    var params = {};
    var body = {
      tenant: $scope.decry.tenant,
      oid: config.id,
      topicid: $scope.tid,
      eventtype: "Topic Viewed",
      email: $scope.decry.email,
    };
    var additionalParams = {
      headers: {
        Authorization: token,
      },
    };

    apigClient
      .analyticsWebAppPost(params, body, additionalParams)
      .then(function (result) {})
      .catch(function (result) {
        $scope.loading = false;
        $scope.$apply();
      });
  };

  $scope.nugget = function () {
    $scope.casedetail = topic;
   
    $scope.moment = moment;
    $scope.Math = window.Math;
    $scope.nexttopics = {};
    $scope.moid = config.id;
    $scope.decry = JSON.parse(
      $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
    );
    // $scope.decry.prescreen = "course";
    // $scope.decry.prescreenid = $location.search().id;
    // localStorage.setItem(
    //   "786a2y1e",
    //   $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    // );
    $scope.ctype = $scope.decry.ctype;
   
    if ($scope.casedetail == false) {
      $scope.errorpage = true;
      $scope.othererrmsg = true;
      if ($scope.online == false) {
        $scope.othererrmsg = false;
      }
      if ($scope.online == true) {
        $scope.showpage = true;
      }
    } else {
      if ($scope.decry.email == null || $scope.decry.email == "") {
        localStorage.clear();
        $window.location.href = "#login";
      } else {
        $scope.casedetail = JSON.parse($scope.casedetail);

        $scope.tid = $scope.casedetail.tid;
        $scope.tp = $scope.casedetail.tp;
        $scope.newtopic = $scope.casedetail.newtopic;

        if ($scope.casedetail.tp != 0 || $scope.casedetail.tp != "0") {
          if ($scope.casedetail.tp.charAt(0) != 1) {
            var tptotal = "2";
            for (var i = 0; i < $scope.casedetail.nuggets.length; i++) {
              tptotal = tptotal + "-" + "2";
            }
            $scope.casedetail.tp = tptotal;
          }

          $scope.progressimage = $scope.casedetail.tp.split("-");
        } else {
          $scope.progressimage = 0;
        }

        if ($scope.tp == 0) {
          $scope.completed = 0;
          $scope.comp = 0;
          $scope.objectprogress = 0;

          if (
            $scope.casedetail.duedate == undefined ||
            $scope.casedetail.duedate == false ||
            $scope.casedetail.duedate == "false"
          ) {
            $scope.duedate = false;
          }
        } else {
          $scope.tpc = $scope.tp.substring(0, 1);
          $scope.claimcert = false;
          $scope.hascert = $scope.casedetail.certification;
          if ($scope.hascert == "true" || $scope.hascert == true) {
            $scope.hascert = true;
          } else {
            $scope.hascert = false;
          }

          if (
            $scope.casedetail.duedate == undefined ||
            $scope.casedetail.duedate == false ||
            $scope.casedetail.duedate == "false"
          ) {
            $scope.duedate = false;
          } else {
            $scope.duedate = $scope.casedetail.duedate;
            var diff = moment.utc($scope.duedate).fromNow();
            if (diff.includes("ago")) {
              diff = "Overdue";
            }
            $scope.duedate = diff;
          }
          if ($scope.tpc == 3) {
            $scope.viewcert = true;
          }
          if ($scope.tpc == 2 || $scope.tpc == 3) {
            if ($scope.tpc == 2 && $scope.hascert == true) {
              $scope.claimcert = true;
            }
            $scope.duedate = false;
            $scope.tpc = 2;
          } else {
            $scope.tpc = 1;
          }

          $scope.decry["tpc"] = $scope.tpc;
          $scope.noofnuggets = ($scope.tp.match(/-/g) || []).length;
          $scope.comp = 0;
          if ($scope.tp.charAt(0) == 2 || $scope.tp.charAt(0) == 3) {
            $scope.comp = $scope.casedetail.noofnuggets;
          } else {
            for (var k = 2; k < $scope.tp.length; k++) {
              //alert($scope.topics[i].tp.substring(k, (+k + +1)));
              if ($scope.tp.substring(k, +k + +1) == 2) {
                $scope.comp++;
              }
              k++;
            }
          }

          $scope.completed = ($scope.comp / $scope.noofnuggets) * 100;

          if ($scope.completed == Math.floor($scope.completed)) {
            $scope.completed = $scope.completed;
          } else {
            var n = $scope.completed.toFixed(2);
            $scope.completed = n;
          }
          $scope.completed = $scope.completed;
        }

        $scope.tdescription = $scope.casedetail.tdescription;
        $scope.noofnuggets = $scope.casedetail.noofnuggets;
        $scope.tduration = $scope.casedetail.tduration;
        $scope.nuggets = $scope.casedetail.nuggets;

        $scope.freenavigation = $scope.casedetail.freenavigation;

        if ($scope.tp != 0) {
          if (
            $scope.tp.substring(0, 1) == 2 &&
            $scope.casedetail.certification == true
          ) {
            $scope.claimcert = true;
          }
          if (
            $scope.tp.substring(0, 1) == 3 &&
            $scope.casedetail.certification == true
          ) {
            $scope.viewcert = true;
          }
        }
        $scope.lcapsule = true;
        $scope.assessment = false;
        $scope.topicimg =
          config.url +
          config.id.toLowerCase() +
          "-resources/images/topic-images/" +
          $scope.tid +
          ".png";
        $scope.bimage = "url('" + $scope.topicimg + "')";
        $scope.myObj = {
          "background-color": "grey",
          overflow: "hidden",
          "background-image": $scope.bimage,
          "background-size": "cover",
          "background-repeat": "no-repeat",
        };
        $scope.activenugget = $scope.comp;

        //$scope.objectprogress1 = $scope.objectprogress;
      }
      if (
        $scope.casedetail.tstatus === true ||
        $scope.casedetail.tstatus == "true"
      ) {
        $scope.updateobjectview();
      }

      $scope.imgurl = config.url;
      $scope.oid = config.id.toLowerCase();
      if ($window.innerWidth > 0) {
        $scope.showapppage = false;
        $scope.showpage = true;
      } else {
        $scope.showpage = false;
        $scope.showapppage = true;
      }
      $scope.divheight = { "min-height": +$window.innerHeight - 220 };
      if ($window.innerWidth > 1024) {
        $scope.secondwidth = +$window.innerWidth - +224;
      } else {
        $scope.secondwidth = +$window.innerWidth - +65;
      }
      $scope.second = { width: $scope.secondwidth };
      $(window).resize(function () {
        $scope.$apply(function () {
          $scope.divheight = { "min-height": +$window.innerHeight - 220 };
          $scope.windowWidth = $(window).width();
          if ($scope.windowWidth < 0) {
            $scope.showpage = false;
            $scope.showapppage = true;
            swal.close();
            $scope.Instance.close(true);
          }
          if ($scope.windowWidth > 0) {
            $scope.showpage = true;
            $scope.showapppage = false;
          }
          if ($scope.windowWidth < 1023) {
            $scope.secondwidth = +$window.innerWidth - +65;
            $scope.second = { width: $scope.secondwidth };
          }
          if ($scope.windowWidth > 1024) {
            $scope.secondwidth = +$window.innerWidth - +224;
            $scope.second = { width: $scope.secondwidth };
          }
        });
      });
    }
    $scope.$watch("online", function () {
      if ($scope.online == true) {
        if ($scope.errorpage == true) {
          $scope.loading = true;

          $window.location.href = "#viewassigncase";
        } else {
          $scope.loading = false;
        }
      } else {
        $scope.loading = false;
      }
    });

    window.navigating = false;
    //$scope.getassessment();
    $scope.topicclass = { "margin-left": "15%" };
    $scope.selected = 0;
  };

  $scope.updateobjectview = function () {
    $scope.decry = JSON.parse(
      $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
    );
    if ($scope.decry.api === undefined) {
      var apigClient = apigClientFactory.newClient({});
    } else {
      var apigClient = apigClientFactory.newClient({
        invokeUrl: $scope.decry.api,
      });
    }

    var params = {};
    var body = {
      oid: config.id,
      tid: $scope.topic.tid,
      title: $scope.topic.ttitle,
      eid: $scope.decry.email,
      type: "topic",
      pdate: new Date().getTime(),
      tduration: $scope.topic.tduration,
      noofnuggets: $scope.topic.noofnuggets,
      tenant: $scope.decry.tenant,
    };
    console.log(JSON.stringify(body));

    var additionalParams = {};
    apigClient
      .updateRecentViewedPost(params, body, additionalParams)
      .then(function (result) {
        // do nothing
        console.log(body);
      })
      .catch(function (result) {});
  };
  $scope.getassessment = function () {
    $scope.decry = JSON.parse(
      $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
    );
    if ($scope.decry.api === undefined) {
      var apigClient = apigClientFactory.newClient({});
    } else {
      var apigClient = apigClientFactory.newClient({
        invokeUrl: $scope.decry.api,
      });
    }

    var params = {};
    var body = {
      oid: config.id,
      quizid: $scope.casedetail.assessment.assid,
      eid: $scope.decry.email,
      tenant: $scope.decry.tenant,
    };
    console.log(JSON.stringify(body));

    var additionalParams = {};
    apigClient
      .getQuizPost(params, body, additionalParams)
      .then(function (result) {
        // do nothing

        var jsonl = JSON.stringify(result.data);

        $scope.jsobj = JSON.parse(jsonl);

        $scope.inProgress = true;
        $scope.isnext = true;
        $scope.quiz = $scope.jsobj.qid;
        $scope.qitems = $scope.jsobj.qitems.length;
        $scope.cutoff =
          $scope.jsobj.cutoff != undefined ? $scope.jsobj.cutoff : 75;

        $scope.questions = $scope.jsobj.qitems;
        $scope.itemsPerPage = 1;
        $scope.currentPage = 1;
        $scope.score = 0;
        $scope.submit = false;

        $scope.quizOver = false;
        $scope.isenable = false;

        $scope.qlen = $scope.jsobj.qitems.length;
        if (
          ($scope.jsobj.qtype == "1" || $scope.jsobj.qtype == 1) &&
          $scope.jsobj.qtype != undefined
        ) {
          $scope.cutoff = 0;
        }

        if ($scope.jsobj.qtype == "0" && $scope.jsobj.qtype != undefined) {
          $scope.submit = false;
          $scope.issnext = true;
          $scope.isnext = false;
          if ($scope.qlen == "1" || $scope.qlen == 1) {
            $scope.submit = false;
            $scope.issnext = true;
            $scope.isenable = false;
          }
        } else {
          $scope.isnext = true;
          $scope.issnext = false;
          if ($scope.qlen == "1" || $scope.qlen == 1) {
            $scope.submit = true;
            $scope.isnext = false;
            $scope.issnext = false;
            $scope.isenable = false;
          }
        }
        $scope.$watch("currentPage + itemsPerPage", function () {
          $scope.showimage = false;
          var begin = ($scope.currentPage - 1) * $scope.itemsPerPage,
            end = begin + $scope.itemsPerPage;

          if (
            $scope.jsobj.qitems[begin].image == "true" ||
            $scope.jsobj.qitems[begin].image == true
          ) {
            $scope.showimage = true;
            $scope.imageurl = $scope.jsobj.qitems[begin].imageurl;
          }
          $scope.filteredQuestions = $scope.questions.slice(begin, end);
          $scope.completed = ($scope.currentPage / $scope.qitems) * 100;
        });
        $scope.$apply();
      })
      .catch(function (result) {
        // alert(result)
      });
  };
  $scope.goTo = function (index) {
    if (index == $scope.qitems) {
      $scope.isnext = false;
      $scope.isenable = false;
      if ($scope.jsobj.qtype == "0" && $scope.jsobj.qtype != undefined) {
        $scope.submit = false;
      } else {
        $scope.submit = true;
      }
    }
    if (index > 1) {
      $scope.ispreenable = true;
    }
    if (index > 0 && index <= $scope.qitems) {
      $scope.currentPage = index;
      $scope.inProgress = true;
      $scope.isenable = false;
    }
    // if (
    //   $scope.questions[index - 1].qtype == 0 &&
    //   $scope.questions[index - 1].iopts[0].Selected !== undefined
    // ) {
    //   $scope.isenable = true;
    // }

    if ($scope.questions[index - 1].response !== undefined) {
      $scope.isenable = true;
    }
  };
  $scope.goTopre = function (index) {
    if (index > 1) {
      $scope.ispreenable = true;
      $scope.isenable = true;
    } else {
      $scope.ispreenable = false;
      $scope.isenable = true;
    }
    $scope.isnext = true;
    $scope.submit = false;
    if (index > 0 && index <= $scope.qitems) {
      $scope.currentPage = index;
    }
  };
  $scope.change = function (question, option) {
    $scope.isenable = true;
    var tmpres = 0;
    question.iopts.forEach(function (element, index, array) {
      if (element.content != option.content) {
        element.Selected = false;
      }
      if (element.content == option.content) {
        element.response = index;
        tmpres = index;
      } else {
        element.response = -1;
      }
    });
    question.response = tmpres;
  };
  $scope.onsubmit = function () {
    if ($scope.online === true) {
      $scope.loading = true;
      // var tmparr = angular.copy($scope.questions);
      for (var j = 0; j < $scope.questions.length; j++) {
        delete $scope.questions[j].iopts;
        delete $scope.questions[j]["$$hashKey"];
      }
      console.log($scope.questions);
      $scope.responsesave();
    }
  };
  $scope.responsesave = function () {
    var obj = {};
    obj.response = $scope.questions;
    $scope.decry = JSON.parse(
      $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
    );
    if ($scope.decry.api === undefined) {
      var apigClient = apigClientFactory.newClient({});
    } else {
      var apigClient = apigClientFactory.newClient({
        invokeUrl: $scope.decry.api,
      });
    }

    var params = {};
    var body = {
      tenant: $scope.decry.tenant,
      quizdata: obj,
      eid: $scope.decry.email,
      quizid: $scope.casedetail.assessment.assid,
      oid: config.id,
      cid: $scope.tid,
    };

    var additionalParams = {};
    apigClient
      .uploadAssignmentPost(params, body, additionalParams)
      .then(function (result) {
        $scope.casecomplete();
      })
      .catch(function (result) {});
  };
  $scope.nugget();

  $scope.mytopics = function () {
    if ($scope.online == true) {
      var decrypted = $crypto.decrypt(
        localStorage.getItem("786a2y1e"),
        config.key
      );
      $scope.decry = JSON.parse(decrypted);

      if ($scope.decry.osearch === true) {
        $scope.loading = true;
        delete $scope.decry["osearch"];
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#search";
      } else if ($scope.decry.allcourse === true) {
        $scope.loading = true;
        delete $scope.decry["allcourse"];
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#allcourse";
      } else if ($scope.decry.explore === true) {
        $scope.loading = true;
        delete $scope.decry["explore"];
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#explore";
      } else if ($scope.decry.bookmark === true) {
        $scope.loading = true;
        delete $scope.decry["bookmark"];
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#bookmarks";
      } else {
        $scope.loading = true;
        delete $scope.decry["otopicid"];
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        $window.location.href = "#home";
      }
    }
  };

  $scope.subscribe = function () {
    if (
      $scope.online === true &&
      ($scope.topic.prerequisites === undefined ||
        $scope.topic.prerequisites === false ||
        $scope.topic.prerequisites === "false")
    ) {
      $scope.starttopic();
    } else if (
      $scope.online == true &&
      ($scope.topic.prerequisites === "true" ||
        $scope.topic.prerequisites === true)
    ) {
      let preflg = 0;

      for (let i = 0; i < $scope.topic.prerequisitescourses.length; i++) {
        if (
          $scope.topic.prerequisitescourses[i].tid in $scope.topic.topicprogress
        ) {
          if (
            String(
              $scope.topic.topicprogress[
                $scope.topic.prerequisitescourses[i].tid
              ].charAt(0)
            ) !== "2" &&
            String(
              $scope.topic.topicprogress[
                $scope.topic.prerequisitescourses[i].tid
              ].charAt(0)
            ) !== "3"
          ) {
            preflg = 1;
            $scope.nexttopics.title =
              $scope.topic.prerequisitescourses[i].ttitle;
            $scope.nexttopics.tid = $scope.topic.prerequisitescourses[i].tid;
            break;
          }
          preflg = 0;
        } else {
          $scope.nexttopics.title = $scope.topic.prerequisitescourses[i].ttitle;
          $scope.nexttopics.tid = $scope.topic.prerequisitescourses[i].tid;
          preflg = 1;
          break;
        }
      }

      if ($scope.topic.prerequisitescourses === undefined && preflg === 0) {
        preflg = 1;
      }

      if (preflg === 0) {
        $scope.starttopic();
      } else {
        var ptag = "";

        if (
          $scope.topic.prerequisitestype !== undefined &&
          $scope.online == true &&
          $scope.topic.prerequisitestype == "Required"
        ) {
          for (let i = 0; i < $scope.topic.prerequisitescourses.length; i++) {
            ptag =
              ptag +
              '<p class="classtags">' +
              $scope.topic.prerequisitescourses[i].ttitle +
              "</p>";
            if (i === $scope.topic.prerequisitescourses.length - 1) {
              swal(
                {
                  html:
                    '<p class="classtags1"> Please complete the below prerequisite course in order to enable you to start ' +
                    $scope.ttitle +
                    "</p>" +
                    '<br><br><a class="acolor" id="btnA" >' +
                    $scope.nexttopics.title +
                    "</a>",
                  type: "warning",
                  showConfirmButton: true,
                  confirmButtonText: "Cancel",
                  confirmButtonClass: "confirmClass",
                  buttonsStyling: false,
                },
                function () {}
              );
            }
          }
        } else if (
          $scope.online === true &&
          ($scope.topic.prerequisitestype === undefined ||
            $scope.topic.prerequisitestype == "" ||
            $scope.topic.prerequisitestype == "Suggestion")
        ) {
          for (let i = 0; i < $scope.topic.prerequisitescourses.length; i++) {
            ptag =
              ptag +
              '<p class="classtags">' +
              $scope.topic.prerequisitescourses[i].ttitle +
              "</p>";
            if (i === $scope.topic.prerequisitescourses.length - 1) {
              swal({
                html:
                  ptag +
                  "</br>" +
                  "</br>" +
                  '<p style="color:#484848;">These are the recommended prerequisites for this course. Click "Cancel" below to start a prerequisite course, or click "OK to continue with this course.</p>',
                type: "warning",
                width: "400px",
                showCancelButton: true,
                cancelButtonText: "Cancel",
                showConfirmButton: true,
                confirmButtonText: "Ok",
                customClass: "sweetalert-lgs",
                confirmButtonClass: "confirmClass",
                buttonsStyling: false,
                cancelButtonClass: "cancelClass",
                allowOutsideClick: false,
              }).then((result) => {
                if (result.value) {
                  if ($scope.online == true) {
                    $scope.loading = true;
                    $scope.$apply();
                    $scope.subscribeon();
                  }
                } else if (result.dismiss === swal.DismissReason.cancel) {
                }
              });
            }
          }
        }

        // swal({
        // 	text: "Please complete all prerequisite courses.",
        // 	type: 'warning',
        // 	width: '400px',
        // 	showCancelButton: false,
        // 	showConfirmButton: true, confirmButtonText: 'OK',
        // 	customClass: 'sweetalert-lgs',
        // 	confirmButtonClass: 'confirmClass',
        // 	buttonsStyling: false,
        // 	allowOutsideClick: false
        // }).then((result) => {

        // })
      }
    }
  };
  $(document).on("click", "#btnA", function () {
    if ($scope.online == true && $scope.nexttopics.tid !== undefined) {
      if (swal.isVisible()) {
        swal.close();
      }
      $scope.loading = true;
      $scope.decry = JSON.parse(
        $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
      );
      $scope.decry["otopicid"] = $scope.nexttopics.tid;
      localStorage.setItem(
        "786a2y1e",
        $crypto.encrypt(JSON.stringify($scope.decry), config.key)
      );
      window.navigating = true;
      $window.location.href = "#viewassigncase";
    }
  });
  $scope.starttopic = function () {
    swal({
      text: "Get started with the Case?",
      type: "warning",
      width: "400px",
      showCancelButton: true,
      cancelButtonText: "No",
      showConfirmButton: true,
      confirmButtonText: "Yes",
      customClass: "sweetalert-lgs",
      confirmButtonClass: "confirmClass",
      buttonsStyling: false,
      cancelButtonClass: "cancelClass",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        if ($scope.online == true) {
          $scope.loading = true;
          $scope.$apply();

          $scope.subscribeon();
        }
      } else if (result.dismiss === swal.DismissReason.cancel) {
      }
    });
  };

  $scope.subscribeon = function () {
    $scope.decry = JSON.parse(
      $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
    );

    var fbuser = localStorage.getItem("fbuser");
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

    if (cognitoUser != null && $scope.decry.id != null) {
      $scope.getsession(cognitoUser, "subscribe");
    } else if (fbuser != null) {
      $scope.getfbdatasession("subscribe");
    } else {
      localStorage.clear();
      $window.location.href = "#login";
    }
  };
  $scope.casecomplete = function () {
    $scope.decry = JSON.parse(
      $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
    );

    var fbuser = localStorage.getItem("fbuser");
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

    if (cognitoUser != null && $scope.decry.id != null) {
      $scope.getsession(cognitoUser, "casecomplete");
    } else {
      localStorage.clear();
      $window.location.href = "#login";
    }
  };

  $scope.getsession = function (cognitoUser, reDirect) {
    return new Promise((resolve, reject) => {
      cognitoUser.getSession((err, session) => {
        if (err) {
          swal({
            title: "Oops!",
            text: "Session has timed out, Please login again.",
            type: "error",
            width: "400px",
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonClass: "confirmClass",
            allowOutsideClick: false,
            allowEscapeKey: false,
            buttonsStyling: false,
          });
          localStorage.clear();
          $window.location.href = "#login";
        } else {
          var token = session.idToken.jwtToken;

          if (reDirect == "subscribe" || reDirect == "casecomplete") {
            $scope.securesubscribeon(token, reDirect);
          } else if (reDirect == "certClaim") {
            $scope.claimcertificateon(token);
          } else if (reDirect == "star") {
            $scope.staringon(token);
          } else if (reDirect == "viewCert") {
          } else {
          }

          resolve();
        }
      });
    });
  };

  $scope.securesubscribeon = function (token, reDirect) {
    if ($scope.decry.api === undefined) {
      var apigClient = apigClientFactory.newClient({});
    } else {
      var apigClient = apigClientFactory.newClient({
        invokeUrl: $scope.decry.api,
      });
    }
    var params = {};
    var logintype;
    if (localStorage.getItem("fbuser") != null) {
      logintype = "Facebook";
    } else {
      logintype = "Cognito";
    }
    var body = {
      id: $scope.decry.id,
      iid: $scope.decry.iid,
      status: "new",
      key: $scope.tid,
      version: $scope.version,
      tnuggets: $scope.nuggets.length,
      nav: $scope.freenavigation,
      email: $scope.decry.email,
      logintype: "Cognito",
    };

    if ($scope.casedetail.tobj != undefined) {
      body.tobj = $scope.casedetail.tobj;
      body.tvid = $scope.casedetail.tvid;
      body.tdoc = $scope.casedetail.tdoc;
      body.tfq = $scope.casedetail.tfq;
      body.tsq = $scope.casedetail.tsq;
      body.tasmt = $scope.casedetail.tasmt;
    }
    if (reDirect == "casecomplete") {
      body.status = "nav";
    }

    var additionalParams = {
      headers: {
        Authorization: token,
      },
    };

    apigClient
      .syncUserDataWebPost(params, body, additionalParams)
      .then(function (result) {
        if (reDirect == "casecomplete") {
          $window.location.href = "#viewassigncase";
        } else {
          if ($scope.decry.api === undefined) {
            var apigClient = apigClientFactory.newClient({});
          } else {
            var apigClient = apigClientFactory.newClient({
              invokeUrl: $scope.decry.api,
            });
          }

          var params = {};
          var body = {
            tenant: $scope.decry.tenant,
            oid: config.id,
            topicid: $scope.tid,
            eventtype: "Topic Subscribed",
            email: $scope.decry.email,
            id: $scope.decry.id,
            gender: "Unknown",
            logintype: "Cognito",
          };
          var additionalParams = {
            headers: {
              Authorization: token,
            },
          };

          apigClient
            .analyticsWebAppPost(params, body, additionalParams)
            .then(function (result) {
              $scope.loading = true;
              //$scope.updateCourseAnalytics($scope.tid, "sub");
              $scope.decry["nid"] = $scope.casedetail.nuggets[0].nid;
              $scope.decry["object"] = 0;
              $scope.decry["freenavigation"] = $scope.freenavigation;
              $scope.decry["tname"] = $scope.ttitle;
              $scope.decry["nuggets"] = $scope.noofnuggets;
              $scope.decry["tp"] = 1;
              $scope.decry["op"] = 0;
              $scope.decry["ttype"] =
                $scope.casedetail.ctype == undefined
                  ? "regular"
                  : $scope.casedetail.ctype;
              localStorage.setItem(
                "786a2y1e",
                $crypto.encrypt(JSON.stringify($scope.decry), config.key)
              );

              $window.location.href = "#viewassigncase";
            })
            .catch(function (result) {
              $window.location.href = "#viewassigncase";
            });
        }
      })
      .catch(function (result) {
        $window.location.href = "#viewassigncase";
        var json = JSON.stringify(result);
        var json1 = json.toString();
      });
  };
  $scope.prescreen = function (prepage) {
    if ($scope.online == true) {
      $scope.loading = true;
      var decrypted = $crypto.decrypt(
        localStorage.getItem("786a2y1e"),
        config.key
      );
      $scope.decry = JSON.parse(decrypted);
      delete $scope.decry["otopicid"];
      delete $scope.decry["ctype"];
      delete $scope.decry["cgry"];

      if ($scope.decry.prescreen == "Home") {
        delete $scope.decry.prescreen;
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );

        window.navigating = true;
        $window.location.href = "#home";
      }
      if ($scope.decry.prescreen == "My case box") {
        delete $scope.decry.prescreen;
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );
        window.navigating = true;
        $window.location.href = "#mycase";
      }
    }
  };
};

app.controller("assigncasedetailCtrl", assigncasedetailCtrl);
assigncasedetailCtrl.$inject = [
  "$scope",
  "$http",
  "$location",
  "$window",
  "$uibModal",
  "topic",
  "config",
  "$crypto",
  "NgTableParams",
];

app.factory("getTopic", function ($window, $q, config, $crypto, $location) {
  return {
    getTopic: function () {
      if (localStorage.getItem("786a2y1e") != undefined) {
        var decrypted = $crypto.decrypt(
          localStorage.getItem("786a2y1e"),
          config.key
        );
        var decry = JSON.parse(decrypted);
        var topicdata;

        AWSCognito.config.region = config.reg;
        AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: decry.iid,
        });
        delete decry.masterConfig;

        var poolData = {
          UserPoolId: config.uid,
          ClientId: config.cid,
        };

        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(
          poolData
        );
        var fbuser = localStorage.getItem("fbuser");
        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null ) {
          topicdata = getusersession();
        } else {
          if (
            $location.search().id !== undefined &&
            $location.search().id !== null
          ) {
            $window.sessionStorage.setItem("courseid", $location.search().id);
          }
          localStorage.clear();
          $window.location.href = "#ogin";
        }

        function getdata(accessKeyId, secretAccessKey, sessionToken, token) {
          if (decry.api === undefined) {
            var apigClient = apigClientFactory.newClient({});
          } else {
            var apigClient = apigClientFactory.newClient({
              invokeUrl: decry.api,
            });
          }
          var params = {};
          var additionalParams = {
            headers: {
              Authorization: token,
            },
          };

          var body = {
            id: decry.id,
            iid: config.iid,
          };
          var newtopic = true;
          var tp = 0;
          var opk = 0;
          var op = 0;
          var cobj = 0;
          var cvid = 0;
          var cdoc = 0;
          var cfq = 0;
          var csq = 0;
          var casmt = 0;

          var body1 = {
            tenant: decry.tenants[0],
            oid: config.oid,
            topicid: decry.otopicid,
          };

          var topics1 = apigClient
            .gettopicPost(params, body1, additionalParams)
            .then(function (result) {
              var json = JSON.stringify(result.data);

              var topicjson = json.toString();
             
              topicjson = JSON.parse(topicjson);

              topicjson.newtopic = newtopic;
              topicjson.tp = tp;
              topicjson.opk = opk;
              topicjson.op = op;
              topicjson.cobj = cobj;
              topicjson.cvid = cvid;
              topicjson.cdoc = cdoc;
              topicjson.cfq = cfq;
              topicjson.csq = csq;
              topicjson.casmt = casmt;
              topicjson.quizscores = 0;
              topicjson.topicprogress = topicprogress;

              var body = {
                orgid: decry.tenants[0],
                tenant: decry.tenants[0],
                tid: decry.otopicid,
                oid: config.oid,
              };

              var topics2 = apigClient
                .listTopicsPost(params, body, additionalParams)
                .then(function (result) {
                  // topicjson.avgstar =
                  //   result.data[0].STAR != undefined
                  //     ? Math.round(result.data[0].STAR.avg)
                  //     : 0;
                  topicjson.avgstar = 0;

                  topicjson = JSON.stringify(topicjson);
                 
                  return topicjson;
                })
                .catch(function (result) {
                  topicjson = JSON.stringify(topicjson);
                  return $q.when(topicjson);
                });
              return $q.when(topics2);
            })
            .catch(function (result) {
           
              return $q.when(false);
            });
        
          return $q.when(topics1);
        }

        function getusersession() {
          return new Promise((resolve, reject) => {
            cognitoUser.getSession((err, session) => {
              if (err) {
                swal({
                  title: "Oops!",
                  text: "Session has timed out, Please login again.",
                  type: "error",
                  width: "400px",
                  showConfirmButton: true,
                  confirmButtonText: "Ok",
                  confirmButtonClass: "confirmClass",
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  buttonsStyling: false,
                });
                localStorage.clear();
                $window.location.href = "#login";
              } else {
                //alert(session)
                var token = session.idToken.jwtToken;

                //var abcc = gettoken(token, '0');
                var abcc = getdata("a", "a", "a", token);
                resolve(abcc);
                return $q.when(abcc);
              }
            });
          });
        }

        return $q.when(topicdata);
      } else {
        if (
          $location.search().id !== undefined &&
          $location.search().id !== null
        ) {
          $window.sessionStorage.setItem("courseid", $location.search().id);
        }
        localStorage.clear();
        $window.location.href = "#login";
      }
    },
  };
});
