var viewindividualobjectCtrl = function ($scope, $http, $location, $window,$uibModalInstance,config,$crypto,$cookies,objectsimg,$sce) {

	
$scope.viewobjects = function(){
    
    localStorage.getItem("786a2y1e") !=null ?   $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';

    $scope.decry.otype == 'youtube' || $scope.decry.otype == 'vimeo' ? objectsimg = JSON.stringify($scope.objectdetails) :''; 
    //alert(objectsimg)
    $scope.objects = JSON.parse(objectsimg);
    

    $scope.indObjects =angular.copy($scope.objectdetails);
    var min = ~~(($scope.indObjects.OD.DUR % 3600) / 60);
    var sec = $scope.indObjects.OD.DUR % 60;

    $scope.indObjects.OD.DUR = min;
    $scope.indObjects.OD.secs = sec;

    $cookies.put("CloudFront-Policy", $scope.objects.Policy);
    $cookies.put("CloudFront-Signature", $scope.objects.Signature);
    $cookies.put("CloudFront-Key-Pair-Id", $scope.objects.KeyPairId);
   // alert($scope.objects.ourl)
    if ($scope.indObjects.OD.OTYPE == 'html' || $scope.indObjects.OD.OTYPE == 'pdf' || $scope.indObjects.OD.OTYPE == 'interactivity' || $scope.indObjects.OD.OTYPE == 'scorm' || $scope.indObjects.OD.OTYPE == 'video' || $scope.indObjects.OD.OTYPE == 'audio'){
        $scope.objects.url = $sce.trustAsResourceUrl($scope.objects.ourl);
       
        };
        if($scope.decry.otype =="youtube")
        {
          $scope.embid = $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+ $scope.objects.OD.ECODE+"?rel=0&showinfo=0");
        }
        if($scope.decry.otype =="vimeo")
        {
     
          $scope.embid = $sce.trustAsResourceUrl("https://player.vimeo.com/video/"+ $scope.objects.OD.ECODE+"?rel=0&showinfo=0");
         
        }
   	 if(!$scope.editbtn)
        {        
        	$scope.editobject = true;
        }else
        {
        	$scope.editobject = false;
        }
        $scope.objedit = false;
        $scope.orgtools = [];
        if($scope.indObjects.OD.MRTOOLS!= undefined){
            
            for(var i=0;i<$scope.indObjects.OD.MRTOOLS.length;i++){
                var obj ={};
              obj.ttitle = $scope.indObjects.OD.MRTOOLS[i];
              obj.tid = $scope.indObjects.OD.MRTOOLS[i];
              $scope.orgtools.push(obj);
            }
        }
        $scope.indObjects.OD.MRTOOLS = $scope.orgtools;
  
        $scope.orgprods = [];
        if($scope.indObjects.OD.ADPRODUCTS != undefined){
            
            for(var i=0;i<$scope.indObjects.OD.ADPRODUCTS.length;i++){
                var obj ={};
              obj.ttitle = $scope.indObjects.OD.ADPRODUCTS[i];
              obj.tid = $scope.indObjects.OD.ADPRODUCTS[i];
              $scope.orgprods.push(obj);
            }
        }
        $scope.indObjects.OD.ADPRODUCTS = $scope.orgprods;
  
        $scope.tools = [{"tid":"Email Marketing","ttitle":"Email Marketing"},
        {"tid":"Listings Management","ttitle":"Listings Management"},{"tid":"NXT","ttitle":"NXT"},
        {"tid":"Pitch","ttitle":"Pitch"},{"tid":"SMS - Mobile Messaging","ttitle":"SMS - Mobile Messaging"},
        {"tid":"NXT With Digital","ttitle":"NXT With Digital"}];
  
        $scope.adprods = [{"tid":"CTV","ttitle":"CTV"},
        {"tid":"Display","ttitle":"Display"},{"tid":"Email Marketing","ttitle":"Email Marketing"},
        {"tid":"Foot Traffic Attribution","ttitle":"Foot Traffic Attribution"},{"tid":"Geofencing","ttitle":"Geofencing"},
        {"tid":"Listings Management","ttitle":"Listings Management"},{"tid":"Native","ttitle":"Native"},
        {"tid":"OTT","ttitle":"OTT"},{"tid":"SEM","ttitle":"SEM"},{"tid":"SMS - Mobile Messaging","ttitle":"SMS - Mobile Messaging"},
        {"tid":"Social","ttitle":"Social"},{"tid":"Streaming Audio","ttitle":"Streaming Audio"},{"tid":"Video","ttitle":"Video"},
        {"tid":"Video Geofencing","ttitle":"Video Geofencing"} 
        ];
        $scope.example2settings = {
            displayProp: 'tid'
        };	
        
           $scope.example14data = $scope.tools;
           $scope.example13data = $scope.adprods;
       
           $scope.example14settings = {
               scrollableHeight: '200px',
               scrollable: true,
               enableSearch: false,
               externalIdProp : ''
           };
        };

$scope.viewobjects();  


$scope.close = function(){
    $uibModalInstance.close();
};
$scope.editobjectfun=function()
{

	if($scope.objtenants.length === 0){
		
    $scope.editobject = false;
	$scope.objedit = true;
    $scope.disabled = true;
   
  	 $scope.origobjectdetails = angular.copy($scope.indObjects.OD);
  	 
    $scope.$watch('indObjects.OD.ON', function() {
 	  $scope.checkobject();
    });
    $scope.$watch('indObjects.OD.DUR', function() {
    	  $scope.checkobject();
    });
    $scope.$watch('indObjects.OD.secs', function() {
    	  $scope.checkobject();
    });
  
    $scope.$watch('indObjects.OD.ECODE', function() {
        $scope.checkobject();
    });
    
  if($scope.indObjects.OD.CGRY.ttags.length>0){
	  
    	for(var i=0;i<$scope.indObjects.OD.CGRY.ttags.length;i++){
    		$scope.$watch('indObjects.OD.CGRY.ttags[i]', function() {
      	  	  $scope.checkobject();
      	    });
    	}
    	
    }
  $scope.$watch('indObjects.OD.CGRY.ttags.length', function() {
	  	  $scope.checkobject();
	    });
  
    // $scope.$watch('indObjects.OD.CGRY.ttags', function() {
  	//   $scope.checkobject();
    // });
    

    $scope.$watch('indObjects.file', function() {
    	  $scope.checkobject();
      });
    
    if ($scope.indObjects.OD.OTYPE == "video") {
    	 $scope.filetype="'video/*'";
    	 $scope.$watch('indObjects.OD.ODESC', function() {
    		 $scope.checkobject();
       });
    	 
    }else if ($scope.indObjects.OD.OTYPE == "audio") {
    	 $scope.filetype="'.MP3'";
    	 $scope.$watch('indObjects.OD.ODESC', function() {
    		 $scope.checkobject();
       });
    }else if ($scope.indObjects.OD.OTYPE == "youtube") {
   	
	 $scope.$watch('indObjects.OD.ODESC', function() {
		 $scope.checkobject();
   });
	 
	}else if ($scope.indObjects.OD.OTYPE == "vimeo") {
		
		 $scope.$watch('indObjects.OD.ODESC', function() {
			 $scope.checkobject();
	   });
	}else if($scope.indObjects.OD.OTYPE == "pdf")
    {	
    	$scope.filetype="'.pdf'";
    }else if($scope.indObjects.OD.OTYPE == "interactivity")
    {
        $scope.filetype= "'.html, application/zip, application/x-zip-compressed, .zip'";
    }else 
    {
        $scope.filetype="'.html'";
    }
    $scope.$watch('indObjects.OD.ADPRODUCTS', function() {
        $scope.checkobject();
    });
    $scope.$watch('indObjects.OD.MRTOOLS', function() {
        $scope.checkobject();
    });
    $scope.$watch('indObjects.OD.SHARABLE', function() {
        $scope.checkobject();
    });
	}
	else{
		swal({title: "Oops!", text: "Unpublish object to make any changes", type: "warning",buttonsStyling:false,allowOutsideClick: false,
            allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	}
}
$scope.checkobject = function()
{
	 $scope.objectchangedcheck = false;
	
    if($scope.indObjects.OD.ON !== $scope.origobjectdetails.ON){
    	$scope.objectchangedcheck = true;
     }
  
    if($scope.indObjects.OD.ECODE !== $scope.origobjectdetails.ECODE){
    	$scope.objectchangedcheck = true;
     }
    
    
    for (var i = 0; i < $scope.indObjects.OD.CGRY.ttags.length; i++) {
    	
    	 if($scope.indObjects.OD.CGRY.ttags[i] !== $scope.origobjectdetails.CGRY.ttags[i]){
    		 
    	    	$scope.objectchangedcheck = true;
    	     }
	}
 
    if($scope.indObjects.OD.OTYPE == "video" || $scope.indObjects.OD.OTYPE == "audio"
    	||$scope.indObjects.OD.OTYPE == "youtube" || $scope.indObjects.OD.OTYPE == "vimeo"){
    	if($scope.indObjects.OD.ODESC !== $scope.origobjectdetails.ODESC){
    	$scope.objectchangedcheck = true;
    	}
    }
    if($scope.indObjects.OD.DUR !== $scope.origobjectdetails.DUR){
    	$scope.objectchangedcheck = true;
     }
     if($scope.indObjects.OD.secs !== $scope.origobjectdetails.secs){
    	$scope.objectchangedcheck = true;
     }
    if($scope.indObjects.file !== $scope.origobjectdetails.file){
    	$scope.objectchangedcheck = true;
     }
    if($scope.indObjects.OD.CGRY.ttags.length !== $scope.origobjectdetails.CGRY.ttags.length){
    	$scope.objectchangedcheck = true;
     }
     if($scope.indObjects.OD.ADPRODUCTS !== $scope.origobjectdetails.ADPRODUCTS){
    	$scope.objectchangedcheck = true;
     }
     if($scope.indObjects.OD.MRTOOLS !== $scope.origobjectdetails.MRTOOLS){
    	$scope.objectchangedcheck = true;
     }
     if($scope.indObjects.OD.SHARABLE !== $scope.origobjectdetails.SHARABLE){
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
$scope.onlyNumbers = function(event){   
    var keys={
        'up': 38,'right':39,'down':40,'left':37,
        'escape':27,'backspace':8,'tab':9,'enter':13,'del':46,
        '0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57
    };
    for(var index in keys) {
        if (!keys.hasOwnProperty(index)) continue;
        if (event.charCode==keys[index]||event.keyCode==keys[index]) {
            return; 
        }
    }   
    event.preventDefault();
};
$scope.saveobj=function()
{

	$scope.loading = true;
    $scope.perror1=false;
    $scope.perror5=false;
    $scope.perror3=false;
    $scope.perror8=false;
    $scope.perror2=false;
    $scope.aerror7=false;
    $scope.aerror6=false;
    $scope.aerror8=false;
    $scope.aerror9=false;
    $scope.aerror10=false;
    
 
    if($scope.indObjects.OD.OTYPE == 'audio' || $scope.indObjects.OD.OTYPE == 'video' || 
			$scope.indObjects.OD.OTYPE == 'youtube' || $scope.indObjects.OD.OTYPE == 'vimeo'){
		if($scope.indObjects.OD.ODESC == null || $scope.indObjects.OD.ODESC =='')
        {
			$scope.perror3 = true;
			 $scope.loading = false;
			
         }            
    }
    if($scope.indObjects.OD.ADPRODUCTS === undefined || $scope.indObjects.OD.ADPRODUCTS === null){
        $scope.aerror8=true;
        $scope.loading = false;
        return;
    }
    if($scope.indObjects.OD.MRTOOLS === undefined || $scope.indObjects.OD.MRTOOLS === null){
        $scope.aerror9=true;
        $scope.loading = false;
        return;
    }
    if($scope.indObjects.OD.SHARABLE === undefined || $scope.indObjects.OD.SHARABLE === null){
        $scope.aerror10=true;
        $scope.loading = false;
        return;
    }
	if($scope.indObjects.OD.OTYPE == 'youtube' || $scope.indObjects.OD.OTYPE == 'vimeo'){
		if($scope.indObjects.OD.ECODE == null || $scope.indObjects.OD.ECODE =='')
        {
			$scope.perror8 = true;
             $scope.loading = false;
             
			
         }            
	}
	
	
    if($scope.indObjects.OD.ON == null || $scope.indObjects.OD.ON =='' 
    || $scope.indObjects.OD.DUR ==undefined || ($scope.indObjects.OD.DUR <= 0 && $scope.indObjects.OD.secs <= 0) || $scope.indObjects.OD.secs === undefined){
    	
            if($scope.indObjects.OD.ON == null || $scope.indObjects.OD.ON == '' )
            {
            $scope.perror1=true;
            $scope.loading = false;
            }
          
            if($scope.indObjects.OD.DUR <= 0 && $scope.indObjects.OD.DUR != undefined && $scope.indObjects.OD.secs <= 0){
            	$scope.perror5=true;
            	 $scope.loading = false;
              
            } 
            if($scope.indObjects.OD.secs === undefined){
            	$scope.perror2 = true;
            	 $scope.loading = false;
              
            } 
        }               
    else
        {
    	    
        	
    	if($scope.indObjects.OD.OTYPE == 'audio' || $scope.indObjects.OD.OTYPE == 'video' || 
    			$scope.indObjects.OD.OTYPE == 'youtube' || $scope.indObjects.OD.OTYPE == 'vimeo'){
    		if($scope.indObjects.OD.ODESC == null || $scope.indObjects.OD.ODESC =='')
            {
    			$scope.perror3 = true;
    			 $scope.loading = false;
    			return;
             }            
    	}
    	if($scope.indObjects.OD.OTYPE == 'youtube' || $scope.indObjects.OD.OTYPE == 'vimeo'){
    		if($scope.indObjects.OD.ECODE == null || $scope.indObjects.OD.ECODE =='')
            {
    			$scope.perror8 = true;
    			 $scope.loading = false;
    			return;
             }            
    	}
    	
        	
        	
        	var flag=0;
        	if($scope.indObjects.OD.CGRY.ttags.length >0){
        		for (var i = 0; i < $scope.indObjects.OD.CGRY.ttags.length; i++) {
                	
                  	 if($scope.indObjects.OD.CGRY.ttags[i] !== $scope.origobjectdetails.CGRY.ttags[i]){
                  		
                  		flag = 1;
                  		break;
                     	 
                  	     }
               	}
        	}
            if($scope.indObjects.OD.CGRY.ttags != undefined){
	    		for (var i = 0; i < $scope.indObjects.OD.CGRY.ttags.length; i++) {
			 		
	    			$scope.indObjects.OD.CGRY.ttags[i]=$scope.indObjects.OD.CGRY.ttags[i].text;
	    			
			 	}
	    	}
        	
        	 if($scope.indObjects.OD.ON !== $scope.origobjectdetails.ON ||  
                     $scope.indObjects.OD.DUR !== $scope.origobjectdetails.DUR || flag == 1
                     || $scope.indObjects.OD.secs !== $scope.origobjectdetails.secs
        			 || $scope.indObjects.OD.ODESC !== $scope.origobjectdetails.ODESC
                     || $scope.indObjects.OD.CGRY.ttags !== $scope.origobjectdetails.CGRY.ttags
                     || $scope.indObjects.OD.ADPRODUCTS !== $scope.origobjectdetails.ADPRODUCTS
                     || $scope.indObjects.OD.MRTOOLS !== $scope.origobjectdetails.MRTOOLS
                     || $scope.indObjects.OD.SHARABLE !== $scope.origobjectdetails.SHARABLE){
        		    
        		 
                     $scope.updateobject();
                   	
        	 }
        	
        	 
                 if($scope.filechanged){
                	 
                	 if($scope.indObjects.file.type == "application/zip" || $scope.indObjects.file.type == "application/x-zip-compressed"){
                		 $scope.zipfile = $scope.indObjects.file;
     					JSZip.loadAsync($scope.indObjects.file).then(function(content) {
     			               
     	                     var tmp= JSON.stringify(content);
     	                     
     	                     var t1=tmp.toString();
     	                     t1 = JSON.parse(t1);
     	                     
     	                     
     	                     try{
                                if($scope.indObjects.OD.OTYPE != 'scorm'){
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
             }
        }

}

$scope.updateobject = function(){
	
    $scope.indObjects.OD.DUR = $scope.indObjects.OD.DUR * 60;
    $scope.indObjects.OD.DUR = $scope.indObjects.OD.DUR + $scope.indObjects.OD.secs;

    $scope.orgtools = [];
        if($scope.indObjects.OD.MRTOOLS!= undefined){
            
            for(var i=0;i<$scope.indObjects.OD.MRTOOLS.length;i++){
                
              $scope.orgtools.push($scope.indObjects.OD.MRTOOLS[i].ttitle);
            }
        }
        $scope.indObjects.OD.MRTOOLS = $scope.orgtools;
        $scope.orgads = [];
        if($scope.indObjects.OD.ADPRODUCTS!= undefined){
            
            for(var i=0;i<$scope.indObjects.OD.ADPRODUCTS.length;i++){
                
              $scope.orgads.push($scope.indObjects.OD.ADPRODUCTS[i].ttitle);
            }
        }
       $scope.indObjects.OD.ADPRODUCTS = $scope.orgads;

	$scope.object = {
			   
			ON: 		$scope.indObjects.OD.ON,
			ODESC: $scope.indObjects.OD.ODESC,
            OTYPE:  		$scope.indObjects.OD.OTYPE,
            DUR: 	$scope.indObjects.OD.DUR,
            CON: 	$scope.indObjects.OD.CON,
            OURL:  		$scope.indObjects.OD.OURL,
            CBY:		$scope.decry.username,
            TYPE:'1',
            CGRY:     $scope.indObjects.OD.CGRY,
            ADPRODUCTS: $scope.indObjects.OD.ADPRODUCTS,
            MRTOOLS: $scope.indObjects.OD.MRTOOLS,
            SHARABLE: $scope.indObjects.OD.SHARABLE
       
		};
		
        
		if($scope.indObjects.OD.OTYPE == 'youtube' || $scope.indObjects.OD.OTYPE == 'vimeo'){
			$scope.object.ECODE = $scope.indObjects.OD.ECODE;
			$scope.object.OURL = $scope.indObjects.OD.ECODE;
        }
         
		var body= { 
            jsondata : $scope.object,
            OBJID: $scope.indObjects.OBJID,
            oid: 		$scope.decry.oid,	  
     };

	 var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});
     var params = {};
     
 
     var additionalParams = {
            
     };

    var topicjson = apigClient.editObjectPost(params, body, additionalParams)
     .then(function(result){

        var response=JSON.stringify(result.data);
        response = JSON.parse(response);
        
        if(response.id === 1 || response.id === '1'){
            $uibModalInstance.close(obj);
   		 swal({title: "Oops!", text: "Object with same name already exist in admin portal!", type: "warning",buttonsStyling:false,allowOutsideClick: false,
                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', confirmButtonColor: "#f5a138",customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
   		$scope.loading = false;
        } else {

            // swal({title: "", text: "Object updated successfully", type: "success",buttonsStyling:false,allowOutsideClick: false,
        //     allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', confirmButtonColor: "#f5a138",customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
   	    
            $uibModalInstance.close($scope.object);
            $window.location="#objects";
        }
     
     }).catch( function(result){
         
         var json = JSON.stringify(result);
         var json1 = json.toString();
         alert('ERROR'+result);
         $scope.loading = false;
         $scope.$apply();
         
     });
}
$scope.save = function(){
	
    localStorage.getItem("786a2y1e") != null ? $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';
     
   
    $scope.filetype = $scope.indObjects.file.name.split("."); 
    $scope.filename = $scope.indObjects.OBJID+'.'+$scope.filetype[1];
   
    $scope.indObjects.newfile =  $scope.filename;
    $scope.indObjects.filechanges =  true;
	   
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
         	$window.location="#objects";
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
			              width: '400px',showConfirmButton: true, confirmButtonText: 'OK', confirmButtonColor: "#f5a138",customClass: 'sweetalert-confirmOk',
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
	 
     var apigClient = apigClientFactory.newClient({
         invokeUrl: $scope.decry.api,
     });
     var params = {};
     var body = {
    		 type: '1',
    		 oid: $scope.decry.oid,
    		 otype: $scope.indObjects.OD.OTYPE,
             filetype: $scope.indObjects.file.type,
             filename: $scope.filename,
             OBJID: $scope.indObjects.OBJID
             
              };
    
    
     var additionalParams = {
             headers: {Authorization : token
             }
     };
     
     apigClient.getpreSignedURLPost(params, body, additionalParams)
     .then(function(result){
       
        var json = JSON.stringify(result.data);
        
        if($scope.indObjects.OD.OTYPE == 'interactivity' || $scope.indObjects.OD.OTYPE == 'scorm'){
        	
			  $scope.uploadSwiperData($scope.indObjects.file, result.data,token,body);
      	  
        }else
      	  {
        
        	$scope.upload($scope.indObjects.file, result.data);
      	  }
       
      
         }).catch( function(result){
             
             var json = JSON.stringify(result);
             var json1 = json.toString();
             alert('ERROR'+result);
             $scope.loading = false;
             $scope.$apply();
             
         });
 }
 $scope.uploadSwiperData = function(file,url,token,body) {
     $http.put(url, file, {headers:{'Content-Type': file.type}})
       .success(function(resp) {
    	   
       	$scope.uploadSwiper(file,token,body);
       	 
         //Finally, We're done
       	$uibModalInstance.close($scope.object);
       	$window.location.href = '#objects';
       })
       .error(function(resp) {
       	$scope.loading = false;
         alert("An Error Occurred Attaching Your File. Please try again or Contact production Support if problem persist");
       });
}
 $scope.uploadSwiper = function(file,token,body){

   	 var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});
        var params = {};

        var additionalParams = {
                headers: {Authorization : token
                }
        };
        
       
        var topicjson = apigClient.uploadObjectSwiperPost(params, body, additionalParams)
        .then(function(result){
        	
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
		
		$uibModalInstance.dismiss('cancel');

};
	$scope.onTagAdded = function(tag, limit) {

        if ($scope.indObjects.OD.CGRY.ttags.length > limit) {
            $scope.indObjects.OD.CGRY.ttags.length = 15;
        }
	}
    $scope.paste = function(event, limit) {
        event.preventDefault();
        
        var ttags = event.originalEvent.clipboardData.getData('text/plain').split(',')
        for (var i = 0; i < ttags.length; i++) {
            
            $scope.indObjects.OD.CGRY.ttags.push({"text":ttags[i]});	
        }	
        if ($scope.indObjects.OD.CGRY.ttags.length > limit) {
            $scope.indObjects.OD.CGRY.ttags.length = 15;
        }	
    }
$scope.fileselect=function()
{
	
	    $scope.disabled = false;
	 	//$scope.objectchangedcheck = true;
	 	$scope.filechanged = true;
}
};
app.controller('viewindividualobjectCtrl', viewindividualobjectCtrl);
viewindividualobjectCtrl.$inject = ['$scope', '$http', '$location', '$window','$uibModalInstance','config','$crypto','$cookies','objectsimg','$sce'];

app.factory("getobjects", function($window, $q, config,$crypto){
    return {
        getobjects: function(){
           
            if(localStorage.getItem("786a2y1e") == null || localStorage.getItem("786a2y1e") ==  ''){
                
                $window.location.href = '#login';
                
            }else{
                         
                var decry=JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
                    var profiledata;
                    AWSCognito.config.region =  config.reg;
                    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: decry.iid
                    });
                   var fbuser = localStorage.getItem("fbuser");
                    var poolData = { UserPoolId : decry.uid,
                            ClientId : decry.cid
                        };
             
                    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
                    
                    var cognitoUser = userPool.getCurrentUser();
                  
                   if (cognitoUser != null ) {
                      
                        if(decry.otype == 'youtube' || decry.otype == 'vimeo')
                            {
                                 profiledata = {};
                            }else
                                {
                                   profiledata = getusersession();
                                }
                      
                       
                    }
                    else {
                        localStorage.clear();
                        $window.location.href = '#login';
                    }
                   
                   
                   
                      function getprofile(token){
                          if(decry.api === undefined){
                              
                              var apigClient = apigClientFactory.newClient({
                                  
                              });
                          }else{
                              
                              var apigClient = apigClientFactory.newClient({
                                  invokeUrl: decry.api,
                              });
                          }
                    
                     var params = {};
                        
                       var body = {
                               oid: decry.oid,
                               action:1,
                               ourl:decry.ofilename,
                               otype:decry.otype,
                               objid: decry.obid
                                };
                 
                     var additionalParams = {
                               headers: {Authorization : token
                               }
                         };
                   
            
                          var searchresult1 = apigClient.getobjectPost(params, body, additionalParams)
                           .then(function(result){
                              
                              var json = JSON.stringify(result.data);
                           
                               var result = json.toString();
                               return $q.when(result);
                                   
                               }).catch( function(result){
                                   
                                   return $q.when(false);
                                   
                               });
                           return $q.when(searchresult1);
          
                    }
                    function getusersession(){
                   
                        return new Promise((resolve, reject) => {
                           cognitoUser.getSession((err, session) =>{
                              if (err) {
                                  swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
                		              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', confirmButtonColor: "#f5a138",customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
                                  localStorage.clear();
                                  $window.location.href = '#login';
                              }else{
                                  
                                  var token = session.idToken.jwtToken;
                                  var abcc = getprofile(token);
                                  resolve(abcc)
                                  return $q.when(abcc);
                          
                              }
                          });
                      })
                   }
                    
                   
                    return  profiledata; 
                  
        }
        
        }
    };
});

