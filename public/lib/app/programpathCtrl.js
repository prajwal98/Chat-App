 "use strict";
var programpathCtrl = function ($scope, $http,$location, $window, $cookies, config,$crypto) {
    localStorage.getItem("786a2y1e") !=null ?   $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key)) : $window.location.href = '#login';
    $scope.decry["activemenu"]  = 'prgpath' ;
    localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
   // localStorage.setItem("activemenu", 'prgpath');
    window.navigating = false;
}
app.controller('programpathCtrl', programpathCtrl);
programpathCtrl.$inject = ['$scope', '$http','$location', '$window','$cookies','config','$crypto'];