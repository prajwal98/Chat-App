var addfreeobjectsCtrl = function($rootScope, $scope, $uibModalInstance, $http, $location, $window, $cookies,$sce,$crypto,config) {
		
$scope.stag = [];
$scope.category ={};
	$scope.home = function(){
	
		$scope.selecttype = true;
		$scope.audiot = false;
		$scope.vediot = false;
		$scope.swippert = false;
		$scope.quizt = false;
		$scope.pdft = false;
		$scope.htmlt = false;
		
		// $scope.otypes = [{"type":"Audio","id":"1","img":"audio"},{"type":"Narrative","id":"2","img":"html"},{"type":"PDF","id":"3","img":"pdf"},{"type":"Quiz","id":"4","img":"quiz"},
		// {"type":"Interactivity","id":"5","img":"interactivity"},{"type":"Video","id":"6","img":"video"}
		// ,{"type":"YouTube","id":"7","img":"youtube"},{"type":"Vimeo","id":"8","img":"vimeo"},{"type":"Scorm","id":"9","img":"scorm"}]
		$scope.otypes = [{"type":"Quiz","id":"4","img":"quiz"}];
		
	}
	
	$scope.home();
	
	$scope.sobjecttype = function(id){
		//$scope.catTypes();
	    $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		$scope.stype = id;
		if($scope.stype == '1' || $scope.stype == 1){
			$scope.selecttype = false;
			$scope.audiot = true;
			
			$scope.sobject = 'Audio';
			 $scope.audiodata = [{"atitle":"","adesc":"","adur":"","adursecs":"","afile":"","aadprods":"","amrtools":"","sharable":""}];
			 $scope.audiodata.adur=0;
			$scope.audiodata.adursecs=0;
		}else if($scope.stype == '2' || $scope.stype == 2){
			$scope.selecttype = false;
			$scope.htmlt = true;
			$scope.sobject = 'Narrative';
			$scope.selecthtmltype = true;
			$scope.htmltype1 = false;
			$scope.htmltype2 = false;
			$scope.htmldata =  [{"quiloutput":"","htitle":"","hdur":"","hdursecs":"","hfile":"","hadprods":"","hmrtools":"","sharable":""}];
			$scope.htmldata.hdur=0;
			$scope.htmldata.hdursecs=0;
		}else if($scope.stype == '3' || $scope.stype == 3){
			$scope.selecttype = false;
			$scope.pdft = true;
			$scope.sobject = 'PDF';
			$scope.pdfdata = [{"ptitle":"","pdur":"","pdursecs":"","pfile":"","padprods":"","pmrtools":"","sharable":""}];
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
			$scope.qtitle = {};
			$scope.qdata = {};
		}else if($scope.stype == '5' || $scope.stype == 5){
			$scope.selecttype = false;
			$scope.swippert = true;
			$scope.sobject = 'Interactivity';
			$scope.swipperdata = [{"stitle":"","sdur":"","sdursecs":"","sfile":"","sadprods":"","smrtools":"","sharable":""}];
			$scope.swipperdata.sdur = 0;
			$scope.swipperdata.sdursecs=0;
		}else if($scope.stype == '7' || $scope.stype == 7){
            $scope.selecttype = false;
            $scope.ytvideot = true;
            $scope.sobject = 'YouTube Video';
			$scope.youtubevideodata = [{"vtitle":"","vdesc":"","vdur":"","vdursecs":"","ytcode":"","yadprods":"","ymrtools":"","sharable":""}];
			$scope.youtubevideodata.vdur=0;
			$scope.youtubevideodata.vdursecs=0;
        }else if($scope.stype == '8' || $scope.stype == 8){
            $scope.selecttype = false;
            $scope.ytvideot = true;
            $scope.sobject = 'Vimeo Video';
			$scope.youtubevideodata = [{"vtitle":"","vdesc":"","vdur":"","vdursecs":"","ytcode":"","yadprods":"","ymrtools":"","sharable":""}];
			$scope.youtubevideodata.vdur=0;
			$scope.youtubevideodata.vdursecs=0;
        } else if($scope.stype == '9' || $scope.stype == 9){
			$scope.selecttype = false;
			$scope.scormt = true;
			$scope.sobject = 'scorm';
			$scope.scormdata = [{"stitle":"","sdur":"","sdursecs":"","sfile":"","sadprods":"","smrtools":"","sharable":""}];
			$scope.scormdata.sdur = 0;
			$scope.scormdata.sdursecs=0;
		} else {
			$scope.selecttype = false;
			$scope.videot = true;
			$scope.sobject = 'Video';
			 $scope.videodata = [{"vtitle":"","vdesc":"","vdur":"","vdursecs":"","vfile":"","vadprods":"","vmrtools":"","sharable":""}];
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
	
	
		$scope.addques = function(){
			$scope.qerror1 = false;
			$scope.qerror2 = false;
			$scope.qerror3 = false;
			$scope.qerror4 = false;
			$scope.qerror5 = false;
			$scope.qerror6 = false;
			$scope.qerror7 = false;
			$scope.qerror8 = false;
			$scope.qzerror1 = false;
			
			if($scope.qtitle.qztitle == undefined || $scope.qtitle.qztitle.replace(/\s/g, '').length === 0){
				$scope.qzerror1 = true;
				return;
			}
			
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
            $scope.qerror9 = false;
            
			
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

				 $scope.showcategory = true;
	             $scope.showques = false;
	             
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
			$scope.qerror10 = false;
            $scope.qerror11 = false;
			$scope.qerror12 = false;
		    
		    $scope.cutoffvalue='0';
			
			if($scope.qdata.qadprods === undefined || $scope.qdata.qadprods === null){
				$scope.qerror10 = true;
				return;
			}else
		    if($scope.qdata.qmrtools === undefined || $scope.qdata.qmrtools === null){
				$scope.qerror11 = true;
				return;
			}else
			if($scope.qdata.qsharable === undefined || $scope.qdata.qsharable === null){
				$scope.qerror12 = true;
				return;
			}else
		    if(cutoffsc == undefined )
		        {
    		        $scope.qerror8 = true;
    		      
    		        return;
		        }
		    else if(parseInt(cutoffsc) < 0)
		            {
		      
    		            $scope.qerror9 = true;
                        return;
		            } else
		                {
		                $scope.cutoffvalue = parseInt(cutoffsc);
		                    $scope.quizsave();
		                }
		    
		}
		$scope.Catsavequiz = function()
		{
			$scope.qerror10 = false;
            $scope.qerror11 = false;
			$scope.qerror12 = false;
		    
		    $scope.cutoffvalue='0';
			
			if($scope.qdata.qadprods === undefined || $scope.qdata.qadprods === null){
				$scope.qerror10 = true;
				return;
			}else
		    if($scope.qdata.qmrtools === undefined || $scope.qdata.qmrtools === null){
				$scope.qerror11 = true;
				return;
			}else
			if($scope.qdata.qsharable === undefined || $scope.qdata.qsharable === null){
				$scope.qerror12 = true;
				return;
			}else{
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
			   $scope.taglists=[];
				for (var i = 0; i < $scope.stag.length; i++) {
					$scope.taglists.push($scope.stag[i].text);
				}
				$scope.category.id =$scope.decry.tid;
				$scope.category.name =$scope.decry.tname;
			    $scope.category.ttags=$scope.taglists;
				
			var body = {
					    oid:$scope.decry.oid,
    					folder: $scope.folder,
    					qitems: $scope.finalquestions,
    					cutoff:$scope.cutoffvalue,
    					crby:$scope.decry.username,
    					ourl:'json',
    					otitle: $scope.qtitle.qztitle,
	                    odescription: "Quiz",
	                    otype: 'quiz',
	                    qtype : $scope.questype,
	                    type:'1',
						ttags: $scope.category,
						adprods: $scope.qdata.qadprods,
						mrtools: $scope.qdata.qmrtools,
						sharable: $scope.qdata.qsharable,
	                    oduration: $scope.finalquestions.length
	                    
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
		    
	            var topicjson = apigClient.addObjectPost(params, body, additionalParams)
	            .then(function(result){
	                    
	                var response=JSON.stringify(result.data);
	            	response = JSON.parse(response);
					
					if(response.id === 1 || response.id === '1'){
						$uibModalInstance.close(obj);
						swal({title: "Oops!", text: "Content & Collateral with same name already exist in admin portal!", type: "warning",buttonsStyling:false,allowOutsideClick: false,
							allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
					   $scope.loading = false;
					} else {
	              
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
		
		
		$scope.uploadfile = function(file,token,body)
		{
			
			 var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});
	            var params = {};

	            var additionalParams = {
	                    headers: {Authorization : token
	                    }
	            };

	         var topicjson = apigClient.addObjectPost(params, body, additionalParams)
	            .then(function(result){
	            	 
	            	var response=JSON.stringify(result.data);
	            	response = JSON.parse(response);
				
					if(response.id === 1 || response.id === '1'){

						swal({title: "Oops!", text: response.msg, type: "warning",buttonsStyling:false,allowOutsideClick: false,
						allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK',customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
						$scope.loading=false;
						$scope.$apply();	
					} else {

	            	    if(body.otype != 'youtube' && body.otype != 'vimeo')
	            	        {
	            	        var filename = body.filename[1];
	                        
	                        body.filename = response.objid+"."+filename;
	                        body.OBJID = response.objid;
	                        
	                        
	                        
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
	                                 
	                                 
	                                      if(body.otype == 'interactivity' || body.otype == 'scorm'){
	                                          $scope.uploadSwiperData(file, result.data,token,body);
	                                          
	                                      }else
	                                          {
	                                          $scope.upload(file, result.data);
	                                          }
	                                  }
	                          
	                         
	                          
	                             }).catch( function(result){
	                                 
	                                 var json = JSON.stringify(result);
	                                 var json1 = json.toString();
	                                 alert('ERROR'+result);
	                                 $scope.loading = false;
	                                 $scope.$apply();
	                                 
	                             });
	            	        }else
	            	            {
	            	              $window.location.href = '#objects';
	                               //Finally, We're done
	                              $uibModalInstance.close($scope.object);
	            	            }
	            	}
	            	
	            	
	            }).catch( function(result){
                    
                    var json = JSON.stringify(result);
                    var json1 = json.toString();
                    alert('ERROR1'+result);
                    $scope.loading = false;
                    $scope.$apply();
                    
                });
		   
		}
	
		
		$scope.quizimageupload = function(topicimg) {
		    
				$scope.quizimage = topicimg;
				var typejson = {"type" :"quizimageupload"};
				$scope.commoncognito(typejson);
			
		};
		$scope.imageupload = function(token)
		{
			body.filename=body.filename.split(".");
			
			 var apigClient = apigClientFactory.newClient({ invokeUrl: $scope.decry.api,});
	            var params = {};

	            var additionalParams = {
	                    headers: {Authorization : token
	                    }
	            };
	         var topicjson = apigClient.addObjectPost(params, body, additionalParams)
	            .then(function(result){
	            	
	            	var json=JSON.stringify(result.data);
	            	var obj=JSON.parse(json);
	            	
	            	var filename=body.filename[1];
	            	body.filename=obj.OBJID+"."+filename;
			
		    var filename = $scope.quizimage.name;
            var apigClient = apigClientFactory.newClient({
                invokeUrl: $scope.decry.api,
            });
            var params = {};
             
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
             }).catch( function(result){
                
                var json = JSON.stringify(result);
                var json1 = json.toString();
                alert('ERROR'+result);
                $scope.loading = false;
                $scope.$apply();
                
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
			        	$window.location.href = '#objects';
			          //Finally, We're done
			        	$uibModalInstance.close($scope.object);
			        	
			        })
			        .error(function(resp) {
						console.log("file upload err")
						console.log(resp)
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
	                      if(typejson.type == 'object')
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
		$scope.stag.length =15;
	}	
	
}
};

app.controller('addfreeobjectsCtrl', addfreeobjectsCtrl);
addfreeobjectsCtrl.$inject = ['$rootScope','$scope', '$uibModalInstance', '$http', '$location', '$window','$cookies','$sce','$crypto','config'];