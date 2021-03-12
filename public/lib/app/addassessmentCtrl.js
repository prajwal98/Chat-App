var addassessmentCtrl = function($rootScope, $scope, $uibModalInstance, $http, $location, $window, $cookies,$sce,$crypto,config) {
		
    
    $scope.home = function(){
        var decrypted =$crypto.decrypt(localStorage.getItem("786a2y1e"), config.key);               
        $scope.decry=JSON.parse(decrypted);
        
        $scope.firstview = false;
        $scope.firstviewdata = {};
    
        $scope.questiondata = {};
        $scope.questiondata.iopts = {};
        $scope.questiondata.sgslimg = {};
        $scope.questiondata.msl = {};
        $scope.questiondata.mslimg = {};
        $scope.questiondata.matchthefols = [{value1:"",value2:""},{value1:"",value2:""},{value1:"",value2:""},{value1:"",value2:""}];
        $scope.questions = [];
        $scope.question = {};
        $scope.iid = 0;
    }
    
    $scope.home();
    
    $scope.close = function(){
    
        $uibModalInstance.dismiss('cancel');

    };
    

    
  
    $scope.addinstruction = function() {
        $scope.firstviewdata.instructions.push({value:""});
    }

    $scope.deleteinstruction = function(instruction) {
        for(var i=1; i<$scope.firstviewdata.instructions.length; i++) {
        if($scope.firstviewdata.instructions[i] === instruction) {
            $scope.firstviewdata.instructions.splice(i, 1);
            break;
        }
        }
    }

    $scope.addmatchrow = function() {
        $scope.questiondata.matchthefols.push({value1:"",value2:""});
    }
    
    $scope.deletematchrow = function(matchrowval) {
        for(var i=3; i<$scope.questiondata.matchthefols.length; i++) {
        if($scope.questiondata.matchthefols[i] === matchrowval) {
            $scope.questiondata.matchthefols.splice(i, 1);
            break;
        }
        }
    }


    $scope.firstviewfunc = function () {
        $scope.fverror1 = false;
        $scope.fverror2 = false;
        $scope.fverror3 = false;
        $scope.fverror4 = false;
        $scope.fverror5 = false;
        $scope.fverror6 = false;




        if ($scope.firstviewdata.title === undefined || $scope.firstviewdata.title === '' || $scope.firstviewdata.title.replace(/\s/g, '').length === 0) {
            $scope.fverror1 = true;
            return;
        }

        if ($scope.firstviewdata.date === undefined || $scope.firstviewdata.date === '' || $scope.firstviewdata.date === null || $scope.firstviewdata.date === 'null') {
            $scope.fverror2 = true;
            return;
        }

        if ($scope.firstviewdata.timestart === undefined || $scope.firstviewdata.timestart === null) {
            $scope.fverror3 = true;
            return;
        }

        if ($scope.firstviewdata.timeend === undefined || $scope.firstviewdata.timeend === null) {
            $scope.fverror4 = true;
            return;
        } else if ($scope.firstviewdata.timeend < $scope.firstviewdata.timestart) {
            $scope.fverror5 = true;
            return;
        }
        for (let i = 0; i < $scope.firstviewdata.instructions.length; i++) {
          
            if ($scope.firstviewdata.instructions[i].value == "") {
                $scope.fverror6 = true;
                return;
            }
        }
       
    
        var d = $('#datetimepicker').val();
        var ts = $('#appt').val();
        var te = $('#appte').val();
        var datetimestart = new Date((d+" "+ts).split(' ').join('T'));
        datetimestart = datetimestart.getTime();
        
        $scope.firstviewdata.datetimestart = datetimestart;
        var datetimeend = new Date((d+" "+te).split(' ').join('T'));
        datetimeend = datetimeend.getTime();
        
        $scope.firstviewdata.datetimeend = datetimeend;
      
        let f = [];
        
        for(var i=0; i<$scope.firstviewdata.instructions.length; i++) {
      
          if ($scope.firstviewdata.instructions[i].value != "") {
            
            var temp = $scope.firstviewdata.instructions[i].value;
            f.push(temp);
          } 
        }
        $scope.firstviewdata.finalinstructions = f;
        $scope.firstview = false;

    }
    
    $scope.addquestion = function (save) {
        
        
        $scope.error1 = false;//quiztype
        $scope.error2 = false;//question
        $scope.error3 = false;//marks
        $scope.error4 = false;//trueorfalse
        $scope.error5 = false;//matchthefollowing
        $scope.error6 = false;//imgsierror


        if ($scope.questiondata.quiztype == undefined || $scope.questiondata.quiztype == "" || $scope.questiondata.quiztype == null) {
            $scope.error1 = true;
            return;
        }


        if ($scope.questiondata.question == undefined || $scope.questiondata.question == "" || $scope.questiondata.question == null) {
            if ($scope.questiondata.quiztype != 6) {
                $scope.error2 = true;
                return;
            }
        }


        if ($scope.questiondata.marks == undefined || $scope.questiondata.marks == "" || $scope.questiondata.marks == null) {
            $scope.error3 = true;
            return;
        }

        if ($scope.questiondata.quiztype == 0 ) {

            
            $scope.qerror1 = false;
            $scope.qerror2 = false;
            $scope.qerror3 = false;
            $scope.qerror4 = false;
            $scope.qerror5 = false;
            $scope.qerror6 = false;
            $scope.qerror7 = false;
            $scope.qerror8 = false;
            $scope.qerror9 = false;


            if ($scope.questiondata.iopts.opt1 == "" || $scope.questiondata.iopts.opt1 == undefined || $scope.questiondata.iopts.opt1.replace(/\s/g, '').length === 0 ||
                $scope.questiondata.iopts.opt2 == "" || $scope.questiondata.iopts.opt2 == undefined || $scope.questiondata.iopts.opt2.replace(/\s/g, '').length === 0) {
                $scope.qerror2 = true;
                return;
            }
            if ($scope.questiondata.correctoption == undefined) {
                $scope.qerror3 = true;
                return;
            }

            if ($scope.questiondata.correctoption != undefined) {
                var yy = $scope.questiondata.correctoption;
                if ($scope.questiondata.iopts[yy] == undefined || $scope.questiondata.iopts[yy].replace(/\s/g, '').length === 0) {
                    $scope.qerror4 = true;
                    return;
                }
            }
            if ($scope.questiondata.iopts.opt3 != "" && $scope.questiondata.iopts.opt3 != undefined) {
                if ($scope.questiondata.iopts.opt3.replace(/\s/g, '').length === 0) {
                    $scope.qerror5 = true;
                    return;
                }
                if ($scope.questiondata.iopts.opt3 == $scope.questiondata.iopts.opt4 || $scope.questiondata.iopts.opt3 == $scope.questiondata.iopts.opt5 || $scope.questiondata.iopts.opt3 == $scope.questiondata.iopts.opt6) {
                    $scope.qerror8 = true;
                    return;
                }
            }

            if ($scope.questiondata.iopts.opt4 != "" && $scope.questiondata.iopts.opt4 != undefined) {
                if ($scope.questiondata.iopts.opt4.replace(/\s/g, '').length === 0) {
                    $scope.qerror5 = true;
                    return;
                }
                if ($scope.questiondata.iopts.opt3 == undefined || $scope.questiondata.iopts.opt3.replace(/\s/g, '').length === 0) {
                    $scope.qerror6 = true;
                    return;
                }
                if ($scope.questiondata.iopts.opt4 == $scope.questiondata.iopts.opt5 || $scope.questiondata.iopts.opt4 == $scope.questiondata.iopts.opt6) {
                    $scope.qerror8 = true;
                    return;
                }
            }

            if ($scope.questiondata.iopts.opt5 != "" && $scope.questiondata.iopts.opt5 != undefined) {
                if ($scope.questiondata.iopts.opt5.replace(/\s/g, '').length === 0) {
                    $scope.qerror5 = true;
                    return;
                }
                if ($scope.questiondata.iopts.opt3 == undefined || $scope.questiondata.iopts.opt3.replace(/\s/g, '').length === 0 ||
                    $scope.questiondata.iopts.opt4 == undefined || $scope.questiondata.iopts.opt4.replace(/\s/g, '').length === 0) {
                    $scope.qerror6 = true;
                    return;
                }
                if ($scope.questiondata.iopts.opt5 == $scope.questiondata.iopts.opt6) {
                    $scope.qerror8 = true;
                    return;
                }

            }

            if ($scope.questiondata.iopts.opt6 != "" && $scope.questiondata.iopts.opt6 != undefined) {
                if ($scope.questiondata.iopts.opt6.replace(/\s/g, '').length === 0) {
                    $scope.qerror5 = true;
                    return;
                }
                if ($scope.questiondata.iopts.opt3 == undefined || $scope.questiondata.iopts.opt3.replace(/\s/g, '').length === 0 ||
                    $scope.questiondata.iopts.opt4 == undefined || $scope.questiondata.iopts.opt4.replace(/\s/g, '').length === 0 ||
                    $scope.questiondata.iopts.opt5 == undefined || $scope.questiondata.iopts.opt5.replace(/\s/g, '').length === 0) {
                    $scope.qerror6 = true;
                    return;
                }
            }
            if ($scope.questiondata.iopts.opt1 == $scope.questiondata.iopts.opt2 || $scope.questiondata.iopts.opt1 == $scope.questiondata.iopts.opt3 || $scope.questiondata.iopts.opt1 == $scope.questiondata.iopts.opt4
                || $scope.questiondata.iopts.opt1 == $scope.questiondata.iopts.opt5 || $scope.questiondata.iopts.opt1 == $scope.questiondata.iopts.opt6) {
                $scope.qerror8 = true;
                return;
            }

            if ($scope.questiondata.iopts.opt2 == $scope.questiondata.iopts.opt3 || $scope.questiondata.iopts.opt2 == $scope.questiondata.iopts.opt4 || $scope.questiondata.iopts.opt2 == $scope.questiondata.iopts.opt5
                || $scope.questiondata.iopts.opt2 == $scope.questiondata.iopts.opt6) {
                $scope.qerror8 = true;
                return;
            }




            let tempoptions = [];
            let tempopsval = {};
            if ($scope.questiondata.iopts.opt1 != undefined) {
                if ($scope.questiondata.correctoption == "opt1") {
                    tempopsval = {
                        content: $scope.questiondata.iopts.opt1,
                        correct: "true"
                    };
                } else {

                    tempopsval = {
                        content: $scope.questiondata.iopts.opt1,
                        correct: "false"
                    };
                }

                tempoptions.push(tempopsval);

            }

            if ($scope.questiondata.iopts.opt2 != undefined) {
                if ($scope.questiondata.correctoption == "opt2") {
                    tempopsval = {
                        content: $scope.questiondata.iopts.opt2,
                        correct: "true"
                    };
                } else {

                    tempopsval = {
                        content: $scope.questiondata.iopts.opt2,
                        correct: "false"
                    };
                }

                tempoptions.push(tempopsval);

            }

            if ($scope.questiondata.iopts.opt3 != undefined) {
                if ($scope.questiondata.correctoption == "opt3") {
                    tempopsval = {
                        content: $scope.questiondata.iopts.opt3,
                        correct: "true"
                    };
                } else {

                    tempopsval = {
                        content: $scope.questiondata.iopts.opt3,
                        correct: "false"
                    };
                }

                tempoptions.push(tempopsval);

            }

            if ($scope.questiondata.iopts.opt4 != undefined) {
                if ($scope.questiondata.correctoption == "opt4") {
                    tempopsval = {
                        content: $scope.questiondata.iopts.opt4,
                        correct: "true"
                    };
                } else {

                    tempopsval = {
                        content: $scope.questiondata.iopts.opt4,
                        correct: "false"
                    };
                }

                tempoptions.push(tempopsval);

            }

            if ($scope.questiondata.iopts.opt5 != undefined) {
                if ($scope.questiondata.correctoption == "opt5") {
                    tempopsval = {
                        content: $scope.questiondata.iopts.opt5,
                        correct: "true"
                    };
                } else {

                    tempopsval = {
                        content: $scope.questiondata.iopts.opt5,
                        correct: "false"
                    };
                }

                tempoptions.push(tempopsval);

            }

            if ($scope.questiondata.iopts.opt6 != undefined) {
                if ($scope.questiondata.correctoption == "opt6") {
                    tempopsval = {
                        content: $scope.questiondata.iopts.opt6,
                        correct: "true"
                    };
                } else {

                    tempopsval = {
                        content: $scope.questiondata.iopts.opt6,
                        correct: "false"
                    };
                }

                tempoptions.push(tempopsval);

            }
            
            $scope.question.iopts = tempoptions;


        }

        if ($scope.questiondata.quiztype == 4) {

           
            $scope.sgslimgerror2 = false;
            $scope.sgslimgerror3 = false;
            $scope.sgslimgerror4 = false;
          
            $scope.sgslimgerror6 = false;
            
            console.log($scope.questiondata.sgslimg.opt1)
    
            if ($scope.questiondata.sgslimg.opt1 == "" || $scope.questiondata.sgslimg.opt1 == undefined ||
                $scope.questiondata.sgslimg.opt2 == "" || $scope.questiondata.sgslimg.opt2 == undefined) {
                $scope.sgslimgerror2 = true;
                return;
            }
            if ($scope.questiondata.sgslimgcorrectoption == undefined) {
                $scope.sgslimgerror3 = true;
                return;
            }
        
            if ($scope.questiondata.sgslimgcorrectoption != undefined) {
                var yy = $scope.questiondata.sgslimgcorrectoption;
                if ($scope.questiondata.sgslimg[yy] == undefined) {
                    $scope.sgslimgerror4 = true;
                    return;
                }
            }
  
            if ($scope.questiondata.sgslimg.opt4 != "" && $scope.questiondata.sgslimg.opt4 != undefined) {
            
                if ($scope.questiondata.sgslimg.opt3 == undefined) {
                    $scope.sgslimgerror6 = true;
                    return;
                }
       
            }
        
            if ($scope.questiondata.sgslimg.opt5 != "" && $scope.questiondata.sgslimg.opt5 != undefined) {
            
                if ($scope.questiondata.sgslimg.opt3 == undefined ||
                    $scope.questiondata.sgslimg.opt4 == undefined) {
                    $scope.sgslimgerror6 = true;
                    return;
                }
           
        
            }
        
            if ($scope.questiondata.sgslimg.opt6 != "" && $scope.questiondata.sgslimg.opt6 != undefined) {
         
                if ($scope.questiondata.sgslimg.opt3 == undefined ||
                    $scope.questiondata.sgslimg.opt4 == undefined ||
                    $scope.questiondata.sgslimg.opt5 == undefined) {
                    $scope.sgslimgerror6 = true;
                    return;
                }
            }

        
            let tempoptionssgslimg = [];
            let tempopsval = {};
            if ($scope.questiondata.sgslimg.opt1 != undefined) {
                if ($scope.questiondata.sgslimgcorrectoption == "opt1") {
                    tempopsval = {
                        url: $scope.questiondata.sgslimg.opt1name,
                        correct: "true"
                    };
                } else {
        
                    tempopsval = {
                        url: $scope.questiondata.sgslimg.opt1name,
                        correct: "false"
                    };
                }
        
                tempoptionssgslimg.push(tempopsval);
        
            }
        
            if ($scope.questiondata.sgslimg.opt2 != undefined) {
                if ($scope.questiondata.sgslimgcorrectoption == "opt2") {
                    tempopsval = {
                        url: $scope.questiondata.sgslimg.opt2name,
                        correct: "true"
                    };
                } else {
        
                    tempopsval = {
                        url: $scope.questiondata.sgslimg.opt2name,
                        correct: "false"
                    };
                }
        
                tempoptionssgslimg.push(tempopsval);
        
            }
        
            if ($scope.questiondata.sgslimg.opt3 != undefined) {
                if ($scope.questiondata.sgslimgcorrectoption == "opt3") {
                    tempopsval = {
                        url: $scope.questiondata.sgslimg.opt3name,
                        correct: "true"
                    };
                } else {
        
                    tempopsval = {
                        url: $scope.questiondata.sgslimg.opt3name,
                        correct: "false"
                    };
                }
        
                tempoptionssgslimg.push(tempopsval);
        
            }
        
            if ($scope.questiondata.sgslimg.opt4 != undefined) {
                if ($scope.questiondata.sgslimgcorrectoption == "opt4") {
                    tempopsval = {
                        url: $scope.questiondata.sgslimg.opt4name,
                        correct: "true"
                    };
                } else {
        
                    tempopsval = {
                        url: $scope.questiondata.sgslimg.opt4name,
                        correct: "false"
                    };
                }
        
                tempoptionssgslimg.push(tempopsval);
        
            }
        
            if ($scope.questiondata.sgslimg.opt5 != undefined) {
                if ($scope.questiondata.sgslimgcorrectoption == "opt5") {
                    tempopsval = {
                        url: $scope.questiondata.sgslimg.opt5name,
                        correct: "true"
                    };
                } else {
        
                    tempopsval = {
                        url: $scope.questiondata.sgslimg.opt5name,
                        correct: "false"
                    };
                }
        
                tempoptionssgslimg.push(tempopsval);
        
            }
        
            if ($scope.questiondata.sgslimg.opt6 != undefined) {
                if ($scope.questiondata.sgslimgcorrectoption == "opt6") {
                    tempopsval = {
                        url: $scope.questiondata.sgslimg.opt6name,
                        correct: "true"
                    };
                } else {
        
                    tempopsval = {
                        url: $scope.questiondata.sgslimg.opt6name,
                        correct: "false"
                    };
                }
        
                tempoptionssgslimg.push(tempopsval);
        
            }
            
      
            $scope.question.iopts = tempoptionssgslimg;

      
        
        }

        if ($scope.questiondata.quiztype == 3) {

            $scope.mslerror1 = false;
            $scope.mslerror2 = false;
            $scope.mslerror3 = false;
            $scope.mslerror4 = false;
            $scope.mslerror5 = false;
            $scope.mslerror6 = false;
            $scope.mslerror7 = false;
            $scope.mslerror8 = false;
            $scope.mslerror9 = false;
        
            console.log($scope.questiondata.msl.opt1)
            console.log($scope.questiondata.msl.opt2)
            console.log($scope.questiondata.msl.opt3)
            console.log($scope.questiondata.msl.opt4)
            console.log($scope.questiondata.msl.opt5)
            console.log($scope.questiondata.msl.opt6)
   
            if ($scope.questiondata.msl.opt1 == "" || $scope.questiondata.msl.opt1 == undefined || $scope.questiondata.msl.opt1.replace(/\s/g, '').length === 0 ||
                $scope.questiondata.msl.opt2 == "" || $scope.questiondata.msl.opt2 == undefined || $scope.questiondata.msl.opt2.replace(/\s/g, '').length === 0 ||
                $scope.questiondata.msl.opt3 == "" || $scope.questiondata.msl.opt3 == undefined || $scope.questiondata.msl.opt3.replace(/\s/g, '').length === 0) {
                $scope.mslerror2 = true;
                return;
            }
            
            for (let i = 1; i <= 6; i++) {

                if ($scope.questiondata[`mslcorrectoption${i}`] == `opt${i}`) {
                    var yy = $scope.questiondata[`mslcorrectoption${i}`];
                    if ($scope.questiondata.msl[yy] == undefined || $scope.questiondata.msl[yy].replace(/\s/g, '').length === 0) {
                        $scope.mslerror4 = true;
                        return;
                    }
                }
            }
            let ck = 0;
            for (let i = 1; i <= 6; i++) {
                if ($scope.questiondata[`mslcorrectoption${i}`] == undefined) {
                    ck += 1;
                    if (ck == 6) {
                        $scope.mslerror3 = true;
                        return;
                    }
                }
            }
            if (ck == 5) {
                $scope.mslerror1 = true;
                return;
            }
            if ($scope.questiondata.msl.opt3 != "" && $scope.questiondata.msl.opt3 != undefined) {
                if ($scope.questiondata.msl.opt3.replace(/\s/g, '').length === 0) {
                    $scope.mslerror5 = true;
                    return;
                }
                if ($scope.questiondata.msl.opt3 == $scope.questiondata.msl.opt4 || $scope.questiondata.msl.opt3 == $scope.questiondata.msl.opt5 || $scope.questiondata.msl.opt3 == $scope.questiondata.msl.opt6) {
                    $scope.mslerror8 = true;
                    return;
                }
            }
        
            if ($scope.questiondata.msl.opt4 != "" && $scope.questiondata.msl.opt4 != undefined) {
                if ($scope.questiondata.msl.opt4.replace(/\s/g, '').length === 0) {
                    $scope.mslerror5 = true;
                    return;
                }
                if ($scope.questiondata.msl.opt3 == undefined || $scope.questiondata.msl.opt3.replace(/\s/g, '').length === 0) {
                    $scope.mslerror6 = true;
                    return;
                }
                if ($scope.questiondata.msl.opt4 == $scope.questiondata.msl.opt5 || $scope.questiondata.msl.opt4 == $scope.questiondata.msl.opt6) {
                    $scope.mslerror8 = true;
                    return;
                }
            }
        
            if ($scope.questiondata.msl.opt5 != "" && $scope.questiondata.msl.opt5 != undefined) {
                if ($scope.questiondata.msl.opt5.replace(/\s/g, '').length === 0) {
                    $scope.mslerror5 = true;
                    return;
                }
                if ($scope.questiondata.msl.opt3 == undefined || $scope.questiondata.msl.opt3.replace(/\s/g, '').length === 0 ||
                    $scope.questiondata.msl.opt4 == undefined || $scope.questiondata.msl.opt4.replace(/\s/g, '').length === 0) {
                    $scope.mslerror6 = true;
                    return;
                }
                if ($scope.questiondata.msl.opt5 == $scope.questiondata.msl.opt6) {
                    $scope.mslerror8 = true;
                    return;
                }
        
            }
        
            if ($scope.questiondata.msl.opt6 != "" && $scope.questiondata.msl.opt6 != undefined) {
                if ($scope.questiondata.msl.opt6.replace(/\s/g, '').length === 0) {
                    $scope.mslerror5 = true;
                    return;
                }
                if ($scope.questiondata.msl.opt3 == undefined || $scope.questiondata.msl.opt3.replace(/\s/g, '').length === 0 ||
                    $scope.questiondata.msl.opt4 == undefined || $scope.questiondata.msl.opt4.replace(/\s/g, '').length === 0 ||
                    $scope.questiondata.msl.opt5 == undefined || $scope.questiondata.msl.opt5.replace(/\s/g, '').length === 0) {
                    $scope.mslerror6 = true;
                    return;
                }
            }
            if ($scope.questiondata.msl.opt1 == $scope.questiondata.msl.opt2 || $scope.questiondata.msl.opt1 == $scope.questiondata.msl.opt3 || $scope.questiondata.msl.opt1 == $scope.questiondata.msl.opt4
                || $scope.questiondata.msl.opt1 == $scope.questiondata.msl.opt5 || $scope.questiondata.msl.opt1 == $scope.questiondata.msl.opt6) {
                $scope.mslerror8 = true;
                return;
            }
        
            if ($scope.questiondata.msl.opt2 == $scope.questiondata.msl.opt3 || $scope.questiondata.msl.opt2 == $scope.questiondata.msl.opt4 || $scope.questiondata.msl.opt2 == $scope.questiondata.msl.opt5
                || $scope.questiondata.msl.opt2 == $scope.questiondata.msl.opt6) {
                $scope.mslerror8 = true;
                return;
            }
        
        
        
        
            let tempoptionsmsl = [];
            let tempopsval = {};
            if ($scope.questiondata.msl.opt1 != undefined) {
                if ($scope.questiondata.mslcorrectoption1 == "opt1") {
                    tempopsval = {
                        content: $scope.questiondata.msl.opt1,
                        correct: "true"
                    };
                } else {

                    tempopsval = {
                        content: $scope.questiondata.msl.opt1,
                        correct: "false"
                    };
                }

                tempoptionsmsl.push(tempopsval);

            }

            if ($scope.questiondata.msl.opt2 != undefined) {
                if ($scope.questiondata.mslcorrectoption2 == "opt2") {
                    tempopsval = {
                        content: $scope.questiondata.msl.opt2,
                        correct: "true"
                    };
                } else {

                    tempopsval = {
                        content: $scope.questiondata.msl.opt2,
                        correct: "false"
                    };
                }

                tempoptionsmsl.push(tempopsval);

            }

            if ($scope.questiondata.msl.opt3 != undefined) {
                if ($scope.questiondata.mslcorrectoption3 == "opt3") {
                    tempopsval = {
                        content: $scope.questiondata.msl.opt3,
                        correct: "true"
                    };
                } else {

                    tempopsval = {
                        content: $scope.questiondata.msl.opt3,
                        correct: "false"
                    };
                }

                tempoptionsmsl.push(tempopsval);

            }

            if ($scope.questiondata.msl.opt4 != undefined) {
                if ($scope.questiondata.mslcorrectoption4 == "opt4") {
                    tempopsval = {
                        content: $scope.questiondata.msl.opt4,
                        correct: "true"
                    };
                } else {

                    tempopsval = {
                        content: $scope.questiondata.msl.opt4,
                        correct: "false"
                    };
                }

                tempoptionsmsl.push(tempopsval);

            }

            if ($scope.questiondata.msl.opt5 != undefined) {
                if ($scope.questiondata.mslcorrectoption5 == "opt5") {
                    tempopsval = {
                        content: $scope.questiondata.msl.opt5,
                        correct: "true"
                    };
                } else {

                    tempopsval = {
                        content: $scope.questiondata.msl.opt5,
                        correct: "false"
                    };
                }

                tempoptionsmsl.push(tempopsval);

            }

            if ($scope.questiondata.msl.opt6 != undefined) {
                if ($scope.questiondata.mslcorrectoption6 == "opt6") {
                    tempopsval = {
                        content: $scope.questiondata.msl.opt6,
                        correct: "true"
                    };
                } else {

                    tempopsval = {
                        content: $scope.questiondata.msl.opt6,
                        correct: "false"
                    };
                }

                tempoptionsmsl.push(tempopsval);

            }

         
            $scope.question.iopts = tempoptionsmsl;

        
        }

        if ($scope.questiondata.quiztype == 5) {

        
            $scope.mslimgerror1 = false;
            $scope.mslimgerror2 = false;
            $scope.mslimgerror3 = false;
            $scope.mslimgerror4 = false;
       
            $scope.mslimgerror6 = false;
      
            console.log($scope.questiondata.mslimg.opt1)
      
        
            if ($scope.questiondata.mslimg.opt1 == "" || $scope.questiondata.mslimg.opt1 == undefined ||
                $scope.questiondata.mslimg.opt2 == "" || $scope.questiondata.mslimg.opt2 == undefined ||
                $scope.questiondata.mslimg.opt3 == "" || $scope.questiondata.mslimg.opt3 == undefined) {
                $scope.mslimgerror2 = true;
                return;
            }
        
            for (let i = 1; i <= 6; i++) {
        
             
                if ($scope.questiondata[`mslimgcorrectoption${i}`] == `opt${i}`) {
                    var yy = $scope.questiondata[`mslimgcorrectoption${i}`];
                    if ($scope.questiondata.mslimg[yy] == undefined) {
                        $scope.mslimgerror4 = true;
                        return;
                    }
                }
            }
            let ck = 0;
            for (let i = 1; i <= 6; i++) {
                if ($scope.questiondata[`mslimgcorrectoption${i}`] == undefined) {
                    ck += 1;
                    if (ck == 6) {
                        $scope.mslimgerror3 = true;
                        return;
                    }
                }
            }
            if (ck == 5) {
                $scope.mslimgerror1 = true;
                return;
            }
        
     
        
            if ($scope.questiondata.mslimg.opt4 != "" && $scope.questiondata.mslimg.opt4 != undefined) {
           
                if ($scope.questiondata.mslimg.opt3 == undefined) {
                    $scope.mslimgerror6 = true;
                    return;
                }
          
            }
        
            if ($scope.questiondata.mslimg.opt5 != "" && $scope.questiondata.mslimg.opt5 != undefined) {
         
                if ($scope.questiondata.mslimg.opt3 == undefined ||
                    $scope.questiondata.mslimg.opt4 == undefined) {
                    $scope.mslimgerror6 = true;
                    return;
                }
           
        
            }
        
            if ($scope.questiondata.mslimg.opt6 != "" && $scope.questiondata.mslimg.opt6 != undefined) {
          
                if ($scope.questiondata.mslimg.opt3 == undefined ||
                    $scope.questiondata.mslimg.opt4 == undefined ||
                    $scope.questiondata.mslimg.opt5 == undefined) {
                    $scope.mslimgerror6 = true;
                    return;
                }
            }
  
        
            let tempoptionsmslimg = [];
            let tempopsval = {};
            if ($scope.questiondata.mslimg.opt1 != undefined) {
                if ($scope.questiondata.mslimgcorrectoption1 == "opt1") {
                    tempopsval = {
                        url: $scope.questiondata.mslimg.opt1name,
                        correct: "true"
                    };
                } else {
        
                    tempopsval = {
                        url: $scope.questiondata.mslimg.opt1name,
                        correct: "false"
                    };
                }
        
                tempoptionsmslimg.push(tempopsval);
        
            }
        
            if ($scope.questiondata.mslimg.opt2 != undefined) {
                if ($scope.questiondata.mslimgcorrectoption2 == "opt2") {
                    tempopsval = {
                        url: $scope.questiondata.mslimg.opt2name,
                        correct: "true"
                    };
                } else {
        
                    tempopsval = {
                        url: $scope.questiondata.mslimg.opt2name,
                        correct: "false"
                    };
                }
        
                tempoptionsmslimg.push(tempopsval);
        
            }
        
            if ($scope.questiondata.mslimg.opt3 != undefined) {
                if ($scope.questiondata.mslimgcorrectoption3 == "opt3") {
                    tempopsval = {
                        url: $scope.questiondata.mslimg.opt3name,
                        correct: "true"
                    };
                } else {
        
                    tempopsval = {
                        url: $scope.questiondata.mslimg.opt3name,
                        correct: "false"
                    };
                }
        
                tempoptionsmslimg.push(tempopsval);
        
            }
        
            if ($scope.questiondata.mslimg.opt4 != undefined) {
                if ($scope.questiondata.mslimgcorrectoption4 == "opt4") {
                    tempopsval = {
                        url: $scope.questiondata.mslimg.opt4name,
                        correct: "true"
                    };
                } else {
        
                    tempopsval = {
                        url: $scope.questiondata.mslimg.opt4name,
                        correct: "false"
                    };
                }
        
                tempoptionsmslimg.push(tempopsval);
        
            }
        
            if ($scope.questiondata.mslimg.opt5 != undefined) {
                if ($scope.questiondata.mslimgcorrectoption5 == "opt5") {
                    tempopsval = {
                        url: $scope.questiondata.mslimg.opt5name,
                        correct: "true"
                    };
                } else {
        
                    tempopsval = {
                        url: $scope.questiondata.mslimg.opt5name,
                        correct: "false"
                    };
                }
        
                tempoptionsmslimg.push(tempopsval);
        
            }
        
            if ($scope.questiondata.mslimg.opt6 != undefined) {
                if ($scope.questiondata.mslimgcorrectoption6 == "opt6") {
                    tempopsval = {
                        url: $scope.questiondata.mslimg.opt6name,
                        correct: "true"
                    };
                } else {
        
                    tempopsval = {
                        url: $scope.questiondata.mslimg.opt6name,
                        correct: "false"
                    };
                }
        
                tempoptionsmslimg.push(tempopsval);
        
            }
            
           
            $scope.question.iopts = tempoptionsmslimg;

        
        }
        
        // if ($scope.questiondata.quiztype == 1) {
       
        //     if ($scope.questiondata.trueorfalse == undefined || $scope.questiondata.trueorfalse == "" || $scope.questiondata.trueorfalse == null) {
        //         $scope.error4 = true;
        //         return;
        //     }
        //     let temp = [];
        //     let tempopsval = {};
        //     if ($scope.questiondata.trueorfalse == 'true') {
        //         tempopsval = {
        //             content: 'True',
        //             correct: "true"
        //         };
        //     } else {
        //         tempopsval = {
        //             content: 'True',
        //             correct: "false"
        //         };
        //     }
        //     temp.push(tempopsval);
        //     if ($scope.questiondata.trueorfalse == 'false') {
        //         tempopsval = {
        //             content: 'False',
        //             correct: "true"
        //         };
        //     } else {
        //         tempopsval = {
        //             content: 'False',
        //             correct: "false"
        //         };
        //     }
        //     temp.push(tempopsval);
        //     $scope.question.iopts = temp;

        // }
        

        if ($scope.questiondata.quiztype == 6) {
            for (let i = 0; i < $scope.questiondata.matchthefols.length; i++) {
          
                if ($scope.questiondata.matchthefols[i].value1 == "" || $scope.questiondata.matchthefols[i].value2 == "") {
                    $scope.error5 = true;
                    return;
                }
            }
          
                let str1 = "";
                let ind = 0;
                
                for(var i=0; i<$scope.questiondata.matchthefols.length; i++) {
             
                  if ($scope.questiondata.matchthefols[i].value != "") {
                
                      ind += 1;
                      str1 += "<tr><td>"+ind+"."+$scope.questiondata.matchthefols[i].value1+"</td><td>"+ind+"."+$scope.questiondata.matchthefols[i].value2+"</td></tr>"
                   
                  } 
            }
            let str2 = "<table class='qtable'><tr><th>A</th><th>B</th></tr>"+str1+"</table>";
      
            $scope.question.istem = str2;
         
        
        }

        $scope.iid += 1;
        $scope.question.iid = $scope.iid;
        if ($scope.questiondata.quiztype != 6) {
            $scope.question.istem = $scope.questiondata.question;
        }
        if ($scope.questiondata.imgsi != undefined) {
            $scope.question.img = $scope.questiondata.imgsiname;
            
        }

        $scope.question.qtype = $scope.questiondata.quiztype;
        $scope.question.qscore = $scope.questiondata.marks;
      
        $scope.questions.push($scope.question)
        
        if (save == 1) {
            $scope.loading = true;
          
            var typejson = { "type": "savedata" };
            $scope.commoncognito(typejson);
        } else {
            $scope.questiondata = {};
            $scope.questiondata.iopts = {};
            $scope.questiondata.sgslimg = {};
            $scope.questiondata.msl = {};
            $scope.questiondata.mslimg = {};
            $scope.questiondata.matchthefols = [{ value1: "", value2: "" }, { value1: "", value2: "" }, { value1: "", value2: "" }, { value1: "", value2: "" }];
        
        }

        $scope.question = {};
    }
    
    $scope.quizimageupload = function (img,imgfrom) {

        $scope.quizimage = img;
        $scope.quizimagefrom = imgfrom;
        var typejson = { "type": "quizimageupload" };
        $scope.commoncognito(typejson);

    };

    $scope.imageupload = function(token)
    {
       
        var uniqid = new Date().getTime();
        var imtype = $scope.quizimage.name.slice((Math.max(0, $scope.quizimage.name.lastIndexOf(".")) || Infinity) + 1);
        var filename = "img"+uniqid+"."+ imtype;

        if ($scope.quizimagefrom == 'questiondata.imgsi') {
            $scope.questiondata.imgsiname = filename;
        }

        if ($scope.quizimagefrom == 'questiondata.sgslimg.opt1') {
            $scope.questiondata.sgslimg.opt1name = filename;
        }
        if ($scope.quizimagefrom == 'questiondata.sgslimg.opt2') {
            $scope.questiondata.sgslimg.opt2name = filename;
        }
        if ($scope.quizimagefrom == 'questiondata.sgslimg.opt3') {
            $scope.questiondata.sgslimg.opt3name = filename;
        }
        if ($scope.quizimagefrom == 'questiondata.sgslimg.opt4') {
            $scope.questiondata.sgslimg.opt4name = filename;
        }
        if ($scope.quizimagefrom == 'questiondata.sgslimg.opt5') {
            $scope.questiondata.sgslimg.opt5name = filename;
        }
        if ($scope.quizimagefrom == 'questiondata.sgslimg.opt6') {
            $scope.questiondata.sgslimg.opt6name = filename;
        }
        
        if ($scope.quizimagefrom == 'questiondata.mslimg.opt1') {
            $scope.questiondata.mslimg.opt1name = filename;
        }
        if ($scope.quizimagefrom == 'questiondata.mslimg.opt2') {
            $scope.questiondata.mslimg.opt2name = filename;
        }
        if ($scope.quizimagefrom == 'questiondata.mslimg.opt3') {
            $scope.questiondata.mslimg.opt3name = filename;
        }
        if ($scope.quizimagefrom == 'questiondata.mslimg.opt4') {
            $scope.questiondata.mslimg.opt4name = filename;
        }
        if ($scope.quizimagefrom == 'questiondata.mslimg.opt5') {
            $scope.questiondata.mslimg.opt5name = filename;
        }
        if ($scope.quizimagefrom == 'questiondata.mslimg.opt6') {
            $scope.questiondata.mslimg.opt6name = filename;
        }


        var apigClient = apigClientFactory.newClient({
            invokeUrl: $scope.decry.api,
        });
        var params = {};
      
        var body = {
                filetype: $scope.quizimage.type,
                filename: filename,
                oid: $scope.decry.oid,
                type: 'assessmentsimage',
                crid: $scope.decry.topicid,
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
               
            });
        
    }
    $scope.uploadimage = function(file,url) {

        $http.put(url, file, {headers:{'Content-Type': file.type}})
        .success(function(resp) {
         
        })
        .error(function(resp) {
            $scope.loading = false;
          alert("An Error Occurred Attaching Your File. Please try again or Contact production Support if problem persist");
        });

    }
    $scope.savedata1 = function (token) {$uibModalInstance.dismiss('cancel');
    $window.location.href = '#batchtopic'; }
    $scope.savedata = function(token)
    {
        $uibModalInstance.close($scope.questions);
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
            $window.location.href = '#org';
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
                      $window.location.href = '#org';
                  }else{
                      
                      var token = session.idToken.jwtToken;
                      if(typejson.type == 'savedata')
                      {
                          $scope.savedata(token);
                      }else if(typejson.type == 'quizimageupload')
                      {
                        $scope.imageupload(token); 
                    
                      }
 
                  }
              });
          })
    }


    
    };
    
    app.controller('addassessmentCtrl', addassessmentCtrl);
    addassessmentCtrl.$inject = ['$rootScope','$scope', '$uibModalInstance', '$http', '$location', '$window','$cookies','$sce','$crypto','config'];