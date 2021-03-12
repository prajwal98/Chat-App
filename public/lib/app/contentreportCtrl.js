 "use strict";
var contentreportCtrl = function ($scope, $http, $location, $window, jwtHelper, $cookies,$uibModal, config, topicjson,NgTableParams,$crypto) {

    $scope.allcourses = true;
    $scope.creport = function(){
    	$scope.imgurl = config.url;
        $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
        AWSCognito.config.region =  config.reg;
        AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: $scope.decry.iid
        });
       
        var poolData = { UserPoolId : $scope.decry.uid,
                ClientId : $scope.decry.cid
            };
        
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        
        var cognitoUser = userPool.getCurrentUser();
        
        if (cognitoUser != null && $scope.decry.email != null) {
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    localStorage.clear();
                    $window.location.href = '#login';
                }else{
   
            $scope.topics = JSON.parse(topicjson).topiclist;
           
            for(var l=0; l <  $scope.topics.length;l++){
            	var subcount = 0;
            	var compcount = 0;
            	if($scope.topics[l].SUBS != undefined){
            		for(var k=0; k <  $scope.topics[l].SUBS.length; k++){
            			subcount = +subcount + +$scope.topics[l].SUBS[k].CT;
            		}
            		$scope.topics[l].SUBCOUNT = subcount;
            	}else{
            		$scope.topics[l].SUBCOUNT = 0;
            	}
            	if($scope.topics[l].COMP != undefined){
            		for(var m=0; m <  $scope.topics[l].COMP.length; m++){
            			compcount = +compcount + +$scope.topics[l].COMP[m].CT;
            		}
            		$scope.topics[l].COMPCOUNT = compcount;
            	}else{
            		$scope.topics[l].COMPCOUNT = 0;
                }
                if($scope.topics[l].STAR != undefined){
                    $scope.topics[l].STAR.avg = Math.round($scope.topics[l].STAR.avg);
                }
            }
            $scope.tableParams = new NgTableParams({
                page: 1,            // show first page
                count: 10          // count per page
            }, {
              dataset:   $scope.topics
            });
            $scope.total = 0;
   
           for(var k in $scope.topics)
               {
              
                 if($scope.topics[k].PUB == 1 || $scope.topics[k].PUB == '1')
                     {
                         $scope.total++;
                     }
                     
                     
               }
                
        
          
          $scope.orgid = $scope.decry.oid;
          $scope.orgidlow = $scope.orgid.toLowerCase();
          $scope.$watch('globalSearchTermAuto', function(newTerm, oldTerm) {
                
                $scope.tableParams.filter({ $: newTerm });
              }, true);
          $scope.toptopics = JSON.parse(topicjson).toptopics;
         
          $scope.topiccolors = ["#5fc1ed" ,"#ff7b7b", "#4a7ea5", "#626262", "#d62728"];
         $scope.data = [];
         var tplength= $scope.toptopics.TT.length > 4 ? 5 : $scope.toptopics.TT.length;
         for (var i =0; i < tplength; i++) {
            var jsonObj = {
                color: $scope.topiccolors[i],
                values: [
                    {
                        "label" : $scope.toptopics.TT[i].ttitle ,
                        "value" : $scope.toptopics.TT[i].ct
                    }
                ]
            };
            $scope.data.push(jsonObj);
         }
          /*$scope.data  = [
              {              
                  "color": "#5fc1ed",
                  "values": [  {
                          "label" : $scope.toptopics.TT[0].tn ,
                          "value" : $scope.toptopics.TT[0].ct
                      }
                  ]
              
              },  {
                 
                  "color": "#ff7b7b",
                  "values": [  {
                      "label" : $scope.toptopics.TT[1].tn ,
                      "value" : $scope.toptopics.TT[1].ct
                      }
                  ]
              
              }
              ,  {
                 
                  "color": "#4a7ea5",
                  "values": [  {
                      "label" : $scope.toptopics.TT[2].tn ,
                      "value" : $scope.toptopics.TT[2].ct
                      }
                  ]
              
              }
              ,  {
                 
                  "color": "#626262",
                  "values": [  {
                      "label" : $scope.toptopics.TT[3].tn ,
                      "value" : $scope.toptopics.TT[3].ct
                      }
                  ]
              
              }
              ,  {
                 
                  "color": "#d62728",
                  "values": [  {
                      "label" : $scope.toptopics.TT[4].tn ,
                      "value" : $scope.toptopics.TT[4].ct
                      }
                  ]
              
              }
              
              ]*/
          var chartHeight = 30 * ($scope.data[0].values.length + 7);
        
          $scope.options = {
                    chart: {
                        type: 'multiBarHorizontalChart',
                        height: 190,
                        x: function(d){return d.label;},
                        y: function(d){return d.value;},            
                        showControls: false,
                        showValues: true,       
                        showLegend: false,
                        groupSpacing: 0.2,
                        margin: {
                           
                            left: 300,
                            bottom: 20,
                          },
                        xAxis: {
                            showMaxMin: false,
                           
                        },
                        yAxis: {
                         
                            showMaxMin: true,
                            tickFormat: function(d) {
                                return  d3.format(',f')(d);
                              }
                        }
                    }
                };
        

            
          if($window.innerWidth > 1024){
              $scope.secondwidth = +$window.innerWidth - +224;
            }else{
                $scope.secondwidth = +$window.innerWidth - +65;
            }
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
                $scope.secondwidth = +$window.innerWidth - +239;
                $scope.second = {'width':$scope.secondwidth};
                $scope.sscreen = false;
                $scope.lscreen = true;
            }
          });
        });
        }
    });
        }else{
            localStorage.clear();
            $window.location.href = '#login';
            }
        $scope.decry["activemenu"] = 'creport';
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
      //  localStorage.setItem("activemenu", 'creport');
        window.navigating = false;
        $scope.getobject();
    };
    $scope.getobject = function() {

        var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api, });
        var params = {};

        var body = {
                oid : $scope.decry.oid
            };
                            
        var additionalParams = {
               
            };
        var data =  apigClient.listObjectsPost(params, body, additionalParams)
            .then(function(result){
                    
                var json = JSON.stringify(result.data);
                $scope.objects = JSON.parse(json);

                if($scope.objects.length>0) {
                    for(var i=0;i<$scope.objects.length;i++){
                       if($scope.objects[i].SUBS != undefined){
                           for(var k=0;k<$scope.objects[i].SUBS.length;k++){
                            $scope.objects[i].CSUBS = $scope.objects[i].CSUBS === undefined ? $scope.objects[i].SUBS[k].CT :  ($scope.objects[i].CSUBS + $scope.objects[i].SUBS[k].CT); 
                            $scope.objects[i].CSUBS = parseInt($scope.objects[i].CSUBS);
                        }
                       } 
                       else
                       {
                           $scope.objects[i].CSUBS =0;
                       }
                       if($scope.objects[i].TV != undefined){
                           for(var j=0;j<$scope.objects[i].TV.length;j++){
                            $scope.objects[i].CTV = $scope.objects[i].CTV === undefined ? $scope.objects[i].TV[j].CT :  ($scope.objects[i].CTV + $scope.objects[i].TV[j].CT);;  
                            $scope.objects[i].CTV = parseInt($scope.objects[i].CTV);
                           }
                       } else
                       {
                           $scope.objects[i].CTV =0;
                       }
                       if($scope.objects[i].STAR != undefined){
                       $scope.objects[i].STAR = Math.round($scope.objects[i].STAR);
                    } 
                    }
                }

                $scope.tableParams1 = new NgTableParams({
                    page: 1,            // show first page
                    count: 10          // count per page
                }, {
                  dataset:   $scope.objects 
                });
             
                }).catch( function(result){
                    
                    var json = JSON.stringify(result);
                    var json1 = json.toString();
                });
    }
  
    $scope.creport();
    $scope.viewrating = function(tid){

        $scope.decry["tid"] = tid;
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
      
        $scope.Instance = $uibModal.open({
            templateUrl: 'viewuserratings.html',
            controller: 'viewuserratingsCtrl',
            backdrop: 'static',
            keyboard: false,
            windowClass: 'addobjectmodal',
            scope: $scope,
            resolve: {
                items: function (viewrating) {
                  return viewrating.viewrating();
                }
              }
            });
     $scope.Instance.result.then(function (selectedItem) {
        var json1 = JSON.stringify(selectedItem);

        }, function () {
         // alert($scope.object);
        });
    }
    
};

app.controller('contentreportCtrl', contentreportCtrl);
contentreportCtrl.$inject = ['$scope', '$http', '$location', '$window', 'jwtHelper','$cookies','$uibModal', 'config', 'topicjson','NgTableParams','$crypto'];

app.factory("contentreport", function($window, $q, config,$crypto){
    return {
        contentreport: function(){
            var topicjson,decry;
            if(localStorage.getItem("786a2y1e") != null)
            {
               decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
            }else
            {
                localStorage.clear();
                $window.location.href = '#login';
            }
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
               topicjson = getusersession();
              
            }
            else {
                localStorage.clear();
                $window.location.href = '#login';
            }
            
            function getdata(token){
                            var apigClient = apigClientFactory.newClient({ invokeUrl: decry.api, });

                          var params = {};

                            var body = {
                                    orgid : decry.oid,
                                    ttopic : "1"
                                     };
                            
                            var additionalParams = {
                                    headers: {Authorization : token
                                    }
                              };
                            var data =  apigClient.listTopicsPost(params, body, additionalParams)
                                .then(function(result){
                                        
                                    
                                   var json = JSON.stringify(result.data);
                                    var topic = json.toString();
                                    return $q.when(topic);
                                        
                                    }).catch( function(result){
                                        
                                        var json = JSON.stringify(result);
                                        var json1 = json.toString();
                                        return $q.when("hello");
                                        
                                    });
                            
                            
                            return $q.when(data);
            }

    
                        
            function getusersession(){
                         return new Promise((resolve, reject) => {
                             cognitoUser.getSession((err, session) =>{
                                if (err) {
                                    swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
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

        return $q.when(topicjson);
    }
    };
});


