var headerCtrl = function (
  $scope,
  $http,
  $location,
  $window,
  $cookies,
  config,
  $crypto
) {
  $scope.header = { name: "header.html", url: "header.html" };

  $scope.dashboard = function () {
    $window.location.href = "#dashboard";
  };

  $scope.headernav = function () {
    $scope.decry = JSON.parse(
      $crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)
    );
    $scope.username = $scope.decry.username;

    document.body.style.setProperty("--headerbgcolor", $scope.decry.appcolor);

    if ($window.innerWidth > 1024) {
      $scope.sscreen = false;
      $scope.lscreen = true;
    } else {
      $scope.sscreen = true;
      $scope.lscreen = false;
    }
    $(window).resize(function () {
      $scope.$apply(function () {
        if ($window.innerWidth > 1024) {
          $scope.sscreen = false;
          $scope.lscreen = true;
        } else {
          $scope.sscreen = true;
          $scope.lscreen = false;
        }
      });
    });
    $scope.orgid = $scope.decry.oid;

    if ($scope.orgid == "ENHANZED") {
      $scope.orgimg = "lib/Images/EnhanzED.png";
      $scope.orgimgs =
        config.url +
        $scope.orgid.toLowerCase() +
        "-resources/images/org-images/" +
        $scope.orgid +
        "S.png";
    } else {
      $scope.orgimg =
        config.url +
        $scope.orgid.toLowerCase() +
        "-resources/images/org-images/" +
        $scope.orgid +
        ".png";
      $scope.orgimgs =
        config.url +
        $scope.orgid.toLowerCase() +
        "-resources/images/org-images/" +
        $scope.orgid +
        "S.png";
    }

    //$scope.orgimg = "https://www.demoadmin.enhanzed.com/ORGZ-IMAGES/"+localStorage.getItem("oid")+"/IMAGES/"+localStorage.getItem("oid")+".png";
    //$scope.orgimgs = "https://www.demoadmin.enhanzed.com/ORGZ-IMAGES/"+localStorage.getItem("oid")+"/IMAGES/"+localStorage.getItem("oid")+"S.png";
  };
  $scope.headernav();
  $scope.funhome = function () {
    if ($scope.decry.role != "ContentCreators") {
      $scope.loading = true;
      $scope.decry["activemenu"] = "dashboard";
      localStorage.setItem(
        "786a2y1e",
        $crypto.encrypt(JSON.stringify($scope.decry), config.key)
      );
      //localStorage.setItem("activemenu", 'dashboard');
      $window.location.href = "#dashboard";
    }
  };

  /*$scope.logout = function(){
	$scope.loading = true;
		if (localStorage.getItem("email") != null){
			
			var cookies = $cookies.getAll();
			angular.forEach(cookies, function (v, k) {
			    $cookies.remove(k);
			});
		//AWSCognito.config.region = 'us-east-1';
	   // AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
	    //    IdentityPoolId: 'us-east-1:9e251aa1-6616-45cb-8f94-1231b75255ba'
	   // });
			 $http.get('lib/resource/ed.prop').then(function (response) {
		        	
		        	
		        	$scope.UserPoolId = response.data.UserPoolId;
		        	$scope.ClientId = response.data.ClientId;
		        	
		var poolData = { UserPoolId : $scope.UserPoolId,
		        ClientId : $scope.ClientId 
		    };
		var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
		var cognitoUser = userPool.getCurrentUser();
		
	    if (cognitoUser != null) {
	    	
	        cognitoUser.getSession(function(err, session) {
	            if (err) {
	                
	                return;
	            }
	           
	        });
	    }
		
		cognitoUser.globalSignOut( {
	    	
	        onSuccess: function (result) {
	        	localStorage.clear();
	        	$window.location.href = '#login';
	        },onFailure: function(err) {
	        	localStorage.clear();
	        	$window.location.href = '#login';
	        	
	        }});
		
		 //$cookieStore.remove('email');
		});
	}else {
		localStorage.clear();$window.location.href = '#login';}
		
	};*/
  $scope.signout = function () {
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
app.controller("headerCtrl", headerCtrl);
headerCtrl.$inject = [
  "$scope",
  "$http",
  "$location",
  "$window",
  "$cookies",
  "config",
  "$crypto",
];
