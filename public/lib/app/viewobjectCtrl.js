var viewobjectCtrl = function($scope, $uibModalInstance, $http, $location, $window, $cookies,objectdt,$sce,$crypto,config) {
        
           
    
    $scope.loading=false;
    $scope.editobjectfun=function()
    {
        $scope.editobject = false;
    	$scope.objedit = true;
        $scope.disabled = true;
      
        $scope.$watch('objectdetails.otitle', function() {
         
	 	  $scope.checkobject();
	    });
        $scope.$watch('objectdetails.odescription', function() {
         
          $scope.checkobject();
        });
        $scope.$watch('objectdetails.embeddedcode', function() {
            
            $scope.checkobject();
          });
	    $scope.$watch('objectdetails.oduration', function() {
	    	  $scope.checkobject();
	    });
        $scope.$watch('objectdetails.secs', function() {
            $scope.checkobject();
      });
	    if ($scope.objectdetails.otype == "video" ) {
	    	 $scope.filetype="'video/*'";
	    	 $scope.$watch('objectdetails.odescription', function() {
	    		 $scope.checkobject();
	       });
	    }else if ($scope.objectdetails.otype == "audio") {
	    	 $scope.filetype="'.MP3'";
	    	 $scope.$watch('objectdetails.odescription', function() {
	    		 $scope.checkobject();
	       });
	    }else if($scope.objectdetails.otype == "pdf")
        {	
	    	$scope.filetype="'.pdf'";
        }else if($scope.objectdetails.otype == "interactivity" || $scope.objectdetails.otype == "scorm")
        {
            $scope.filetype= "'.html, application/zip, application/x-zip-compressed, .zip'";
        }else 
        {
            $scope.filetype="'.html'";
        }
           //$scope.editobject = false;
        //$scope.pdf=false;
    }
    
    
    $scope.checkobject = function()
    {
    	 $scope.objectchangedcheck = false;
    	 
        if($scope.objectdetails.otitle !== $scope.origobjectdetails.otitle){
        	$scope.objectchangedcheck = true;
         }
        if($scope.objectdetails.odescription !== $scope.origobjectdetails.odescription){
            $scope.objectchangedcheck = true;
         }
        if($scope.objectdetails.embeddedcode !== $scope.origobjectdetails.embeddedcode){
            $scope.objectchangedcheck = true;
         }
        if($scope.objectdetails.otype == "video" || $scope.objectdetails.otype == "audio"){
        	if($scope.objectdetails.odescription !== $scope.origobjectdetails.odescription){
        	$scope.objectchangedcheck = true;
        	}
        }
        if($scope.objectdetails.oduration !== $scope.origobjectdetails.oduration){
        	$scope.objectchangedcheck = true;
         }
         if($scope.objectdetails.secs !== $scope.origobjectdetails.secs){
        	$scope.objectchangedcheck = true;
         }
       
        if($scope.objectchangedcheck){
        	 $scope.disabled = false;
        	 $scope.objectchanged = true;
        }else{
        	 $scope.disabled = true;
        	 $scope.objectchanged = false;
        	 
        }
        
        
    }
    
    $scope.viewobject = function(){
    	
    	 if(!$scope.editbtn)
         {        
         	$scope.editobject = true;
         }else
         {
         	$scope.editobject = false;
         }
    	 $scope.objedit = false;
    	
         $scope.objectdetails = JSON.parse(objectdt);
         
         var min = ~~(($scope.objectdetails.oduration % 3600) / 60);
        var sec = $scope.objectdetails.oduration % 60;
        $scope.objectdetails.oduration= min;
        $scope.objectdetails.secs = sec;

    	 $scope.origobjectdetails = angular.copy($scope.objectdetails);
    	
         $cookies.put("CloudFront-Policy", $scope.objectdetails.Policy);
         $cookies.put("CloudFront-Signature", $scope.objectdetails.Signature);
         $cookies.put("CloudFront-Key-Pair-Id", $scope.objectdetails.KeyPairId);
            
            if ($scope.objectdetails.otype == "quiz"){
                $scope.rightans=0;
                $scope.disablebtn = true;
                $scope.subbtn=false;
                $scope.nebtn=true;
                $scope.overview=false;
                $scope.qsli=true;
                $scope.trybtn=true;
                $scope.tryp=false;
                $scope.cngp=false;
                $scope.exitbt=false;
                $scope.exitbtwt=false;
                $scope.pernt=0;
                
                
                $scope.loading=false;       
    
            
                $scope.quiz = true;
            }
            if($scope.decry.otype =="youtube")
            {
       
              $scope.embid = $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+ $scope.embid.embeddedcode+"?rel=0&showinfo=0");
             
            }
	        if($scope.decry.otype =="vimeo")
	        {
	     
	          $scope.embid = $sce.trustAsResourceUrl("https://player.vimeo.com/video/"+ $scope.embid.embeddedcode+"?rel=0&showinfo=0");
	         
	        }
	       
            if ($scope.objectdetails.otype == "video" || $scope.objectdetails.otype == "audio") {
            	$scope.objectdetails.ourl = $sce.trustAsResourceUrl($scope.objectdetails.ourl);
            }
            if ($scope.objecttype == "pdf" || $scope.objecttype == "html" || $scope.objecttype == "interactivity" || $scope.objecttype == "scorm") {
            	$scope.objectdetails.url = $sce.trustAsResourceUrl($scope.objectdetails.url);  
            }
          
            if($scope.iseditedobject){
           
            	 $scope.objectdetails = angular.copy($scope.editedobjectdetails);
            	 $scope.origobjectdetails = angular.copy($scope.editedobjectdetails);
            	 $scope.editobjectfun();
            }
          
        };
        
        
        $scope.chngeopt=function(qs,correct){
            $scope.disablebtn = false;
            
            if(correct=='true'){
                $scope.rightans=$scope.rightans+1;
            
            }
        }
        $scope.nextfn=function(){
            $scope.cntqop=$scope.cntqop+1;
            $scope.cntpg=$scope.cntpg+1;
            if($scope.tlqs==$scope.cntpg)
                {
                    $scope.subbtn=true;
                    $scope.nebtn=false;
                }
            
            $scope.disablebtn = true;
        }
        $scope.fileselect=function()
        {
        	
        	$scope.disabled = false;
       	 	$scope.objectchanged = true;
       	 	$scope.filechanged = true;
        }
        
        $scope.saveobj=function()
        {
        	$scope.loading = true;
            $scope.perror1=false;
            $scope.perror5=false;
            $scope.perror2=false;
            
            if($scope.objectdetails.otitle == null || $scope.objectdetails.otitle =='' 
            || $scope.objectdetails.oduration ==undefined || ($scope.objectdetails.oduration <= 0 && $scope.objectdetails.secs <= 0) || $scope.objectdetails.secs === undefined )
                {
                
                    if($scope.objectdetails.otitle == null || $scope.objectdetails.otitle == '' )
                    {
                    $scope.perror1=true;
                    $scope.loading = false;
                    $scope.$apply();
                    return;
                    }
                  
                    if($scope.objectdetails.oduration <= 0 && $scope.objectdetails.secs <= 0){
                    	$scope.perror5=true;
                    	 $scope.loading = false;
                         $scope.$apply();
                         return;
                    }
                    if( $scope.objectdetails.secs === undefined){
                    	$scope.perror2=true;
                    	 $scope.loading = false;
                         $scope.$apply();
                         return;
                    }
                }               
            else
                {
                	if($scope.objectdetails.otype == 'audio' || $scope.objectdetails.otype == 'video' || $scope.objectdetails.otype == 'youtube' || $scope.objectdetails.otype == 'vimeo'){
                		if($scope.objectdetails.odescription == null || $scope.objectdetails.odescription =='')
                        {
                			$scope.perror3 = true;
                			 $scope.loading = false;
                             $scope.$apply();
                             return;
                         }            
                	}
                	if($scope.objectdetails.otype == 'youtube' || $scope.objectdetails.otype == 'vimeo'){
                		
                		if($scope.objectdetails.embeddedcode == null || $scope.objectdetails.embeddedcode =='')
                        {
                			$scope.verror4 = true;
                			 $scope.loading = false;
                             $scope.$apply();
                             return;
                         }     
                	}
                	
                    $scope.objectdetails.oduration = $scope.objectdetails.oduration * 60;
                    $scope.objectdetails.oduration = $scope.objectdetails.oduration + $scope.objectdetails.secs;

                       	$scope.object = {
                                   otitle: 		$scope.objectdetails.otitle,
                                   otype:  		$scope.origobjectdetails.otype,
                                   oduration: 	$scope.objectdetails.oduration,
                                   ourl:  		$scope.origobjectdetails.ourl,
                                   oid: 		$scope.origobjectdetails.oid,
                                   filechanges: false
                           };

                       	if($scope.origobjectdetails.ltype == undefined){
                       
                        }else{
                            $scope.object.ltype = $scope.objectdetails.ltype;
                        }
                       
                         if($scope.objectdetails.otype == 'audio' || $scope.objectdetails.otype == 'video' || $scope.objectdetails.otype == 'youtube' || $scope.objectdetails.otype == 'vimeo'){
                        	 $scope.object.odescription = $scope.objectdetails.odescription;
                         }
                         if($scope.objectdetails.otype == 'youtube' || $scope.objectdetails.otype == 'vimeo'){
                        	 $scope.object.embeddedcode = $scope.objectdetails.embeddedcode;
                        	$scope.object.filechanges = true;
                         }
                       
                         if($scope.filechanged){
                        	 
                        	 if($scope.objectdetails.file.type == "application/zip" || $scope.objectdetails.file.type == "application/x-zip-compressed"){
                        		 $scope.zipfile = $scope.objectdetails.file;
             					JSZip.loadAsync($scope.objectdetails.file).then(function(content) {
             			               
             	                     var tmp= JSON.stringify(content);
             	                     
             	                     var t1=tmp.toString();
             	                     t1 = JSON.parse(t1);
             	                     
             	                     
             	                     try{
                                    if($scope.objectdetails.otype != 'scorm'){
                                        if(t1.files['index.html'].name){
                                            $scope.fileexists = true;
                                        } 
                                    } else {
                                        if(t1.files['rxd/indexAPI.html'].name){
                                            $scope.fileexists = true;
                                        }
                                      }
             	                     }catch (e) {
             	                       
             	                    	 $scope.fileexists = false;
             	                    }
             	                       
             	                    if($scope.fileexists){
             	                    	$scope.save();
             	                    }else{
             	                    	$scope.loading = false;
             	                    	$scope.perror6 = true;
             	                    	$scope.$apply();
             	                    } 
             	                });
                        	 }else{
                        		 $scope.save();
                        	 }
                        	 
                            
                     }else
                     {
                    	 $uibModalInstance.close($scope.object);
                     }
                
                }
    
        }
        
        $scope.save = function(){
           localStorage.getItem("786a2y1e") != null ? $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';
            
           var id =  Math.floor(Math.random()*(999-100+1)+100);
           $scope.filename = id+$scope.objectdetails.file.name;
       	   $scope.object.newfile =  $scope.filename;
       	   $scope.object.filechanges =  true;
       	   
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
               
               $scope.getsession(cognitoUser);
           }else {
               localStorage.clear();
               $window.location.href = '#login';
           }
        }
        $scope.upload = function(file,url) {
              $http.put(url, file, {headers:{'Content-Type': file.type}})
                .success(function(resp) {
                  //Finally, We're done
                	$uibModalInstance.close($scope.object);
                })
                .error(function(resp) {
                    $scope.loading = false;
                  alert("An Error Occurred Attaching Your File. Please try again or Contact production Support if problem persist");
                });
        }
        $scope.getsession = function(cognitoUser,typejson){
            
            return new Promise((resolve, reject) => {
                   cognitoUser.getSession((err, session) =>{
                      if (err) {
                          swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",allowOutsideClick: false,
				              allowEscapeKey:false,
				              width: '400px',showConfirmButton: true, confirmButtonText: 'OK',customClass: 'sweetalert-confirmOk',
				            	  buttonsStyling: false,confirmButtonClass: 'button1'});
                          localStorage.clear();
                          $window.location.href = '#login';
                      }else{
                          
                          var token = session.idToken.jwtToken;
                          $scope.objectfileupload(token);

                      }
                  });
              })
        }
        $scope.objectfileupload = function(token)
        {
        	//alert()
            var apigClient = apigClientFactory.newClient({
                invokeUrl: $scope.decry.api,
            });
            var params = {};
            var body = {
                    filetype: $scope.objectdetails.file.type,
                    filename: $scope.filename,
                    folder: $scope.folder
                     };
            var additionalParams = {
                    headers: {Authorization : token
                    }
            };
            apigClient.getpreSignedURLPost(params, body, additionalParams)
            .then(function(result){
              
               var json = JSON.stringify(result.data);
             
              $scope.upload($scope.objectdetails.file, result.data);
             
                }).catch( function(result){
                    
                    var json = JSON.stringify(result);
                    var json1 = json.toString();
                    alert('ERROR'+result);
                    $scope.loading = false;
                    $scope.$apply();
                    
                });
        }
        $scope.tryfn=function(){
            $scope.overview=false;
            $scope.qsli=true;
            $scope.cntqop=0;
            $scope.cntpg=0;
            $scope.rightans=0;
            $scope.subbtn=false;
            $scope.nebtn=true;
            $scope.nextfn();
        }
        
        
        $scope.close = function(){
           // localStorage.removeItem("flg");
        	$uibModalInstance.dismiss('cancel');
    
        };
        $scope.viewobject();
    
};

app.controller('viewobjectCtrl', viewobjectCtrl);
viewobjectCtrl.$inject = ['$scope', '$uibModalInstance', '$http', '$location', '$window','$cookies','objectdt','$sce','$crypto','config'];

app.factory("getobject", function($window, $q, config,$crypto){
    
       return {
           getobject: function(){
               var decry;
               localStorage.getItem("786a2y1e") !=null ?   decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';
                var obid = decry.obid;
                var objectlist;
            
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
        		   if(decry.otype =="youtube" || decry.otype =="vimeo")
    	           {
    	           objectlist = decry.yvobject;
    	           objectlist = JSON.stringify(objectlist);
    	           }else
    	               {
    	                objectlist = getusersession();
    	               }
        		  
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
         				 objectid : obid,
                          oid: decry.oid,
                          topicid:decry.topicid,
                          otitle:decry.otitle,
                          odescription:decry.odescription,
                          ourl:decry.ourl,
                          otype:decry.otype,
                          oduration:decry.oduration
                           };
         		
     				var additionalParams = {
     			             headers: {Authorization : token
     			             }
     			       };
                      
     				var data =	apigClient.getobjectPost(params, body, additionalParams)
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
                                
                function getusersession(){
       	    	 return new Promise((resolve, reject) => {
        	 			 cognitoUser.getSession((err, session) =>{
        	 	            if (err) {
        				    	swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",allowOutsideClick: false,
					              allowEscapeKey:false,
					              width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',
					            	  buttonsStyling: false,confirmButtonClass: 'button1'});
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
              return objectlist;
           }
       };
    });

