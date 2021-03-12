 "use strict";
var userreportCtrl = function ($scope, $http, $location, $window, jwtHelper, $cookies, config, usercount,NgTableParams,$crypto) {

    $scope.ureport = function(){
        $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
        AWSCognito.config.region = config.reg;
        AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: $scope.decry.iid
        });
        var poolData = { UserPoolId : $scope.decry.uid,
                ClientId : $scope.decry.cid
            };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        
        var cognitoUser = userPool.getCurrentUser();
        
        if (cognitoUser != null && $scope.decry.email != null) {
            $scope.sessionexpired = true;
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    
                    swal({title: "Oops!", text: "Session has expired. Please Login again now.", type: "error",buttonsStyling:false,allowOutsideClick: false,
			                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});

                    $window.location.href = '#login';
                    return;
                }else{
                    $scope.token = session.idToken.jwtToken;
                    $scope.sessionexpired = false;
                    $scope.loadureport();
                    
                    
                    }
               
            });
            if($scope.sessionexpired == true && $scope.decry.email != null){
                
                $scope.loadureport();
            }
        }
        else {$window.location.href = '#login';}
        swal.close();
        $scope.decry["activemenu"]  = 'ureport' ;
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
        //localStorage.setItem("activemenu", 'ureport');
        window.navigating=false;
    };

    $scope.loadureport = function() {
       
        var decoded = jwtHelper.decodeToken($scope.token);
        var userrole = decoded['cognito:groups'];
       
        $scope.analytics = JSON.parse(usercount);
       
         $scope.tdev = +$scope.analytics.android + +$scope.analytics.iphone + +$scope.analytics.desktop;
        
         if($scope.analytics.iphone > 0)
         {
        $scope.ios = (+$scope.analytics.iphone/ +$scope.tdev)*100;
        
         if( ($scope.ios == Math.floor($scope.ios))  )
            {
             $scope.ios = $scope.ios;
            }else
            {
                $scope.ios = $scope.ios.toFixed();
            };
         }else{
             $scope.ios = 0;
         }
         if($scope.analytics.android > 0)
         {
        $scope.android = (+$scope.analytics.android/ +$scope.tdev)*100;
         if( ($scope.android == Math.floor($scope.android))  )
            {
             $scope.android = $scope.android;
            }else
            {
                $scope.android = $scope.android.toFixed();
            };
         }else{
             $scope.android = 0;
         }
         if($scope.analytics.desktop > 0)
         {
        $scope.desktop = (+$scope.analytics.desktop/ +$scope.tdev)*100;
         if( ($scope.desktop == Math.floor($scope.desktop))  )
            {
             $scope.desktop = $scope.desktop;
            }else
            {
                $scope.desktop = $scope.desktop.toFixed();
            };
         }else{
             $scope.desktop = 0;
         }

        $scope.options1 = {
                chart: {
                    type: 'lineChart',
                    height: 290,
                    margin : {
                        top: 50,
                        right: 30,
                        bottom: 50,
                        left: 70
                    },
                    showLegend: false,
                    x: function(d){ return d.TS; },
                    y: function(d){ return d.UC; },
                    useInteractiveGuideline: true,
                    xAxis: {
                        
                  
                        tickFormat: function (d) {   
                            return d3.time.format('%d-%b')(new Date(d));

                        }
                    },
                    xScale: d3.time.scale.utc(),
                    yAxis: {
                        axisLabel: 'No. Of Users',
                        
                    },
                    title: {
                        enable: true,
                        text: 'Real-time ',
                        css: {
                            'text-align': 'center',
                            'color': 'black'
                        }
                    }
                }
            };
        
        $scope.options2 = {
                chart: {
                    type: 'lineChart',
                    height: 290,
                    margin : {
                        top: 50,
                        right: 30,
                        bottom: 50,
                        left: 70
                    },
                    showLegend: false,
                    x: function(d){ return d.TS; },
                    y: function(d){ return d.UC; },
                    useInteractiveGuideline: true,
                    xAxis: {
            
                        tickFormat: function (d) {   
                            return d3.time.format('%d-%b')(new Date(d));

                        }
                    },
                    xScale: d3.time.scale.utc(),
                    yAxis: {
                        axisLabel: 'No. Of Users',
                        
                    },
                    title: {
                        enable: true,
                        text: 'Real-time ',
                        css: {
                            'text-align': 'center',
                            'color': 'black'
                        }
                    }
                }
            };
        $scope.options3 = {
                chart: {
                    type: 'lineChart',
                    height: 290,
                    margin : {
                        top: 50,
                        right: 30,
                        bottom: 50,
                        left: 70
                    },
                    showLegend: false,
                    x: function(d){ return d.TS; },
                    y: function(d){ return d.UC; },
                    useInteractiveGuideline: true,
                    xAxis: {
                  
                        tickFormat: function (d) {   
                            return d3.time.format('%d-%b')(new Date(d));

                        },
                        rotateLabels: 30,
                        staggerLabels: true,
                    },
                    xScale: d3.time.scale.utc(),
                    yAxis: {
                        axisLabel: 'No. Of Users',
                        
                    },
                    title: {
                        enable: true,
                        text: 'Real-time ',
                        css: {
                            'text-align': 'center',
                            'color': 'black'
                        }
                    }
                }
            };
        
        $scope.options6 = {
                chart: {
                    height: 150,
                    type: 'pieChart',
                    donut: true,
                    donutRatio: 0.83,
                    x: function(d){return d.key;},
                    y: function(d){return d.y;},
                    showLabels: false,

                    pie: {
                        startAngle: function(d) { return d.startAngle/2-Math.PI/2 },
                        endAngle: function(d) { return d.endAngle/2-Math.PI/2 }
                    },
                    duration: 500,
                    legend: {
                        maxKeyLength: 12,
                        margin: {
                            top: 3,
                            right: 0,
                            bottom: 0,
                            left: 40
                        },
                        rightAlign: false, 
                        align: true
                    },
                    
                    margin: {
                        top: 10,
                        right: 0,
                        bottom: -150,
                        left: 0
                    },
                    showLegend: true,
                    legendPosition: "top",
                    labelsOutside: false,
                    padAngle: 0.01
                }
            };
        
            $scope.data6 = [
                {
                    key: "Male",
                    y: $scope.analytics.male,
                    color: '#666666'
                },
                {
                    key: "Female",
                    y: $scope.analytics.female,
                    color: "#527f80"
                },
                {
                    key: "Unknown",
                    y: $scope.analytics.unknown,
                    color: "#ef6565"
                }
           ];
            
        var aaa = $scope.analytics.usercount.length;
        if(aaa > 0)
        aaa--;   
        
        $scope.ausers =  $scope.analytics.usercount[aaa].UC;

        $scope.content = false;
       
//alert(JSON.stringify($scope.analytics.userlist))
       /* for(var i=0; i < $scope.analytics.userlist.length;i++){
        	
            if($scope.analytics.userlist[i].LA == undefined){
                
            }else{
              
                var diff = moment.utc($scope.analytics.userlist[i].LA).fromNow();
      
                $scope.analytics.userlist[i].LA = diff;
            }
        	
            $scope.analytics.userlist[i].TNO = $scope.analytics.userlist[i].TNO === null || $scope.analytics.userlist[i].TNO === undefined ? 0: parseInt($scope.analytics.userlist[i].TNO, 10);
        }*/
    
        $scope.tableParams = new NgTableParams({
            page: 1,            // show first page
            count: 10          // count per page
        }, {
          dataset:   $scope.analytics.userlist
        });

      
      
      $scope.$watch('globalSearch', function(newTerm, oldTerm) {
          
            $scope.tableParams.filter({ $: newTerm });
          }, true);
     
    
       
        if($window.innerWidth > 1024){
            $scope.sscreen = false;
            $scope.lscreen = true;
             $scope.secondwidth = +$window.innerWidth - +224;
        }else{
            $scope.sscreen = true;
            $scope.lscreen = false;
            $scope.secondwidth = +$window.innerWidth - +65;
        }
        $scope.secondwidth1 = +$window.innerHeight - +61;
        $scope.second1 = {'height':$scope.secondwidth1,'width':'224px'};
        $scope.second = {'width':$scope.secondwidth};
        
        $(window).resize(function() {
            
              $scope.$apply(function() {
                  
                $scope.windowWidth = $( window ).width();
              
                if($scope.windowWidth < 1023){
                    $scope.secondwidth = +$window.innerWidth - +65;
                    $scope.second = {'width':$scope.secondwidth};
                    $scope.sscreen = true;
                    $scope.lscreen = false;
                }
                if($scope.windowWidth > 1024 ){
                    $scope.secondwidth = +$window.innerWidth - +224;
                    $scope.second = {'width':$scope.secondwidth};
                    $scope.sscreen = false;
                    $scope.lscreen = true;
                     
                }
                $scope.secondwidth1 = +$window.innerHeight - +61;
                $scope.second1 = {'height':$scope.secondwidth1,'width':'224px'};
              });
            });

    };
    
    $scope.ureport();
    
    $scope.viewuser = function(user){
    	  if($scope.online == true)
            {
        
            	$scope.loading = true;
        		//localStorage.setItem("userinfoid", user.EID);
        		$scope.decry["userinfoid"]  = user.EID;
        		$scope.decry["id"] = user.UID;
        		$scope.decry["User"]  = user.UNAME;
        		$scope.decry["mail"]  = user.EMAILID;
        		delete $scope.decry["GID"];
        		delete $scope.decry["GNAME"];
        		if(user.LA == undefined || user.LA == ''){
        			$scope.decry["las"]  = '-';
        		}else
        			{
        			$scope.decry["las"]  = user.LA;
        			}
        		
        		
        	    localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
            	$window.location.href = '#userinfo';
            }
    }
    
};

app.controller('userreportCtrl', userreportCtrl);
userreportCtrl.$inject = ['$scope', '$http', '$location', '$window', 'jwtHelper','$cookies', 'config', 'usercount','NgTableParams','$crypto'];

app.factory("getuserreport", function($window, $q, config,$crypto){
    return {
        getuserreport: function(){
            var usercount,decry;
            localStorage.getItem("786a2y1e") !=null ?   decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';
            AWSCognito.config.region =  config.reg;
            AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: decry.iid
            });
           
            var poolData = { UserPoolId : decry.uid,
                    ClientId : decry.cid
                };
            
            
            var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
            
            var cognitoUser = userPool.getCurrentUser();
            
           if (cognitoUser != null && decry.email != null) {
               usercount = getusersession();
              
            }
            else {
                localStorage.clear();
                $window.location.href = '#login';
            }
           
           function getdata(token){
               var apigClient = apigClientFactory.newClient({invokeUrl: decry.api, });
               var params = {};
                
                
                var body = {
                    oid : decry.oid,
                    ulist : "1"
                     };
                
                
                var additionalParams = {
                        headers: {Authorization : token
                        }
                  };
        
                var data =  apigClient.getUserCountPost(params, body, additionalParams)
                .then(function(result){
                 
                    
                   var json = JSON.stringify(result.data);
                    var users = json.toString();
                
                    return $q.when(users);
                        
                    }).catch( function(result){
                        
                        var json = JSON.stringify(result);
                        var json1 = json.toString();
                        localStorage.clear();
                        $window.location.href = '#login';
                        
                    });
            
                return $q.when(data);
           }
           
         /*  function gettoken(token, id){
              
              var apigClient = apigClientFactory.newClient({});
                var params1 = {};
                var body = {type: id,token : token,oid : localStorage.getItem("oid"),admin: 0};
                var additionalParams = {};
            
                var abcd = apigClient.getCredentialsPost(params1, body, additionalParams)
                .then(function(result1){
                   var tjson = JSON.stringify(result1.data);
                   tjson = tjson.toString();
                    
                   tjson = JSON.parse(tjson);
                  var abc = getdata(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken); 
                  
                    return $q.when(abc);
                        
                    }).catch( function(result){
                        swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', confirmButtonColor: "#fcc917"});
                        localStorage.clear();
                        $window.location.href = '#login';
                        
                    })
                return $q.when(abcd);
           }*/
           
           function getusersession(){
                 return new Promise((resolve, reject) => {
                     cognitoUser.getSession((err, session) =>{
                        if (err) {
                            swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error", buttonsStyling:false,allowOutsideClick: false,
     			                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
                            localStorage.clear();
                            $window.location.href = '#login';
                        }else{
                            var token = session.idToken.jwtToken;
                            var abcc = getdata(token); 
                            resolve(abcc)
                            return $q.when(abcc);
                    
                        }
                    });
                })
            }
         
           return $q.when(usercount);
        }
    };
});

app.filter('moment', function () { return function (input, momentFn /*, param1, param2, ...param n */) 
	{ if(input != undefined){var args = Array.prototype.slice.call(arguments, 2), momentObj = moment(input);  
	return momentObj[momentFn].apply(momentObj, args); }
	
	}; 
	});
