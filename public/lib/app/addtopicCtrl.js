 "use strict";
var addtopicCtrl = function ($scope, $http, $location, $window, $cookies, $uibModal,topicjson, Upload, $sce,$crypto,config) {
	
	$scope.stag = [];

	$scope.home = function(){
	    localStorage.getItem("786a2y1e") !=null ?   $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login'; 
	    if($window.innerWidth > 1024){
            $scope.secondwidth = +$window.innerWidth - +239;
          }else{
              $scope.secondwidth = +$window.innerWidth - +65;
          }
	   
        $scope.second = {'width':$scope.secondwidth};
        
      
        $(window).resize(function() {
     
        $scope.$apply(function() {
          $scope.windowWidth = $(window).width();
       
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
		$scope.nuggets = [];
		$scope.quizcount = '0';
		$scope.showcertdes = false;
		$scope.nuggetslen = '0';
		$scope.tduration = 0;
		$scope.tvid=0;
		$scope.tdoc=0
		$scope.tfq=0;
		$scope.tsq=0;
		$scope.tobj=0;
		$scope.folder = Math.round((new Date()).getTime() / 1000);
		$scope.orgid = $scope.decry.oid;
		$scope.name = $scope.decry.username;

		$scope.topics = JSON.parse(topicjson);
		$scope.getcategories();
		$scope.ctype = $scope.decry.ctype;
		
		$scope.decry["folder"] =  $scope.folder;
		$scope.decry["quizcount"] =  '0';
		localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
	
		 $scope.noimage = false;
		 $scope.topicdata = {"tdescription":"","poster":"","posterurl":"","subjects":{},"year":[],"sem":[],"class":[],"pdate":"","payment":"","amount":"",
		 "author":"","caseformat":"","objofcase":"","casenotes":"","casenotesurl":"","skillset":"","assessment":""};
			$scope.content = false ;
			$scope.overview = true;
			$scope.settings = false;
		  $scope.bimage = '';
		  $scope.myObj = {'background-color':'grey','overflow':'hidden','background-image':$scope.bimage,'background-size': 'cover','background-repeat': 'no-repeat'};
		  
		  $scope.example2settings = {
			displayProp: 'tid'
		};	
		$scope.getcategories();
		
		   $scope.example14settings = {
			   scrollableHeight: '200px',
			   scrollable: true,
			   enableSearch: false,
			   externalIdProp : ''
		   };
	
	};
	$scope.checktopicsjosn = function(){

		var jsondata = $scope.topicdata.subjects.topics;
		var jsondata1 = $scope.topicdata.subjects.chapters;

		if($scope.topicdata.subjects.topics != undefined){
			var list = [];
			
			for(var i=0;i<jsondata.length;i++){
				var obj={};
				obj.tid = jsondata[i];
				obj.ttitle = jsondata[i];
				list.push(obj);
			}
		} else {
			$scope.topicdata.topics =[];
		}

		if($scope.topicdata.subjects.chapters != undefined){
			var list1 = [];
			
			for(var i=0;i<jsondata1.length;i++){
				var obj={};
				obj.tid = jsondata1[i];
				obj.ttitle = jsondata1[i];
				list1.push(obj);
			}
		} else {
			$scope.topicdata.chapters =[];
		}
		$scope.example13data = list;
		$scope.example14data = list1;
	}
	$scope.getcategories = function(){
	
		var apigClient = apigClientFactory.newClient({
			invokeUrl: $scope.decry.api,
		});
		var params = {};
	
		var body = {
			oid: $scope.decry.oid
				 };
	
		var additionalParams = {
				
			};
			
		apigClient.getCategoriesPost(params, body, additionalParams)
		.then(function(result){
				
			var json = JSON.stringify(result.data);
			$scope.subjectjson = JSON.parse(json).topics;
			var jsondata = $scope.subjectjson;

			for(var i = 0;i<jsondata.length;i++){
            
				jsondata[i].ttitle = jsondata[i].name;
				jsondata[i].tid = jsondata[i].id;
				
			}
			$scope.example16data = jsondata;
			
			
			}).catch( function(result){
				
				var json = JSON.stringify(result);
				var json1 = json.toString();
				alert('ERROR1'+result);
				
				
			});
			
	}
	$scope.home();

	$scope.checkyearjosn = function(){
		
		var row = JSON.parse(document.getElementById("sub").value);
		
		$scope.subjects = {};
		$scope.subjects.id = row.id;
		$scope.subjects.name = row.name;
		$scope.chapterjson = row.chapters;
	}
	$scope.checksemjosn = function(){

		$scope.chtopics = JSON.parse(document.getElementById("year").value);
		
		var list=[];
		var list1=[];
		if($scope.chtopics.sem != undefined){
			for(var i=0;i<$scope.chtopics.sem.length;i++){
				var obj={};
				obj.tid = $scope.chtopics.sem[i].tid;
				obj.ttitle = $scope.chtopics.sem[i].ttitle;
				list.push(obj);
			}
		}
		if($scope.chtopics.class != undefined){
			for(var i=0;i<$scope.chtopics.class.length;i++){
				var obj={};
				obj.tid = $scope.chtopics.class[i].tid;
				obj.ttitle = $scope.chtopics.class[i].ttitle;
				list1.push(obj);
			}
		}
		$scope.years = {};
		$scope.years.name = $scope.chtopics.year;

		$scope.semjson = list;
		$scope.classjson = list1;
	
	}
	$scope.semchange = function(){
		
		var row = JSON.parse(document.getElementById("sem").value);
		
		$scope.sems = {};
		$scope.sems.id = row.tid;
		$scope.sems.name = row.ttitle;
	
	}
	$scope.classchange = function(){
		
		var row = JSON.parse(document.getElementById("class").value);
		
		$scope.classes = {};
		$scope.classes.id = row.tid;
		$scope.classes.name = row.ttitle;
	}
	$scope.showcertdesc = function(value){
		if(value == 1){
			$scope.showcertdes = true;
		}else{
			$scope.showcertdes = false;
		}
		
	}
	$scope.optedpayment = function(value){
		if(value == 1){
			$scope.showPayment = true;
		}else{
			$scope.showPayment = false;
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
	            return; //default event
	        }
	    }   
	    event.preventDefault();
	};
	
	$scope.sectionchange = function(){
		if($scope.sectionselection != null &&  $scope.sectionselection == "Practice"){
			 $scope.noimage = true;
			 $scope.nomodule = true; 
		 }else if($scope.sectionselection != null &&  $scope.sectionselection == "Learn")
		 {
			 $scope.noimage = false;
			 $scope.nomodule = false; 
		 }else{
			 $scope.noimage = false; 
			 $scope.nomodule = true; 
		 }
	}
	$scope.assessmentview = function(type){
        if(type == 'assess'){
            $scope.decry["quiztype"] = 'assess';
        } else if(type == 'assign'){
            $scope.decry["quiztype"] = 'assign';
        }
       
        localStorage.setItem("786a2y1e", $crypto.encrypt(JSON.stringify($scope.decry), config.key));
        $scope.Instance = $uibModal.open({
            templateUrl: 'addassessment.html',
            controller: 'addassessmentCtrl',
            backdrop: 'static',
            keyboard: false,
            windowClass: 'addobjectmodal',
            scope: $scope,
           
            });
     $scope.Instance.result.then(function (obj) {
		
		if (obj != null && obj != undefined){
			
			$scope.item = {
						  
						  assess: obj
						 
					  }
			$scope.topicdata.assessment = $scope.item;
			$scope.adasses = true;
		  }
        }, function () {
         
        });
    
    }
	$scope.discard = function(){
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
				  $scope.loading = true;
				  $window.location.href = '#listtopics';
			  }
			})
	}
	
	$scope.savetopic = function() {
		swal({
			  title: 'Are you sure?',
			  text: "Save Story?",
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
					$scope.saveon();
			  } else if (
			    result.dismiss === swal.DismissReason.cancel
			  ) {
			  }
			})
	};
	
	$scope.optedfreenav = function(value){
		if(value == 1){
			
			$scope.showpayment = true;	
		}else{
			$scope.showpayment = false;
		
		}
	}
	$scope.posterdiv = function(value){
		if(value == 1){
			
			$scope.showposter = true;	
		}else{
			$scope.showposter = false;
		
		}
	}
	$scope.learntype = function(value){
		if(value == 0){
			
			$scope.ltype = 'regular';
			
		}else{
			$scope.ltype = 'enforce';
			//$scope.topicdata.hascert = false;
		}
	}
	
	$scope.posimageupload = function(nuggetfile) {
		if(nuggetfile == null){
			return;
		}
		if(nuggetfile.size > 5242880){
			 swal({title: "Oops!", text: "Image size is too large. File size cannot be greater than 5mb.",type: "error",
				 buttonsStyling:false,allowOutsideClick: false,
	              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
			 return;
		}
		$scope.posimage = nuggetfile;
		var topicimageid = { "image" : $scope.posimage ,"imageid":"poster","typ":"uploadfile"};		
		$scope.commoncognito(topicimageid);
		
	};
	$scope.notefileupload = function(nuggetfile) {
		if(nuggetfile == null){
			return;
		}
		if(nuggetfile.size > 5242880){
			 swal({title: "Oops!", text: "Image size is too large. File size cannot be greater than 5mb.",type: "error",
				 buttonsStyling:false,allowOutsideClick: false,
	              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
			 return;
		}
		$scope.noteimage = nuggetfile;
		var topicimageid = { "image" : $scope.noteimage ,"imageid":"cnotes","typ":"uploadfile"};		
		$scope.commoncognito(topicimageid);
		
	};
	$scope.topicimageupload = function(topicimg) {
		if(topicimg == null){
			return;
		}
		if(topicimg.size > 5242880){
			 swal({title: "Oops!", text: "Image size is too large. File size cannot be greater than 5mb.",type: "error",
				 buttonsStyling:false,allowOutsideClick: false,
	              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
			 return;
		}
		$scope.topicimage = topicimg;
		var topicimageid = { "image" : $scope.topicimage ,"imageid":"topic","typ":"uploadfile"};		
		$scope.commoncognito(topicimageid);
	};

	$scope.saveon = function() {
		
		$scope.loading = true;
		
			if($scope.topicdata.ttitle == "" || $scope.topicdata.ttitle == undefined || $scope.topicdata.ttitle.replace(/\s/g, '').length === 0 ||
					$scope.topicdata.tdescription == "" || $scope.topicdata.tdescription == undefined || $scope.topicdata.tdescription.replace(/\s/g, '').length === 0 ||
					 $scope.topicdata.poster == "" || $scope.topicdata.poster == undefined ||  $scope.topicdata.posterurl == undefined 
					 ||  $scope.topicdata.topicimage == undefined || $scope.nuggets.length == 0 ||  $scope.topicdata.casenotesurl == undefined 
					 || $scope.topicdata.subjects == "" || $scope.topicdata.subjects == undefined
					 || $scope.topicdata.year.length == 0 || $scope.topicdata.year === undefined || $scope.topicdata.sem.length == 0 || $scope.topicdata.sem == undefined
					 || $scope.topicdata.class.length == 0 || $scope.topicdata.class == undefined 
					 || $scope.topicdata.pdate == "" || $scope.topicdata.pdate == undefined || $scope.topicdata.payment == "" || $scope.topicdata.payment == undefined
					 || $scope.topicdata.author == "" || $scope.topicdata.author == undefined || $scope.topicdata.caseformat == "" || $scope.topicdata.caseformat == undefined
					 || $scope.topicdata.skillset == "" || $scope.topicdata.skillset == undefined 
					 || $scope.topicdata.assessment == "" || $scope.topicdata.assessment == undefined){
				
				if($scope.topicdata.ttitle == "" || $scope.topicdata.ttitle == undefined || $scope.topicdata.ttitle.replace(/\s/g, '').length === 0){
					$scope.loading = false;
					swal({title: "Oops!", text: "Case title cannot be empty", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}
				if($scope.topicdata.tdescription == "" || $scope.topicdata.tdescription == undefined || $scope.topicdata.tdescription.replace(/\s/g, '').length === 0){
					$scope.loading = false;
					swal({title: "Oops!", text: 'Case description cannot be empty in Overview section', type: "error",
						buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false,width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}
				if($scope.topicdata.poster == "" || $scope.topicdata.poster == undefined){
					$scope.loading = false;
					swal({title: "Oops!", text: 'Case Poster should be selected as either Yes or No', type: "error",
						buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false,width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}
				if($scope.topicdata.pdate == "" || $scope.topicdata.pdate == undefined){
					$scope.loading = false;
					swal({title: "Oops!", text: "Select Publish Date", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}

				if($scope.topicdata.payment == "" || $scope.topicdata.payment == undefined){
					$scope.loading = false;
					swal({title: "Oops!", text: "Payment should be selected as either Yes or No", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
					
				}
				if(($scope.topicdata.payment == true || $scope.topicdata.payment == 'true') && ($scope.topicdata.amount === undefined || $scope.topicdata.amount === '')){
					$scope.loading = false;
						swal({title: "Oops!", text: "Enter the amount", type: "error",buttonsStyling:false,allowOutsideClick: false,
							  allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
						return;
					
				}
				if($scope.topicdata.author == "" || $scope.topicdata.author == undefined){
					$scope.loading = false;
					swal({title: "Oops!", text: "Enter the author name", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}
				if($scope.topicdata.caseformat == "" || $scope.topicdata.caseformat == undefined){
					$scope.loading = false;
					swal({title: "Oops!", text: "Enter the case format", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}
				if($scope.topicdata.objofcase == "" || $scope.topicdata.objofcase == undefined){
					$scope.loading = false;
					swal({title: "Oops!", text: "Enter the objective of the Case", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}
				if($scope.topicdata.casenotesurl == "" || $scope.topicdata.casenotesurl == undefined){
					$scope.loading = false;
					swal({title: "Oops!", text: "Select case teaching notes", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}
				if($scope.topicdata.skillset == "" || $scope.topicdata.skillset == undefined){
					$scope.loading = false;
					swal({title: "Oops!", text: "Enter the skill set achieved", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}
				if($scope.topicdata.subjects == undefined || $scope.topicdata.subjects == {}){
					$scope.loading = false;
					swal({title: "Oops!", text: "Select Subject", type: "error",buttonsStyling:false,allowOutsideClick: false,
						  allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}
				if($scope.topicdata.year == undefined || $scope.topicdata.year.length == 0){
					$scope.loading = false;
					swal({title: "Oops!", text: "Select Year", type: "error",buttonsStyling:false,allowOutsideClick: false,
						  allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}
				if($scope.topicdata.sem == undefined || $scope.topicdata.sem.length == 0){
					$scope.loading = false;
					swal({title: "Oops!", text: "Select Semester", type: "error",buttonsStyling:false,allowOutsideClick: false,
						  allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}
				if($scope.topicdata.class == undefined || $scope.topicdata.class.length == 0){
					$scope.loading = false;
					swal({title: "Oops!", text: "Select Class", type: "error",buttonsStyling:false,allowOutsideClick: false,
						  allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}
				if($scope.topicdata.topicimage == undefined){
					$scope.loading = false;
					swal({title: "Oops!", text: "Please select a Case image", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}
				
				if($scope.nuggets.length == 0){
					$scope.loading = false;
					swal({title: "Oops!", text: "You need to add atleast 1 Module", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}
				if($scope.topicdata.assessment == "" || $scope.topicdata.assessment == undefined){
					$scope.loading = false;
					swal({title: "Oops!", text: "You need to add Assessment", type: "error",buttonsStyling:false,allowOutsideClick: false,
			              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'Ok', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					return;
				}
			} else {
				if($scope.nuggets.length > 0)
					{
						var typjson = {"typ" : 'submit'};
						$scope.commoncognito(typjson)
					}else{
						$scope.loading = false;
						swal({title: "Oops!", text: "You need to add atleast 1 Module", type: "error",buttonsStyling:false,allowOutsideClick: false,
				              allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
						return;
					}
			
			}
		
		 
	};
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
                      if(typejson.typ == 'submit')
                      {
                          $scope.submit(token); 
                      }else if(typejson.typ == 'uploadfile')
                      {
                          $scope.uploadfile(typejson.image,typejson.imageid,token); 
                      }
                     
                 
              
                  }
              });
          })
  }
  $scope.loadContentPage = function(){
	if($scope.online == true){
		$scope.loading = true;
		$window.location.href = '#managecontent';
	}
	
};
$scope.loadCoursePage = function(){
	if($scope.online == true){
		$scope.loading = true;
		$window.location.href = '#listtopics';
	}
	
};
	$scope.submit = function(token) {
		
		var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});
				var params = {};
				var date = new Date($scope.topicdata.pdate);
				date = date.getTime();

				var body2 = {
						oid: config.oid,
						NAME: $scope.name,
						TOPICNAME: $scope.topicdata.ttitle,
						eid:$scope.decry.email,
						pdate: date
						 };
		
				var additionalParams = { 
				        headers: {Authorization : token
                }
				};
		
				$scope.category = {};
				$scope.category.id = $scope.subjects.id;
				$scope.category.name = $scope.subjects.name;
				
				$scope.yearlist= [$scope.years.name];
				
				$scope.semlist=[$scope.sems.name];
				$scope.classlist=[$scope.classes.name];

				body2.category = $scope.category;
				body2.year = $scope.yearlist;
				body2.sem = $scope.semlist;
				body2.class = $scope.classlist;
				body2.author = $scope.topicdata.author;

				var topicidcall = apigClient.getTopicIDPost(params, body2, additionalParams)
				.then(function(result){
				    	
				   var topicid = JSON.stringify(result.data);
				
				   var abc = topicid.slice(1, -1);
				   topicid = abc;
				   $scope.adid = ' ';
				   
				   var body3 = {
						   oid: config.oid,
						   folder: $scope.folder,
						   tid: topicid,
						   ttitle: $scope.topicdata.ttitle,
						   tdescription: $scope.topicdata.tdescription,
						   pdate: date,
						   poster: $scope.topicdata.poster,
						   posterurl: $scope.topicdata.posterurl.name,
						   payment: $scope.topicdata.payment,
						   amount: $scope.topicdata.amount,
						   author: $scope.topicdata.author,
						   caseformat: $scope.topicdata.caseformat,
						   objofcase: $scope.topicdata.objofcase,
						   casenotesurl: $scope.topicdata.casenotesurl.name,
						   skillset: $scope.topicdata.skillset,
						   assessment:$scope.topicdata.assessment,
						   adid: $scope.adid,
						   cby: $scope.name,
						   noofnuggets: $scope.nuggets.length,
						   nuggets: $scope.nuggets,
						   year: $scope.yearlist,
						   sem:$scope.semlist,
						   class: $scope.classlist,
						   catlist:$scope.category
						   
					};
					
				  var createtopic =	apigClient.addTopicPost(params, body3, additionalParams)
					.then(function(result){ 
						
						$window.location.href = '#listtopics';
						
					}).catch( function(result){
				    	
				    	var json = JSON.stringify(result);
				    	var json1 = json.toString();
				    	alert('ERROR'+json1);
				    	
				    	
				    });
				 
				    }).catch( function(result){
				    	
				    	var json = JSON.stringify(result);
				    	var json1 = json.toString();
				    	alert('ERROR1'+json1);
				    	
				    	
				    });
		};
	
	
	
	$scope.status = {
			    isFirstOpen: false,
			    isFirstDisabled: false,
			    isLasttOpen: false,
			  };
	 
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
		 $scope.Instance.result.then(function (obj) {
			
			if (obj != null && obj != undefined){
								 
				  $scope.objects = [];
				  $scope.nuggetslen++;
				  $scope.showaccordion = false;
				  $scope.item = {
								nid: $scope.nuggetslen,  
						        ntitle: obj.ntitle,
								ndescription: obj.ndescription,
								ourl: obj.ourl
						       
						    }
				  $scope.nuggets.push($scope.item);
				 
				}
 
		    }, function () {
		     // alert($scope.object);
		    });
		 
		};
		$scope.addobject = function(nid) {
		
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
			 var id = +nid - 1;
			 var json1 = JSON.stringify(selectedItem);
			 
			  $scope.object1 = JSON.parse(json1);
			  $scope.nuggets[id].objects.push($scope.object1);
			  
			  
			  if($scope.object1.otype=='audio'|| $scope.object1.otype=='video' || $scope.object1.otype=='youtube'|| $scope.object1.otype=='vimeo')
				  {
				  $scope.tvid=$scope.tvid+1;
				  }
			  if($scope.object1.otype=='html'|| $scope.object1.otype=='pdf' || $scope.object1.otype=='doc')
			  {
			  
			  $scope.tdoc=$scope.tdoc+1;
			  }
			  if($scope.object1.otype=='quiz')
			  {
			  if($scope.object1.qtype=='1')
			  {
			  
			  $scope.tsq=$scope.tsq+1;
			  }
			   if($scope.object1.qtype=='0' || $scope.object1.qtype=='2')
			  {
			
			  $scope.tfq=$scope.tfq+1;
			  }
			  }
			  $scope.tobj=$scope.tobj+1;
			 
			  $scope.nuggets[id].nduration = + $scope.nuggets[id].nduration + +$scope.object1.oduration;
			  $scope.tduration =  +$scope.tduration + +$scope.object1.oduration;
			  var minutes = Math.floor($scope.tduration / 60);
			  var seconds = $scope.tduration - minutes * 60;
	  
			$scope.min = minutes;
			$scope.secs = seconds;
			  $scope.$apply();
			 //$scope.object = selectedItem;
		    }, function () {
		     // alert($scope.object);
		    });
		 
		}
		
		$scope.removenugget = function(nugget){
			var index = $scope.nuggets.indexOf(nugget);
			$scope.tduration =  +$scope.tduration - +$scope.nuggets[index].nduration;
			$scope.nuggets.splice(index, 1); 
			 $scope.nuggetslen--;
			 if ($scope.nuggetslen == '-1') {
				 $scope.nuggetslen = 0;
			 }
		}
		$scope.removeobject = function(object, nid){
			var id = +nid - 1;
			var index = $scope.nuggets[id].objects.indexOf(object);
			$scope.nuggets[id].nduration = + $scope.nuggets[id].nduration - +$scope.nuggets[id].objects[index].oduration;
			$scope.tduration = +$scope.tduration - +$scope.nuggets[id].objects[index].oduration;
			$scope.nuggets[id].objects.splice(index, 1); 
			
		};
		
		$scope.uploadfile = function(image, topicid,token){
				
		        var filename = topicid+".png";
		       // image.name = filename;
		        if(topicid != 'topic'){
					var last = image.name.lastIndexOf(".");
					var filetype = image.name.substr(last, image.name.length);
					filename =  topicid+filetype;
				}
				
				var apigClient = apigClientFactory.newClient({
				    invokeUrl: $scope.decry.api,
				});
				var params = {};
				
				var body = {
						filetype: image.type,
						filename: filename,
						folder: $scope.folder
						 };
			
				var additionalParams = {
				        headers: {Authorization : token
                        }
					};
			
				apigClient.getpreSignedURLPost(params, body, additionalParams)
				.then(function(result){
				    	
				   var json = JSON.stringify(result.data);
				
				  $scope.upload(image, result.data, topicid);
				 
				    }).catch( function(result){
				    	
				    	var json = JSON.stringify(result);
				    	var json1 = json.toString();
				    	alert('ERROR1'+result);
				    	
				    	
				    });
		      
			
		};
		$scope.upload = function(file,url,topicid) {
			//$scope.objecturl = $sce.trustAsResourceUrl(url);
			
			      // Perform The Push To S3
			      $http.put(url, file, {headers:{'Content-Type': file.type}})
			        .success(function(resp) {
			          
			        //	$window.location.href = '#managetopics';
			        })
			        .error(function(resp) {
			          alert("An Error Occurred Attaching Your File. Please try again or Contact production Support if problem persist");
			        });
			}	
$scope.assignmentview = function(){

	$scope.Instance = $uibModal.open({
		templateUrl: 'addassignments.html',
		controller: 'addassignmentsCtrl',
		backdrop: 'static',
		keyboard: false,
		windowClass: 'addobjectmodal',
		scope: $scope
		});
	$scope.Instance.result.then(function (selectedItem) {
		//$scope.getassignment();
	});

}		
$scope.onTagAdded = function(tag, limit) {
	
	if ($scope.stag.length > limit) {
		$scope.stag.pop();
	}
}
$scope.paste = function(event, limit) {
	event.preventDefault();
	
	var ttags = event.originalEvent.clipboardData.getData('text/plain').split(',')
	for (var i = 0; i < ttags.length; i++) {
		
		$scope.stag.push({"text":ttags[i]});
		
	}	
	
	if ($scope.stag.length > limit) {
		$scope.stag.length = 15;
	}	
}	
};

app.controller('addtopicCtrl', addtopicCtrl);
addtopicCtrl.$inject = ['$scope', '$http','$location', '$window','$cookies', '$uibModal','topicjson', 'Upload', '$sce','$crypto','config'];


app.directive('multiSelect', function() {

	  function link(scope, element) {
	    var options = {
	      enableClickableOptGroups: true,
	      onChange: function() {
	        element.change();
	      }
	    };
	    element.multiselect(options);
	  }

	  return {
	    restrict: 'A',
	    link: link
	  };
	});





