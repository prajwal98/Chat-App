var livetimeCtrl = function (
  $scope,
  $http,
  $location,
  $window,
  $uibModal,
  NgTableParams,
  config,
  $crypto
) {
  $scope.livetime = function () {
    $scope.imgurl = config.url;
    $scope.decry = JSON.parse(
      $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
    );

    
    localStorage.setItem(
      "786a2y1e",
      $crypto.encrypt(JSON.stringify($scope.decry), config.key)
    );
    const socket = io();
    var username = $scope.decry.username;
    $scope.onLoggingIn = function (username) {
      this.usernameAlreadySelected = true;
      socket.auth = { username };
      socket.connect();
    };
    $scope.onLoggingIn(username);

    const sessionID = localStorage.getItem("sessionID");

    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }

    socket.on("session", ({ sessionID, userID }) => {
      socket.auth = { sessionID };

      localStorage.setItem("sessionID", sessionID);

      socket.userID = userID;
    });

    $scope.users = [];
    $scope.selectedUser = null;

    $scope.$on("input", function (event, args) {
      var content = args.message;
      if ($scope.selectedUser) {
        socket.emit("private message", {
          content,
          to: $scope.selectedUser.userID,
        });
        $scope.selectedUser.messages.push({
          content,
          fromSelf: true,
        });
      }
      $scope.$apply();
    });

    $scope.onSelectUser = function (user) {
      $scope.selectedUser = user;
      user.hasNewMessages = false;
    };

    socket.on("connect", () => {
      $scope.users.forEach((user) => {
        if (user.self) {
          user.connected = true;
        }
        $scope.$apply();
      });
    });

    socket.on("disconnect", () => {
     
      $scope.users.forEach((user) => {
        if (user.self) {
          user.connected = false;
        }
      });
      $scope.$apply();
    });
    $scope.initReactiveProperties = function (user) {
      user.messages = [];
      user.hasNewMessages = false;
    };

    socket.on("users", (users) => {
      users.forEach((user) => {
        user.messages.forEach((message) => {
          message.fromSelf = message.from === socket.userID;
        });
        for (let i = 0; i < $scope.users.length; i++) {
          const existingUser = $scope.users[i];
          if (existingUser.userID === user.userID) {
            existingUser.connected = user.connected;
            existingUser.messages = user.messages;
            return;
          }
        }
        user.self = user.userID === socket.userID;
        $scope.users.push(user);
        $scope.$apply();
      });
      // put the current user first, and sort by username
      $scope.users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });

      $scope.$apply();
    });

    socket.on("user connected", (user) => {
      for (let i = 0; i < $scope.users.length; i++) {
        const existingUsers = $scope.users[i];
        if (existingUsers.userID === user.userID) {
          existingUsers.connected = true;
          return;
        }
      }
      console.log(user);
      $scope.initReactiveProperties(user);
      $scope.users.push(user);
      $scope.$apply();
    });

    socket.on("user disconnected", (id) => {
      for (let i = 0; i < $scope.users.length; i++) {
        const user = $scope.users[i];
        if (user.userID === id) {
          user.connected = false;
          break;
        }
      }
      $scope.$apply();
    });

    socket.on("private message", ({ content, from, to }) => {
      for (let i = 0; i < $scope.users.length; i++) {
        const user = $scope.users[i];
        const fromSelf = socket.userID === from;
        if (user.userID === (fromSelf ? to : from)) {
          user.messages.push({
            content,
            fromSelf,
          });
          if (user !== this.selectedUser) {
            user.hasNewMessages = true;
          }
          break;
        }
      }
      $scope.$apply();
    });

    $scope.$onInit = function () {
      socket.on("connect_error", (err) => {
        if (err.message === "invalid username") {
          this.usernameAlreadySelected = false;
        }
      });
    };

    // $scope.$onDestroy = function () {
    //   socket.off("connect");
    //   socket.off("disconnect");
    //   socket.off("users");
    //   socket.off("user connected");
    //   socket.off("user disconnected");
    //   socket.off("private message");
    //   socket.off("connect_error");
    // };
  };

  $scope.livetime();
};

app.directive("user", function () {
  return {
    restrict: "E",
    templateUrl: "../../user.html",
    scope: {
      user: "=",
      selected: "=",
    },
    controller: function ($scope) {
      $scope.onClick = function () {
        $scope.$emit("select");
      };
      $scope.status = function () {
        return $scope.user.connected ? "online" : "offline";
      };
    },
  };
});

app.directive("messagepanel", function () {
  return {
    restrict: "E",
    templateUrl: "../../messagepanel.html",
    scope: {
      user: "=",
    },
    controller: function ($scope) {
      $scope.input = "";

      $scope.onSubmit = function (message) {
        $scope.$emit("input", { message });
        $scope.input = "";
      };

      $scope.displaySender = function (message, index) {
        return (
          index === 0 ||
          $scope.user.messages[index - 1].fromSelf !==
            $scope.user.messages[index].fromSelf
        );
      };
      $scope.isValid = function () {
        return $scope.input.length > 0;
      };
    },
  };
});

app.directive("statusicon", function () {
  return {
    restrict: "E",
    templateUrl: "../../statusicon.html",
    scope: {
      connected: "=",
    },
    controller: function ($scope) {},
  };
});

app.controller("livetimeCtrl", livetimeCtrl);
livetimeCtrl.$inject = [
  "$scope",
  "$http",
  "$location",
  "$window",
  "$uibModal",
  "NgTableParams",
  "config",
  "$crypto",
];
