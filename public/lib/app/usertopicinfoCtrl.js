 "use strict";
var usertopicinfoCtrl = function ($scope, $http, $location, $window, $cookies, $uibModalInstance,topicslistview,$sce, config,$crypto) {
  
    
    $scope.close = function(){
        $uibModalInstance.close();
    };
  
    $scope.usertopicview = function()
    {
        
        $scope.topicjson = JSON.parse(topicslistview);
        
       /* for(var i =0 ; i< $scope.topicjson.nuggets.length;i++)
           { 
            $scope.data = [];
            for(var j =0 ;j< $scope.topicjson.nuggets[i].objects.length;j++)
                {
                $scope.topicjson.nuggets[i].objects[j].obtime == undefined ? 0 : $scope.topicjson.nuggets[i].objects[j].obtime;
                $scope.topicjson.nuggets[i].objects[j].obtime = $scope.topicjson.nuggets[i].objects[j].obtime / 60;
                if($scope.topicjson.nuggets[i].objects[j].obtime > $scope.topicjson.nuggets[i].objects[j].oduration )
                    {
                      $scope.topicjson.nuggets[i].objects[j].obtime = $scope.topicjson.nuggets[i].objects[j].oduration;
                    }
           
              $scope.per = { 'width':+ $scope.topicjson.nuggets[i].objects[j].obtime / +$scope.topicjson.nuggets[i].objects[j].oduration *100 +'%' }
              $scope.topicjson.nuggets[i].objects[j].per = $scope.per;
                    $scope.data.push({                     
                        color: "#ABCCE8",
                         "values": [  {
                                 "label" : $scope.topicjson.nuggets[i].objects[j].otitle ,
                                 "value" : $scope.topicjson.nuggets[i].objects[j].oduration
                             } ]
                     
                     },{                     
                        color: "#FF6600",
                         "values": [  {
                                 "label" : $scope.topicjson.nuggets[i].objects[j].otitle ,
                                 "value" : $scope.topicjson.nuggets[i].objects[j].obtime  
                                 
                             }  ]
                     
                     })   
                }
         // alert(JSON.stringify($scope.topicjson.nuggets))
            var chartHeight = 50 * ($scope.data.length+0.2);
            $scope.options = {
                    chart: {
                        type: 'multiBarHorizontalChart',
                        height: chartHeight,
                        x: function(d){return d.label;},
                        y: function(d){return d.value;},            
                        showControls: false,
                        showValues: false,       
                        showLegend: false,
                        clipEdge:true,
                        groupSpacing: 0.6,
                        width:1000,
                        margin: {
                            left: 500,
                            bottom: 20,
                          },
                        xAxis: {
                            
                            showMaxMin: false                                                                              
                            
                            
                        },
                        yAxis: {
                           
                            showMaxMin: false,                                                                                  
                            tickFormat: function(d){                                                                                 
                               return d3.format('.02f')(d);                                                                                
                            }   
                            
                        }
                    }
            
                };
            //$scope.options.chart.xAxis.tickFormat(function (d) { return d3.format('.02f')[d.value] });
            $scope.options.chart.xAxis.tickFormat(d3.format('.02f'));
            $scope.options.chart.yAxis.tickFormat(d3.format('.02f'));
            $scope.topicjson.nuggets[i].data = $scope.data;
            $scope.topicjson.nuggets[i].option = $scope.options;
            
           }
        $scope.data = $scope.topicjson.nuggets[0].data;*/
    }
    
    $scope.usertopicview();
   
 
   
    
     
};

app.controller('usertopicinfoCtrl', usertopicinfoCtrl);
usertopicinfoCtrl.$inject = ['$scope', '$http','$location', '$window','$cookies','$uibModalInstance','topicslistview','$sce', 'config','$crypto'];

app.factory("gettopicsview", function($window, $q, config,$crypto){
    return {
        gettopicsview: function(){
            var topiclist,decry;    
           
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
               topiclist = getusersession();
              
            }
            else {
                localStorage.clear();
                $window.location.href = '#login';
            }
           
           function getdata(token){
               var apigClient = apigClientFactory.newClient({
                   invokeUrl: decry.api,
               });
               var params = {};
             
          
               var body = {
                       eid : decry.userinfoid,
                       topicid : decry.topicid,
                       oid: decry.oid
                   };

                var additionalParams = {
                         headers: {Authorization : token
                         }
                   };
       
                var tplist =  apigClient.gettopicPost(params, body, additionalParams)
                .then(function(result){
                 
                  
                    
                   var json = JSON.stringify(result.data);
                    var json1  = json.toString();
      
                    
                    
                    if(decry.obtime != undefined)
                        {
                            var topics = JSON.parse(json1);
                            var cnt = 0;
                                for(var k=0; k < topics.nuggets.length;k++){
                                    for(var m=0; m < topics.nuggets[k].objects.length ;m++){
                                     
                                         if(decry.obtime[cnt] != undefined)
                                             {
                                                topics.nuggets[k].objects[m].obtime =  decry.obtime[cnt];
                                             }
                                         topics.nuggets[k].objects[m].obtime ==  undefined ? topics.nuggets[k].objects[m].obtime = 0 : topics.nuggets[k].objects[m].obtime;
                                  
                                     
                                    
                                         if(topics.nuggets[k].objects[m].obtime / 60 > topics.nuggets[k].objects[m].oduration )
                                         {
                                             topics.nuggets[k].objects[m].obtime =  topics.nuggets[k].objects[m].oduration * 60;
                                         }
                                       
                                         if(topics.nuggets[k].objects[m].obtime >= 60)
                                         {
                                           topics.nuggets[k].objects[m].min = Math.floor(topics.nuggets[k].objects[m].obtime / 60)
                                           topics.nuggets[k].objects[m].sec = topics.nuggets[k].objects[m].obtime.toFixed() % 60;
                                     
                                         }else
                                         {
                                             topics.nuggets[k].objects[m].min = 0;
                                             topics.nuggets[k].objects[m].sec = topics.nuggets[k].objects[m].obtime.toFixed();
                                         }
                                         if(topics.nuggets[k].objects[m].obtime > topics.nuggets[k].objects[m].oduration){
                                            var per = { 'width':100 +'%' }
                                            topics.nuggets[k].objects[m].per = per;
                                             cnt++;
                                         }else{
                                            var per = { 'width':+ (topics.nuggets[k].objects[m].obtime) / +topics.nuggets[k].objects[m].oduration *100 +'%' }
                                            topics.nuggets[k].objects[m].per = per;
                                             cnt++;
                                         }
                                       
                                         topics.nuggets[k].objects[m].tmin = Math.floor(topics.nuggets[k].objects[m].oduration / 60);
                                         topics.nuggets[k].objects[m].tsec = topics.nuggets[k].objects[m].oduration - topics.nuggets[k].objects[m].tmin * 60;
                                    }
                                }
                                
                                json1 = JSON.stringify(topics);
                
                        }
                  
                    return $q.when(json1);
                        
                    }).catch( function(result){
                        
                        var json = JSON.stringify(result);
                        var json1 = json.toString();
                        localStorage.clear();
                        $window.location.href = '#login';
                        
                    });
            
                return $q.when(tplist);
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
           
           return $q.when(topiclist);
        }
    };
});
