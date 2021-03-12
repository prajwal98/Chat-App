var viewuserratingsCtrl = function($rootScope, $scope, $uibModalInstance, $http,items, $location, $window, $cookies,$sce,NgTableParams ,$crypto,config) {
		
   
   
        $scope.home = function(){
     
                     $scope.json1 = JSON.parse(items);
                     
                 if($scope.json1 === null || $scope.json1 === 'null')   {
                    $scope.tableParams = new NgTableParams({
                        page: 1,            // show first page
                        count: 10         // count per page
                    }, {
                      dataset:   $scope.json1
                    });
                 }else{
                   for(var i=0;i<$scope.json1.ratings.length;i++){
                   var date =  $scope.json1.ratings[i].date.split('-');
                   var  eedate = date[1]+"-"+date[0]+"-"+date[2];
                   $scope.json1.ratings[i].date = eedate;
                   }
                    $scope.tableParams = new NgTableParams({
                        page: 1,            // show first page
                        count: 10         // count per page
                    }, {
                      dataset:   $scope.json1.ratings
                    });

                 }
                
        }
        $scope.exportcsv = function(){
            var type = '';
            
            if($scope.coursesreport == true){
                type = 'course';
            } else if($scope.objectsreport == true) {
                type = 'content';
            }
                            
                        var months = ['JAN','FAB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
                        
                       var json_pre = [],larr = $scope.json1.ratings;
                       let arrHeader = ["name","date","rating"];
                  
                        if(larr === undefined){
                            var obj = {};
                            obj.name = '';
                            obj.date = '';
                            obj.rating = '';
                            json_pre.push(obj);
                        } else {
                            for(var dat of larr){
                                var obj = {};
                           
                                obj.name = dat.user;
                                obj.date = dat.date;
                                obj.rating = dat.rate === undefined ? 0 : dat.rate ;
                                json_pre.push(obj);
                            }
                        }
                        
                    let csvData = this.ConvertToCSV(json_pre, arrHeader,type);
                   
                    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
                    let dwldLink = document.createElement("a");
                    let url = URL.createObjectURL(blob);
                    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
                    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
                     dwldLink.setAttribute("target", "_blank");
                    }
                    
                    dwldLink.setAttribute("href", url);
                    var e = new Date();
                        var ed = e.getDate().toString().length > 1 ? e.getDate() : "0"+e.getDate();
                        var eday =   ed +"-"+ months[e.getMonth()] +"-"+e.getFullYear();
                    
                    if($scope.coursesreport === true && $scope.decry.rpath === true){
                        dwldLink.setAttribute("download", "REPORTS-CONTENT-BASED-"+$scope.decry.tenant+"-COURSE-"+$scope.decry.tn+"-RATING-"+eday+".csv");
                    } else if($scope.coursesreport === true && $scope.decry.rpath === false){
                        dwldLink.setAttribute("download", $scope.decry.tenant+"-COURSE-"+$scope.decry.tn+"-RATING-"+eday+".csv");
                        
                    } else if($scope.objectsreport == true && $scope.decry.rpath === false){
                        dwldLink.setAttribute("download", $scope.decry.tenant+"-CONTENT&COLLATERAL-"+$scope.decry.tn+"-RATING-"+eday+".csv");
                    } else {
                        dwldLink.setAttribute("download", "REPORTS-CONTENT-BASED-"+$scope.decry.tenant+"-CONTENT&COLLATERAL-"+$scope.decry.tn+"-RATING-"+eday+".csv");
                    }
                    
                    dwldLink.style.visibility = "hidden";
                    document.body.appendChild(dwldLink);
                    dwldLink.click();
                    document.body.removeChild(dwldLink);
                       
                    }
                    $scope.strRep = function(data) {
                       if(typeof data == "string") {
                         let newData = data.replace(/,/g, " ");
                          return newData;
                       }
                       else if(typeof data == "undefined") {
                         return "-";
                       }
                       else if(typeof data == "number") {
                         return  data.toString();
                       }
                       else {
                         return data;
                       }
                     }
                    $scope.ConvertToCSV = function(objArray, headerList,type) {
                       console.log(objArray);
                       console.log(headerList);
                       let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
                       let str = '';
                       let row = '';
                    
                      
                       let newHeaders = ["User Name","Date","Rate"];
                      
                       if(type == 'content'){
                        
                        newHeaders = [ "User Name","Date", "Rate"];
                       }
                      
                       for (let index in newHeaders) {
                         row += newHeaders[index] + ',';
                       }
                       row = row.slice(0, -1);
                       str += row + '\r\n';
                       for (let i = 0; i < array.length; i++) {
                         //let line = (i + 1) + '';
                          let line = '';
                         for (let index in headerList) {
                           let head = headerList[index];
                    
                           line += headerList[headerList.length -1] == headerList[index] ? $scope.strRep(array[i][head])   :  $scope.strRep(array[i][head]) +',';
                         }
                         str += line + '\r\n';
                       }
                       return str;
                     }
        
        $scope.home();
        $scope.close = function(){
            // localStorage.removeItem("flg");
             $uibModalInstance.dismiss('cancel');
     
         };
      
    };
    
    app.controller('viewuserratingsCtrl', viewuserratingsCtrl);
    viewuserratingsCtrl.$inject = ['$rootScope','$scope', '$uibModalInstance', '$http','items','$location', '$window','$cookies','$sce','NgTableParams','$crypto','config'];
    
    app.factory("viewrating", function($window, $q, config,$crypto){
        return {
            viewrating: function(){
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
                                    oid : decry.tenant,
                                    tid: decry.tid
                                         };
                                
                                var additionalParams = {
                                      
                                  };

                                var data =  apigClient.getRatingsPost(params, body, additionalParams)
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