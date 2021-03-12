var viewquizCtrl = function($scope, $uibModalInstance, $http, $location, $window, $sce, quizJson ,$cookies,$crypto,config) {
	
	
$scope.quizview = function(){
	if(!$scope.editbtn)
    {        
    	$scope.editobject = true;
    }else
    {
    	$scope.editobject = false;
    }
	
	$scope.editquiz = false;
	$scope.disablebtn = true;
	$scope.showquestion = true;
	$scope.rightcount = 0;
	$scope.overview = false;
	$scope.submitbutton = false;
	
	$scope.quizJson = JSON.parse(quizJson);
	
	$scope.origquizJson = angular.copy($scope.quizJson);
	
	$scope.currentPage = 1;
	$scope.filterPage=$scope.quizJson.qitems[$scope.currentPage-1].iid;
   // alert(JSON.stringify($scope.quizJson.qitems[$scope.currentPage-1]))
	if($scope.quizJson.qtype == "0" && $scope.quizJson.qtype != undefined)
    {
        $scope.verifybutton = true;
        $scope.nextbutton = false;
        $scope.feedbackadd();
           
        
    }else
    {
        $scope.verifybutton = false;
        $scope.nextbutton = true;
    }
	if($scope.quizJson.qitems.length == 1 && $scope.quizJson.qtype != "0"){
		$scope.submitbutton = true;
		 $scope.nextbutton = false;
	}
	$scope.indobjects = angular.copy($scope.objectdetails);
}

$scope.feedbackadd = function()
{
    $scope.fdoptvl1 =  $scope.quizJson.qitems[$scope.currentPage-1].iopts[0] == undefined ? '' : $scope.quizJson.qitems[$scope.currentPage-1].iopts[0].feedback;
    $scope.fdoptvl2 =  $scope.quizJson.qitems[$scope.currentPage-1].iopts[1] == undefined ? '' : $scope.quizJson.qitems[$scope.currentPage-1].iopts[1].feedback;
    $scope.fdoptvl3 =  $scope.quizJson.qitems[$scope.currentPage-1].iopts[2] == undefined ? '' : $scope.quizJson.qitems[$scope.currentPage-1].iopts[2].feedback;
    $scope.fdoptvl4 =  $scope.quizJson.qitems[$scope.currentPage-1].iopts[3] == undefined ? '' : $scope.quizJson.qitems[$scope.currentPage-1].iopts[3].feedback;
    $scope.fdoptvl5 =  $scope.quizJson.qitems[$scope.currentPage-1].iopts[4] == undefined ? '' : $scope.quizJson.qitems[$scope.currentPage-1].iopts[4].feedback;    
}


$scope.showfeedback = function(optyp,val)
{

    if($scope.quizJson.qtype == "0" && $scope.quizJson.qtype != undefined)
    {
        if(optyp == "op1vl")
        {  
            if(val.replace(/\s/g, '').length === 0 || val =='')
            {
                $scope.fdoptvl1 = '';
                $scope.fdopt1=false;             
            }else
            {
                $scope.fdopt1=true;
                
            }
     
        }
        if(optyp == "op2vl")
        {  
            if(val.replace(/\s/g, '').length === 0 || val =='')
            {
                $scope.fdoptvl2 = '';
                $scope.fdopt2=false;
            }else
            {
                $scope.fdopt2=true;
            }
        }
        if(optyp == "op3vl")
        {  
            if(val.replace(/\s/g, '').length === 0 || val =='')
            {
                $scope.fdoptvl3 = '';
                $scope.fdopt3 = false;
            }else
            {
                $scope.fdopt3 = true;
            }
        }
        if(optyp == "op4vl")
        {  
            if(val.replace(/\s/g, '').length === 0 || val =='')
            {
                $scope.fdoptvl4 = '';
                $scope.fdopt4=false;
            }else
            {
                $scope.fdopt4=true;
            }
        }
        if(optyp == "op5vl")
        {  
            if(val.replace(/\s/g, '').length === 0 || val =='')
            {
                $scope.fdoptvl5 = '';
                $scope.fdopt5 =false;
            }else
            {
                $scope.fdopt5 =true;
            }
        }
        if(optyp == "op6vl")
        {  
            if(val.replace(/\s/g, '').length === 0 || val =='')
            {
                $scope.fdoptvl6 = '';
                $scope.fdopt6 =false;
            }else
            {
                $scope.fdopt6 =true;
            }
        }
        
    }
}

$scope.nextquesfun = function(quest){
    
    var promise = new Promise(function(resolve, reject) {

    quest.iopts.forEach(function (element, index, array) {

          if(element.correct == true || element.correct == "true")
                if (element.Selected == true  || element.Selected == "true")   {
                    $scope.rightcount++;                
                }
            });
    
    resolve("Stuff worked!");
       
      });
    promise.then(function(result) {
        quest.iopts.forEach(function (element, index, array) {
           
            element.Selected = '';
       
        });
      }, function(err) {
        console.log(err); // Error: "It broke"
      });

    $scope.currentPage = $scope.currentPage+1;
    $scope.filterPage=$scope.quizJson.qitems[$scope.currentPage-1].iid;
    if($scope.quizJson.qitems.length == $scope.currentPage)
    {
        $scope.submitbutton = true;
        $scope.nextbutton = false;
    }
    
    if(($scope.quizJson.qtype == "0" || $scope.quizJson.qtype == 0) && $scope.quizJson.qtype !=undefined )
    {
        $scope.cwicon = false;
        $scope.verifybutton = true;
        $scope.nextbutton = false;
        $scope.submitbutton = false;
        
    }
    $scope.disablebtn = true;
}

$scope.submitfn=function(quest){
    $scope.overview = true;
    $scope.showquestion = false;
    var promise = new Promise(function(resolve, reject) {
     quest.iopts.forEach(function (element, index, array) {
         
          if(element.correct == true || element.correct == "true")
              if (element.Selected == true || element.Selected == "true" )   {
                  $scope.rightcount++;                   
              }          
           
            });
          resolve("worked!");          
      });
    promise.then(function(result) {
        quest.iopts.forEach(function (element, index, array) {
           
            element.Selected = '';
       
        });
      }, function(err) {
        console.log(err); // Error: "It broke"
      });
   
    $scope.score = Math.round($scope.rightcount/ $scope.quizJson.qitems.length * 100);
    $scope.cutoff = $scope.quizJson.cutoff == undefined ? 75 : $scope.quizJson.cutoff ;
  
    if( $scope.score >= $scope.cutoff)
        {
        $scope.trybtn=false;
        $scope.tryp=false;
        $scope.cngp=true;
        $scope.exitbt=true;
        $scope.exitbtwt=false;
        }else{
            $scope.trybtn=true;
            $scope.tryp=true;
            $scope.cngp=false;
            $scope.exitbt=false;
            $scope.exitbtwt=true;
        }
   
}

$scope.reset = function(){
   
	$scope.quizview();
    $scope.cntqop=0;
}

$scope.chngeopt=function(question,correct,option){
    $scope.disablebtn = false;
    question.iopts.forEach(function (element, index, array) {
        if (element.content != option.content) {
            element.Selected = false;
        }else
            {
            element.Selected = true;
            }
    });
   
}

$scope.checkisCorrect = function (question,index) {
    $scope.cwicon = true;
    $scope.verifybutton = false;
    $scope.nextbutton = true;
  
    if($scope.quizJson.qitems.length == $scope.currentPage)
    {
        $scope.exitquiz = true;
        $scope.nextbutton = false;
    }
        $scope.showPopover = true;
}
	
$scope.quizview();


$scope.editquizfun = function(){
	
	if($scope.decry.PUB != '1'){
	$scope.editquiz = true;
    $scope.editobject = false;
    
	$scope.op1vl="";
    $scope.op2vl="";
    $scope.op3vl="";
    $scope.op4vl="";
    $scope.op5vl="";
	$scope.editpreview();
	$scope.$watch('quizJson', function() {
  	  $scope.checkquizJson();
     }, true);
	
	
	  $scope.$watchGroup(['op1vl','op2vl','op3vl','op4vl','op5vl','op6vl'], function(newVal, oldVal , scope) {
	      
         
          if(newVal[0] != oldVal[0])
          {
              $scope.showfeedback('op1vl',newVal[0])
          } 
       
          if(newVal[1] != oldVal[1])
          {
              $scope.showfeedback('op2vl',newVal[1])
          }
          if(newVal[2] != oldVal[2])
          {
              $scope.showfeedback('op3vl',newVal[2])
          }
          if(newVal[3] != oldVal[3])
          {
              $scope.showfeedback('op4vl',newVal[3])
          }
          if(newVal[4] != oldVal[4])
          {
              $scope.showfeedback('op5vl',newVal[4])
          }
          if(newVal[5] != oldVal[5])
          {
              $scope.showfeedback('op6vl',newVal[5])
          }
       }, true);
	  
	   if($scope.quizJson.qtype == "0" || $scope.quizJson.qtype == 0)
      {
           if($scope.op1vl == '' || $scope.op1vl.replace(/\s/g, '').length === 0)
           {
              $scope.fdopt1=false;     
           }else
           {
              $scope.fdopt1=true;     
           }
           if($scope.op2vl == '' || $scope.op2vl.replace(/\s/g, '').length === 0)
           {
              $scope.fdopt2=false;     
           }else
           {
              $scope.fdopt2=true;     
           }
           if($scope.op3vl == '' || $scope.op3vl.replace(/\s/g, '').length === 0)
           {
              $scope.fdopt3=false;     
           }else
           {
              $scope.fdopt3=true;     
           }
           if($scope.op4vl == '' || $scope.op4vl.replace(/\s/g, '').length === 0)
           {
              $scope.fdopt4=false;     
           }else
           {
              $scope.fdopt4=true;     
           }
           if($scope.op5vl == '' || $scope.op5vl.replace(/\s/g, '').length === 0)
           {
              $scope.fdopt5=false;     
           }else
           {
              $scope.fdopt5=true;     
           }
           if($scope.op6vl == '' || $scope.op6vl.replace(/\s/g, '').length === 0)
           {
              $scope.fdopt6=false;     
           }else
           {
              $scope.fdopt6=true;     
           }
      }
	}
	   
	else{
			swal({title: "Oops!", text: "Unpublish object to make any changes", type: "warning",buttonsStyling:false,allowOutsideClick: false,
	            allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
		}
}

$scope.checkquizJson = function(){
	$scope.quizchangedcheck =  angular.equals($scope.quizJson, $scope.origquizJson);
	
    if($scope.quizchangedcheck){
    	$scope.quizsavebtn = true;
   	 	$scope.quizchanged = false;
    }else{
    	 $scope.quizsavebtn = false;
    	 $scope.quizchanged = true;
    }
}

$scope.editpreview = function()
{
	
    $scope.question = $scope.quizJson.qitems[$scope.currentPage-1].istem;
    $scope.op1vl = $scope.quizJson.qitems[$scope.currentPage-1].iopts[0].content;
    $scope.op2vl = $scope.quizJson.qitems[$scope.currentPage-1].iopts[1].content;
    try
    {
       
    if($scope.quizJson.qitems[$scope.currentPage-1].iopts[2] !== undefined)
        {
          $scope.op3vl = $scope.quizJson.qitems[$scope.currentPage-1].iopts[2].content;
        }else
            {
               
            $scope.op3vl ='';
            }

    if($scope.quizJson.qitems[$scope.currentPage-1].iopts[3] != undefined)
        {
         $scope.op4vl = $scope.quizJson.qitems[$scope.currentPage-1].iopts[3].content;
        }else
            {
                $scope.op4vl ='';
            }
    if($scope.quizJson.qitems[$scope.currentPage-1].iopts[4] != undefined)
    {
     $scope.op5vl=$scope.quizJson.qitems[$scope.currentPage-1].iopts[4].content;
    }else
        {
        $scope.op5vl ='';
        }
    if($scope.quizJson.qitems[$scope.currentPage-1].iopts[5] != undefined)
    {
     $scope.op6vl=$scope.quizJson.qitems[$scope.currentPage-1].iopts[5].content;
    }else
        {
        $scope.op6vl ='';
        }
   }
   catch (e) {
    // TODO: handle exception
       
       }
  
    for(var k=0;k<$scope.quizJson.qitems[$scope.currentPage-1].iopts.length;k++)
    {
   
        if($scope.quizJson.qitems[$scope.currentPage-1].iopts[k].correct=="true" || $scope.quizJson.qitems[$scope.currentPage-1].iopts[k].correct == true)
            {
                var tmp=parseInt(k)+1;          
                $scope.correctoption="opt"+tmp;
            }
    }
  
}

$scope.nextques=function()
{
    var rtval= $scope.questionvalidation();
    if(rtval == undefined)
    {
        return;
    }else
    {
        $scope.cmnaddupdateques();
        $scope.currentPage++;   
        $scope.editpreview();
        if($scope.quizJson.qtype == "0" && $scope.quizJson.qtype != undefined)
        {          
            $scope.feedbackadd();
        } 
    }
   
    
}
$scope.prevques=function()
{
    var rtval= $scope.questionvalidation();
    if(rtval == undefined)
    {
        return;
    }
    else
    {
        $scope.cmnaddupdateques();
        $scope.currentPage--;       
        $scope.editpreview();
        if($scope.quizJson.qtype == "0" && $scope.quizJson.qtype != undefined)
        {           
            $scope.feedbackadd();
        } 
    }
   
}

$scope.questionvalidation = function()
{
    
    $scope.qerror1 = false;
    $scope.qerror2 = false;
    $scope.qerror3 = false;
    $scope.qerror4 = false;
    $scope.qerror5 = false;
    $scope.qerror6 = false;
    $scope.qerror7 = false;

    if(($scope.question == undefined || $scope.question.replace(/\s/g, '').length === 0) && ($scope.op1vl == "" 
    	|| $scope.op1vl == undefined || $scope.op1vl.replace(/\s/g, '').length === 0 )
    	&& ($scope.op2vl == "" || $scope.op2vl == undefined || $scope.op2vl.replace(/\s/g, '').length === 0)
    	&& ($scope.op3vl == "" || $scope.op3vl == undefined || $scope.op3vl.replace(/\s/g, '').length === 0)
    	&& ($scope.op4vl == "" || $scope.op4vl == undefined || $scope.op4vl.replace(/\s/g, '').length === 0)
    	&& ($scope.op5vl == "" || $scope.op5vl == undefined || $scope.op5vl.replace(/\s/g, '').length === 0)
    	&& ($scope.op6vl == "" || $scope.op6vl == undefined || $scope.op6vl.replace(/\s/g, '').length === 0))
    	{
    	$scope.removeques();
    	}else{
    		if($scope.question == undefined || $scope.question.replace(/\s/g, '').length === 0){
    	        $scope.qerror1 = true;
    	        return;
    	    }

    	    if($scope.op1vl == "" || $scope.op1vl == undefined || $scope.op1vl.replace(/\s/g, '').length === 0 || 
    	            $scope.op2vl == "" || $scope.op2vl == undefined || $scope.op2vl.replace(/\s/g, '').length === 0){
    	                $scope.qerror2 = true;
    	                return;
    	            }
    	    if($scope.correctoption == undefined)
    	    {
    	        $scope.qerror3 = true;
    	        return;
    	    }

    	    
    	    if($scope.op3vl != "" && $scope.op3vl  != undefined){
    	        
    	        if($scope.op3vl.replace(/\s/g, '').length === 0){
    	            $scope.qerror5 = true;
    	            return;
    	        }
    	        if($scope.op3vl == $scope.op4vl || $scope.op3vl == $scope.op5vl || $scope.op3vl == $scope.op6vl ){
    	            $scope.qerror7 = true;
    	            return;
    	        }
    	    }

    	    if($scope.op4vl != "" && $scope.op4vl  != undefined){       
    	        if($scope.op4vl.replace(/\s/g, '').length === 0){
    	            $scope.qerror5 = true;
    	            return;
    	        }
    	        
    	        if($scope.op3vl  == undefined || $scope.op3vl.replace(/\s/g, '').length === 0){
    	            $scope.qerror6 = true;
    	            return;
    	        }
    	        if($scope.op4vl == $scope.op5vl || $scope.op4vl == $scope.op6vl  ){
    	            $scope.qerror7 = true;
    	            return;
    	        }
    	    }
    	    if($scope.op5vl != "" && $scope.op5vl  != undefined){       
    	        if($scope.op5vl.replace(/\s/g, '').length === 0){
    	            $scope.qerror5 = true;
    	            return;
    	        }
    	        
    	        if($scope.op4vl  == undefined || $scope.op4vl.replace(/\s/g, '').length === 0){
    	            $scope.qerror6 = true;
    	            return;
    	        }
    	        if($scope.op5vl == $scope.op6vl  ){
    	            $scope.qerror7 = true;
    	            return;
    	        }
    	    }
    	    if($scope.op6vl != "" && $scope.op6vl  != undefined){       
    	        if($scope.op6vl.replace(/\s/g, '').length === 0){
    	            $scope.qerror5 = true;
    	            return;
    	        }
    	        
    	        if($scope.op5vl  == undefined || $scope.op5vl.replace(/\s/g, '').length === 0){
    	            $scope.qerror6 = true;
    	            return;
    	        }
    	    }
    	    if($scope.correctoption == "opt3" && $scope.op3vl == "")
    	        {
    	        $scope.qerror4 = true;
    	        return;
    	        }
    	   if($scope.correctoption == "opt4" && $scope.op4vl == "") {
    	        $scope.qerror4 = true;
    	        return;
    	    }
    	   if($scope.op1vl == $scope.op2vl || $scope.op1vl == $scope.op3vl || $scope.op1vl == $scope.op4vl  || $scope.op1vl == $scope.op5vl || $scope.op1vl == $scope.op6vl){
    	               $scope.qerror7 = true;
    	               return;
    	           }
    	   if($scope.op2vl == $scope.op3vl || $scope.op2vl == $scope.op4vl || $scope.op2vl == $scope.op5vl  || $scope.op2vl == $scope.op6vl ){
    	       $scope.qerror7 = true;
    	       return;
    	   }
    	   return 1;
    	}
    
  
}

$scope.addques=function()
{
    var rtval= $scope.questionvalidation();
    if(rtval==undefined)
    {
        return;
    }else
    {
         $scope.cmnaddupdateques();    
         $scope.quizJson.qitems.push({});
         $scope.currentPage = $scope.quizJson.qitems.length;

         $scope.op1vl = "";
         $scope.op2vl = "";
         $scope.op3vl = "";
         $scope.op4vl = "";
         $scope.op5vl = "";
         $scope.op6vl = "";
         $scope.question = "";
         
         $scope.correctoption = undefined;
        
    }
        
    
  

}
$scope.removeques=function()
{
    $scope.op1vl = "";
    $scope.op2vl = "";
    $scope.op3vl = "";
    $scope.op4vl = "";
    $scope.op5vl = "";
    $scope.op6vl = "";
    $scope.question = "";
    $scope.qerror1 =false;
    $scope.correctoption = undefined;

    if($scope.quizJson.qitems.length !=1)
    {

        $scope.quizJson.qitems.splice($scope.currentPage-1,1);
       
        if($scope.currentPage != 1 )
        {
             $scope.currentPage=$scope.currentPage-1;
        }
      
        $scope.editpreview();
    }
    
}

$scope.savequiz=function(cutoff)
{
    localStorage.getItem("786a2y1e") !=null ?   $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';
    var rtval= $scope.questionvalidation();
    if(rtval == undefined)
    {
        return;
    }
    else
    {

        if(($scope.quizJson.qtype == "0"  || $scope.quizJson.qtype == 0) || ($scope.quizJson.qtype == "1"  || $scope.quizJson.qtype == 1) || cutoff != undefined || $scope.decry.qaction != undefined)
        {
    
        	
        	if($scope.showcategory != false){
        		
        		$scope.showcutoff = true;
        		$scope.showcategory = true;
        		$scope.editquiz = false;
        	}
        	else{
        		
        		 $scope.cmnaddupdateques();
                 
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
         
            
        }else
        {   $scope.showcategory = false;
            $scope.showcutoff = true;
            $scope.editquiz = false;
        }
  }
}
$scope.savecatquiz=function()
{
	$scope.loading = true;
	
	$scope.cmnaddupdateques();
    
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
$scope.getsession = function(cognitoUser,typejson){
    
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
                  $scope.quizjsonupload(token);

              }
          });
      })
}
$scope.quizjsonupload = function(token)
{   
	$scope.loading = true;
    var apigClient = apigClientFactory.newClient({
        invokeUrl: $scope.decry.api,
    });
    var params = {};
    
    var body = {
                folder: $scope.folder,
                qid: $scope.decry.obid,
                qitems: $scope.quizJson.qitems,
                qtype : $scope.quizJson.qtype,
                cutoff : $scope.quizJson.cutoff
             };

    var additionalParams = {
            headers: {Authorization : token
            }
    };
    if($scope.decry.qaction == undefined)
    {
    apigClient.uploadQuizJsonPost(params, body, additionalParams)
    .then(function(result){
        

   var json = JSON.stringify(result.data);
   $scope.object = {
           otitle: "Quiz",
           odescription: "Quiz",
           otype: 'quiz',
           oduration: $scope.quizJson.qitems.length,
           ourl: $scope.decry.obid+".json",
           oid: $scope.decry.obid,
           filechanges: true,
           newfile: $scope.decry.obid+".json",
           qtype : $scope.quizJson.qtype,
           
   };
   
   localStorage.setItem("quizcount", $scope.quizid);
   $uibModalInstance.close($scope.object);
  
 
    }).catch( function(result){
        
        var json = JSON.stringify(result);
        var json1 = json.toString();
        alert('ERROR'+json1);
        $scope.loading = false;
        $scope.$apply();
        
    });  
    }else
        {
 
        
        body.TYPE = '1';
        body.oid = $scope.decry.oid
        body.OBJID = $scope.decry.obid;
        body.qtype = $scope.quizJson.qtype;
        body.qitems = $scope.quizJson.qitems;
        
        $scope.object = {
 			   
 		  ON: 		$scope.indobjects.OD.ON,
 		  ODESC: $scope.indobjects.OD.ODESC,
          OTYPE:  		$scope.indobjects.OD.OTYPE,
          DUR: 	$scope.quizJson.qitems.length,
          OURL:  		$scope.indobjects.OD.OURL,
          TYPE : '1',
          CBY:		$scope.decry.username,
           CGRY:     $scope.indobjects.OD.CGRY,
           ADPRODUCTS:     $scope.indobjects.OD.ADPRODUCTS,
           MRTOOLS:     $scope.indobjects.OD.MRTOOLS,
           SHARABLE:     $scope.indobjects.OD.SHARABLE,
        
 		};
       
        body.jsondata = $scope.object;
  
        apigClient.editObjectPost(params, body, additionalParams)
                .then(function(result){
                    var response=JSON.stringify(result.data);
                    response = JSON.parse(response);
                    
                    if(response.id === 1 || response.id === '1'){
            
                		 $uibModalInstance.close(obj);
              		 swal({title: "Oops!", text: "Object with same name already exist in admin portal!", type: "warning",buttonsStyling:false,allowOutsideClick: false,
                           allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
              		$scope.loading = false;
              
                 	 
              	}else{
              		 $uibModalInstance.close($scope.object);
              	}
             
                }).catch( function(result){
                    
                    var json = JSON.stringify(result);
                    var json1 = json.toString();
                    alert('ERROR'+json1);
                    $scope.loading = false;
                    $scope.$apply();
                    
                });    
        }
}
$scope.cmnaddupdateques=function()
{
    /*if($scope.quizJson.qitems.length != $scope.currentPage-1)
    {
      */
        $scope.quizJson.qitems[$scope.currentPage-1].istem = $scope.question;
    
        if( $scope.quizJson.qitems[$scope.currentPage-1].iopts == undefined)
        {
            $scope.quizJson.qitems[$scope.currentPage-1].iopts = [];
           
            $scope.quizJson.qitems[$scope.currentPage-1].iopts.push({ "content" : $scope.op1vl ,"correct" : $scope.correctoption == "opt1" ? true : false });

        }else
        {
           
            $scope.quizJson.qitems[$scope.currentPage-1].iopts[0].content = $scope.op1vl;
            $scope.quizJson.qitems[$scope.currentPage-1].iopts[0].correct = $scope.correctoption == "opt1" ? true : false
        }
            if( $scope.quizJson.qitems[$scope.currentPage-1].iopts[1] == undefined)
            { 
                $scope.quizJson.qitems[$scope.currentPage-1].iopts.push({ "content" : $scope.op2vl ,"correct" : $scope.correctoption == "opt2" ? true : false});    
            }else
            {
          
            $scope.quizJson.qitems[$scope.currentPage-1].iopts[1].content = $scope.op2vl;
            $scope.quizJson.qitems[$scope.currentPage-1].iopts[1].correct = $scope.correctoption == "opt2" ? true : false
            }
   
        $scope.oplength = $scope.quizJson.qitems[$scope.currentPage-1].iopts.length;

/*      if($scope.op3vl.replace(/\s/g, '').length === 0 )
        {
        
         
           if($scope.op3vl.replace(/\s/g, '').length === 0)
               {
                    $scope.quizJson.qitems[$scope.currentPage-1].iopts.splice(2,4);
               }else
               {
                   $scope.quizJson.qitems[$scope.currentPage-1].iopts[2].content=$scope.op3vl;
               }
                try{
                    if($scope.op4vl!="" && $scope.op4vl.replace(/\s/g, '').length != 0 && $scope.op4vl !=undefined)
                    {
                        $scope.quizJson.qitems[$scope.currentPage-1].iopts.push({"content":  $scope.op4vl,"correct": $scope.correctoption==opt4?"true": "false"});
                    }
                   
                    if($scope.op5vl!="" && $scope.op5vl.replace(/\s/g, '').length != 0)
                    {
                        $scope.quizJson.qitems[$scope.currentPage-1].iopts.push({"content":  $scope.op5vl,"correct": $scope.correctoption==opt5?"true": "false"});
                    }
                }
                catch (e) {
                    // TODO: handle exception
                }
        } else*/
            
        try{
              if($scope.op3vl.replace(/\s/g, '').length === 0)
               {
                 
                  $scope.quizJson.qitems[$scope.currentPage-1].iopts.splice(2,4);
               
               }else
                   {
                    if($scope.quizJson.qitems[$scope.currentPage-1].iopts[2] == undefined)
                        {
                           $scope.quizJson.qitems[$scope.currentPage-1].iopts.push({ "content" : $scope.op3vl ,"correct" : $scope.correctoption == "opt3" ? true : false});  
                        }else
                            {
                            $scope.quizJson.qitems[$scope.currentPage-1].iopts[2].content = $scope.op3vl;
                            $scope.quizJson.qitems[$scope.currentPage-1].iopts[2].correct = $scope.correctoption == "opt3" ? true : false;
                            
                            }
               
                
                   }
              if($scope.op4vl.replace(/\s/g, '').length === 0)
               {
                  $scope.quizJson.qitems[$scope.currentPage-1].iopts.splice(3,3);
               }else
                   {
                   if($scope.quizJson.qitems[$scope.currentPage-1].iopts[3] == undefined)
                       {
                           $scope.quizJson.qitems[$scope.currentPage-1].iopts.push({ "content" : $scope.op4vl ,"correct" : $scope.correctoption == "opt4" ? true : false});  
                       }else
                           {
                               $scope.quizJson.qitems[$scope.currentPage-1].iopts[3].content = $scope.op4vl;
                               $scope.quizJson.qitems[$scope.currentPage-1].iopts[3].correct = $scope.correctoption == "opt4" ? true : false
                           }
                  
            
                   }   
            
          
                  if($scope.op5vl.replace(/\s/g, '').length === 0)
                  {
                    // $scope.quizJson.qitems[$scope.currentPage-1].iopts.splice(4,2);
                  }else
                      {
                      if($scope.quizJson.qitems[$scope.currentPage-1].iopts[4] == undefined)
                          {
                              $scope.quizJson.qitems[$scope.currentPage-1].iopts.push({ "content" : $scope.op5vl ,"correct" : $scope.correctoption == "opt5" ? true : false});  
                          }else
                              {
                                  $scope.quizJson.qitems[$scope.currentPage-1].iopts[4].content = $scope.op5vl;
                                  $scope.quizJson.qitems[$scope.currentPage-1].iopts[4].correct = $scope.correctoption == "opt5" ? true : false
                              }      
                      } 
                  if($scope.op6vl.replace(/\s/g, '').length === 0)
                  {
                    // $scope.quizJson.qitems[$scope.currentPage-1].iopts.splice(4,2);
                  }else
                      {
                      if($scope.quizJson.qitems[$scope.currentPage-1].iopts[5] == undefined)
                          {
                              $scope.quizJson.qitems[$scope.currentPage-1].iopts.push({ "content" : $scope.op6vl ,"correct" : $scope.correctoption == "opt6" ? true : false});  
                          }else
                              {
                                  $scope.quizJson.qitems[$scope.currentPage-1].iopts[5].content = $scope.op6vl;
                                  $scope.quizJson.qitems[$scope.currentPage-1].iopts[5].correct = $scope.correctoption == "opt6" ? true : false
                              }      
                      }
              }
              catch (e) {
                  // TODO: handle exception
              }
              if($scope.quizJson.qtype == "0" || $scope.quizJson.qtype == 0)
              {
                
                   $scope.fdopt1 == true ?   $scope.quizJson.qitems[$scope.currentPage-1].iopts[0].feedback =  $scope.fdoptvl1 : '';
                   $scope.fdopt2 == true ?   $scope.quizJson.qitems[$scope.currentPage-1].iopts[1].feedback = $scope.fdoptvl2 : '';
                   $scope.fdopt3 == true ?   $scope.quizJson.qitems[$scope.currentPage-1].iopts[2].feedback = $scope.fdoptvl3 : '';
                   $scope.fdopt4 == true ?   $scope.quizJson.qitems[$scope.currentPage-1].iopts[3].feedback = $scope.fdoptvl4 : '';
                   $scope.fdopt5 == true ?   $scope.quizJson.qitems[$scope.currentPage-1].iopts[4].feedback = $scope.fdoptvl5 : '';
                   $scope.fdopt6 == true ?   $scope.quizJson.qitems[$scope.currentPage-1].iopts[5].feedback = $scope.fdoptvl6 : '';
                  
              }
              $scope.quizJson.qitems[$scope.currentPage-1].iid = $scope.currentPage;
        

    
    /*}else
        {
     
        $scope.item = {
                iid: $scope.currentPage,
                istem: $scope.question,
                iopts: []
                
            }
        
        if ($scope.op1vl.replace(/\s/g, '').length != 0 && $scope.op1vl != undefined){
        if ($scope.correctoption == "opt1") {
            $scope.opt1 = {
                    content: $scope.op1vl,
                    correct: "true"
                        
            };
        }else
            {
                $scope.opt1 = {
                        content: $scope.op1vl,
                        correct: "false"
                };
            }
        $scope.item.iopts.push($scope.opt1);
        }
        
        if ($scope.op2vl.replace(/\s/g, '').length != 0 && $scope.op2vl != undefined){
            if ($scope.correctoption == "opt2") {
                $scope.opt2 = {
                        content: $scope.op2vl,
                        correct: "true"
                };
            }else
                {
                $scope.opt2 = {
                        content: $scope.op2vl,
                        correct: "false"
                };
                }
            $scope.item.iopts.push($scope.opt2);
            }
        if ($scope.op3vl.replace(/\s/g, '').length != 0 && $scope.op3vl != undefined){
            if ($scope.correctoption == "opt3") {
                $scope.opt3 = {
                        content: $scope.op3vl,
                        correct: "true"
                };
            }else
                {
                $scope.opt3 = {
                        content: $scope.op3vl,
                        correct: "false"
                };
                }
            $scope.item.iopts.push($scope.opt3);
            }
        if ($scope.op4vl.replace(/\s/g, '').length != 0 && $scope.op4vl != undefined){
            if ($scope.correctoption == "opt4") {
                $scope.opt4 = {
                        content: $scope.op4vl,
                        correct: "true"
                };
            }else
                {
                $scope.opt4 = {
                        content: $scope.op4vl,
                        correct: "false"
                };
                }
            $scope.item.iopts.push($scope.opt4);
            }
        if ($scope.op5vl.replace(/\s/g, '').length != 0 && $scope.op5vl != undefined){
            if ($scope.correctoption == "opt5") {
                $scope.opt5 = {
                        content: $scope.op5vl,
                        correct: "true"
                };
            }else
                {
                $scope.opt5 = {
                        content: $scope.op5vl,
                        correct: "false"
                };
                }
            $scope.item.iopts.push($scope.opt5);
            }
        
        if($scope.viewimage!=undefined)
        {
            
            $scope.item.image= true;
            $scope.item.imageurl= $scope.viewimage.name;    
            $scope.viewimage=null;
        }
        $scope.quizJson.qitems.push($scope.item);
    
        }*/
        
}

$scope.close = function(){ 
	$uibModalInstance.dismiss('cancel');
};
$scope.onTagAdded = function(tag, limit) {
	
    if ($scope.indobjects.OD.CGRY.ttags.length == limit+1) {
        $scope.indobjects.OD.CGRY.ttags.pop();
    }else{
    	if($scope.indobjects.OD.CGRY.ttags.text != undefined){
    		for (var i = 0; i < $scope.indobjects.OD.CGRY.ttags.length; i++) {
		 		
		 		$scope.indobjects.OD.CGRY.ttags[i]=$scope.indobjects.OD.CGRY.ttags[i].text;
		 	}
    	}
    	
    }
 	
}
};


app.controller('viewquizCtrl', viewquizCtrl);
viewquizCtrl.$inject = ['$scope', '$uibModalInstance', '$http', '$location', '$window','$sce','quizJson','$cookies','$crypto','config'];

app.factory("getquiz", function($window, $q, config,$crypto){
    
       return {
           getquiz: function(){
               var decry;
               localStorage.getItem("786a2y1e") !=null ?   decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';  
            var obid = decry.obid;
            var quizJson;
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
    		   quizJson = getusersession();
    		  
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
                      quizid : obid,
                      oid: decry.oid
                      
                       };
     		 if(decry.qaction != undefined)
             {
               body.action = decry.qaction;
               body.quizid = decry.ofilename
             }
 				
 				var additionalParams = {
 			             headers: {Authorization : token
 			             }
 			       };
 		
 				var data =	apigClient.getquizPost(params, body, additionalParams)
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
               
              return quizJson;
           }
       };
    });