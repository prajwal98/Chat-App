window.API = (function () {
    var data = {
        "cmi.core.student_id": "000100",
        "cmi.core.student_name": "Student, Joe",
        "cmi.core.lesson_location": "",
        "cmi.core.lesson_status": "not attempted",
        "cmi.suspend_data": ""
    };
    return {
        LMSInitialize: function () {
           // alert('init000000000000');
            return "true";
        },
        LMSCommit: function () {
            //alert('commit');
            return "true";
        },
        LMSFinish: function () {
            console.log('1LMSFinish')
            
            return "true";
        },
        LMSGetValue: function (model) {
            console.log('getvalue' );
            
            //console.log(angular.element(document.getElementById('divID1')))
            // if (angular.element(document.getElementById('divID1')).scope() !== undefined) {
            //     angular.element(document.getElementById('divID1')).scope().scornfun(getvalue);
            //   }
            
            return data[model] || "";
        },
        LMSSetValue: function (model, value) {
            console.log('setvalue');
           // angular.element(document.body).scope().scornfun()
               // console.log(angular.element(document.body).scope().scornfun());
               var $body = angular.element(document.body);
               var $rootScope = $body.scope().$root;
               $rootScope.$apply(function () {
                   $rootScope.scornfun(value);
               });
                
                //console.log("1==="+angular.element($("div[ng-controller=viewobjectCtrl]")).scope())
                //console.log(angular.element(document.getElementById('mainController')).scope())
            //window.lmsmessage = value;
            data[model] = value;
            return "true";
        },
        LMSGetLastError: function () {
            console.log('getlasterror');
            return "0";
        },
        LMSGetErrorString: function (errorCode) {
            console.log('getlasterrorstring');
            return "No error";
        },
        LMSGetDiagnostic: function (errorCode) {
            console.log('getdiagnostic');
            return "No error";
        }
    };
})();