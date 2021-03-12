"use strict";
var messageCtrl = function (
  $scope,
  $http,
  $location,
  $window,
  $uibModal,
  NgTableParams,
  config,
  $crypto
) {
  // const socket = io();
  $scope.allcourses = true;
  $scope.message = function () {
    $scope.imgurl = config.url;
    $scope.decry = JSON.parse(
      $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
    );
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
    $scope.getusers();

    // console.log($scope.analytics);

    //localStorage.setItem("activemenu", 'contrep');
    window.navigating = false;
  };
  $scope.getusers = function () {
    var apigClient = apigClientFactory.newClient();
    var params = {};
    var body = {
      oid: $scope.decry.tenants[0],
      ulist: "1",
    };
    var additionalParams = {};
    apigClient
      .getUserCountPost(params, body, additionalParams)
      .then(function (result) {
        var json = JSON.stringify(result.data);
        $scope.userslist = JSON.parse(json);
        var user = JSON.parse(json);
        $scope.decry["connecteduser"] = user.userlist;
        localStorage.setItem(
          "786a2y1e",
          $crypto.encrypt(JSON.stringify($scope.decry), config.key)
        );

        // console.log($scope.userslist.userlist);
        $scope.$apply();
      })
      .catch(function (result) {
        var json = JSON.stringify(result);
        var json1 = json.toString();
      });
  };
  $scope.message();

  $scope.sendMsg = function () {};
  // var data = $scope.decry;
  // console.log(data);

  // var usercred = {
  //   email: data.email,
  //   username: data.username,
  // };

  // console.log(usercred);
  // socket.emit("loggedin", usercred);
  $scope.class = "msg-overlay-list-bubble--is-minimized";
  $scope.onExpanded = function () {
    if ($scope.class === "msg-overlay-list-bubble--is-minimized") {
      $scope.class = "msg-overlay-list-bubble--expanded-tall";
      console.log($scope.img);
    } else {
      $scope.class = "msg-overlay-list-bubble--is-minimized";
    }
  };

  $scope.privateRoom = function (uname, eid) {
    var room = document.getElementById("msg-overlay");

    if (room.children.length < 2) {
      const div = document.createElement("div");
      div.classList.add(
        "msg-overlay-conversation-bubble",
        "msg-overlay-conversation-bubble--default-inactive",
        "ml4",
        "msg-overlay-conversation-bubble--is-active",
        "msg-overlay-conversation-bubble--petite"
      );
      div.innerHTML = `<header
    class="msg-overlay-bubble-header msg-overlay-conversation-bubble--header flex-shrink-zero"
  >
    <div class="presence-entity presence-entity--size-1">
      <img
        src="https://media-exp1.licdn.com/dms/image/C5603AQEjWDsW6h0iTQ/profile-displayphoto-shrink_100_100/0/1599010528711?e=1620259200&v=beta&t=VXVHyAk0OzOrLLPAjCe4wLNQpsUsyKV3QdSlbpDo54Y"
        alt=""
        class="presence-entity__image EntityPhoto-circle-1 lazy-image ember-view"
      />
      <div
        class="presence-entity__indicator presence-entity__indicator--size-1 presence-indicator presence-indicator--is-reachable presence-indicator--size-1"
      ></div>
    </div>
    <section
      class="msg-overlay-bubble-header__details pv1 flex-column"
      style="display: flex; flex-direction: column"
    >
      <div
        class="display-flex flex-column justify-center overflow-hidden pl2"
      >
        <h4
          class="msg-overlay-bubble-header__title truncate t-14 t-bold t-black pr1"
          style="margin: 0 !important; text-align: left !important"
        >
          ${uname}
        </h4>
        <div class="truncate t-12 t-normal t-black">
          Mobile
          <span class="ph1">.</span>
          16h ago
        </div>
      </div>
    </section>
    <section
      class="msg-overlay-bubble-header__controls display-flex"
      style="margin-left: 8rem !important"
    >
      <button
        class="msg-overlay-bubble-header__controls--btn artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--1 artdeco-button--tertiary"
      >
        <svg class="msg-overlay-list-search__search-icon">
          <use xlink:href="lib/Images/sprite.svg#icon-expand"></use>
        </svg>
      </button>
      <button
        class="msg-overlay-bubble-header__controls--btn artdeco-button artdeco-button--1 artdeco-button--circle artdeco-button--tertiary artdeco-button--muted artdeco-dropdown__trigger artdeco-dropdown__trigger--placement-bottom"
      >
        <svg
          class="msg-overlay-list-search__search-icon"
          width="20"
          height="16"
        >
          <use xlink:href="lib/Images/sprite.svg#icon-dots"></use>
        </svg>
      </button>
      <button
        class="msg-overlay-bubble-header__controls--btn artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--1 artdeco-button--tertiary"
        id="closeDiv"
        onclick="closePDiv()"
      >
        <svg class="msg-overlay-list-search__search-icon">
          <use xlink:href="lib/Images/sprite.svg#icon-close"></use>
        </svg>
      </button>
    </section>
  </header>
  <div
    class="msg-overlay-conversation-bubble__content-wrapper relative display-flex flex-column"
  >
    <div
      class="msg-s-message-list-container relative display-flex mtA ember-view"
    >
      <div id="ul" class="msg-s-message-list full-width scrollable">
        <ul class="msg-s-message-list-content list-style-none full-width">
        
        </ul>
      </div>
    </div>
  </div>
  <form class="msg-form" id='message' >
    <div
      class="msg-form__msg-content-container msg-form__message-texteditor relative flex-grow-1 display-flex"
    >
      <div
        class="msg-form__msg-content-container--scrollable scrollable relative"
      >
        <div class="flex-grow-1">
          <div
            class="msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 full-height notranslate"
            contenteditable="true"
            role="textbox"
            aria-multiline="true"
            aria-label="Write a message..."
          >
            <p id='msg'>
              <br />
            </p>
          </div>
          <div
            class="msg-form__placeholder t-14 t-black--light t-normal visible"
          ></div>
        </div>
      </div>
    </div>
    <footer class="msg-form__footer flex-shrink-zero">
      <div class="msg-form__left display-flex"></div>
      <div class="msg-form__right-actions display-flex align-items-center">
        <div>
          <button
            type="submit"
            class="msg-form__send-button artdeco-button artdeco-button--1"
            onclick="onSendMsg('${uname}')"
          >
            Send
          </button>
        </div>
      </div>
    </footer>
  </form>`;
      room.appendChild(div);
    }
  };
};

app.controller("messageCtrl", messageCtrl);
messageCtrl.$inject = [
  "$scope",
  "$http",
  "$location",
  "$window",
  "$uibModal",
  "NgTableParams",
  "config",
  "$crypto",
];

function onSendMsg() {
  const msg = document.getElementById("msg").textContent;

  const ul = document.getElementById("ul");
  const li = document.createElement("li");
  li.classList.add("msg-s-message-list__event", "clearfix");
  li.innerHTML = `
  <div
    class="msg-s-event-listitem msg-s-event-listitem--last-in-group msg-s-event-listitem--m2m-msg-followed-by-date-boundary"
  >
    <a class="msg-s-event-listitem__link EntityPhoto-circle">
      <img
        src="https://media-exp1.licdn.com/dms/image/C5603AQEjWDsW6h0iTQ/profile-displayphoto-shrink_100_100/0/1599010528711?e=1620259200&v=beta&t=VXVHyAk0OzOrLLPAjCe4wLNQpsUsyKV3QdSlbpDo54Y"
        alt=""
        class="EntityPhoto-circle"
        style="height: 3.4rem; width: 3.4rem"
      />
    </a>
    <div class="msg-s-message-group__meta" style="text-align: left">
      <a class="msg-s-message-group__profile-link ember-view">
        <span
          class="msg-s-message-group__name t-14 t-black t-bold hoverable-link-text"
          >Prajwal Urs</span
        >
      </a>
      <time
        class="msg-s-message-group__timestamp t-12 t-black--light t-normal"
        >5:24 PM
      </time>
    </div>
    <div
      class="msg-s-event-listitem__message-bubble msg-s-event-listitem__message-bubble--msg-fwd-enabled"
    >
      <p class="msg-s-event-listitem__body t-black--light t-normal">
        ${msg}
      </p>
    </div>
  </div>

  `;

  ul.appendChild(li);
}

function closePDiv() {
  var message = document.getElementsByClassName(
    "msg-overlay-conversation-bubble"
  );
  message[0].remove();
}
