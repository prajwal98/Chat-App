 "use strict";
var categoriesCtrl = function ($scope, $http,$uibModal,$location, $window,NgTableParams, config,categories,$crypto) {

	$scope.rotateImg=false;
	$scope.EditSubcat=false;
	$scope.settings = function() {
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
	        $scope.orgid = $scope.decry.oid;
	        $scope.orgidlow = $scope.orgid.toLowerCase();
			$scope.categories = JSON.parse(categories);
			
			$scope.orgid = $scope.decry.oid;
			$scope.tableParams = new NgTableParams({
		        page: 1,            // show first page
		        count: 10          // count per page
		    }, {
		      dataset:   $scope.categories.Categories
			});
			
			$scope.$watch('globalSearchTermAuto', function(newTerm, oldTerm) {
			    
			    $scope.tableParams.filter({ $: newTerm });
			  }, true);
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
    	        	$scope.secondwidth = +$window.innerWidth - +224;
    	    		$scope.second = {'width':$scope.secondwidth};
    	        	$scope.sscreen = false;
    	    		$scope.lscreen = true;
    	        }
    	      });
    	    });

		
    }else{
    	localStorage.clear();
    	$window.location.href = '#login';
    	}
	    $scope.decry["activemenu"] = 'catsrep';
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
	    //localStorage.setItem("activemenu", 'contrep');
	    window.navigating = false;
	};
	
	$scope.settings();

	$scope.addcategory = function(){

		$scope.loading = true;
		$scope.Instance = $uibModal.open({
			templateUrl: 'addcategory.html',
			controller: 'addcategoryCtrl',
			backdrop: 'static',
	        keyboard: false,
	        windowClass: 'addnuggetmodal',
	        scope: $scope,
			});
		$scope.Instance.opened.then(function () {
				$scope.loading = false;
		});
	}
	$scope.deletewarn = function(category){
	 
	    swal({
	          
	          title: 'Are you sure?',
              text: "you want to delete this category.",
              type: 'warning',	         
	          width: '400px',	         
	          customClass: 'sweetalert-lgs',
	          buttonsStyling:false,allowOutsideClick: false,
	          allowEscapeKey:false,
	          showCancelButton: true, cancelButtonText: 'No', cancelButtonClass:"button2",
			  showConfirmButton: true, confirmButtonText: 'Yes',  confirmButtonClass: 'button1'
	        }).then((result) => {
	          if (result.value) {
	                $scope.loading = true;
	                $scope.$apply();
	                $scope.cid = category.id;
	                $scope.deletecategory();
	          } else if (
	            result.dismiss === swal.DismissReason.cancel
	          ) {
	          }
	        })
	}
	$scope.deletecategory = function(){
	    
	      AWSCognito.config.region =  config.reg;
	        AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
	            IdentityPoolId: $scope.decry.iid
	        });
	      
	        var poolData = { UserPoolId : $scope.decry.uid,
	                ClientId : $scope.decry.cid
	            };
	        
	        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
	        
	        var cognitoUser = userPool.getCurrentUser();
	        
	        if (cognitoUser != null && $scope.decry.oid != null) {
	            
	            $scope.getsession(cognitoUser, 'delete');
	        }else {
	            localStorage.clear();
	            $window.location.href = '#login';
	        }
	}
	$scope.getsession = function(cognitoUser, type){
		
		if($scope.online == true){
	      return new Promise((resolve, reject) => {
	             cognitoUser.getSession((err, session) =>{
	                if (err) {
	                    swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
			                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	                    localStorage.clear();
	                    $window.location.href = '#login';
	                }else{
	                    
	                    var token = session.idToken.jwtToken;
	                    if(type == 'delete')
                        {
	                    	
                            $scope.deletecategoryon(token); 
                        }
                        if(type == 'sdelete'){
                        	$scope.deleteScategoryon(token); 
                        }
	                  /*  var apigClient = apigClientFactory.newClient({});
	                    var params1 = {};
	                    var body = {type: '0',token : token,oid : localStorage.getItem("oid"),admin: 0};
	                    var additionalParams = {};
	                    apigClient.getCredentialsPost(params1, body, additionalParams)
	                    .then(function(result1){
	                       var tjson = JSON.stringify(result1.data);
	                       tjson = tjson.toString();
	                       
	                       tjson = JSON.parse(tjson);
	                        if(type == 'delete')
	                        {
	                            $scope.deletecategoryon(tjson.AccessKeyId, tjson.SecretKey, tjson.SessionToken); 
	                        }
	                      
	                       resolve();   
	                        }).catch( function(result){
	                            swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', confirmButtonColor: "#fcc917"});
	                            localStorage.clear();
	                            $window.location.href = '#login';
	                        })*/
	            
	                }
	            });
			})
		}else
		{
			$scope.loading = false;
			$scope.$apply();
	swal({title: "Oops!", text: "Please check your internet connection!", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
		}
	}
	$scope.deletecategoryon = function(token){
	    
	    var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});
	    var params = {};

	    var body = {
	            action: 'delete',
	            id: $scope.cid,
	            oid: $scope.decry.oid
	    };
	    
	    var additionalParams = {
                headers: {Authorization : token
                }
          };
	    
	    var topicjson = apigClient.updateCategoriesPost(params, body, additionalParams)
	        .then(function(result){

	            $window.location.href = '#categories';    
	            
	            }).catch( function(result){
	                
	                var json = JSON.stringify(result);
	                var json1 = json.toString();
	                alert('ERROR'+result);
	                
	                
	            });
	}
	$scope.deleteScat = function(category,cid){
		 
	    swal({
	          
	          title: 'Are you sure?',
              text: "you want to delete this sub category.",
              type: 'warning',	         
	          width: '400px',	         
	          customClass: 'sweetalert-lgs',
	          buttonsStyling:false,allowOutsideClick: false,
	          allowEscapeKey:false,
	          showCancelButton: true, cancelButtonText: 'No', cancelButtonClass:"button2",
			  showConfirmButton: true, confirmButtonText: 'Yes',  confirmButtonClass: 'button1'
	        }).then((result) => {
	          if (result.value) {
	                $scope.loading = true;
	                $scope.$apply();
	                $scope.scid = category.id;
	                $scope.cid = cid;
	                $scope.deleteScategory();
	          } else if (
	            result.dismiss === swal.DismissReason.cancel
	          ) {
	          }
	        })
	}
	$scope.deleteScategory = function(){
	    
	      AWSCognito.config.region =  config.reg;
	        AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
	            IdentityPoolId: $scope.decry.iid
	        });
	      
	        var poolData = { UserPoolId : $scope.decry.uid,
	                ClientId : $scope.decry.cid
	            };
	        
	        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
	        
	        var cognitoUser = userPool.getCurrentUser();
	        
	        if (cognitoUser != null && $scope.decry.oid != null) {
	            
	            $scope.getsession(cognitoUser, 'sdelete');
	        }else {
	            localStorage.clear();
	            $window.location.href = '#login';
	        }
	}
$scope.deleteScategoryon = function(token){
	    
	    var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});
	    var params = {};

	    var body = {
	            action: 'delete',
	            scid: $scope.scid,
	            cid: $scope.cid,
	            oid: $scope.decry.oid
	    };
	    
	    var additionalParams = {
                headers: {Authorization : token
                }
          };
	    
	    var topicjson = apigClient.updateSubCategoryPost(params, body, additionalParams)
	        .then(function(result){

	            $window.location.href = '#categories';    
	            
	            }).catch( function(result){
	                
	                var json = JSON.stringify(result);
	                var json1 = json.toString();
	                alert('ERROR'+result);
	                
	                
	            });
	}
	$scope.editcategory = function(category){

		$scope.loading = true;
		$scope.categorytoedit = category;
		
		
		$scope.Instance = $uibModal.open({
			templateUrl: 'editcategory.html',
			controller: 'editcategoryCtrl',
			backdrop: 'static',
	        keyboard: false,
	        windowClass: 'addnuggetmodal',
	        scope: $scope
			});
		$scope.Instance.opened.then(function () {
				$scope.loading = false;
		});
	}
	$scope.editScategory = function(row,subcat,index){
		
		$scope.loading = true;
		$scope.categorytoedit = row;
		let index1 = $scope.categories.Categories.findIndex( record => record.category === row.category);
		$scope.index = index1;
		$scope.subcat = subcat;

		$scope.Instance = $uibModal.open({
			templateUrl: 'editsubcategory.html',
			controller: 'editsubcategoryCtrl',
			backdrop: 'static',
	        keyboard: false,
	        windowClass: 'addnuggetmodal',
	        scope: $scope
			});
		$scope.Instance.opened.then(function () {
				$scope.loading = false;
		});
	}
	
	$scope.addsubcategory = function(row,subcat,index){
		
		
	      var fff = subcat == null ? "" :subcat.scat  ; 
	      let index1 = $scope.categories.Categories.findIndex( record => record.category === row.category);
			$scope.index = index1;
	        
		swal({
            title: "Add Sub Category",
            html:
            '<input type="text" id="txtevent" value="'+fff+'"  placeholder="Sub Category" ng-disabled="edit" maxlength="50" ng-model="swalsubcat" style="border: 1px solid #ccc;float:left;width:85%;overflow:hidden;line-height:25px;font-size:14px;font-family: MyWebFont1;margin-left: 31px;"></input>'
             +'<br>'+'<br>'+'<br>',

              closeOnCancel: false,
              allowOutsideClick: false,
              allowEscapeKey:false,
              showCancelButton: true, cancelButtonText: 'Cancel',
              showConfirmButton: true, confirmButtonText: 'Submit', 
              width: '450px',
              height: '450px',
              customClass: 'sweetalert-scat',
			   buttonsStyling: false,
              cancelButtonClass: 'button2',
              confirmButtonClass: 'button1',
              onOpen: function() {
            	 
            	  $("#txtevent").keypress(function(e) {
            			
            			var k = e.keyCode,
            					$return = ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32  || (k >= 48 && k <= 57));
            		      if(!$return) {
            		      
            		      	return false;
            		      }
            		      
            		})
            		
              },
              preConfirm: function () {
              return new Promise(function (resolve) {
if($scope.online == true){

                  if (  $('#txtevent').val().replace(/\s/g, '').length === 0 || $('#txtevent').val() === '') {
                       swal.showValidationError('Sub category cannot be empty');
                       resolve();
                   }
                   else
              {
                       resolve([
                         
                           $('#txtevent').val()
                           ]);
                       
              }   
			}else{
				swal.showValidationError('Please check your internet connection!');
                       resolve();
			}    
			  }
			
			  );
			
            }
          }).then(function (result) {
        	  
            
        	  if (result.value!=undefined) {
        		  $scope.loading = true;
            	  $scope.$apply();
                  var json = JSON.stringify(result);
                  var result = JSON.parse(json);
                  $scope.scateg=result.value[0];
               
            var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});
      	    var params = {};

      	    var body = {
      	            subcategory: $scope.scateg,
      	            cid: row.id,
      	            oid: $scope.decry.oid,
      	            action:"add",
      	            index: $scope.index
      	    };
      
      	    var additionalParams = {
                   
                };
      	
      	    var topicjson = apigClient.updateSubCategoryPost(params, body, additionalParams)
      	        .then(function(result){
      	        	 var json = JSON.stringify(result.data);
      	        	 var res = JSON.parse(json);
      	        	
      	        	if(res!="Sub category already exist"){
      	        		 $window.location.href = '#categories';  
	                  }else{
	                	  swal({title: "Oops!", text: "Sub category already exist", type: "warning",buttonsStyling:false,allowOutsideClick: false,
	  		                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	                	 $scope.loading=false;
	                	 $scope.$apply();
	                  }
      	        	
      	        	 
      	        	
      	            }).catch( function(result){
      	                
      	                var json = JSON.stringify(result);
      	                var json1 = json.toString();
      	                alert('ERROR'+result);
      	                
      	                
      	            });
        	  }
      	    
          }).catch(function(result){
           
          });
  
	}

};

app.controller('categoriesCtrl', categoriesCtrl);
categoriesCtrl.$inject = ['$scope', '$http','$uibModal','$location', '$window','NgTableParams','config','categories' ,'$crypto'];


app.factory("getcategories", function($window, $q, config,$crypto){
	
    return {
    	getcategories: function(){
    		var categories,decry;
    		window.navigating=true;
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
    		   categories = getusersession();
    		}
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#login';
    	    }
			
			function getdata(token){
							var apigClient = apigClientFactory.newClient({ invokeUrl: decry.api, });
							 var params = {};
							  
							var body = {
								oid: decry.oid
									 };

							var additionalParams = {
						             headers: {Authorization : token
						             }
						       };
							var data =	apigClient.getCategoriesPost(params, body, additionalParams)
							.then(function(result){
							    	
								
							   var json = JSON.stringify(result.data);
							    var cate = json.toString();
							    return $q.when(cate);
							    	
							    }).catch( function(result){
							    	
							    	var json = JSON.stringify(result);
									var json1 = json.toString();
									$window.console.log("Inside the resul", json1)
							    	//localStorage.setItem("activemenu", 'dashboard');
									decry["activemenu"] = 'dashboard';
                                    localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify(decry), config.key));
									$window.location.href = '#dashboard';
								 });
							
							
							return $q.when(data);
			}

			/*function gettoken(token, id){
						  
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
									swal({title: "Oops!", text: "Session has been timed out, Please login again.", type: "error", width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', confirmButtonColor: "#fcc917"});
									localStorage.clear();
									$window.location.href = '#login';
									
								})
							return $q.when(abcd);
					   }*/
						
			function getusersession(){
						 return new Promise((resolve, reject) => {
							 cognitoUser.getSession((err, session) =>{
								if (err) {
									swal({title: "Oops!", text: "Session has been timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
						                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
									localStorage.clear();
									$window.location.href = '#login';
								}else{
									var token = session.idToken.jwtToken;
									var abcc =  getdata(token); 
									resolve(abcc)
									return $q.when(abcc);
							
								}
							});
						})
					}

    	    return $q.when(categories);
        }
    };
});