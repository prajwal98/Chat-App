var courseviewedusersCtrl = function ($scope, $http, $location, $window,NgTableParams,config,$crypto, $sce,ulist) {

  
    $scope.home = function(){
		if(localStorage.getItem("786a2y1e") != null) {
			$scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		} else {
			localStorage.clear();
			$window.location.href = '#login';
		}
		
		if($scope.decry.caction == '0'){
			$scope.ulist = JSON.parse(ulist);
			
			$scope.ulist = $scope.ulist.viewuser;
			
			if($scope.ulist.length > 0){
			for(var i=0;i<$scope.ulist.length;i++){
				if($scope.ulist[i].TOPICS != undefined && $scope.ulist[i].TOPICS.length >0){
					for(var j=0;j<$scope.ulist[i].TOPICS.length;j++){
						
						if($scope.ulist[i].TOPICS[j].TID == $scope.decry.ctid){
							$scope.ulist[i].sdate = $scope.ulist[i].TOPICS[j].SON.split('.');
							var sdate = new Date($scope.ulist[i].sdate[2]+"/"+$scope.ulist[i].sdate[1]+"/"+$scope.ulist[i].sdate[0]);
							$scope.ulist[i].sdate = sdate;
							if( $scope.ulist[i].TOPICS[j].CON == ' '){
								$scope.ulist[i].cdate = ' ';
							} else {
							$scope.ulist[i].cdate =  $scope.ulist[i].TOPICS[j].CON.split('.');
							var cdate = new Date($scope.ulist[i].cdate[2]+"/"+$scope.ulist[i].cdate[1]+"/"+$scope.ulist[i].cdate[0]);
							$scope.ulist[i].cdate = cdate;
							}
						}
						
					}	
				}
			}
			}
			
			$scope.ulist.sort(function(a, b) {
				var c = new Date(a.sdate);
				var d = new Date(b.sdate);
				return d-c;
			});
        $scope.tableParams = new NgTableParams({
            page: 1,            // show first page
            count: 10         // count per page
        }, {
          dataset:   $scope.ulist
        });
		} else {
			$scope.ulist = JSON.parse(ulist);
			$scope.ulist = $scope.ulist.viewuser;
			
			if($scope.ulist.length > 0){
			for(var i=0;i<$scope.ulist.length;i++){
				if($scope.ulist[i].OBJECTS != undefined && $scope.ulist[i].OBJECTS.length >0){
					for(var j=0;j<$scope.ulist[i].OBJECTS.length;j++){
						if($scope.ulist[i].OBJECTS[j].OBJID == $scope.decry.ctid){
							
							$scope.ulist[i].sdate = $scope.ulist[i].OBJECTS[j].CON.split('-');
							var cdate = new Date($scope.ulist[i].sdate[2]+"/"+$scope.ulist[i].sdate[1]+"/"+$scope.ulist[i].sdate[0]);
							$scope.ulist[i].sdate = cdate;
							$scope.time  = $scope.ulist[i].OBJECTS[j].DUR.toFixed();
							
							var min = ~~(($scope.time % 3600) / 60);
							var sec = $scope.time % 60;
							
							$scope.ulist[i].mins = min;
							$scope.ulist[i].secs = sec;
						}
						
					}	
				}
			}
			}
			$scope.ulist.sort(function(a, b) {
				var c = new Date(a.cdate);
				var d = new Date(b.cdate);
				return d-c;
			});
			$scope.tableParams1 = new NgTableParams({
				page: 1,            // show first page
				count: 10         // count per page
			}, {
			dataset:   $scope.ulist
			});
		}
		
    }
	$scope.exportcsv = function(){
		var type = '';
		if($scope.decry.caction == '0'){
			type = 'course';
		} else if($scope.decry.caction == '1') {
			type = 'content';
		}
						
					var months = ['JAN','FAB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
					
				   var json_pre = [],larr = $scope.ulist;
				   let arrHeader = ["username","startdate","completeddate"];
				  
				   
				   if(type == 'content'){
					larr = $scope.ulist;
					arrHeader = [ "username","vieweddate", "duration"];
				   }
				   console.log(type)
				  
				   if(type == 'course'){
					if(larr === undefined){
						var obj = {};
						obj.username = '';
						obj.startdate = '';
						obj.completeddate = '';
						json_pre.push(obj);
					} else {
						for(var dat of larr){
							var obj = {};
							var tsday = '',stday = '';
							
							if(dat.sdate !== undefined && dat.sdate != ' '){
							var g = dat.sdate;
						   var gm = (g.getMonth() + 1).toString().length > 1 ? (g.getMonth() + 1) : "0"+(g.getMonth() + 1);
						var	gd = g.getDate().toString().length > 1 ? g.getDate() : "0"+g.getDate();
						 tsday =   gm +"-"+ gd +"-"+g.getFullYear();
							}
							if(dat.cdate !== undefined && dat.cdate != ' '){
								var g = dat.cdate;
							   var gm = (g.getMonth() + 1).toString().length > 1 ? (g.getMonth() + 1) : "0"+(g.getMonth() + 1);
							var	gd = g.getDate().toString().length > 1 ? g.getDate() : "0"+g.getDate();
							stday =   gm +"-"+ gd +"-"+g.getFullYear();
								}
						
							obj.username = dat.UNAME;
							obj.startdate = tsday;
							obj.completeddate = stday ;
							json_pre.push(obj);
						}
					}
					
					
				   } else if(type == 'content'){
					if(larr === undefined){
						var obj = {};
						obj.username = '';
						obj.vieweddate = '';
						obj.duration = '';
						json_pre.push(obj);
					} else {
						for(var dat of larr){
							var obj = {};
							var tsday = '';
							if(dat.sdate !== undefined && dat.sdate != ' '){
								var g = dat.sdate;
								var gm = (g.getMonth() + 1).toString().length > 1 ? (g.getMonth() + 1) : "0"+(g.getMonth() + 1);
								 var	gd = g.getDate().toString().length > 1 ? g.getDate() : "0"+g.getDate();
								 tsday =   gm +"-"+ gd +"-"+g.getFullYear();
							}
					
							obj.username = dat.UNAME;
							obj.vieweddate = tsday;
							obj.duration = dat.mins+" min "+dat.secs+" sec";
							json_pre.push(obj);
						}
					}
					
				   }  
					   
			  
				let csvData = this.ConvertToCSV(json_pre, arrHeader,type);
				console.log(csvData)
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
				if(type == 'course' ){
					dwldLink.setAttribute("download", $scope.decry.tenant+"-COURSE-"+$scope.decry.ctn+"-"+eday+".csv");
				} else {
					
					dwldLink.setAttribute("download", $scope.decry.tenant+"-CONTENT&COLLATERAL-"+$scope.decry.ctn+"-"+eday+".csv");
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
				
				  
				   let newHeaders = ["User Name","Start Date","Completed Date"];
				  
				   if(type == 'content'){
					
					newHeaders = [ "User Name","Viewed Date", "Duration"];
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
	$scope.viewtenant = function() {
		$scope.loading = true;
		$scope.decry["status"] = "Content";
		localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
		$window.location.href="#viewtenant";
	}
	$scope.loadPage = function() {
		$scope.loading = true;
		$window.location.href = '#tenants';
	}
};

app.controller('courseviewedusersCtrl', courseviewedusersCtrl);
courseviewedusersCtrl.$inject = ['$scope', '$http', '$location', '$window','NgTableParams','config','$crypto', '$sce','ulist'];

app.factory("viewusersdata", function($window, $q, config,$crypto){
    return {
    	viewusersdata: function(){
    		var listtopics1,decry;
    		
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
    		   listtopics1 = getusersession();
    		  
    	    }
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#login';
    	    }
			
			function getdata(token){
						
						var apigClient = apigClientFactory.newClient({invokeUrl: decry.api,});
							var params = {};
							var body = {
								oid : decry.tenant,
								tid: decry.ctid,
								action: decry.caction,
							};
								
								var additionalParams = {
										headers: {Authorization : token
										}
								};
								
								var data = apigClient.getContentViewedUsersPost(params, body, additionalParams)
									.then(function(result){
										var response = JSON.stringify(result.data);
										
										response=JSON.parse(response);
										
										return $q.when(JSON.stringify(response));

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

    	return $q.when(listtopics1);
    }
    };
});