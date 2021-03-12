 "use strict";
var viewtopicCtrl = function ($scope, $http, $location, $window, $cookies,topicslist, $uibModal,Upload,$sce, config,$crypto) {
  
	
	
$scope.backfunction = function(){
	 $scope.loading = true;
	 $window.location.href = '#listtopics';
}
    
$scope.discardchanges = function(){
	
        if($scope.topicchanged){
        	swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                width: '400px',
                customClass: 'sweetalert-lgs',
                buttonsStyling:false,allowOutsideClick: false,
                allowEscapeKey:false,
                showCancelButton: true, cancelButtonText: 'No', cancelButtonClass:"button2",
      		  showConfirmButton: true, confirmButtonText: 'Yes',  confirmButtonClass: 'button1'
              }).then((result) => {
                if (result.value) {
                    var typejson = {"type" : "unlocktopic" };
                    $scope.commoncognito(typejson);
                	//$scope.unlocktopic();
                    $scope.origDetails();
                }
              })
        }else{
		
            var typejson = {"type" : "unlocktopic" };
            $scope.commoncognito(typejson);
        	$scope.origDetails();
        }
        
            
    }

$scope.unlocktopic = function(token){

	var apigClient = apigClientFactory.newClient({
	    invokeUrl: $scope.decry.api,
	});

	var params = {};
	var body = {
			  oid: $scope.decry.oid,
			  tid: $scope.topicid,
			  eid: $scope.decry.email,
			  type: 1
			};
	var additionalParams = {
	        headers: {Authorization : token
    }
	};
	apigClient.topicEditLockPost(params, body, additionalParams)
		.then(function(result){
			$window.location.href = '#viewtopic';

			}).catch( function(result){
		    	
		    	var json = JSON.stringify(result);
		    	var json1 = json.toString();
		    	return $q.when("1");
		    	
		    });
}

$scope.savetopic = function()
{
	swal({
		  title: 'Are you sure?',
		  text: "Do you want to save the changes?",
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
			  $scope.editsave();
		  }
		})
}

$scope.editsave=function()
{
	$scope.loading = true;
    if($scope.topicjson.ttitle == "" || $scope.topicjson.ttitle.replace(/\s/g, '').length === 0 ){
        $scope.loading = false;
        $scope.$apply();
        swal({title: "Oops!", text: "Course Title cannot be empty", type: "error",buttonsStyling:false,allowOutsideClick: false,
            allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
        return;
    }
    
    if($scope.topicjson.tdescription == "" || $scope.topicjson.tdescription == undefined || $scope.topicjson.tdescription.replace(/\s/g, '').length === 0){
        $scope.loading = false;
        $scope.$apply();
        swal({title: "Oops!", text: "Course description cannot be empty in Overview section", type: "error",buttonsStyling:false,allowOutsideClick: false,
            allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
        return;
    }
    
   if($scope.topicjson.freenavigation == false || $scope.topicjson.freenavigation == 'false'){

    if($scope.topicjson.certification == true || $scope.topicjson.certification == 'true')
    {
    	if($scope.ctype == 0 || $scope.ctype == '0'){
    		
        if($scope.topicjson.tcertauth.replace(/\s/g, '').length === 0 || $scope.topicjson.tcertauth == undefined)
        {
        	$scope.loading = false;
        	$scope.$apply();
            swal({title: "Oops!", text: "When certification has been selected as Yes, Certification Authority cannot be empty", type: "error",buttonsStyling:false,allowOutsideClick: false,
	              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
            return;
        }
        
        
        if($scope.topicjson.tnoofcredits != undefined && $scope.topicjson.tnoofcredits <=0){
            $scope.loading = false;
            $scope.$apply();
            swal({title: "Oops!", text: "Number of Credits should be greater than Zero", type: "error",buttonsStyling:false,allowOutsideClick: false,
	              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
            return;
        }
        if( ($scope.origTopicJson.certification == false || $scope.origTopicJson.certification == 'false') && ($scope.topicjson.certification == true || $scope.topicjson.certification == 'true') &&  $scope.certdetails.certimage == undefined){
			$scope.loading = false;
			$scope.$apply();
			swal({title: "Oops!", text: "Please select a template for Certificate", type: "error",buttonsStyling:false,allowOutsideClick: false,
	              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
			return;
		}
        
    	}
    }
   }
   
   if($scope.topicjson.freenavigation == false || $scope.topicjson.freenavigation == 'false'){
	
   if($scope.topicjson.ctype == "" || $scope.topicjson.ctype == undefined){
		$scope.loading = false;
		$scope.$apply();
		swal({title: "Oops!", text: "Learning type should be selected as either Enforced or Regular.", type: "error",buttonsStyling:false,allowOutsideClick: false,
             allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
		return;
	}
   }
   if($scope.topicjson.pdate == undefined || $scope.topicjson.pdate == ''){
	$scope.loading = false;
	$scope.$apply();
	swal({title: "Oops!", text: "Select Publish Date", type: "error",buttonsStyling:false,allowOutsideClick: false,
		  allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	return;
}
   if($scope.topicjson.adproducts == undefined || $scope.topicjson.adproducts == ''){
	$scope.loading = false;
	$scope.$apply();
	swal({title: "Oops!", text: "Select Ad Products", type: "error",buttonsStyling:false,allowOutsideClick: false,
		  allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	return;
}
if($scope.topicjson.mrtools == undefined || $scope.topicjson.mrtools == ''){
	$scope.loading = false;
	$scope.$apply();
	swal({title: "Oops!", text: "Select Marketron Tools", type: "error",buttonsStyling:false,allowOutsideClick: false,
		  allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	return;
}
if(($scope.topicjson.prerequisites === undefined || $scope.topicjson.prerequisites == '')){
	$scope.loading = false;
	
	$scope.$apply();
	swal({title: "Oops!", text: "Pre Requisites should be selected as either Yes or No.", type: "error",buttonsStyling:false,allowOutsideClick: false,
		  allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	return;
}
if(($scope.topicjson.prerequisites === true || $scope.topicjson.prerequisites == 'true') && ($scope.topicjson.prerequisitestype == undefined || $scope.topicjson.prerequisitestype == '')){
	$scope.loading = false;
	
	$scope.$apply();
	swal({title: "Oops!", text: "Pre Requisites Type should be selected as either Suggestion or Required.", type: "error",buttonsStyling:false,allowOutsideClick: false,
		  allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	return;
}
if(($scope.topicjson.prerequisites == true || $scope.topicjson.prerequisites == 'true') && ($scope.topicjson.prerequisitescourses=== undefined || $scope.topicjson.prerequisitescourses.length === 0)){
	$scope.loading = false;
	$scope.$apply();
		swal({title: "Oops!", text: "You need to select Pre Requisites Courses", type: "error",buttonsStyling:false,allowOutsideClick: false,
			  allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
		return;
	
}
if($scope.topicjson.nextcourse == undefined || $scope.topicjson.nextcourse == ''){
	$scope.loading = false;
	$scope.$apply();
	swal({title: "Oops!", text: "Next Course should be selected as either Yes or No.", type: "error",buttonsStyling:false,allowOutsideClick: false,
		  allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	return;
}

if(($scope.topicjson.nextcourse == true || $scope.topicjson.nextcourse == 'true') && $scope.topicjson.nextcoursedata.tid === undefined){
	$scope.loading = false;
	$scope.$apply();
	swal({title: "Oops!", text: "Select Next Course from List", type: "error",buttonsStyling:false,allowOutsideClick: false,
		  allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	return;
}
        if($scope.topicjson.nuggets.length > 0)
        {
       
            for(var i=0;i < $scope.topicjson.nuggets.length;i++)
                {
               
                if($scope.topicjson.nuggets[i].ntitle.replace(/\s/g, '').length==0)
                    {
                    $scope.loading = false;
                    $scope.$apply();
                    swal({title: "Oops!", text: "Nugget title cannot be empty", type: "error",buttonsStyling:false,allowOutsideClick: false,
      	              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
                    return;
                    }
                
                  if($scope.topicjson.nuggets[i].objects.length==0)
                    {
                     $scope.loading = false;
                     $scope.$apply();
                     swal({title: "Oops!", text: "You need to add atleast 1 Object in each Nugget", type: "error",buttonsStyling:false,allowOutsideClick: false,
       	              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
                     return;
                         
                    }
                }
        }
      else
        {
        $scope.loading = false;
        $scope.$apply();
        swal({title: "Oops!", text: "You need to add atleast 1 Nugget", type: "error",buttonsStyling:false,allowOutsideClick: false,
            allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
        return;
		}
		
   if($scope.nuggetchanges){
	  if($scope.topicjson.nt == 0 || $scope.topicjson.edited == undefined || $scope.topicjson.edited == 1){
		  
	  }else{
		  $scope.topicjson.version++;
	  } 
	}
   $scope.topicjson.noofnuggets = $scope.topicjson.nuggets.length;
   var typejson ={"type" : "submit"};
   $scope.commoncognito(typejson)
   //$scope.submit();
    
}
$scope.optedfreenav = function(value){
	if(value == 1){
		
		$scope.topicjson.ctype= 'regular';
	
	}
}
$scope.submit=function(token)
{
    var apigClient = apigClientFactory.newClient({
        invokeUrl: $scope.decry.api,
    });
    $scope.topicjsonchanges = false;
    var params = {};
    if($scope.nuggetchanges == false &&  $scope.topicimgchanges == false && $scope.certimgchanges == false){
    	$scope.topicjsonchanges = true;
    }
    
    
	
	
	
	$scope.taglists=[];
	
	if($scope.topicjson.category.ttags != null || $scope.topicjson.category.ttags != undefined){
    	
    	for (var i = 0; i < $scope.topicjson.category.ttags.length; i++) {
    		if($scope.topicjson.category.ttags[i].text != undefined){
    			$scope.taglists.push($scope.topicjson.category.ttags[i].text);
    		}else{
    			$scope.taglists.push($scope.topicjson.category.ttags[i]);
    		}	
    	}
    	
	}
	if($scope.topicjson.nuggets.length > 0)
	{
		var tvid =0;
		var tdoc =0;
		var tsq =0;
		var tfq =0;
		
		var tduration =0;
	for(var i=0;i < $scope.topicjson.nuggets.length;i++)
	{
		
		var nduration =0;
			for(var j=0;j < $scope.topicjson.nuggets[i].objects.length;j++)
			{
				if($scope.topicjson.nuggets[i].objects[j].otype ==='audio'|| $scope.topicjson.nuggets[i].objects[j].otype ==='video' || $scope.topicjson.nuggets[i].objects[j].otype ==='youtube'|| $scope.topicjson.nuggets[i].objects[j].otype=='vimeo')
				{
				tvid++;
				}
				if($scope.topicjson.nuggets[i].objects[j].otype ==='html'|| $scope.topicjson.nuggets[i].objects[j].otype ==='pdf' || $scope.topicjson.nuggets[i].objects[j].otype ==='interactivity')
				{
				tdoc++;
				}
				if($scope.topicjson.nuggets[i].objects[j].otype ==='quiz')
				{
				if($scope.topicjson.nuggets[i].objects[j].qtype=='1')
				{
				tsq++;
				}
				if($scope.topicjson.nuggets[i].objects[j].qtype== undefined || $scope.topicjson.nuggets[i].objects[j].qtype=='0' || $scope.topicjson.nuggets[i].objects[j].qtype=='2')
				{
				tfq++;
				}
				}
				
				nduration = nduration + parseInt($scope.topicjson.nuggets[i].objects[j].oduration);
		}
		$scope.topicjson.nuggets[i].nduration = nduration;
		tduration = tduration + parseInt($scope.topicjson.nuggets[i].nduration);
	}
	    $scope.topicjson.tduration = tduration;
		$scope.topicjson.tvid = tvid.toString();
		$scope.topicjson.tdoc = tdoc.toString();
		$scope.topicjson.tfq = tfq;
		$scope.topicjson.tsq = tsq;
}
	$scope.topicjson.tobj = (parseInt($scope.topicjson.tfq) + parseInt($scope.topicjson.tsq) +parseInt($scope.topicjson.tdoc)  + parseInt($scope.topicjson.tvid)).toString() ;
	$scope.topicjson.category.id =$scope.decry.tid;
	$scope.topicjson.category.name =$scope.decry.tname;
	$scope.topicjson.category.ttags=$scope.taglists;

	if($scope.topicjson.prerequisites === true || $scope.topicjson.prerequisites === "true"){
		$scope.topicjson.prerequisites = true;
	  } else {
		$scope.topicjson.prerequisites = false;
	  }
	  if($scope.topicjson.nextcourse === true || $scope.topicjson.nextcourse === "true"){
		$scope.topicjson.nextcourse = true;
	  } else {
		$scope.topicjson.nextcourse = false;
	  }
	  $scope.orgtools = [];
	  if($scope.topicjson.mrtools!= undefined){
		  
		  for(var i=0;i<$scope.topicjson.mrtools.length;i++){
			  
			$scope.orgtools.push($scope.topicjson.mrtools[i].ttitle);
		  }
	  }
	  $scope.topicjson.mrtools = $scope.orgtools;
	  $scope.orgads = [];
	  if($scope.topicjson.adproducts!= undefined){
		  
		  for(var i=0;i<$scope.topicjson.adproducts.length;i++){
			  
			$scope.orgads.push($scope.topicjson.adproducts[i].ttitle);
		  }
	  }
	  $scope.topicjson.adproducts = $scope.orgads;

    var typejson ={"type": "topicedited"};
    $scope.commoncognito(typejson);
    
	//$scope.topicedited();
	var dates = new Date($scope.topicjson.pdate);
	$scope.topicjson.pdate = dates.getTime();
	$scope.topicjson.CBY = $scope.decry.username;
    var body = {
               topicjson : $scope.topicjson ,
               topicjsonchanges: $scope.topicjsonchanges,
               nuggetchanges : $scope.nuggetchanges,
               topicimgchanges : $scope.topicimgchanges,
               certimgchanges : $scope.certimgchanges,
               oid: $scope.decry.oid,
               tid: $scope.topicjson.tid
             };

    var additionalParams = {
            headers: {Authorization : token
    }
    };  

     apigClient.editTopicPost(params, body, additionalParams)
        .then(function(result){ 
            
           $window.location.href = '#viewtopic';
            
        }).catch( function(result){
           
            var json = JSON.stringify(result);
            var json1 = json.toString();
            alert('ERROR'+json1);
         });
    
}

$scope.topicedited = function(token){

	var apigClient = apigClientFactory.newClient({
	    invokeUrl: $scope.decry.api,
	});
	var dates = new Date($scope.topicjson.pdate);
	date = dates.getTime();
	var params = {};
	var body = {
			  oid: $scope.decry.oid,
			  tid: $scope.topicid,
			  eid: $scope.decry.email,
			  tn: $scope.topicjson.ttitle,
			  ver: $scope.topicjson.version,
			  nt: $scope.topicjson.nt,
			  catlist:$scope.topicjson.category,
			  pdate:dates,
			  type: 2
			};
	
	var additionalParams = { 
	        headers: {Authorization : token
    }
	};
	
	apigClient.topicEditLockPost(params, body, additionalParams)
		.then(function(result){
		    	

			}).catch( function(result){
		    	
		    	var json = JSON.stringify(result);
		    	var json1 = json.toString();
		    	return $q.when("1");
		    	
		    });
}

$scope.topicimageupload = function(topicimg) {
	if(topicimg == null){
		return;
	}
	//5242880 1048576
	if(topicimg.size > 5242880){
		 swal({title: "", text: "Image size is too large. File size cannot be greater than 5mb.",buttonsStyling:false,allowOutsideClick: false,
             allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
		 return;
	}
	$scope.savebtn = false;
	$scope.topicchanged = true;
	$scope.topicimgchanges = true;
	$scope.topicimage = topicimg;
	var topicimageid = "topic";
	 var typejson ={"type": "uploadfile","image":$scope.topicimage,"imageid":topicimageid};
	    $scope.commoncognito(typejson);
	//$scope.uploadfile($scope.topicimage, topicimageid);
};

$scope.certimageupload = function(certimg) {
	
	if(certimg == null){
		return;
	}
	if(certimg.size > 5242880){
		 swal({title: "", text: "Image size is too large. File size cannot be greater than 5mb.",buttonsStyling:false,allowOutsideClick: false,
             allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
		 return;
	}
	$scope.savebtn = false;
	$scope.topicchanged = true;
	$scope.certimgchanges = true;
	$scope.certimg = certimg;
	var certimageid = "cert";
	 var typejson = {"type": "uploadfile","image":$scope.certimg,"imageid":certimageid} ;
	
     $scope.commoncognito(typejson);
	//$scope.uploadfile(certimg, certimageid);
};

$scope.removeobject = function(object, nugget){
	var nid = $scope.topicjson.nuggets.indexOf(nugget);
	var id = nid;
	var index = $scope.topicjson.nuggets[nid].objects.indexOf(object);
	$scope.topicjson.nuggets[id].nduration = + $scope.topicjson.nuggets[id].nduration - +$scope.topicjson.nuggets[id].objects[index].oduration;
	$scope.topicjson.tduration = +$scope.topicjson.tduration - +$scope.topicjson.nuggets[id].objects[index].oduration;
	$scope.topicjson.nuggets[id].objects.splice(index, 1); 
	$scope.savebtn = false;
	$scope.topicchanged = true;
};

$scope.removenugget = function(nugget){
	
	var index = $scope.topicjson.nuggets.indexOf(nugget);
	$scope.topicjson.tduration =  +$scope.topicjson.tduration - +$scope.topicjson.nuggets[index].nduration;
	$scope.topicjson.nuggets.splice(index, 1); 
	$scope.savebtn = false;
	$scope.topicchanged = true;  
}

$scope.addnugget = function() {
	  $scope.Instance = $uibModal.open({
			templateUrl: 'addnugget.html',
			controller: 'addnuggetCtrl',
			backdrop: 'static',
	        keyboard: false,
	        windowClass: 'addnuggetmodal',
	        scope: $scope,
	        resolve: {
	            items: function () {
	            	
	              return $scope.object;
	            }
	          }
			});
	 $scope.Instance.result.then(function (ntitle) {
		if (ntitle != null && ntitle != undefined){
			 		 
			  $scope.objects = [];
			
			  $scope.item = {
							//nid: $scope.topicjson.nuggets.length === 0 ? 1 : (+$scope.topicjson.nuggets[+$scope.topicjson.nuggets.length - 1].nid.substr($scope.topicjson.nuggets[+$scope.topicjson.nuggets.length - 1].nid.length - 1) + 1),
							nid: $scope.topicjson.nuggets.length === 0 ? 1 : $scope.topicjson.nuggets.length+1,
							ntitle: ntitle,
					        nduration: 0,
					        objects:   []
						}
						
			$scope.item.nid= $scope.topicid + "-"+$scope.item.nid;	

			 $scope.topicjson.nuggets.push($scope.item);			
			  	
			}

	    }, function () {
	    });
	 
};

$scope.addobject = function(nugget) {
	
	 $scope.Instance = $uibModal.open({
			templateUrl: 'addobject.html',
			controller: 'addobjectCtrl',
			backdrop: 'static',
	        keyboard: false,
	        windowClass: 'addobjectmodal',
	        scope: $scope,
	        resolve: {
	            items: function () {
	            	
	              return $scope.object;
	            }
	          }
			});
	 	$scope.Instance.result.then(function (selectedItem) {
	 	 var nid = $scope.topicjson.nuggets.indexOf(nugget);
		 var id = +nugget.nid - 1;
		 var json1 = JSON.stringify(selectedItem);
	
		  $scope.object1 = JSON.parse(json1);
		  $scope.object1.newfile = $scope.object1.ourl;
		  var oid;
		  if($scope.topicjson.nuggets[nid].objects.length > 0){
			  oid = nugget.nid+ "-"+ (+$scope.topicjson.nuggets[nid].objects[+$scope.topicjson.nuggets[nid].objects.length - 1].oid.substr($scope.topicjson.nuggets[nid].objects[+$scope.topicjson.nuggets[nid].objects.length - 1].oid.length - 1) + 1);
		  }else{
			  oid = nugget.nid+ "-1";
		  }
		 
		  $scope.object1.oid = oid;
		  if($scope.object1.otype != 'youtube' && $scope.object1.otype != 'vimeo')
          {
              var last = $scope.object1.newfile.lastIndexOf(".");
              var filetype = $scope.object1.newfile.substr(last, $scope.object1.newfile.length);
              $scope.object1.ourl = oid+filetype;
          } 
		  
		  $scope.nuggetchanges = true;
		  $scope.object1.filechanges = true;
		  $scope.object1.newobject = true;
		  $scope.topicjson.nuggets[nid].nchanges = true;
		  $scope.topicjson.nuggets[nid].objects.push($scope.object1);
		  $scope.topicjson.nuggets[nid].nduration = +$scope.topicjson.nuggets[nid].nduration + +$scope.object1.oduration;
		  $scope.topicjson.tduration =  +$scope.topicjson.tduration + +$scope.object1.oduration;
		  $scope.topicjson.ctype=$scope.topicjson.ctype;
		  
		  $scope.$apply();
	    }, function () {
	     
	    });
	 
}

$scope.viewobject = function(object, nugget)
{

    if(object.newobject == undefined){
        $scope.decry["obid"]  = object.oid ;
		$scope.decry["otype"]  = object.otype ;
		$scope.decry["otitle"]  = object.otitle ;
		$scope.decry["odescription"]  = object.odescription;
		$scope.decry["topicid"]  = $scope.topicid;
		$scope.decry["ourl"]  = object.ourl;
		$scope.decry["oduration"]  = object.oduration;
		$scope.decry["yvobject"]  = object;
		
        localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
    	//localStorage.setItem("obid",object.oid);
        object.otype == "youtube" || object.otype == "vimeo" ?  $scope.embid = object : '';
     
        $scope.loading = true;
       
        if(object.filechanges == undefined || object.filechanges == false || object.filechanges == 'false'){
        	$scope.iseditedobject = false;
        }else{
		
        	$scope.iseditedobject = true;
        	$scope.editedobjectdetails = angular.copy(object);
        }
        	if(object.otype=="quiz")
            {
        		delete $scope.decry["qaction"]  ;
                localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
               $scope.Instance = $uibModal.open({
                    templateUrl: 'viewquiz.html',
                    controller: 'viewquizCtrl',   
                      resolve: {
                    	  quizJson: function(getquiz){
                              return getquiz.getquiz();
                      }
                      },
                    backdrop: 'static',
                    scope: $scope,
                    keyboard: true,
                    }); 
               $scope.Instance.opened.then(function () {
                    $scope.loading = false;
                });
               
               $scope.Instance.result.then(function (selectedItem) {
            
            	  $scope.savebtn = false;
         	      $scope.topicchanged = true;	   
         	      $scope.editedObject = JSON.stringify(selectedItem);
        		  $scope.editedObject = JSON.parse($scope.editedObject);
        		  $scope.editedObject.newobject = true;
        		  $scope.nuggetchanges = true;
        		  var nid = $scope.topicjson.nuggets.indexOf(nugget);
          		  var index = $scope.topicjson.nuggets[nid].objects.indexOf(object);
          		  $scope.topicjson.nuggets[nid].nchanges = true;
          		  $scope.topicjson.nuggets[nid].nduration = + $scope.topicjson.nuggets[nid].nduration - +object.oduration;
      		      $scope.topicjson.tduration = +$scope.topicjson.tduration - +object.oduration;
        		  $scope.topicjson.nuggets[nid].objects[index] = $scope.editedObject;
        		  $scope.topicjson.nuggets[nid].nduration = + $scope.topicjson.nuggets[nid].nduration + +$scope.editedObject.oduration;
    		      $scope.topicjson.tduration = +$scope.topicjson.tduration + +$scope.editedObject.oduration;
               });
}else{
                
            $scope.Instance = $uibModal.open({
                templateUrl: 'viewobject.html',
                controller: 'viewobjectCtrl',   
                  resolve: {
                      
                      objectdt: function(getobject){
                          return getobject.getobject();
                  }
                  },
                backdrop: 'static',
                scope: $scope,
                keyboard: true
                }); 
            $scope.Instance.opened.then(function () {
                $scope.loading = false; 
            
            });
             $scope.Instance.result.then(function (selectedItem) {
            	      $scope.savebtn = false;
            	      $scope.topicchanged = true;
            		  $scope.editedObject = JSON.stringify(selectedItem);
            		  $scope.editedObject = JSON.parse($scope.editedObject);
            		  var nid = $scope.topicjson.nuggets.indexOf(nugget);
              		  var index = $scope.topicjson.nuggets[nid].objects.indexOf(object);
            		  if( $scope.editedObject.filechanges){
            			  $scope.nuggetchanges = true;
            			  $scope.topicjson.nuggets[nid].nchanges = true;
                 	  }else{
                 		 //delete $scope.editedObject.filechanges;
                 	  }
                 	  $scope.editedObject.ourl = object.ourl;
                 	  $scope.topicjson.nuggets[nid].nduration = + $scope.topicjson.nuggets[nid].nduration - +object.oduration;
            		  $scope.topicjson.tduration = +$scope.topicjson.tduration - +object.oduration;
              		  $scope.topicjson.nuggets[nid].objects[index] = $scope.editedObject;
              		  $scope.topicjson.nuggets[nid].nduration = + $scope.topicjson.nuggets[nid].nduration + +$scope.editedObject.oduration;
          		      $scope.topicjson.tduration = +$scope.topicjson.tduration + +$scope.editedObject.oduration;
          		      
                });
            
            }
    }
    
}

$scope.uploadfile = function(image, imagename,token){
	
    var filename = imagename+".png";
	var apigClient = apigClientFactory.newClient({
	    invokeUrl: $scope.decry.api,
	});
	var params = {};
	
	var body = {
    			filetype: image.type,
    			filename: filename,
    			folder: $scope.topicid
			 };

	var additionalParams = {
	        headers: {Authorization : token
            }
		};
	apigClient.getpreSignedURLPost(params, body, additionalParams)
	.then(function(result){
	    	
	  var json = JSON.stringify(result.data);
	
	  $scope.upload(image, result.data, imagename);
	 
	    }).catch( function(result){
	    	var json = JSON.stringify(result);
	    	var json1 = json.toString();
	    });
};

$scope.upload = function(file,url,imagename) {
      $http.put(url, file, {headers:{'Content-Type': file.type}})
        .success(function(resp) {

        })
        .error(function(resp) {
          alert("An Error Occurred Attaching Your File. Please try again or Contact production Support if problem persist");
        });
}

$scope.edittopic=function()
{

   if($scope.tpub == 1 ||  $scope.tpub == '1'){
	   swal({title: "",type:"warning", text: "Please unpublish the Course to make any changes",buttonsStyling:false,allowOutsideClick: false,
           allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
   }else if (($scope.topicjson.edit == 2 || $scope.topicjson.edit == 2) && $scope.topicjson.editid !=  $scope.decry.email ){

	   swal({title: "",type:"warning", text: "Course is locked for editing by other user",buttonsStyling:false,allowOutsideClick: false,
           allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
   }else{

     
       var typejson ={"type":"locktopic"};
       $scope.commoncognito(typejson)
	   //$scope.locktopic();
	    
   }  
   
}

$scope.locktopic = function(token){
	
	$scope.loading = true;
	var apigClient = apigClientFactory.newClient({
	    invokeUrl: $scope.decry.api,
	});

	var params = {};
	var body = {
			  oid: $scope.decry.oid,
			  tid: $scope.topicid,
			  eid: $scope.decry.email,
			  type: 0
			};
	var additionalParams = {
	        headers: {Authorization : token
            }
	};
	apigClient.topicEditLockPost(params, body, additionalParams)
		.then(function(result){
		    	
		   $scope.editresponse = JSON.stringify(result.data);
		   $scope.editresponse = JSON.parse( $scope.editresponse);
		   if($scope.editresponse.estatus == 0){
			   $scope.isDisabled=false;
			   $scope.editbtn=false;
			   $scope.mystyle= { 'width' : '82%' } ;
		   }else if($scope.editresponse.estatus == 1){
			   swal({title: "", text: "Course is locked for editing by other user",buttonsStyling:false,allowOutsideClick: false,
		              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
		   }
		   $scope.loading = false;
		   $scope.$apply();
			}).catch( function(result){
		    	
		    	var json = JSON.stringify(result);
		    	var json1 = json.toString();
		    	$scope.loading = false;
				$scope.$apply();
		    	return $q.when("hello");
		    	
		    });
}

$scope.origDetails = function(){
    $scope.loading = true;
    $scope.editbtn = true;
    $scope.savebtn = true;
    $scope.topicchanged = false;
    $scope.isDisabled=true;
    $scope.nuggetchanges = false;
    $scope.topicimgchanges = false;
    $scope.certimgchanges = false;

	$scope.topicjson = JSON.parse(topicslist);
	
    $scope.topicid = $scope.topicjson.tid;
	$scope.tpub = $scope.topicjson.pub;
	
    $scope.noofnuggets = $scope.topicjson.noofnuggets==0 ? "" :$scope.topicjson.noofnuggets;
    $scope.topicimage = config.url+$scope.orgid.toLowerCase()+"-resources/images/topic-images/"+$scope.topicid+".png";
	// $scope.loading = false;
	// $scope.$apply();
	$window.location.href = '#viewtopic';

}
$scope.onTagAdded = function(tag, limit) {
	
    if ($scope.topicjson.category.ttags.length > limit) {
        $scope.topicjson.category.ttags.pop();
    }
}
$scope.paste = function(event, limit) {
	event.preventDefault();
	
	var ttags = event.originalEvent.clipboardData.getData('text/plain').split(',')
	for (var i = 0; i < ttags.length; i++) {
		
		$scope.topicjson.category.ttags.push({"text":ttags[i]});	
	}	
	if ($scope.topicjson.category.ttags.length > limit) {
        $scope.topicjson.category.ttags.length = 15;
    }	
}
$scope.viewtopic = function(){
      localStorage.getItem("786a2y1e") !=null ?   $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';

      if($window.innerWidth > 1024 ){
            $scope.secondwidth = +$window.innerWidth - +242;  
        }else{
            $scope.secondwidth = +$window.innerWidth - +82;
       
        }
      $scope.second = {'width':$scope.secondwidth};
      $(window).resize(function() {
    
      $scope.$apply(function() {
        $scope.windowWidth = $( window ).width();
     
        if($scope.windowWidth < 1023){
            $scope.secondwidth = +$window.innerWidth - +64;
               
        }if($window.innerWidth > 1023 ){
           
          $scope.secondwidth = +$window.innerWidth - +242;   
        }
        $scope.second = {'width':$scope.secondwidth};
      });
    });
      $scope.nuggets = [];
      $scope.certdetails = {};
	    $scope.orgid = $scope.decry.oid;
	    $scope.ctype = $scope.decry.ctype;
	    $scope.editbtn = true;
	    $scope.savebtn = true;
	    $scope.isDisabled=true;
	    $scope.topicchanged = false;
	    $scope.nuggetchanges = false;
	    $scope.topicimgchanges = false;
	    $scope.certimgchanges = false;
	  
	  $scope.topicjson=JSON.parse(topicslist);

	var minutes = Math.floor($scope.topicjson.tduration / 60);
	var seconds = $scope.topicjson.tduration - minutes * 60;
	  
	  $scope.topicjson.min = minutes;
	  $scope.topicjson.secs = seconds;

	  $scope.origTopicJson = angular.copy($scope.topicjson);
	  $scope.chapters = [];
	  if($scope.topicjson.chapters!= undefined){
		  
		  for(var i=0;i<$scope.topicjson.chapters.length;i++){
			  var obj ={};
			obj.ttitle = $scope.topicjson.chapters[i];
			obj.tid = $scope.topicjson.chapters[i];
			$scope.chapters.push(obj);
		  }
	  }
	  $scope.topicjson.chapters = $scope.chapters;

	  $scope.topics = [];
	  if($scope.topicjson.topics != undefined){
		  
		  for(var i=0;i<$scope.topicjson.topics.length;i++){
			  var obj ={};
			obj.ttitle = $scope.topicjson.topics[i];
			obj.tid = $scope.topicjson.topics[i];
			$scope.topics.push(obj);
		  }
	  }
	  $scope.topicjson.topics = $scope.topics;
      if($scope.topicjson.prerequisites !== undefined){
	
        if($scope.topicjson.prerequisites === true || $scope.topicjson.prerequisites === "true"){
          $scope.topicjson.prerequisites = "true";
          
        } else {
          $scope.topicjson.prerequisites = "false";
        }
      }
      if($scope.topicjson.prerequisitescourses === undefined){
        $scope.topicjson.prerequisitescourses = [];
	  }
	  if($scope.topicjson.nextcourse !== undefined){
	
        if($scope.topicjson.nextcourse === true || $scope.topicjson.nextcourse === "true"){
          $scope.topicjson.nextcourse = "true";
          
        } else {
          $scope.topicjson.nextcourse = "false";
        }
      }
	  if($scope.topicjson.nextcoursedata === undefined){
        $scope.topicjson.nextcoursedata = {};
      }
	 
      $scope.topicid = $scope.topicjson.tid;
      $scope.folder = $scope.topicid;
      $scope.tpub = $scope.topicjson.pub;
	  $scope.noofnuggets = $scope.topicjson.noofnuggets==0 ? "" :$scope.topicjson.noofnuggets;
	  
      
	  if($scope.topicjson.category == undefined){
    	  $scope.topicjson.category ={};
    	  $scope.topicjson.category.ttags=[];
      }
      
      $scope.topicimage = config.url+$scope.orgid.toLowerCase()+"-resources/images/topic-images/"+$scope.topicid+".png";
      

      $scope.bimage = '';
      $scope.myObj = {'background-color':'grey','overflow':'hidden','background-image':$scope.bimage,'background-size': 'cover','background-repeat': 'no-repeat'};
      $scope.$watch('topicjson', function() {
    	  $scope.checktopic();
	   }, true);
	   $scope.example2settings = {
		displayProp: 'tid'
    };	
    
	   $scope.example14data = $scope.chapters;
       $scope.example13data = $scope.topics;
       $scope.getTopics();
	  
	   $scope.example14settings = {
		   scrollableHeight: '200px',
		   scrollable: true,
		   enableSearch: false,
		   externalIdProp : ''
	   };
     
};

$scope.checktopic = function(){
	$scope.topicchangedcheck =  angular.equals($scope.topicjson, $scope.origTopicJson);
	
    if($scope.topicchangedcheck){
    	$scope.savebtn = true;
   	 	$scope.topicchanged = false;
    }else{
    	 $scope.savebtn = false;
    	 $scope.topicchanged = true;
    }
}
$scope.getTopics = function(){

	var apigClient = apigClientFactory.newClient({invokeUrl: $scope.decry.api,});

	var params = {};

	var body = {
			oid : $scope.decry.oid,
			tid : $scope.decry.tid,
			admin: true
				};
	
	var additionalParams = {
				
		};

	var data =	apigClient.getCategoryDataPost(params, body, additionalParams)
		.then(function(result){
				
			
			var response = JSON.stringify(result.data);
			var jsondata = JSON.parse(response);
            var index = '';
            
		for(var i = 0;i<jsondata.courses.length;i++){
            
			jsondata.courses[i].ttitle = jsondata.courses[i].TN;
            jsondata.courses[i].tid = jsondata.courses[i].TID;
            if(jsondata.courses[i].tid === $scope.decry.topicid){
                index = i;
            }
        }
        
        if(index !== ''){
            
            jsondata.courses.splice(index, 1);
        }

				$scope.example15data = jsondata.courses;
				$scope.example16data = jsondata.courses;
				
			}).catch( function(result){
				
				var json = JSON.stringify(result);
				var json1 = json.toString();
				return $q.when("hello");
				
			});
}
$scope.viewtopic();
$scope.onlyNumbers = function(event){   
    var keys={
        'up': 38,'right':39,'down':40,'left':37,
        'escape':27,'backspace':8,'tab':9,'enter':13,'del':46,
        '0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57
    };
    for(var index in keys) {
        if (!keys.hasOwnProperty(index)) continue;
        if (event.charCode==keys[index]||event.keyCode==keys[index]) {
            return; //default event
        }
    }   
    event.preventDefault();
};



	$scope.publish = function(){
		$scope.loading = true;
		 if (($scope.topicjson.edit == 2 || $scope.topicjson.edit == 2)){
			   swal({title: "",type:"warning", text: "Course is locked for editing, course cant be Published",buttonsStyling:false,allowOutsideClick: false,
					  allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					  $scope.loading = false;
		   }else{
			   
			   $scope.Instance = $uibModal.open({
					templateUrl: 'publishtype.html',
					controller: 'publishtypeCtrl',
					backdrop: 'static',
			        keyboard: false,
			        windowClass: 'addnuggetmodal',
			        scope: $scope,
			        resolve: {
						tenantslist: function(gettenants){
							return gettenants.gettenants();
						}
					  }
			        //     items: function () {
			            	
			        //       return $scope.object;
			        //     }
			        //   }
					});
					$scope.Instance.opened.then(function () {
						$scope.loading = false;
					});
			 $scope.Instance.result.then(function (action) {
				
				if (action == 1 || action == '1'){
						$scope.publishbody = {
								  oid: $scope.decry.oid,
								  tid: $scope.topicid,
								  action: "1",
								  type: "2"
								};
						var typejson = {"type":"publishtopic","body" : $scope.publishbody };
						$scope.commoncognito(typejson)
						//$scope.publishtopic($scope.publishbody);
					}else{
						$scope.publishbody = {
								
								  oid: $scope.decry.oid,
								  tid: $scope.topicid,
								  action: "1",
								  type: "1",
								  tenants: action
								};
						var typejson = {"type":"publishtopic","body" : $scope.publishbody };
                        $scope.commoncognito(typejson)
						//$scope.publishtopic($scope.publishbody);
					}

			    }, function () {
			     // alert($scope.object);
			    });
		   }
		
	}
	
	$scope.publishtopic = function(body,token){
		$scope.loading = true;
		var apigClient = apigClientFactory.newClient({
		    invokeUrl: $scope.decry.api,
		});

		var params = {};
        var body = body;
		var additionalParams = {
		        headers: {Authorization : token
	            }
		};
		
		apigClient.publishUnpublishTopicPost(params, body, additionalParams)
			.then(function(result){
			    	
			   var json = JSON.stringify(result.data);
			   $scope.loading = false;
			   $scope.$apply();
			   swal({title: "",type:"success", text: "Course published successfully",buttonsStyling:false,allowOutsideClick: false,
		              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
			   $window.location.href = '#viewtopic';
				}).catch( function(result){
			    	
			    	var json = JSON.stringify(result);
			    	var json1 = json.toString();
			    	//localStorage.setItem("json", JSON.stringify(result));
			    	alert('ERROR'+json1);
			    	return $q.when("hello");
			    	
			    });
	}
	
	$scope.unpublish = function(){
		swal({
			  title: 'Are you sure?',
			  text: "Do you want to unpublish this course?",
			  type: 'warning',
			  width: '400px',
			  customClass: 'sweetalert-lgs',
              buttonsStyling:false,allowOutsideClick: false,
              allowEscapeKey:false,
              showCancelButton: true, cancelButtonText: 'No',cancelButtonClass:"button2",
    		  showConfirmButton: true, confirmButtonText: 'Yes',  confirmButtonClass: 'button1'
			}).then((result) => {
			  if (result.value) {
				 $scope.loading = true;
				 var typejson = {"type":"unpublishtopic"}
				 $scope.commoncognito(typejson)
				// $scope.unpublishtopic();
				 $scope.$apply();
			  }
			})
	}
	
	$scope.unpublishtopic = function(token){
		
		var apigClient = apigClientFactory.newClient({
		    invokeUrl: $scope.decry.api,
		});

		var params = {};

		var body = {
				  oid: $scope.decry.oid,
				  tid: $scope.topicid,
				  cid: $scope.decry.tid,
				  action: "0",
				  type: "2"
				};
		
		var additionalParams = {
		        headers: {Authorization : token
	            }
		};
	
		apigClient.publishUnpublishTopicPost(params, body, additionalParams)
			.then(function(result){
			    	
			   var json = JSON.stringify(result.data);
			   $scope.loading = false;
			   $scope.$apply();
			   swal({title: "",type:"success", text: "Course unpublished successfully",buttonsStyling:false,allowOutsideClick: false,
		              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
			   $window.location.href = '#viewtopic';
				}).catch( function(result){
			    	
			    	var json = JSON.stringify(result);
			    	var json1 = json.toString();
			    	alert('ERROR'+json1);
			    	return $q.when("hello");
			    	
			    });
	}
	
	$scope.commoncognito = function(typejson)
    {
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
            
            $scope.getsession(cognitoUser,typejson);
        }else {
            localStorage.clear();
            $window.location.href = '#login';
        }
    }
    $scope.getsession = function(cognitoUser,typejson){
        
        return new Promise((resolve, reject) => {
               cognitoUser.getSession((err, session) =>{
                  if (err) {
                      swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
        	              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
                      localStorage.clear();
                      $window.location.href = '#login';
                  }else{
                      
                      var token = session.idToken.jwtToken;
                      if(typejson.type == 'unlocktopic')
                      {
                          $scope.unlocktopic(token); 
                      }else if(typejson.type == 'locktopic')
                      {
                          $scope.locktopic(token); 
                      }else if(typejson.type == 'publishtopic')
                      {
                          $scope.publishtopic(typejson.body,token); 
                      }else if(typejson.type == 'unpublishtopic')
                      {
                          $scope.unpublishtopic(token); 
                      }else if(typejson.type == 'uploadfile')
                      {
                          $scope.uploadfile(typejson.image,typejson.imageid,token); 
                      }else if(typejson.type == 'submit')
                      {
                          $scope.submit(token); 
                      }else if(typejson.type == 'topicedited')
                      {
                          $scope.topicedited(token); 
                      }
 
                  }
              });
          })
  }
        
};

app.controller('viewtopicCtrl', viewtopicCtrl);
viewtopicCtrl.$inject = ['$scope', '$http','$location', '$window','$cookies','topicslist','$uibModal','Upload','$sce', 'config','$crypto'];

app.factory("gettopics", function($window, $q, config,$crypto){
    return {
        gettopics: function(){
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
                       eid : decry.email,
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
           
           return $q.when(topiclist);
        }
    };
});
