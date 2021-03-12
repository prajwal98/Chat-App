
var eventviewCtrl = function ($scope, $http, $location, $window,$uibModalInstance,NgTableParams,config,$crypto, Upload, $sce) {

    $scope.close = function(){
        //
        $scope.loading = true;
        if( $scope.allOrg === undefined) {

          $scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
          $scope.decry.status = "Events";
          localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
          $window.location.href="#viewtenant";
        } else {
          $window.location.href="#viewevents";
        }

  };

    $scope.home = function(){

        $scope.tableParams = new NgTableParams({
            page: 1,            // show first page
            count: 10         // count per page
        }, {
          dataset:   $scope.SelectedEvent
        });

    }
  $scope.deleteEvent = function(row){
		$scope.loading = true;
		var decrypted =$crypto.decrypt(localStorage.getItem("786a2y1e"), config.key);               
        $scope.decry=JSON.parse(decrypted);
        var apigClient = apigClientFactory.newClient({ });
	   var params1 = {};
	
	var additionalParams = {};    
	var body={
        eid: row.eid,
    }
    
    if( $scope.allOrg === undefined) {
      body.oid = config.oid;
    } else {
      body.allOrg = true;
    }
    if(row.link === undefined && row.zoomID == undefined){
      body.action = "events"
      }
      else if (row.link === undefined && row.zoomID != undefined)
      {
        body.action = "livesessions"
      }
      else {
      body.action = "webinar"
        }
  if(row.gid !== '1'){
		body.gid = row.gid
    }
    body.tenant = $scope.decry.tenant;

    var topics1 = apigClient.deleteEventPost(params1,body,additionalParams)
               .then(function(result){
                $scope.loading = false;
                   var response = JSON.stringify(result.data);
                  var windex = $scope.SelectedEvent.findIndex(jdata => jdata.eid === row.eid);
                 
                  $scope.SelectedEvent.splice(windex,1);
   
                  $scope.tableParams = new NgTableParams({
                    page: 1,            // show first page
                    count: 10         // count per page
                }, {
                  dataset:   $scope.SelectedEvent
                });
                  $scope.$apply();
     
                   }).catch( function(result){  
                      alert(JSON.stringify(result)) 
                   });
	}
    $scope.home();
};

app.controller('eventviewCtrl', eventviewCtrl);
eventviewCtrl.$inject = ['$scope', '$http', '$location', '$window','$uibModalInstance','NgTableParams','config','$crypto', 'Upload', '$sce'];