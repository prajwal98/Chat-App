var addobjectCtrl = function($rootScope, $scope, $uibModalInstance, $http, $location, $window, $cookies,$sce,$crypto,config) {
		
		
	$scope.home = function(){
		$scope.selecttype = true;
		$scope.audiot = false;
		$scope.vediot = false;
		$scope.swippert = false;
		$scope.quizt = false;
		$scope.pdft = false;
		$scope.htmlt = false;
		
		
		$scope.otypes = [{"type":"Audio","id":"1","img":"audio"},{"type":"Narrative","id":"2","img":"html"},{"type":"PDF","id":"3","img":"pdf"},{"type":"Quiz","id":"4","img":"quiz"},{"type":"Interactivity","id":"5","img":"interactivity"},{"type":"Video","id":"6","img":"video"}
		,{"type":"YouTube","id":"7","img":"youtube"},{"type":"Vimeo","id":"8","img":"vimeo"},{"type":"Scorm","id":"9","img":"scorm"}]
	}
	
	$scope.home();
	
	$scope.sobjecttype = function(id){
	    $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		$scope.stype = id;
		if($scope.stype == '1' || $scope.stype == 1){
			$scope.selecttype = false;
			$scope.audiot = true;
			$scope.sobject = 'Audio';
			 $scope.audiodata = [{"atitle":"","adesc":"","adur":"","adursecs":"","afile":""}];
			 $scope.audiodata.adur=0;
			$scope.audiodata.adursecs=0;
		}else if($scope.stype == '2' || $scope.stype == 2){
			$scope.selecttype = false;
			$scope.htmlt = true;
			$scope.sobject = 'Narrative';
			$scope.selecthtmltype = true;
			$scope.htmltype1 = false;
			$scope.htmltype2 = false;
			$scope.htmldata =  [{"quiloutput":"","htitle":"","hdur":"","hdursecs":"","hfile":""}];
			$scope.htmldata.hdur=0;
			$scope.htmldata.hdursecs=0;
		}else if($scope.stype == '3' || $scope.stype == 3){
			$scope.selecttype = false;
			$scope.pdft = true;
			$scope.sobject = 'PDF';
			$scope.pdfdata = [{"ptitle":"","pdur":"","pdursecs":"","pfile":""}];
			$scope.pdfdata.pdur=0;
			$scope.pdfdata.pdursecs=0;
		}else if($scope.stype == '4' || $scope.stype == 4){
			$scope.selecttype = false;
			$scope.quizt = true;
			$scope.sobject = 'Quiz';
			$scope.qid = '0';
			$scope.itemsPerPage = 1;
			$scope.noques = false;		
		
			$scope.quizid = $scope.decry.quizcount;
			$scope.quizquestions = [];
		}else if($scope.stype == '5' || $scope.stype == 5){
			$scope.selecttype = false;
			$scope.swippert = true;
			$scope.sobject = 'Interactivity';
			$scope.swipperdata = [{"stitle":"","sdur":"","sdursecs":"","sfile":""}];
			$scope.swipperdata.sdur = 0;
			$scope.swipperdata.sdursecs=0;
		}
		else if($scope.stype == '7' || $scope.stype == 7){
		    $scope.selecttype = false;
            $scope.ytvideot = true;
            $scope.sobject = 'YouTube Video';
			$scope.youtubevideodata = [{"vtitle":"","vdesc":"","vdur":"","vdursecs":"","ytcode":""}];
			$scope.youtubevideodata.vdur=0;
			$scope.youtubevideodata.vdursecs=0;
        }else if($scope.stype == '8' || $scope.stype == 8){
            $scope.selecttype = false;
            $scope.ytvideot = true;
            $scope.sobject = 'Vimeo Video';
			$scope.youtubevideodata = [{"vtitle":"","vdesc":"","vdur":"","vdursecs":"","ytcode":""}];
			$scope.youtubevideodata.vdur=0;
			$scope.youtubevideodata.vdursecs=0;
        } else if($scope.stype == '9' || $scope.stype == 9){
            $scope.selecttype = false;
			$scope.scormt = true;
			$scope.sobject = 'scorm';
			$scope.scormdata = [{"stitle":"","sdur":"","sdursecs":"","sfile":""}];
			$scope.scormdata.sdur = 0;
			$scope.scormdata.sdursecs=0;
        } else {
			$scope.selecttype = false;
			$scope.videot = true;
			$scope.sobject = 'Video';
			 $scope.videodata = [{"vtitle":"","vdesc":"","vdur":"","vdursecs":"","vfile":""}];
			 $scope.videodata.vdur=0;
			$scope.videodata.vdursecs=0;
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
		
		$scope.htmltype11 = function(){
			$scope.selecthtmltype = false;
			$scope.htmltype1 = true;
			$scope.htmltype2 = false;
		}
		$scope.htmltype22 = function(){
			$scope.selecthtmltype = false;
			$scope.htmltype1 = false;
			$scope.htmltype2 = true;
		}
		$scope.savehtml = function(){
			if($scope.htmltype1 == true){

				$scope.herror1 = false;
				$scope.herror2 = false;
				$scope.herror3 = false;
				$scope.herror5 = false;
				if($scope.htmldata.htitle == undefined || $scope.htmldata.htitle == null || $scope.htmldata.htitle.replace(/\s/g, '').length === 0 || 
				   $scope.htmldata.hdur == undefined || $scope.htmldata.hdur == null || $scope.htmldata.quiloutput == undefined){
					if($scope.htmldata.htitle == undefined || $scope.htmldata.htitle == null || $scope.htmldata.htitle.replace(/\s/g, '').length === 0){
						$scope.herror1 = true;
					}
					if($scope.htmldata.hdur == undefined || $scope.htmldata.hdur == null){
						$scope.herror2 = true;
					}
					if( $scope.htmldata.quiloutput == undefined){
						$scope.herror3 = true;
					}
				}else{
					
					if( $scope.htmldata.hdur === 0 && $scope.htmldata.hdursecs === 0){
						$scope.herror5 = true;
						return
					}
					if( $scope.htmldata.hdursecs === undefined){
						$scope.herror2 = true;
						return
					}
					$scope.loading = true;
					$scope.hfilename =  Math.floor(Math.random()*(999-100+1)+100);
					$scope.htmldata.hdur = $scope.htmldata.hdur * 60;
					$scope.htmldata.hdur = $scope.htmldata.hdur +  $scope.htmldata.hdursecs;

					 $scope.object = {
				    		   otitle: $scope.htmldata.htitle,
				    		   otype: 'html',
				    		   oduration: $scope.htmldata.hdur,
				    		   ourl: $scope.hfilename+".html"
				       };
					 
					 //var folder = localStorage.getItem("folder")!=null ? localStorage.getItem("folder") : localStorage.getItem("topicid");
					// $scope.presignedurluploadQUIL();
					 var body = {
    			                    filetype: 'text/html',
    			                    filename: $scope.hfilename+".html",
    			                    folder: $scope.folder
			                     };
					 
					 var typejson = {"type" :"uploadfile","file":$scope.htmldata.quiloutput,"body":body };
                     $scope.commoncognito(typejson);
					}
				}else{

				$scope.herror1 = false;
				$scope.herror2 = false;
				$scope.herror3 = false;
				$scope.herror5 = false;
				$scope.herror6 = false;
				if($scope.htmldata.htitle == undefined || $scope.htmldata.htitle == null || $scope.htmldata.htitle.replace(/\s/g, '').length === 0 || 
				   $scope.htmldata.hdur == undefined || $scope.htmldata.hdur == null || $scope.htmldata.hfile == undefined){
					if($scope.htmldata.htitle == undefined || $scope.htmldata.htitle == null || $scope.htmldata.htitle.replace(/\s/g, '').length === 0){
						$scope.herror1 = true;
					}
					if($scope.htmldata.hdur == undefined || $scope.htmldata.hdur == null){
						$scope.herror2 = true;
					}
					if( $scope.htmldata.hfile == undefined){
						$scope.herror3 = true;
					}
				}else{
					
					if( $scope.htmldata.hdur === 0 && $scope.htmldata.hdursecs === 0){
						$scope.herror5 = true;
						return
					}
					if( $scope.htmldata.hdursecs === undefined){
						$scope.herror2 = true;
						return
					}
					$scope.loading = true;
					
					if($scope.htmldata.hfile.type == "application/zip" || $scope.htmldata.hfile.type == "application/x-zip-compressed"){
						$scope.zipfile = $scope.htmldata.hfile;
						$scope.htmldata.hdur = $scope.htmldata.hdur * 60;
						$scope.htmldata.hdur = $scope.htmldata.hdur +  $scope.htmldata.hdursecs;
						
						JSZip.loadAsync($scope.htmldata.hfile).then(function(content) {
				               
		                      // if you return a promise in a "then", you will chain the two promises
		                      var tmp= JSON.stringify(content);
		                     
		                     var t1=tmp.toString();
		                    
		                     t1 = JSON.parse(t1);
		                     
		                   
		                     try{
		                     if(t1.files['index.html'].name){
		                    	 $scope.fileexists = true;
		                     }
		                     }catch (e) {
		                        
		                    	 $scope.fileexists = false;
		                    }
		                       
		                    if($scope.fileexists){
		                    	$scope.zipsave($scope.htmldata.hfile, $scope.htmldata.htitle, $scope.htmldata.hdur,'html');
		                    }else{
		                    	$scope.loading = false;
		                    	$scope.herror6 = true;
		                    	$scope.$apply();
		                    } 
		                });
					}else{
						var id =  Math.floor(Math.random()*(999-100+1)+100);
						$scope.htmlfilename = id+ $scope.htmldata.hfile.name;
						$scope.htmldata.hdur = $scope.htmldata.hdur * 60;
					    $scope.htmldata.hdur = $scope.htmldata.hdur +  $scope.htmldata.hdursecs;
						$scope.object = {
				    		   otitle: $scope.htmldata.htitle,
				    		   otype: 'html',
				    		   oduration: $scope.htmldata.hdur,
				    		   ourl: $scope.htmlfilename
				       };
						//$scope.presignedurlupload();
						// var folder = localStorage.getItem("folder")!=null ? localStorage.getItem("folder") : localStorage.getItem("topicid");
						 var body = {
				                    filetype: $scope.htmldata.hfile.type,
				                    filename: $scope.htmlfilename,
				                    folder: $scope.folder
				                     };
						 var typejson = {"type" :"uploadfile","file":$scope.htmldata.hfile,"body":body };
		                 $scope.commoncognito(typejson);
					
						}
					
			}
			}
		}
		$scope.saveyoutubevideo = function()
		{
		    $scope.verror1 = false;
            $scope.verror2 = false;
            $scope.verror3 = false;
            $scope.verror4 = false;
            $scope.verror5 = false;
           // console.log(JSON.stringify( $scope.youtubevideodata))
               /*console.log($scope.youtubevideodata.vdesc)
               console.log($scope.youtubevideodata.vdur)
                 console.log($scope.youtubevideodata.vdur)*/
            if($scope.youtubevideodata.vtitle == undefined || $scope.youtubevideodata.vtitle == null || $scope.youtubevideodata.vtitle.replace(/\s/g, '').length === 0 || 
               $scope.youtubevideodata.vdesc == undefined || $scope.youtubevideodata.vdesc == null || $scope.youtubevideodata.vdesc.replace(/\s/g, '').length === 0 ||
               $scope.youtubevideodata.vdur == undefined || $scope.youtubevideodata.vdur == null || 
               $scope.youtubevideodata.embd == undefined || $scope.youtubevideodata.embd == null || $scope.youtubevideodata.embd.replace(/\s/g, '').length === 0){
                
                if($scope.youtubevideodata.vtitle == undefined || $scope.youtubevideodata.vtitle == null || $scope.youtubevideodata.vtitle.replace(/\s/g, '').length === 0){
                    $scope.verror1 = true;
                }
                if($scope.youtubevideodata.vdesc == undefined || $scope.youtubevideodata.vdesc == null || $scope.youtubevideodata.vdesc.replace(/\s/g, '').length === 0){
                    $scope.verror2 = true;
                }
                if($scope.youtubevideodata.vdur == undefined || $scope.youtubevideodata.vdur == null){
                    $scope.verror3 = true;
                }
                if( $scope.youtubevideodata.embd == undefined || $scope.youtubevideodata.embd == null || $scope.youtubevideodata.embd.replace(/\s/g, '').length === 0){
                    $scope.verror4 = true;
                }
            }else{
                if( $scope.youtubevideodata.vdur === 0 &&  $scope.youtubevideodata.vdursecs === 0){
                    $scope.verror5 = true;
                    return;
				}
				if($scope.youtubevideodata.vdursecs === undefined){
                    $scope.verror3 = true;
                    return;
                }
                $scope.loading = true;
                var id =  Math.floor(Math.random()*(999-100+1)+100);
				 //$scope.videofilename = id+$scope.videodata.vfile.name;
				 $scope.youtubevideodata.vdur = $scope.youtubevideodata.vdur * 60;
				 $scope.youtubevideodata.vdur = $scope.youtubevideodata.vdur +  $scope.youtubevideodata.vdursecs;
                 $scope.object = {
                           otitle: $scope.youtubevideodata.vtitle,
                           odescription: $scope.youtubevideodata.vdesc,
                            otype: 'youtube',
                           oduration: $scope.youtubevideodata.vdur,
                           embeddedcode: $scope.youtubevideodata.embd
                   };
                 $scope.sobject == "Vimeo Video" ? $scope.object.otype ='vimeo' : '';
                 //alert(JSON.stringify($scope.object))
                 //var folder = localStorage.getItem("folder")!=null ? localStorage.getItem("folder") : localStorage.getItem("topicid");;
                /* var typejson = {"type" :"videoupload"};
                    $scope.commoncognito(typejson);*/
                   /*var body = {
                            filetype: $scope.videodata.vfile.type,
                            filename: $scope.videofilename,
                            folder: $scope.folder
                         };
                    var typejson = {"type" :"uploadfile","file":$scope.videodata.vfile,"body":body };*/
                    $uibModalInstance.close($scope.object);
                  
                   // $scope.commoncognito(typejson);
        }
		}
		/*$scope.presignedurluploadQUIL =function()
		{
		    var apigClient = apigClientFactory.newClient({});
            var params = {};

            var body = {
                    filetype: 'text/html',
                    filename: $scope.hfilename+".html",
                    folder: $scope.folder
                     };
            var additionalParams = {};
            
            var topicjson = apigClient.getpreSignedURLPost(params, body, additionalParams)
            .then(function(result){
                    
                
               var json = JSON.stringify(result.data);
             
              $scope.uploadQUIL($scope.htmldata.quiloutput, result.data);
             
                }).catch( function(result){
                    
                    var json = JSON.stringify(result);
                    var json1 = json.toString();
                    alert('ERROR'+result);
                    $scope.loading = false;
                    $scope.$apply();
                    
                });
		}*/
		/*$scope.presignedurlupload =function()
		{
		    var apigClient = apigClientFactory.newClient({});
            var params = {};

            var body = {
                    filetype: $scope.htmldata.hfile.type,
                    filename: $scope.htmlfilename,
                    folder: $scope.folder
                     };
            var additionalParams = {};
            var topicjson = apigClient.getpreSignedURLPost(params, body, additionalParams)
            .then(function(result){
                    
                
               var json = JSON.stringify(result.data);
             
              $scope.upload($scope.htmldata.hfile, result.data);
             
                }).catch( function(result){
                    
                    var json = JSON.stringify(result);
                    var json1 = json.toString();
                    alert('ERROR'+result);
                    $scope.loading = false;
                    $scope.$apply();
                    
                });
		}*/
		
		$scope.addques = function(){
			$scope.qerror1 = false;
			$scope.qerror2 = false;
			$scope.qerror3 = false;
			$scope.qerror4 = false;
			$scope.qerror5 = false;
			$scope.qerror6 = false;
			$scope.qerror7 = false;
			$scope.qerror8 = false;
			
			if($scope.qid != 0){
				var xx = $scope.quizquestions.length;
				var zz = $scope.currentPage;
				
				if(xx == zz){
					xx--;
					xx = xx;
				}else{
					zz--;
					xx = zz;
				}
				
				
				if($scope.quizquestions[xx].istem == undefined || $scope.quizquestions[xx].istem.replace(/\s/g, '').length === 0){
					$scope.qerror1 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt1 == "" || $scope.quizquestions[xx].iopts.opt1 == undefined || $scope.quizquestions[xx].iopts.opt1.replace(/\s/g, '').length === 0 || 
				   $scope.quizquestions[xx].iopts.opt2 == "" || $scope.quizquestions[xx].iopts.opt2 == undefined || $scope.quizquestions[xx].iopts.opt2.replace(/\s/g, '').length === 0){
					$scope.qerror2 = true;
					return;
				}

				
				if($scope.quizquestions[xx].correctoption == undefined){
							$scope.qerror3 = true;
							return;
				}			
				if($scope.quizquestions[xx].correctoption != undefined){
					var yy = $scope.quizquestions[xx].correctoption;
					if($scope.quizquestions[xx].iopts[yy] == undefined || $scope.quizquestions[xx].iopts[yy].replace(/\s/g, '').length === 0 ){
						$scope.qerror4 = true;
						return;
					}
				}
				if($scope.quizquestions[xx].iopts.opt3 != "" && $scope.quizquestions[xx].iopts.opt3  != undefined){
					if($scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0){
						$scope.qerror5 = true;
						return;
					}
					if($scope.quizquestions[xx].iopts.opt3 == $scope.quizquestions[xx].iopts.opt4  || $scope.quizquestions[xx].iopts.opt3 == $scope.quizquestions[xx].iopts.opt5 || $scope.quizquestions[xx].iopts.opt3 == $scope.quizquestions[xx].iopts.opt6){
                        $scope.qerror8 = true;
                        return;
                    }
				}
				if($scope.quizquestions[xx].iopts.opt4 != "" && $scope.quizquestions[xx].iopts.opt4  != undefined){
					if($scope.quizquestions[xx].iopts.opt4.replace(/\s/g, '').length === 0){
						$scope.qerror5 = true;
						return;
					}
					if($scope.quizquestions[xx].iopts.opt3  == undefined || $scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0){
						$scope.qerror6 = true;
						return;
					}
					if($scope.quizquestions[xx].iopts.opt4 == $scope.quizquestions[xx].iopts.opt5  || $scope.quizquestions[xx].iopts.opt4 == $scope.quizquestions[xx].iopts.opt6){
                        $scope.qerror8 = true;
                        return;
                    }
				}
			
				if($scope.quizquestions[xx].iopts.opt5 != "" && $scope.quizquestions[xx].iopts.opt5  != undefined){
					if($scope.quizquestions[xx].iopts.opt5.replace(/\s/g, '').length === 0){
						$scope.qerror5 = true;
						return;
					}
					if($scope.quizquestions[xx].iopts.opt3  == undefined || $scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0 || 
					   $scope.quizquestions[xx].iopts.opt4  == undefined || $scope.quizquestions[xx].iopts.opt4.replace(/\s/g, '').length === 0){
						$scope.qerror6 = true;
						return;
					}
					if($scope.quizquestions[xx].iopts.opt5 == $scope.quizquestions[xx].iopts.opt6 ){
                        $scope.qerror8 = true;
                        return;
                    }					
				}
			
				if($scope.quizquestions[xx].iopts.opt6 != "" && $scope.quizquestions[xx].iopts.opt6  != undefined){
					if($scope.quizquestions[xx].iopts.opt6.replace(/\s/g, '').length === 0){
						$scope.qerror5 = true;
						return;
					}
					if($scope.quizquestions[xx].iopts.opt3  == undefined || $scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0 || 
					   $scope.quizquestions[xx].iopts.opt4  == undefined || $scope.quizquestions[xx].iopts.opt4.replace(/\s/g, '').length === 0 ||
					   $scope.quizquestions[xx].iopts.opt5  == undefined || $scope.quizquestions[xx].iopts.opt5.replace(/\s/g, '').length === 0){
						$scope.qerror6 = true;
						return;
					}
					
				}
				if($scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt2  || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt3 || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt4
				   || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt5 || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt6){
                    $scope.qerror8 = true;
                    return;
                }
				if($scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt3  || $scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt4 || $scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt5
		                   || $scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt6){
		                    $scope.qerror8 = true;
		                    return;
		                }
				
				
				
				$scope.qid++ ;
				$scope.item = {
						iid: $scope.qid,
						istem: '',
						iopts: []
						
				    }
				if($scope.questype=="0" && $scope.questype !=undefined )
                {
    				$scope.fdopt1=false;
    	            $scope.fdopt2=false;
    	            $scope.fdopt3=false;
    	            $scope.fdopt4=false;
    	            $scope.fdopt5=false;
    	            $scope.fdopt6=false;
                }
				
			}else{
				$scope.qid++ ;
				$scope.item = {
						iid: $scope.qid,
						istem: '',
						iopts: []
						
				    }
				
			}
			
			$scope.quizquestions.push($scope.item);
			$scope.showques = true;
			$scope.itemsPerPage = 1;
	       	 $scope.currentPage = $scope.qid;
			$scope.$watch('currentPage + itemsPerPage', function () {
				$scope.qerror1 = false;
				$scope.qerror2 = false;
				$scope.qerror3 = false;
				$scope.qerror4 = false;
				$scope.qerror5 = false;
				$scope.qerror6 = false;
				$scope.showimage = false;
	       			var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
	                 end = begin + $scope.itemsPerPage;
				
	               $scope.filteredQuestions = $scope.quizquestions.slice(begin, end);
	           });
		}
		$scope.removeques = function(question){
			var index = $scope.quizquestions.indexOf(question);
			$scope.quizquestions.splice(index, 1); 
			$scope.qid-- ;
			
			if($scope.currentPage == 1){
				
			}else{$scope.currentPage--;}
			
			
			if($scope.qid == 0){
				$scope.showques = false;
				$scope.noques = false;
			}
		};
		
		
		$scope.savequiz = function(){
		    $scope.qerror1 = false;
            $scope.qerror2 = false;
            $scope.qerror3 = false;
            $scope.qerror4 = false;
            $scope.qerror5 = false;
            $scope.qerror6 = false;
            $scope.qerror7 = false;
            $scope.qerror8 = false;
			var xx = $scope.quizquestions.length;
			var zz = $scope.currentPage;
			
			if(xx == zz){
				xx--;
				xx = xx;
			}else{
				zz--;
				xx = zz;
			}
			if($scope.quizquestions[xx].istem == "" || $scope.quizquestions[xx].istem == undefined || $scope.quizquestions[xx].istem.replace(/\s/g, '').length === 0){
				$scope.qerror1 = true;
				return;
			}
			if($scope.quizquestions[xx].iopts.opt1 == "" || $scope.quizquestions[xx].iopts.opt1 == undefined || $scope.quizquestions[xx].iopts.opt1.replace(/\s/g, '').length === 0 || 
			   $scope.quizquestions[xx].iopts.opt2 == "" || $scope.quizquestions[xx].iopts.opt2 == undefined || $scope.quizquestions[xx].iopts.opt2.replace(/\s/g, '').length === 0){
				$scope.qerror2 = true;
				return;
			}
			if($scope.quizquestions[xx].correctoption == undefined){
						$scope.qerror3 = true;
						return;
			}
		
			if($scope.quizquestions[xx].correctoption != undefined){
				var yy = $scope.quizquestions[xx].correctoption;
				if($scope.quizquestions[xx].iopts[yy] == undefined || $scope.quizquestions[xx].iopts[yy].replace(/\s/g, '').length === 0 ){
					$scope.qerror4 = true;
					return;
				}
			}
			if($scope.quizquestions[xx].iopts.opt3 != "" && $scope.quizquestions[xx].iopts.opt3  != undefined){
				if($scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0){
					$scope.qerror5 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt3 == $scope.quizquestions[xx].iopts.opt4  || $scope.quizquestions[xx].iopts.opt3 == $scope.quizquestions[xx].iopts.opt5 || $scope.quizquestions[xx].iopts.opt3 == $scope.quizquestions[xx].iopts.opt6){
                    $scope.qerror8 = true;
                    return;
                }
			}
			
			if($scope.quizquestions[xx].iopts.opt4 != "" && $scope.quizquestions[xx].iopts.opt4  != undefined){
				if($scope.quizquestions[xx].iopts.opt4.replace(/\s/g, '').length === 0){
					$scope.qerror5 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt3  == undefined || $scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0){
					$scope.qerror6 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt4 == $scope.quizquestions[xx].iopts.opt5  || $scope.quizquestions[xx].iopts.opt4 == $scope.quizquestions[xx].iopts.opt6){
                    $scope.qerror8 = true;
                    return;
                }
			}
			
			if($scope.quizquestions[xx].iopts.opt5 != "" && $scope.quizquestions[xx].iopts.opt5  != undefined){
				if($scope.quizquestions[xx].iopts.opt5.replace(/\s/g, '').length === 0){
					$scope.qerror5 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt3  == undefined || $scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0 || 
				   $scope.quizquestions[xx].iopts.opt4  == undefined || $scope.quizquestions[xx].iopts.opt4.replace(/\s/g, '').length === 0){
					$scope.qerror6 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt5 == $scope.quizquestions[xx].iopts.opt6 ){
                    $scope.qerror8 = true;
                    return;
                }
				
			}
			
			if($scope.quizquestions[xx].iopts.opt6 != "" && $scope.quizquestions[xx].iopts.opt6  != undefined){
				if($scope.quizquestions[xx].iopts.opt6.replace(/\s/g, '').length === 0){
					$scope.qerror5 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt3  == undefined || $scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0 || 
				   $scope.quizquestions[xx].iopts.opt4  == undefined || $scope.quizquestions[xx].iopts.opt4.replace(/\s/g, '').length === 0 ||
				   $scope.quizquestions[xx].iopts.opt5  == undefined || $scope.quizquestions[xx].iopts.opt5.replace(/\s/g, '').length === 0){
					$scope.qerror6 = true;
					return;
				}
			}
			if($scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt2  || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt3 || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt4
	                   || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt5 || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt6){
	                    $scope.qerror8 = true;
	                    return;
	                }
            if($scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt3  || $scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt4 || $scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt5
                       || $scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt6){
                        $scope.qerror8 = true;
                        return;
                    }

			 if(($scope.questype == "0"  || $scope.questype == "1") && $scope.questype !=undefined)
			     {
			       
			         $scope.quizsave();
			     }else
			             {
			             $scope.showcutoff = true;
			             $scope.showques = false;
			             }
			
		}
		$scope.sumsavequiz = function(cutoffsc)
		{
		    $scope.qerror8 = false;
		    $scope.qerror9 = false;
			$scope.cutoffvalue='0';
			
		    if(cutoffsc == undefined )
		        {
    		        $scope.qerror8 = true;
    		      
    		        return;
		        }else if(parseInt(cutoffsc) < 0)
		            {
		      
    		            $scope.qerror9 = true;
                        return;
		            }else
		                {
		                $scope.cutoffvalue = parseInt(cutoffsc);
		                    $scope.quizsave();
		                }
		    
		}
		$scope.quizsave = function(){
		    $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
			$scope.loading = true;
			$scope.finalquestions = [];
			for(var i=0; i < $scope.quizquestions.length;i++){
				$scope.options = [];
				if ($scope.quizquestions[i].iopts.opt1 != undefined){
					if ($scope.quizquestions[i].correctoption == "opt1") {
					    if($scope.questype == "0" && $scope.questype !=undefined)
                        {
					        $scope.opt1 = {
	                                content: $scope.quizquestions[i].iopts.opt1,
	                                correct: "true" ,  
                                    feedback : $scope.quizquestions[i].iopts.fdopt1                             
	                        };
                        }else
                            {
                                $scope.opt1 = {
                                        content: $scope.quizquestions[i].iopts.opt1,
                                        correct: "true"
                                };
                            }
						
					}else{
					    if($scope.questype == "0" && $scope.questype !=undefined)
                        {
                                $scope.opt1 = {
                                        content: $scope.quizquestions[i].iopts.opt1,
                                        correct: "false" ,  
                                        feedback : $scope.quizquestions[i].iopts.fdopt1
                                        
                                };
                        }else
                            {
                                $scope.opt1 = {
                                        content: $scope.quizquestions[i].iopts.opt1,
                                        correct: "false"
                                };
                            }
					}
					
					$scope.options.push($scope.opt1);
					
				}
				
				if ($scope.quizquestions[i].iopts.opt2 != undefined){
					if ($scope.quizquestions[i].correctoption == "opt2") {
						
					    if($scope.questype == "0" && $scope.questype !=undefined)
                        {
						    $scope.opt2 = {
	                                content: $scope.quizquestions[i].iopts.opt2,
	                                correct: "true",
                                    feedback : $scope.quizquestions[i].iopts.fdopt2
	                        };
                        }else
                            {
                                $scope.opt2 = {
                                        content: $scope.quizquestions[i].iopts.opt2,
                                        correct: "true"
                                };
                            }
					}else{
					    if($scope.questype == "0" && $scope.questype !=undefined)
                        {
                            $scope.opt2 = {
                                    content: $scope.quizquestions[i].iopts.opt2,
                                    correct: "false",
                                    feedback : $scope.quizquestions[i].iopts.fdopt2
                            };
                        }else
                            {
                                $scope.opt2 = {
                                        content: $scope.quizquestions[i].iopts.opt2,
                                        correct: "false"
                                };
                            }
					}
					
					$scope.options.push($scope.opt2);
					
				}
				if ($scope.quizquestions[i].iopts.opt3 != undefined){
					if ($scope.quizquestions[i].correctoption == "opt3") {
						
					    if($scope.questype == "0" && $scope.questype !=undefined)
                        {
						    $scope.opt3 = {
	                                content: $scope.quizquestions[i].iopts.opt3,
	                                correct: "true",
                                    feedback : $scope.quizquestions[i].iopts.fdopt3
	                        };
                        }else
                            {
                                $scope.opt3 = {
                                        content: $scope.quizquestions[i].iopts.opt3,
                                        correct: "true"
                                };
                            }
					}else{
					    if($scope.questype == "0" && $scope.questype !=undefined)
                        {
                            $scope.opt3 = {
                                    content: $scope.quizquestions[i].iopts.opt3,
                                    correct: "false",
                                    feedback : $scope.quizquestions[i].iopts.fdopt3
                            };
                        }else
                            {
                                $scope.opt3 = {
                                        content: $scope.quizquestions[i].iopts.opt3,
                                        correct: "false"
                                };
                            }
					}
					
					$scope.options.push($scope.opt3);
					
				}
				if ($scope.quizquestions[i].iopts.opt4 != undefined){
					if ($scope.quizquestions[i].correctoption == "opt4") {
						
					    if($scope.questype == "0" && $scope.questype !=undefined)
	                        {
						       $scope.opt4 = {
		                                content: $scope.quizquestions[i].iopts.opt4,
		                                correct: "true",
                                        feedback : $scope.quizquestions[i].iopts.fdopt4
		                        };
	                        }else
	                            {
    	                            $scope.opt4 = {
    	                                    content: $scope.quizquestions[i].iopts.opt4,
    	                                    correct: "true"
    	                            };
	                            }
					}else{
					    if($scope.questype == "0" && $scope.questype !=undefined)
                        {
                           $scope.opt4 = {
                                    content: $scope.quizquestions[i].iopts.opt4,
                                    correct: "false",
                                    feedback : $scope.quizquestions[i].iopts.fdopt4
                            };
                        }else
                            {
                                $scope.opt4 = {
                                        content: $scope.quizquestions[i].iopts.opt4,
                                        correct: "false"
                                };
                            }
					}
					
					$scope.options.push($scope.opt4);
					
				}
				if ($scope.quizquestions[i].iopts.opt5 != undefined){
					if ($scope.quizquestions[i].correctoption == "opt5") {
					
					    if($scope.questype == "0" && $scope.questype !=undefined)
                          {
						      $scope.opt5 = {
		                                content: $scope.quizquestions[i].iopts.opt5,
		                                correct: "true",
                                        feedback : $scope.quizquestions[i].iopts.fdopt5
		                        };
                          }else
                              {
                                  $scope.opt5 = {
                                          content: $scope.quizquestions[i].iopts.opt5,
                                          correct: "true"
                                  };
                              }
					}else{
					    if($scope.questype == "0" && $scope.questype !=undefined)
                        {
                            $scope.opt5 = {
                                      content: $scope.quizquestions[i].iopts.opt5,
                                      correct: "false",
                                      feedback : $scope.quizquestions[i].iopts.fdopt5
                              };
                        }else
                            {
                                $scope.opt5 = {
                                        content: $scope.quizquestions[i].iopts.opt5,
                                        correct: "false"
                                };
                            }
					}
					
					$scope.options.push($scope.opt5);
					
				}
				if ($scope.quizquestions[i].iopts.opt6 != undefined){
					if ($scope.quizquestions[i].correctoption == "opt6") {
						
					    if($scope.questype == "0" && $scope.questype !=undefined)
                          {
						      $scope.opt6 = {
		                                content: $scope.quizquestions[i].iopts.opt6,
		                                correct: "true",
                                        feedback : $scope.quizquestions[i].iopts.fdopt5
		                        };
                          }else
                              {
                                  $scope.opt6 = {
                                          content: $scope.quizquestions[i].iopts.opt6,
                                          correct: "true"
                                  };
                              }
					}else{
					    if($scope.questype == "0" && $scope.questype !=undefined)
                        {
                            $scope.opt6 = {
                                      content: $scope.quizquestions[i].iopts.opt6,
                                      correct: "false",
                                      feedback : $scope.quizquestions[i].iopts.fdopt5
                              };
                        }else
                            {
                                $scope.opt6 = {
                                        content: $scope.quizquestions[i].iopts.opt6,
                                        correct: "false"
                                };
                            }
					}
					
					$scope.options.push($scope.opt6);
					
				}
				if($scope.quizquestions[i].image != undefined){
					$scope.question = {
							iid: $scope.quizquestions[i].iid,
							istem: $scope.quizquestions[i].istem,
							image: true,
							imageurl: $scope.quizquestions[i].image.name,
							iopts: $scope.options
					};
				}else{
					$scope.question = {
							iid: $scope.quizquestions[i].iid,
							istem: $scope.quizquestions[i].istem,
							iopts: $scope.options
					};
				}
				
				
				$scope.finalquestions.push($scope.question);
			}
			
			$scope.quizid = $scope.decry.quizcount;
			// var folder = localStorage.getItem("folder")!=null ? localStorage.getItem("folder") : localStorage.getItem("topicid");
			
			$scope.quizid++;
			

			   if($scope.editbtn == undefined)
		         {        
				   $scope.quizourl = $scope.quizid;
		         }else
		         {
		             $scope.quizourl =  Math.floor(Math.random()*(999-100+1)+100);
		         }
			var body = {
    					folder: $scope.folder,
    					qid: $scope.quizourl,
    					qitems: $scope.finalquestions,
    					qtype : $scope.questype,
    					cutoff:$scope.cutoffvalue
					 };
			var typejson = {"type" :"uploadquizedata","body":body };
            $scope.commoncognito(typejson);
		
	
		}
		$scope.uploadquizedata = function(body,token)
		{
		    var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});
            var params = {};
		      var additionalParams = {
		              headers: {Authorization : token
		              }
		      };
		     
	            var topicjson = apigClient.uploadQuizJsonPost(params, body, additionalParams)
	            .then(function(result){
	                    
	                
	               var json = JSON.stringify(result.data);
	            
	               $scope.object = {
	                       otitle: "Quiz",
	                       odescription: "Quiz",
	                       otype: 'quiz',
	                       qtype : $scope.questype,
	                       oduration: $scope.finalquestions.length,
	                       ourl: $scope.quizourl+".json"
	               };
	              
	               if($scope.editbtn == undefined)
	                 {        
	                   
	                 }else
	                 {
	                     $scope.object.filechanges = true;
	                     $scope.object.newfile = $scope.quizourl+".json";
	                 }
	               
	               $scope.decry["quizcount"] = $scope.quizid;
	                localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
	                
	               //localStorage.setItem("quizcount", $scope.quizid);
	               $uibModalInstance.close($scope.object);
	              
	             
	                }).catch( function(result){
	                    
	                    var json = JSON.stringify(result);
	                    var json1 = json.toString();
	                    alert('ERROR'+json1);
	                    $scope.loading = false;
	                    $scope.$apply();
	                    
	                });
		}
		
		$scope.prevques = function(){
			$scope.qerror1 = false;
			$scope.qerror2 = false;
			$scope.qerror3 = false;
			$scope.qerror4 = false;
			$scope.qerror5 = false;
			$scope.qerror6 = false;
			$scope.qerror7 = false;
			$scope.qerror8 = false;
			
			var xx = $scope.currentPage;
			xx--;
			
			if(($scope.quizquestions[xx].istem == undefined || $scope.quizquestions[xx].istem.replace(/\s/g, '').length === 0)
					&&($scope.quizquestions[xx].iopts.opt1 == "" || $scope.quizquestions[xx].iopts.opt1 == undefined || $scope.quizquestions[xx].iopts.opt1.replace(/\s/g, '').length === 0) 
							  &&( $scope.quizquestions[xx].iopts.opt2 == "" || $scope.quizquestions[xx].iopts.opt2 == undefined || $scope.quizquestions[xx].iopts.opt2.replace(/\s/g, '').length === 0)	
					
			          &&($scope.quizquestions[xx].iopts.opt3  == undefined || $scope.quizquestions[xx].iopts.opt3 == "" || $scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0)      
			          &&($scope.quizquestions[xx].iopts.opt4  == undefined || $scope.quizquestions[xx].iopts.opt4 == "" || $scope.quizquestions[xx].iopts.opt4.replace(/\s/g, '').length === 0)
			          &&($scope.quizquestions[xx].iopts.opt5  == undefined || $scope.quizquestions[xx].iopts.opt5 == "" || $scope.quizquestions[xx].iopts.opt5.replace(/\s/g, '').length === 0)
						&&($scope.quizquestions[xx].iopts.opt6  == undefined || $scope.quizquestions[xx].iopts.opt6 == "" || $scope.quizquestions[xx].iopts.opt6.replace(/\s/g, '').length === 0)		
						
			){
						
						$scope.quizquestions.splice(xx, 1); 
						$scope.qid-- ;
						
						
					}else
						{
			if($scope.quizquestions[xx].istem == undefined || $scope.quizquestions[xx].istem.replace(/\s/g, '').length === 0){
				$scope.qerror1 = true;
				return;
			}
			if($scope.quizquestions[xx].iopts.opt1 == "" || $scope.quizquestions[xx].iopts.opt1 == undefined || $scope.quizquestions[xx].iopts.opt1.replace(/\s/g, '').length === 0 || 
			   $scope.quizquestions[xx].iopts.opt2 == "" || $scope.quizquestions[xx].iopts.opt2 == undefined || $scope.quizquestions[xx].iopts.opt2.replace(/\s/g, '').length === 0){
				$scope.qerror2 = true;
				return;
			}
			if($scope.quizquestions[xx].correctoption == undefined){
						$scope.qerror3 = true;
						return;
			}
		
			if($scope.quizquestions[xx].correctoption != undefined){
				var yy = $scope.quizquestions[xx].correctoption;
				if($scope.quizquestions[xx].iopts[yy] == undefined || $scope.quizquestions[xx].iopts[yy].replace(/\s/g, '').length === 0 ){
					$scope.qerror4 = true;
					return;
				}
			}
			if($scope.quizquestions[xx].iopts.opt3 != "" && $scope.quizquestions[xx].iopts.opt3  != undefined){
				if($scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0){
					$scope.qerror5 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt3 == $scope.quizquestions[xx].iopts.opt4  || $scope.quizquestions[xx].iopts.opt3 == $scope.quizquestions[xx].iopts.opt5 || $scope.quizquestions[xx].iopts.opt3 == $scope.quizquestions[xx].iopts.opt6){
                    $scope.qerror8 = true;
                    return;
                }
			}
			if($scope.quizquestions[xx].iopts.opt4 != "" && $scope.quizquestions[xx].iopts.opt4  != undefined){
				if($scope.quizquestions[xx].iopts.opt4.replace(/\s/g, '').length === 0){
					$scope.qerror5 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt3  == undefined || $scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0){
					$scope.qerror6 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt4 == $scope.quizquestions[xx].iopts.opt5  || $scope.quizquestions[xx].iopts.opt4 == $scope.quizquestions[xx].iopts.opt6){
                    $scope.qerror8 = true;
                    return;
                }
			}
			if($scope.quizquestions[xx].iopts.opt5 != "" && $scope.quizquestions[xx].iopts.opt5  != undefined){
				if($scope.quizquestions[xx].iopts.opt5.replace(/\s/g, '').length === 0){
					$scope.qerror5 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt3  == undefined || $scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0 || 
				   $scope.quizquestions[xx].iopts.opt4  == undefined || $scope.quizquestions[xx].iopts.opt4.replace(/\s/g, '').length === 0){
					$scope.qerror6 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt5 == $scope.quizquestions[xx].iopts.opt6 ){
                    $scope.qerror8 = true;
                    return;
                }
			}
			if($scope.quizquestions[xx].iopts.opt6 != "" && $scope.quizquestions[xx].iopts.opt6  != undefined){
				if($scope.quizquestions[xx].iopts.opt6.replace(/\s/g, '').length === 0){
					$scope.qerror5 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt3  == undefined || $scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0 || 
				   $scope.quizquestions[xx].iopts.opt4  == undefined || $scope.quizquestions[xx].iopts.opt4.replace(/\s/g, '').length === 0 ||
				   $scope.quizquestions[xx].iopts.opt5  == undefined || $scope.quizquestions[xx].iopts.opt5.replace(/\s/g, '').length === 0){
					$scope.qerror6 = true;
					return;
				}
			}
			if($scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt2  || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt3 || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt4
	                   || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt5 || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt6){
	                    $scope.qerror8 = true;
	                    return;
	                }
	                if($scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt3  || $scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt4 || $scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt5
	                           || $scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt6){
	                            $scope.qerror8 = true;
	                            return;
	                        }
						}
			$scope.currentPage--;
		};
		$scope.nextques = function(){
			$scope.qerror1 = false;
			$scope.qerror2 = false;
			$scope.qerror3 = false;
			$scope.qerror4 = false;
			$scope.qerror5 = false;
			$scope.qerror6 = false;
			$scope.qerror7 = false;
			$scope.qerror8 = false;
			var xx = $scope.currentPage;
			xx--;
			if($scope.quizquestions[xx].istem == undefined || $scope.quizquestions[xx].istem.replace(/\s/g, '').length === 0){
				$scope.qerror1 = true;
				return;
			}
			if($scope.quizquestions[xx].iopts.opt1 == "" || $scope.quizquestions[xx].iopts.opt1 == undefined || $scope.quizquestions[xx].iopts.opt1.replace(/\s/g, '').length === 0 || 
			   $scope.quizquestions[xx].iopts.opt2 == "" || $scope.quizquestions[xx].iopts.opt2 == undefined || $scope.quizquestions[xx].iopts.opt2.replace(/\s/g, '').length === 0){
				$scope.qerror2 = true;
				return;
			}
			if($scope.quizquestions[xx].correctoption == undefined){
						$scope.qerror3 = true;
						return;
			}
			if($scope.quizquestions[xx].correctoption != undefined){
				var yy = $scope.quizquestions[xx].correctoption;
				if($scope.quizquestions[xx].iopts[yy] == undefined || $scope.quizquestions[xx].iopts[yy].replace(/\s/g, '').length === 0 ){
					$scope.qerror4 = true;
					return;
				}
			}
			if($scope.quizquestions[xx].iopts.opt3 != "" && $scope.quizquestions[xx].iopts.opt3  != undefined){
				if($scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0){
					$scope.qerror5 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt3 == $scope.quizquestions[xx].iopts.opt4  || $scope.quizquestions[xx].iopts.opt3 == $scope.quizquestions[xx].iopts.opt5 || $scope.quizquestions[xx].iopts.opt3 == $scope.quizquestions[xx].iopts.opt6){
                    $scope.qerror8 = true;
                    return;
                }
			}
			if($scope.quizquestions[xx].iopts.opt4 != "" && $scope.quizquestions[xx].iopts.opt4  != undefined){
				if($scope.quizquestions[xx].iopts.opt4.replace(/\s/g, '').length === 0){
					$scope.qerror5 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt3  == undefined || $scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0){
					$scope.qerror6 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt4 == $scope.quizquestions[xx].iopts.opt5  || $scope.quizquestions[xx].iopts.opt4 == $scope.quizquestions[xx].iopts.opt6){
                    $scope.qerror8 = true;
                    return;
                }
			}
			 
			if($scope.quizquestions[xx].iopts.opt5 != "" && $scope.quizquestions[xx].iopts.opt5  != undefined){
				if($scope.quizquestions[xx].iopts.opt5.replace(/\s/g, '').length === 0){
					$scope.qerror5 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt3  == undefined || $scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0 || 
				   $scope.quizquestions[xx].iopts.opt4  == undefined || $scope.quizquestions[xx].iopts.opt4.replace(/\s/g, '').length === 0){
					$scope.qerror6 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt5 == $scope.quizquestions[xx].iopts.opt6 ){
                    $scope.qerror8 = true;
                    return;
                }
				
			}
			if($scope.quizquestions[xx].iopts.opt6 != "" && $scope.quizquestions[xx].iopts.opt6  != undefined){
				if($scope.quizquestions[xx].iopts.opt6.replace(/\s/g, '').length === 0){
					$scope.qerror5 = true;
					return;
				}
				if($scope.quizquestions[xx].iopts.opt3  == undefined || $scope.quizquestions[xx].iopts.opt3.replace(/\s/g, '').length === 0 || 
				   $scope.quizquestions[xx].iopts.opt4  == undefined || $scope.quizquestions[xx].iopts.opt4.replace(/\s/g, '').length === 0 ||
				   $scope.quizquestions[xx].iopts.opt5  == undefined || $scope.quizquestions[xx].iopts.opt5.replace(/\s/g, '').length === 0){
					$scope.qerror6 = true;
					return;
				}
			}
			 if($scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt2  || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt3 || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt4
                     || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt5 || $scope.quizquestions[xx].iopts.opt1 == $scope.quizquestions[xx].iopts.opt6){
                      $scope.qerror8 = true;
                      return;
                  }
                  if($scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt3  || $scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt4 || $scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt5
                             || $scope.quizquestions[xx].iopts.opt2 == $scope.quizquestions[xx].iopts.opt6){
                              $scope.qerror8 = true;
                              return;
                          }
			$scope.currentPage++;
		};
		
		$scope.addquestype=function(typ)
		{
		    $scope.fdopt1=false;
		    $scope.fdopt2=false;
		    $scope.fdopt3=false;
		    $scope.fdopt4=false;
		    $scope.fdopt5=false;
		    $scope.fdopt6=false;
		    $scope.noques=true;
		    $scope.questype=typ;
		}
		
		$scope.showfeedback = function(optyp,val)
		{
    		 if($scope.questype=="0" && $scope.questype !=undefined)
    		     {
    		     var xx = $scope.quizquestions.length;
                 var zz = $scope.currentPage;
                 
                 if(xx == zz){
                     xx--;
                     xx = xx;
                 }else{
                     zz--;
                     xx = zz;
                 }
                 
        		    if(optyp=="opt1")
        		    {        		              		      
        		        if(val.replace(/\s/g, '').length === 0 || val =='')
        		            {  		       
        		            $scope.fdopt1=false;
        		            $scope.quizquestions[xx].iopts.fdopt1 = '';
        		            }else{
        		                $scope.fdopt1=true;
        		            }
        		        
        		        
        		    }else if(optyp=="opt2")
                    {
        		        if(val.replace(/\s/g, '').length === 0 || val =='')
                        {
                        $scope.fdopt2=false;
                        $scope.quizquestions[xx].iopts.fdopt2 = '';
                        }else{
                            $scope.fdopt2=true;
                        }
                    }
        		    else if(optyp=="opt3")
                    {
        		        if(val.replace(/\s/g, '').length === 0 || val =='')
                        {
                        $scope.fdopt3=false;
                        $scope.quizquestions[xx].iopts.fdopt3 = '';
                        }else{
                            $scope.fdopt3=true;
                        }
                    }
        		    else if(optyp=="opt4")
                    {
        		        if(val.replace(/\s/g, '').length === 0 || val =='')
                        {
                        $scope.fdopt4=false;
                        $scope.quizquestions[xx].iopts.fdopt4 = '';
                        }else{
                            $scope.fdopt4=true;
                        }
                    }
        		    else if(optyp=="opt5")
                    {
        		        if(val.replace(/\s/g, '').length === 0 || val =='')
                        {
                        $scope.fdopt5=false;
                        $scope.quizquestions[xx].iopts.fdopt5 = '';
                        }else{
                            $scope.fdopt5=true;
                        }
                    } 
        		    else if(optyp=="opt6")
                    {
        		        if(val.replace(/\s/g, '').length === 0 || val =='')
                        {
                        $scope.fdopt6=false;
                        $scope.quizquestions[xx].iopts.fdopt6 = '';
                        }else{
                            $scope.fdopt6=true;
                        }
                    }
    		}
		}		
		$scope.saveaudio = function(){
			
			$scope.aerror1 = false;
			$scope.aerror2 = false;
			$scope.aerror3 = false;
			$scope.aerror4 = false;
			$scope.aerror5 = false;
			if($scope.audiodata.atitle == undefined || $scope.audiodata.atitle == null || $scope.audiodata.atitle.replace(/\s/g, '').length === 0 || 
			   $scope.audiodata.adesc == undefined || $scope.audiodata.adesc == null || $scope.audiodata.adesc.replace(/\s/g, '').length === 0 ||
			   $scope.audiodata.adur == undefined || $scope.audiodata.adur == null || $scope.audiodata.afile == undefined){
				if($scope.audiodata.atitle == undefined || $scope.audiodata.atitle == null || $scope.audiodata.atitle.replace(/\s/g, '').length === 0){
					$scope.aerror1 = true;
				}
				if($scope.audiodata.adesc == undefined || $scope.audiodata.adesc == null || $scope.audiodata.adesc.replace(/\s/g, '').length === 0){
					$scope.aerror2 = true;
				}
				if($scope.audiodata.adur == undefined || $scope.audiodata.adur == null){
					$scope.aerror3 = true;
				}
				if( $scope.audiodata.afile == undefined){
					$scope.aerror4 = true;
				}
			}else{
				if( $scope.audiodata.adur === 0 && $scope.audiodata.adursecs === 0){
					$scope.aerror5 = true;
					return
				}
				if($scope.audiodata.adursecs === undefined){
					$scope.aerror3 = true;
					return
				}
				$scope.loading = true;
				var id =  Math.floor(Math.random()*(999-100+1)+100);
				 $scope.audiofilename = id+$scope.audiodata.afile.name;
				 $scope.audiodata.adur = $scope.audiodata.adur * 60;
				 $scope.audiodata.adur = $scope.audiodata.adur +  $scope.audiodata.adursecs;

				 $scope.object = {
			    		   otitle: $scope.audiodata.atitle,
			    		   odescription: $scope.audiodata.adesc,
			    		   otype: 'audio',
			    		   oduration: $scope.audiodata.adur,
			    		   ourl: $scope.audiofilename
			       };
		
				 var body = {
                             filetype: $scope.audiodata.afile.type,
                             filename: $scope.audiofilename,
                             folder: $scope.folder
                          };
				 var typejson = {"type" :"uploadfile","file":$scope.audiodata.afile,"body":body };
                 $scope.commoncognito(typejson);
		}
		}
		
		$scope.savepdf = function(){
			$scope.perror1 = false;
			$scope.perror2 = false;
			$scope.perror3 = false;
			$scope.perror5 = false;
			if($scope.pdfdata.ptitle == undefined || $scope.pdfdata.ptitle == null || $scope.pdfdata.ptitle.replace(/\s/g, '').length === 0 || 
			   $scope.pdfdata.pdur == undefined || $scope.pdfdata.pdur == null || $scope.pdfdata.pfile == undefined){
				if($scope.pdfdata.ptitle == undefined || $scope.pdfdata.ptitle == null || $scope.pdfdata.ptitle.replace(/\s/g, '').length === 0){
					$scope.perror1 = true;
				}
				if($scope.pdfdata.pdur == undefined || $scope.pdfdata.pdur == null){
					$scope.perror2 = true;
				}
				if( $scope.pdfdata.pfile == undefined){
					$scope.perror3 = true;
				}
			}else{
				if( $scope.pdfdata.pdur === 0 &&  $scope.pdfdata.pdursecs === 0){
					$scope.perror5 = true;
					return
				}
				if( $scope.pdfdata.pdursecs === undefined){
					$scope.perror2 = true;
					return
				}
				$scope.loading = true;
				var id =  Math.floor(Math.random()*(999-100+1)+100);
				 $scope.pdffilename = id+ $scope.pdfdata.pfile.name;
				 $scope.pdfdata.pdur = $scope.pdfdata.pdur * 60;
				 $scope.pdfdata.pdur = $scope.pdfdata.pdur +  $scope.pdfdata.pdursecs;

				 $scope.object = {
			    		   otitle: $scope.pdfdata.ptitle,
			    		   otype: 'pdf',
			    		   oduration: $scope.pdfdata.pdur,
			    		   ourl:  $scope.pdffilename
			       };
		
				 //var folder = localStorage.getItem("folder")!=null ? localStorage.getItem("folder") : localStorage.getItem("topicid");
					//$scope.pdfupload();
				   var body = {
    		                    filetype: $scope.pdfdata.pfile.type,
    		                    filename:  $scope.pdffilename,
    		                    folder: $scope.folder
		                     };
				 var typejson = {"type" :"uploadfile","file":$scope.pdfdata.pfile,"body":body };
                 $scope.commoncognito(typejson);
		}
		}
		
	
		$scope.saveswipper = function(){
			$scope.serror1 = false;
			$scope.serror2 = false;
			$scope.serror3 = false;
			$scope.serror5 = false;
			$scope.serror6 = false;
			if($scope.swipperdata.stitle == undefined || $scope.swipperdata.stitle == null || $scope.swipperdata.stitle.replace(/\s/g, '').length === 0 || 
			   $scope.swipperdata.sdur == undefined || $scope.swipperdata.sdur == null || $scope.swipperdata.sfile == undefined){
				if($scope.swipperdata.stitle == undefined || $scope.swipperdata.stitle == null || $scope.swipperdata.stitle.replace(/\s/g, '').length === 0){
					$scope.serror1 = true;
				}
				if($scope.swipperdata.sdur == undefined || $scope.swipperdata.sdur == null){
					$scope.serror2 = true;
				}
				if( $scope.swipperdata.sfile == undefined){
					$scope.serror3 = true;
				}
			}else{
				if( $scope.swipperdata.sdur === 0 && $scope.swipperdata.sdursecs === 0){
					$scope.serror5 = true;
					return
				}
				if( $scope.swipperdata.sdursecs === undefined){
					$scope.serror2 = true;
					return
				}

				$scope.loading = true;
				if($scope.swipperdata.sfile.type == "application/zip" || $scope.swipperdata.sfile.type == "application/x-zip-compressed"){
					$scope.zipfile = $scope.swipperdata.sfile;
					$scope.swipperdata.sdur = $scope.swipperdata.sdur * 60;
					$scope.swipperdata.sdur = $scope.swipperdata.sdur +  $scope.swipperdata.sdursecs;

					JSZip.loadAsync($scope.swipperdata.sfile).then(function(content) {
			               
	                      // if you return a promise in a "then", you will chain the two promises
	                      var tmp= JSON.stringify(content);
	                     
	                     var t1=tmp.toString();
	                    
	                     t1 = JSON.parse(t1);
	                     
	                   
	                     try{
	                     if(t1.files['index.html'].name){
	                    	 $scope.fileexists = true;
	                     }
	                     }catch (e) {
	                        
	                    	 $scope.fileexists = false;
	                    }
	                       
	                    if($scope.fileexists){
	                    	$scope.zipsave($scope.swipperdata.sfile, $scope.swipperdata.stitle, $scope.swipperdata.sdur, 'interactivity');
	                    }else{
	                    	$scope.loading = false;
	                    	$scope.serror6 = true;
	                    	$scope.$apply();
	                    } 
	                });
				}else{
					var id =  Math.floor(Math.random()*(999-100+1)+100);
					$scope.swipperfilename = id+$scope.swipperdata.sfile.name;
					$scope.swipperdata.sdur = $scope.swipperdata.sdur * 60;
					$scope.swipperdata.sdur = $scope.swipperdata.sdur +  $scope.swipperdata.sdursecs;

					$scope.object = {
			    		   otitle: $scope.swipperdata.stitle,
			    		   otype: 'interactivity',
			    		   oduration: $scope.swipperdata.sdur,
			    		   ourl: $scope.swipperfilename
			       };
		
					 //var folder = localStorage.getItem("folder")!=null ? localStorage.getItem("folder") : localStorage.getItem("topicid");
					  var body = {
			                    filetype: $scope.swipperdata.sfile.type,
			                    filename: $scope.swipperfilename,
			                    folder: $scope.folder
			                     };
					 var typejson = {"type" :"uploadfile","file":$scope.swipperdata.sfile,"body":body };
		             $scope.commoncognito(typejson);
					}
				
		}
		}
		$scope.savescorm = function(){
			$scope.scerror1 = false;
			$scope.scerror2 = false;
			$scope.scerror3 = false;
			$scope.scerror5 = false;
			$scope.scerror6 = false;
			if($scope.scormdata.stitle == undefined || $scope.scormdata.stitle == null || $scope.scormdata.stitle.replace(/\s/g, '').length === 0 || 
			   $scope.scormdata.sdur == undefined || $scope.scormdata.sdur == null || $scope.scormdata.sfile == undefined){
				if($scope.scormdata.stitle == undefined || $scope.scormdata.stitle == null || $scope.scormdata.stitle.replace(/\s/g, '').length === 0){
					$scope.scerror1 = true;
				}
				if($scope.scormdata.sdur == undefined || $scope.scormdata.sdur == null){
					$scope.scerror2 = true;
				}
				if( $scope.scormdata.sfile == undefined){
					$scope.scerror3 = true;
				}
			}else{
				if( $scope.scormdata.sdur === 0 && $scope.scormdata.sdursecs === 0){
					$scope.scerror5 = true;
					return
				}
				if( $scope.scormdata.sdursecs === undefined){
					$scope.scerror2 = true;
					return
				}

				$scope.loading = true;
				if($scope.scormdata.sfile.type == "application/zip" || $scope.scormdata.sfile.type == "application/x-zip-compressed"){
					$scope.zipfile = $scope.scormdata.sfile;
					$scope.scormdata.sdur = $scope.scormdata.sdur * 60;
					$scope.scormdata.sdur = $scope.scormdata.sdur +  $scope.scormdata.sdursecs;

					JSZip.loadAsync($scope.scormdata.sfile).then(function(content) {
			               
	                      // if you return a promise in a "then", you will chain the two promises
	                      var tmp= JSON.stringify(content);
	                     
	                     var t1=tmp.toString();
	                    
	                     t1 = JSON.parse(t1);
	                     
	                   
	                     try{
	                     if(t1.files['rxd/indexAPI.html'].name){
	                    	 $scope.fileexists = true;
	                     }
	                     }catch (e) {
	                        
	                    	 $scope.fileexists = false;
	                    }
	                       
	                    if($scope.fileexists){
							
	                    	$scope.zipsave($scope.scormdata.sfile, $scope.scormdata.stitle, $scope.scormdata.sdur, 'scorm');
	                    }else{
	                    	$scope.loading = false;
	                    	$scope.serror6 = true;
	                    	$scope.$apply();
	                    } 
	                });
				}
				
		}
		}
		$scope.uploadfile = function(file,token,body)
		{
		    var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});
            var params = {};

            var additionalParams = {
                    headers: {Authorization : token
                    }
			};
	
            var topicjson = apigClient.getpreSignedURLPost(params, body, additionalParams)
            .then(function(result){
                    
                
               var json = JSON.stringify(result.data);
             if($scope.htmltype1 == true)
                 {
                    $scope.uploadQUIL(file, result.data);
                 }else
                     {
                        $scope.upload(file, result.data);
                     }
            
             
                }).catch( function(result){
                    
                    var json = JSON.stringify(result);
                    var json1 = json.toString();
                    alert('ERROR'+result);
                    $scope.loading = false;
                    $scope.$apply();
                    
                });
		}
		
		
		$scope.zipsave = function(file, title, dur, type){
			
			 var id =  Math.floor(Math.random()*(999-100+1)+100);
			 $scope.zipfilename = id+ file.name;
			 $scope.object = {
		    		   otitle: title,
		    		   otype: type,
		    		   oduration: dur,
		    		   ourl:   $scope.zipfilename
		       };
			
			// var folder = localStorage.getItem("folder")!=null ? localStorage.getItem("folder") : localStorage.getItem("topicid");
			/* var typejson = {"type" :"zipupload" ,"file": file};
             $scope.commoncognito(typejson);*/
             var body = {
                         filetype: file.type,
                         filename:  $scope.zipfilename,
                         folder: $scope.folder
                      };
             var typejson = {"type" :"uploadfile","file":file,"body":body };
             $scope.commoncognito(typejson);
		}
		/*$scope.zipupload = function(file,token)
		{
		    var apigClient = apigClientFactory.newClient({});
            var params = {};

            var body = {
                    filetype: file.type,
                    filename:  $scope.zipfilename,
                    folder: $scope.folder
                     };
            
            var additionalParams = {};
            var topicjson = apigClient.getpreSignedURLPost(params, body, additionalParams)
            .then(function(result){
                    
                
               var json = JSON.stringify(result.data);
             
              $scope.upload(file, result.data);
             
                }).catch( function(result){
                    
                    var json = JSON.stringify(result);
                    var json1 = json.toString();
                    alert('ERROR'+result);
                    $scope.loading = false;
                    $scope.$apply();
                    
                });
		}*/
		$scope.savevideo = function(){
			$scope.verror1 = false;
			$scope.verror2 = false;
			$scope.verror3 = false;
			$scope.verror4 = false;
			$scope.verror5 = false;
			if($scope.videodata.vtitle == undefined || $scope.videodata.vtitle == null || $scope.videodata.vtitle.replace(/\s/g, '').length === 0 || 
			   $scope.videodata.vdesc == undefined || $scope.videodata.vdesc == null || $scope.videodata.vdesc.replace(/\s/g, '').length === 0 ||
			   $scope.videodata.vdur == undefined || $scope.videodata.vdur == null || $scope.videodata.vfile == undefined){
				if($scope.videodata.vtitle == undefined || $scope.videodata.vtitle == null || $scope.videodata.vtitle.replace(/\s/g, '').length === 0){
					$scope.verror1 = true;
				}
				if($scope.videodata.vdesc == undefined || $scope.videodata.vdesc == null || $scope.videodata.vdesc.replace(/\s/g, '').length === 0){
					$scope.verror2 = true;
				}
				if($scope.videodata.vdur == undefined || $scope.videodata.vdur == null){
					$scope.verror3 = true;
				}
				if( $scope.videodata.vfile == undefined){
					$scope.verror4 = true;
				}
			}else{
				if( $scope.videodata.vdur === 0 && $scope.videodata.vdursecs === 0){
					$scope.verror5 = true;
					return
				}
				if($scope.videodata.vdursecs === undefined){
					$scope.verror3 = true;
					return
				}
				$scope.loading = true;
				var id =  Math.floor(Math.random()*(999-100+1)+100);
				 $scope.videofilename = id+$scope.videodata.vfile.name;
				 $scope.videodata.vdur = $scope.videodata.vdur * 60;
				 $scope.videodata.vdur = $scope.videodata.vdur +  $scope.videodata.vdursecs;

				 $scope.object = {
			    		   otitle: $scope.videodata.vtitle,
			    		   odescription: $scope.videodata.vdesc,
			    		   otype: 'video',
			    		   oduration: $scope.videodata.vdur,
			    		   ourl: $scope.videofilename
			       };
		
				 //var folder = localStorage.getItem("folder")!=null ? localStorage.getItem("folder") : localStorage.getItem("topicid");;
				/* var typejson = {"type" :"videoupload"};
	                $scope.commoncognito(typejson);*/
				   var body = {
	                        filetype: $scope.videodata.vfile.type,
	                        filename: $scope.videofilename,
	                        folder: $scope.folder
	                     };
	                var typejson = {"type" :"uploadfile","file":$scope.videodata.vfile,"body":body };
	                $scope.commoncognito(typejson);
		}
		}
		/*$scope.videoupload = function(token)
		{
		    var apigClient = apigClientFactory.newClient({});
            var params = {};

            var body = {
                        filetype: $scope.videodata.vfile.type,
                        filename: $scope.videofilename,
                        folder: $scope.folder
                     };
            
            var additionalParams = {};
            var topicjson = apigClient.getpreSignedURLPost(params, body, additionalParams)
            .then(function(result){
                    
                
               var json = JSON.stringify(result.data);
              $scope.upload($scope.videodata.vfile, result.data);
             
                }).catch( function(result){
                    
                    var json = JSON.stringify(result);
                    var json1 = json.toString();
                    alert('ERROR11'+result);
                    $scope.loading = false;
                    $scope.$apply();
                    
                });
		}*/
		
		$scope.quizimageupload = function(topicimg) {
		    
				$scope.quizimage = topicimg;
				var typejson = {"type" :"quizimageupload"};
				$scope.commoncognito(typejson);
			
		};
		$scope.imageupload = function(token)
		{
		    var filename = $scope.quizimage.name;
            var apigClient = apigClientFactory.newClient({
                invokeUrl: $scope.decry.api,
            });
            var params = {};
             //var folder = localStorage.getItem("folder")!=null ? localStorage.getItem("folder") : localStorage.getItem("topicid");
            var body = {
                    filetype: $scope.quizimage.type,
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
               
              $scope.uploadimage($scope.quizimage, result.data);
             
                }).catch( function(result){
                    
                    var json = JSON.stringify(result);
                    var json1 = json.toString();
                    alert('ERROR1'+result);
            
                });
		}
		$scope.uploadimage = function(file,url) {
			//$scope.objecturl = $sce.trustAsResourceUrl(url);
			
			      $http.put(url, file, {headers:{'Content-Type': file.type}})
			        .success(function(resp) {
			          //Finally, We're done
			        })
			        .error(function(resp) {
			        	$scope.loading = false;
			          alert("An Error Occurred Attaching Your File. Please try again or Contact production Support if problem persist");
			        });
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
		$scope.uploadQUIL = function(file,url) {
			
		      $http.put(url, file, {headers:{'Content-Type': 'text/html'}})
		        .success(function(resp) {
		          //Finally, We're done
		        	$uibModalInstance.close($scope.object);
		        })
		        .error(function(resp) {
		        	$scope.loading = false;
		          alert("An Error Occurred Attaching Your File. Please try again or Contact production Support if problem persist");
		        });
		}
		$scope.close = function(){
		
			$uibModalInstance.dismiss('cancel');
	
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
	                      swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",allowOutsideClick: false,
				              allowEscapeKey:false,
				              width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',
				            	  buttonsStyling: false,confirmButtonClass: 'button1'});
	                      localStorage.clear();
	                      $window.location.href = '#login';
	                  }else{
	                      
	                      var token = session.idToken.jwtToken;
	                      if(typejson.type == 'uploadfile')
	                      {
	                          $scope.uploadfile(typejson.file,token,typejson.body);
	                      }else if(typejson.type == 'quizimageupload')
                          {
                              $scope.imageupload(token); 
                          }else if(typejson.type == 'uploadquizedata')
	                      {
                              $scope.uploadquizedata(typejson.body,token); 
	                      }
	 
	                  }
	              });
	          })
	  }

};

app.controller('addobjectCtrl', addobjectCtrl);
addobjectCtrl.$inject = ['$rootScope','$scope', '$uibModalInstance', '$http', '$location', '$window','$cookies','$sce','$crypto','config'];
