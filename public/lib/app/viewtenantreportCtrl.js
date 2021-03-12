var viewtenantreportCtrl = function ($scope, $http, $location, $window,NgTableParams,config,$crypto, $sce,ulists) {

  
    $scope.home = function(){
		if(localStorage.getItem("786a2y1e") != null) {
			$scope.decry = JSON.parse($crypto.decrypt(localStorage.getItem("786a2y1e"), config.key));
		} else {
			localStorage.clear();
			$window.location.href = '#login';
		}
		$scope.maxDate = new Date();
	
		if($scope.decry.caction == '0'){
			$scope.ulists = JSON.parse(ulists);
			
			$scope.ulists = $scope.ulists.viewuser;
		
			$scope.uviews =  $scope.decry.userrow.TSCB == undefined ? [] : $scope.decry.userrow.TSCB;
			$scope.uviews = $scope.uviews.sort(function(x, y){
				return x.DAY - y.DAY;
			});
			$scope.unique = [];
			$scope.tviews = [];
			$scope.bviews = [];
			
			if($scope.uviews.length > 0){
				var lday = $scope.uviews[$scope.uviews.length - 1].day;
				var ddateb = moment.utc(lday).toDate().getTime();
				var ddatea = moment.utc(lday).subtract(15,'d').toDate().getTime();
			    $scope.coursedefault(ddatea,ddateb);
			// 	if($scope.uviews.length > 6){
			// 		var a = $scope.uviews.length;
			// 		 	var b = a - 6;
			// 		$scope.uviews = $scope.uviews.slice(b, a);
			// for(var i=0; i< $scope.uviews.length; i++){
				
			// 	$scope.unique.push({"x":$scope.uviews[i].DAY,"y":$scope.uviews[i].SUB == undefined ? 0 : $scope.uviews[i].SUB});
			// 	$scope.tviews.push({"x":$scope.uviews[i].DAY,"y":$scope.uviews[i].CON == undefined ? 0 : $scope.uviews[i].CON});
			// 	$scope.bviews.push({"x":$scope.uviews[i].DAY,"y":$scope.uviews[i].BOUNCE == undefined ? 0 : $scope.uviews[i].BOUNCE});
				
			// }
			// } else {
			// 	var lday = $scope.uviews[$scope.uviews.length - 1].day;
			// 		var sdate = moment.utc(lday).subtract(15,'d').toDate().getTime();
			// 		for(var i=0; i< $scope.uviews.length; i++){
						
			// 	$scope.unique.push({"x":$scope.uviews[i].DAY,"y":$scope.uviews[i].SUB == undefined ? 0 : $scope.uviews[i].SUB});
			// 	$scope.tviews.push({"x":$scope.uviews[i].DAY,"y":$scope.uviews[i].CON == undefined ? 0 : $scope.uviews[i].CON});
			// 	$scope.bviews.push({"x":$scope.uviews[i].DAY,"y":$scope.uviews[i].BOUNCE == undefined ? 0 : $scope.uviews[i].BOUNCE});
				
			// 		}
			// 		$scope.unique.unshift({"x":sdate,"y":0});
			// 		$scope.tviews.unshift({"x":sdate,"y":0});
			// 		$scope.bviews.unshift({"x":sdate,"y":0});
					
			// }
			// $scope.unique = $scope.unique.sort(function(x, y){
			// 	return x.x - y.x;
			// });
			// $scope.tviews = $scope.tviews.sort(function(x, y){
			// 	return x.x - y.x;
			// });
			// $scope.bviews = $scope.bviews.sort(function(x, y){
			// 	return x.x - y.x;
			// });
			} else {
				var dat = new Date().getTime();
				var dat1 = new Date();
				dat1.setDate(dat1.getDate() - 1);
				dat1 = dat1.getTime();
				
				$scope.unique.push({"x":dat,"y":0});
				$scope.tviews.push({"x":dat,"y":0});
				$scope.bviews.push({"x":dat,"y":0});
				$scope.unique.push({"x":dat1,"y":0});
				$scope.tviews.push({"x":dat1,"y":0});
				$scope.bviews.push({"x":dat1,"y":0});
			}
			
			$scope.moptions1 = {
                chart: {
                    type: 'lineChart',
					height: 320,
					margin : {
			            top: 50,
			            right: 30,
			            bottom: 50,
			            left: 70
					},
					legendPosition: 'bottom',
                    x: function(d){ return d.x; },
                    y: function(d){ return d.y; },
                    useInteractiveGuideline: true,
                    dispatch: {
                        stateChange: function(e){ console.log("stateChange"); },
                        changeState: function(e){ console.log("changeState"); },
                        tooltipShow: function(e){ console.log("tooltipShow"); },
                        tooltipHide: function(e){ console.log("tooltipHide"); }
                    },
                    xAxis: {
						tickFormat: function (d) {   
		                    return d3.time.format('%d-%b')(new Date(d));

		                },
		                rotateLabels: 30,
			        	staggerLabels: true,
                    },
                    yAxis: {
                        axisLabel: 'No. of users',
                        tickFormat: function(d){
							if ( (d * 10) % 10 === 0 ) {
								return d3.format('.0f')(d);
							  }
							  else {
								return '';
							  }
                        },
                        axisLabelDistance: -10
                    },
                    callback: function(chart){
                        console.log("!!! lineChart callback !!!");
                    }
                },
            };
            $scope.data12 = [
              {
                  values: $scope.unique,      
                  key: 'Users Started',
                  color: '#13599a', 
              },
              {
                  values:$scope.tviews,
                  key: 'Users Completed',
                  color: '#f5a138'
			  },
			  {
				values: $scope.bviews,
				key: 'Bounce Views',
				color: '#FF0000'
			}];
			$scope.scount = 0;
			$scope.comcount = 0;
			if($scope.ulists.length > 0){
			for(var i=0;i<$scope.ulists.length;i++){
				if($scope.ulists[i].TOPICS != undefined && $scope.ulists[i].TOPICS.length >0){
					for(var j=0;j<$scope.ulists[i].TOPICS.length;j++){
						
						if($scope.ulists[i].TOPICS[j].TID == $scope.decry.ctid){
							$scope.ulists[i].sdate = $scope.ulists[i].TOPICS[j].SON.split('.');
							var sdate = new Date($scope.ulists[i].sdate[2]+"/"+$scope.ulists[i].sdate[1]+"/"+$scope.ulists[i].sdate[0]);
							$scope.ulists[i].sdate = sdate;
							$scope.scount = $scope.scount + 1;
							
							if( $scope.ulists[i].TOPICS[j].CON != ' '){
								
							$scope.ulists[i].cdate =  $scope.ulists[i].TOPICS[j].CON.split('.');
							var cdate = new Date($scope.ulists[i].cdate[2]+"/"+$scope.ulists[i].cdate[1]+"/"+$scope.ulists[i].cdate[0]);
							$scope.ulists[i].cdate = cdate;
							$scope.comcount = $scope.comcount + 1;
							} else {
								$scope.ulists[i].cdate = ' ';
							}
						}
						
					}	
				}
			}
			}
			$scope.ulists.sort(function(a, b) {
				var c = new Date(a.sdate);
				var d = new Date(b.sdate);
				return d-c;
			});
			
        $scope.tableParams = new NgTableParams({
            page: 1,            // show first page
            count: 10         // count per page
        }, {
          dataset:   $scope.ulists
        });
		} else {

			$scope.ulists = JSON.parse(ulists);
			$scope.ulists = $scope.ulists.viewuser;
			$scope.uviews = $scope.decry.userrow.uviews == undefined ? [] : $scope.decry.userrow.uviews;
			$scope.uviews = $scope.uviews.sort(function(x, y){
				return x.day - y.day;
			});
			$scope.unique = [];
			$scope.tviews = [];
			$scope.bviews = [];
			$scope.sviews = [];
			if($scope.uviews.length > 0){
				var ddateb = moment.utc(lday).toDate().getTime();
				var ddatea = moment.utc(lday).subtract(15,'d').toDate().getTime();
			    $scope.handlerdefault(ddatea,ddateb);
				// if($scope.uviews.length > 6){
				// 	var a = $scope.uviews.length;
				// 	 	var b = a - 6;
				// 	$scope.uviews = $scope.uviews.slice(b, a);
				// 	for(var i=0; i< $scope.uviews.length; i++){
				// 		$scope.unique.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].unique});
				// 		$scope.tviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].view});
				// 		$scope.bviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].bounce});
				// 		$scope.sviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].shared == undefined ? 0 : $scope.uviews[i].shared})
				// 	}
				// 	$scope.dateb = moment.utc(lday).toDate().getTime();
 				// 	$scope.datea = moment.utc(lday).subtract(7,'d').toDate().getTime();
				// 	$scope.handlerdefault($scope.dateb);
				// } else {
				// 	var lday = $scope.uviews[$scope.uviews.length - 1].day;
				// 	var sdate = moment.utc(lday).subtract(7,'d').toDate().getTime();
				// 	for(var i=0; i< $scope.uviews.length; i++){
				// 		$scope.unique.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].unique});
				// 		$scope.tviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].view});
				// 		$scope.bviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].bounce});
				// 		$scope.sviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].shared == undefined ? 0 : $scope.uviews[i].shared})
				// 	}
				// 	$scope.unique.unshift({"x":sdate,"y":0});
				// 	$scope.tviews.unshift({"x":sdate,"y":0});
				// 	$scope.bviews.unshift({"x":sdate,"y":0});
				// 	$scope.sviews.unshift({"x":sdate,"y":0});
				// } 
				// $scope.unique = $scope.unique.sort(function(x, y){
				// 	return x.x - y.x;
				// });
				// $scope.tviews = $scope.tviews.sort(function(x, y){
				// 	return x.x - y.x;
				// });
				// $scope.bviews = $scope.bviews.sort(function(x, y){
				// 	return x.x - y.x;
				// });
				// $scope.sviews = $scope.sviews.sort(function(x, y){
				// 	return x.x - y.x;
				// });
				
			} else {
				var dat = new Date().getTime();
				var dat1 = new Date();
				dat1.setDate(dat1.getDate() - 1);
				dat1 = dat1.getTime();
			
				$scope.unique.push({"x":dat,"y":0});
				$scope.tviews.push({"x":dat,"y":0});
				$scope.bviews.push({"x":dat,"y":0});
				$scope.sviews.push({"x":dat,"y":0});
				$scope.unique.push({"x":dat1,"y":0});
				$scope.tviews.push({"x":dat1,"y":0});
				$scope.bviews.push({"x":dat1,"y":0});
				$scope.sviews.push({"x":dat1,"y":0});
			}
			$scope.moptions1 = {
                chart: {
                    type: 'lineChart',
					height: 320,
					margin : {
			            top: 50,
			            right: 30,
			            bottom: 50,
			            left: 70
					},
					legendPosition: 'bottom',
                    x: function(d){ return d.x; },
                    y: function(d){ return d.y; },
                    useInteractiveGuideline: true,
                    dispatch: {
                        stateChange: function(e){ console.log("stateChange"); },
                        changeState: function(e){ console.log("changeState"); },
                        tooltipShow: function(e){ console.log("tooltipShow"); },
                        tooltipHide: function(e){ console.log("tooltipHide"); }
                    },
                    xAxis: {
						tickFormat: function (d) {   
		                    return d3.time.format('%d-%b')(new Date(d));

		                },
		                rotateLabels: 30,
						staggerLabels: true
                    },
                    yAxis: {
                        axisLabel: 'No. of users',
                        tickFormat: function(d){
                            if ( (d * 10) % 10 === 0 ) {
								return d3.format('.0f')(d);
							  }
							  else {
								return '';
							  }
                        },
                        axisLabelDistance: -10
					},
                    callback: function(chart){
                        console.log("!!! lineChart callback !!!");
                    }
                },
			};
			
            $scope.data12 = [
              {
                  values: $scope.unique,      
                  key: 'Unique Views',
                  color: '#13599a', 
              },
              {
                  values:$scope.tviews,
                  key: 'Total Views',
                  color: '#f5a138'
			  },
			  {
				values: $scope.bviews,
				key: 'Bounce Views',
				color: '#FF0000'
			},
			{
				values: $scope.sviews,
				key: 'Shared',
				color: '#6E2B69'
			}];
			if($scope.ulists.length > 0){
			for(var i=0;i<$scope.ulists.length;i++){
				if($scope.ulists[i].OBJECTS != undefined && $scope.ulists[i].OBJECTS.length >0){
					for(var j=0;j<$scope.ulists[i].OBJECTS.length;j++){
						if($scope.ulists[i].OBJECTS[j].OBJID == $scope.decry.ctid){
							
							$scope.ulists[i].sdate = $scope.ulists[i].OBJECTS[j].CON.split('-');
							var cdate = new Date($scope.ulists[i].sdate[2]+"/"+$scope.ulists[i].sdate[1]+"/"+$scope.ulists[i].sdate[0]);
							$scope.ulists[i].sdate = cdate;
							$scope.time  = $scope.ulists[i].OBJECTS[j].DUR.toFixed();
							
							var min = ~~(($scope.time % 3600) / 60);
							var sec = $scope.time % 60;
							
							$scope.ulists[i].mins = min;
							$scope.ulists[i].secs = sec;
						}
						
					}	
				}
			}
			}

			$scope.ulists.sort(function(a, b) {
				var c = new Date(a.cdate);
				var d = new Date(b.cdate);
				return d-c;
			});
			$scope.tableParams1 = new NgTableParams({
				page: 1,            // show first page
				count: 10         // count per page
			}, {
			dataset:   $scope.ulists
			});
		}
    }
	$scope.handlerdefault = function(ddatea,ddateb){
		
		if(ddatea !== undefined && ddateb !== undefined){
			var a = new Date(ddatea);
			var b = new Date(ddateb);
			bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
			bd = b.getDate().toString().length > 1 ? b.getDate() : "0"+b.getDate();
			var aday = new Date(a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate());
			var bday = new Date(b.getFullYear() + "-" + bm + "-" + bd);
			
			if(aday > bday) {
				swal({title: "", text: "From Date should be less than To Date", type: "warning",buttonsStyling:false,allowOutsideClick: false,
				allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
			} else {
				if($scope.datea != '' && $scope.dateb != ''){
	
				$scope.unique = [];
				$scope.tviews = [];
				$scope.bviews = [];
				$scope.sviews = [];
				$scope.uviews = $scope.decry.userrow.uviews == undefined ? [] : $scope.decry.userrow.uviews;
				
				if($scope.uviews.length > 0){
					$scope.dviews = [];
				for(var i=0; i< $scope.uviews.length; i++){
					var c = new Date($scope.uviews[i].day);
	
					cm = (c.getMonth() + 1).toString().length > 1 ? (c.getMonth() + 1) : ("0"+(c.getMonth() + 1));
						cd = c.getDate().toString().length > 1 ? c.getDate() : "0"+c.getDate();
						var cday = new Date(c.getFullYear() + "-" + cm + "-" + cd);
	
					if(cday >= aday && cday <= bday) {
						$scope.unique.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].unique});
						$scope.tviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].view});
						$scope.bviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].bounce});
						if($scope.uviews[i].shared != undefined){
						$scope.sviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].shared});
						} 
						if($scope.uviews[i].sharedotv != undefined){
							$scope.sviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].sharedotv});
						} 
						$scope.dviews.push($scope.uviews[i]);
					}
					
				}
				
				}
				
				var Difference_In_Time = bday.getTime() - aday.getTime(); 
				var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
				var sindex = $scope.unique.findIndex(x => x.x === aday.getTime());
				
				if(sindex == -1){
					 sindex = $scope.tviews.findIndex(x => x.x === aday.getTime());
				}
				if(sindex == -1){
					 sindex = $scope.bviews.findIndex(x => x.x === aday.getTime());
				}
				if(sindex == -1){
					 sindex = $scope.sviews.findIndex(x => x.x === aday.getTime());
				}

				if(sindex == -1){
					$scope.unique.push({"x":aday.getTime(),"y":0});
					$scope.tviews.push({"x":aday.getTime(),"y":0});
					$scope.bviews.push({"x":aday.getTime(),"y":0});
					$scope.sviews.push({"x":aday.getTime(),"y":0});	
	
				}
				for(var g=1;g<Difference_In_Days;g++){
					
					var la = aday.setDate(aday.getDate() + 1);
					
					var aindex = $scope.unique.findIndex(x => x.x === la);
					
					if(aindex == -1){
						
						$scope.unique.push({"x":la,"y":0});
						$scope.tviews.push({"x":la,"y":0});
						$scope.bviews.push({"x":la,"y":0});
						$scope.sviews.push({"x":la,"y":0});	
		
					}
				}
				
				
				var bindex = $scope.unique.findIndex(x => x.x === bday.getTime());
				
				if(bindex == -1){
					$scope.unique.push({"x":bday.getTime(),"y":0});
					$scope.tviews.push({"x":bday.getTime(),"y":0});
					$scope.bviews.push({"x":bday.getTime(),"y":0});
					$scope.sviews.push({"x":bday.getTime(),"y":0});	
	
				}
				if($scope.tviews.length == 0 && $scope.unique.length == 0 && $scope.bviews.length == 0 && $scope.sviews.length == 0) {
					var dat = aday.getTime();
					$scope.unique.push({"x":dat,"y":0});
					$scope.tviews.push({"x":dat,"y":0});
					$scope.bviews.push({"x":dat,"y":0});
					$scope.sviews.push({"x":dat,"y":0});
					var dat1 = bday.getTime();
					$scope.unique.push({"x":dat1,"y":0});
					$scope.tviews.push({"x":dat1,"y":0});
					$scope.bviews.push({"x":dat1,"y":0});
					$scope.sviews.push({"x":dat1,"y":0});
				}
				
				$scope.unique = $scope.unique.sort(function(x, y){
					return x.x - y.x;
				});
				$scope.tviews = $scope.tviews.sort(function(x, y){
					return x.x - y.x;
				});
				$scope.bviews = $scope.bviews.sort(function(x, y){
					return x.x - y.x;
				});
				$scope.sviews = $scope.sviews.sort(function(x, y){
					return x.x - y.x;
				});
			
				$scope.data12 = [
					{
						values: $scope.unique,      
						key: 'Unique Views',
						color: '#13599a', 
					},
					{
						values:$scope.tviews,
						key: 'Total Views',
						color: '#f5a138'
					},
					{
					  values: $scope.bviews,
					  key: 'Bounce Views',
					  color: '#FF0000'
				  },	{
					values: $scope.sviews,
					key: 'Shared',
					color: '#6E2B69'
				}];
				
			}
			}	
		}
		}
	$scope.coursedefault = function(ddatea,ddateb){
		
			if(ddatea !== undefined && ddateb !== undefined){
				var a = new Date(ddatea);
				var b = new Date(ddateb);
				bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
				bd = b.getDate().toString().length > 1 ? b.getDate() : "0"+b.getDate();
				var aday = new Date(a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate());
				var bday = new Date(b.getFullYear() + "-" + bm + "-" + bd);
				
				if(aday > bday) {
					swal({title: "", text: "From Date should be less than To Date", type: "warning",buttonsStyling:false,allowOutsideClick: false,
					allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
				} else {
					if(a != '' && b != ''){
		
					$scope.unique = [];
					$scope.tviews = [];
					$scope.bviews = [];
					
					$scope.uviews =  $scope.decry.userrow.TSCB == undefined ? [] : $scope.decry.userrow.TSCB;
					$scope.dviews = [];
					if($scope.uviews.length > 0){
					for(var i=0; i< $scope.uviews.length; i++){
						var c = new Date($scope.uviews[i].DAY);
		
						cm = (c.getMonth() + 1).toString().length > 1 ? (c.getMonth() + 1) : ("0"+(c.getMonth() + 1));
							cd = c.getDate().toString().length > 1 ? c.getDate() : "0"+c.getDate();
							var cday = new Date(c.getFullYear() + "-" + cm + "-" + cd);
		
						if(cday >= aday && cday <= bday) {
								$scope.unique.push({"x":$scope.uviews[i].DAY,"y":$scope.uviews[i].SUB == undefined ? 0 : $scope.uviews[i].SUB});
				$scope.tviews.push({"x":$scope.uviews[i].DAY,"y":$scope.uviews[i].CON == undefined ? 0 : $scope.uviews[i].CON});
				$scope.bviews.push({"x":$scope.uviews[i].DAY,"y":$scope.uviews[i].BOUNCE == undefined ? 0 : $scope.uviews[i].BOUNCE});
				
				$scope.dviews.push($scope.uviews[i]);
						}
						
					}
					
					}
					var Difference_In_Time = bday.getTime() - aday.getTime(); 
					var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
					var sindex = $scope.unique.findIndex(x => x.x === aday.getTime());
					
					if(sindex == -1){
						 sindex = $scope.tviews.findIndex(x => x.x === aday.getTime());
					}
					if(sindex == -1){
						 sindex = $scope.bviews.findIndex(x => x.x === aday.getTime());
					}
					
					if(sindex == -1){
						$scope.unique.push({"x":aday.getTime(),"y":0});
						$scope.tviews.push({"x":aday.getTime(),"y":0});
						$scope.bviews.push({"x":aday.getTime(),"y":0});
						
		
					}
					for(var g=1;g<Difference_In_Days;g++){
						
						var la = aday.setDate(aday.getDate() + 1);
						
						var aindex = $scope.unique.findIndex(x => x.x === la);
						
						if(aindex == -1){
							
							$scope.unique.push({"x":la,"y":0});
							$scope.tviews.push({"x":la,"y":0});
							$scope.bviews.push({"x":la,"y":0});
							
			
						}
					}
					
					
					var bindex = $scope.unique.findIndex(x => x.x === bday.getTime());
					
					if(bindex == -1){
						$scope.unique.push({"x":bday.getTime(),"y":0});
						$scope.tviews.push({"x":bday.getTime(),"y":0});
						$scope.bviews.push({"x":bday.getTime(),"y":0});
						
		
					}
					if($scope.tviews.length == 0 && $scope.unique.length == 0 && $scope.bviews.length == 0 && $scope.sviews.length == 0) {
						var dat = aday.getTime();
						$scope.unique.push({"x":dat,"y":0});
						$scope.tviews.push({"x":dat,"y":0});
						$scope.bviews.push({"x":dat,"y":0});
						
						var dat1 = bday.getTime();
						$scope.unique.push({"x":dat1,"y":0});
						$scope.tviews.push({"x":dat1,"y":0});
						$scope.bviews.push({"x":dat1,"y":0});
						
					}
					
					$scope.unique = $scope.unique.sort(function(x, y){
						return x.x - y.x;
					});
					$scope.tviews = $scope.tviews.sort(function(x, y){
						return x.x - y.x;
					});
					$scope.bviews = $scope.bviews.sort(function(x, y){
						return x.x - y.x;
					});
					
				
					$scope.data12 = [
						{
							values: $scope.unique,      
							key: 'Users Started',
							color: '#13599a', 
						},
						{
							values:$scope.tviews,
							key: 'Users Completed',
							color: '#f5a138'
						},
						{
						  values: $scope.bviews,
						  key: 'Bounce Views',
						  color: '#FF0000'
					  }];
					
				}
				}	
			}
			}

			$scope.exportcsv = function(type){

				//var data = $scope.usercount;
				var months = ['JAN','FAB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
				if($scope.datea !== undefined && $scope.dateb !== undefined){
				    var a = $scope.datea;
					var b = $scope.dateb;
					//bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
					var bd = b.getDate().toString().length > 1 ? b.getDate() : "0"+b.getDate();
					var aday = a.getDate() + "-" + months[a.getMonth()] + "-" + a.getFullYear() ;
					var bday = bd +"-"+ months[b.getMonth()] + "-" +  b.getFullYear();
				} else {
				   var a = new Date();
				   var b = new Date();
				   b.setDate(b.getDate()-15);
				   //bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
				   var bd = b.getDate().toString().length > 1 ? b.getDate() : "0"+b.getDate();
				   var bday =   a.getDate() +"-" +months[a.getMonth()] +"-"+a.getFullYear();
				   var aday =   bd +"-"+ months[b.getMonth()] +"-"+b.getFullYear();
				   
				}
			
				//data = $scope.weekdata;
			   var json_pre = [],larr = $scope.userdata,tnm = 'ACTIVITY-USERS';
			   let arrHeader = ["date","userstarted", "usercompleted","bounceviews"];
			  
			   if(type == 'cdash'){
				   larr = $scope.dviews;
				
			   }
			   if(type == 'contentdash'){
				larr = $scope.dviews;
				arrHeader = ["date","uniqueview", "totalviews","bounceviews","shared"];
			   }
			   if(type == 'cuser'){
				larr = $scope.ulists;
				arrHeader = ["username", "tenantname","startdate","completeddate"];
			   }
			   if(type == 'contentuser'){
				larr = $scope.ulists;
				arrHeader = ["username", "tenantname","vieweddate","duration"];
			   }
			   console.log(type)
			   
			   if(type == 'cdash'){
				for(var dat of larr){
					var obj = {};
					var g = new Date(dat.DAY);
				   var gm = (g.getMonth() + 1).toString().length > 1 ? (g.getMonth() + 1) : "0"+(g.getMonth() + 1);
				var	gd = g.getDate().toString().length > 1 ? g.getDate() : "0"+g.getDate();
				var tsday =   gm +"-"+ gd +"-"+b.getFullYear();
					obj.date = tsday;
					obj.userstarted = dat.SUB;
					obj.usercompleted = dat.CON === undefined ? 0 : dat.CON;
					obj.bounceviews = dat.BOUNCE;
					json_pre.push(obj);
				}
			   } else if(type == 'contentdash'){
				for(var dat of larr){
					var obj = {};
					var g = new Date(dat.day);
				   var gm = (g.getMonth() + 1).toString().length > 1 ? (g.getMonth() + 1) : "0"+(g.getMonth() + 1);
					var	gd = g.getDate().toString().length > 1 ? g.getDate() : "0"+g.getDate();
					var tsday =   gm +"-"+ gd +"-"+b.getFullYear();
					obj.date = tsday;
					obj.uniqueview = dat.unique;
					obj.totalviews = dat.view;
					obj.bounceviews = dat.bounce;
					obj.shared = dat.shared;
					json_pre.push(obj);
				}
			   } else if(type == 'cuser'){
					for(var dat of larr){
						var obj = {};
						var cday = '',sday = '';
						if(dat.cdate !=' '){
						
							var g =  dat.cdate;
							var gm = (g.getMonth() + 1).toString().length > 1 ? (g.getMonth() + 1) : "0"+(g.getMonth() + 1);
							var	gd = g.getDate().toString().length > 1 ? g.getDate() : "0"+g.getDate();
							 cday  =  gm +"-"+ gd +"-"+b.getFullYear();
							
						}
						if(dat.sdate !=' '){
							var g = dat.sdate;
							var gm = (g.getMonth() + 1).toString().length > 1 ? (g.getMonth() + 1) : "0"+(g.getMonth() + 1);
							var	gd = g.getDate().toString().length > 1 ? g.getDate() : "0"+g.getDate();
							 sday  =  gm +"-"+ gd +"-"+b.getFullYear();
							
						}
						obj.username = dat.UNAME;
						obj.tenantname = dat.OID;
						obj.startdate = sday;
						obj.completeddate = cday ;
						json_pre.push(obj);
					}
			   } else if(type == 'contentuser'){
				for(var dat of larr){
					var obj = {};
					var sday = '';
					if(dat.sdate !=' '){
						var g = dat.sdate;
						var gm = (g.getMonth() + 1).toString().length > 1 ? (g.getMonth() + 1) : "0"+(g.getMonth() + 1);
						var	gd = g.getDate().toString().length > 1 ? g.getDate() : "0"+g.getDate();
						sday  =  gm +"-"+ gd +"-"+b.getFullYear();
						
					}
					obj.username = dat.UNAME;
					obj.tenantname = dat.OID;
					obj.vieweddate = sday;
					obj.duration = dat.mins +' min '+dat.secs +' sec';
					json_pre.push(obj);
				}
		   }
				   
		  
			let csvData = this.ConvertToCSV(json_pre, arrHeader,type);
			console.log(csvData)
			let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
			let dwldLink = document.createElement("a");
			let url = URL.createObjectURL(blob);
			let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
			if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
			 dwldLink.setAttribute("target", "_blank");
			}
			
			dwldLink.setAttribute("href", url);
			if(type == 'cdash' ){
				dwldLink.setAttribute("download", "REPORTS-COURSE-"+$scope.decry.ctn+"-CHART-"+aday +"-"+bday+".csv");
			} else if(type == 'contentuser'){
				var e = new Date();
				var ed = e.getDate().toString().length > 1 ? e.getDate() : "0"+e.getDate();
				var eday =   ed +"-"+ months[e.getMonth()] +"-"+e.getFullYear();
				dwldLink.setAttribute("download", "REPORTS-CONTENT-"+$scope.decry.ctn+"-"+eday+".csv");
			} else if(type == 'cuser'){
				var e = new Date();
				var ed = e.getDate().toString().length > 1 ? e.getDate() : "0"+e.getDate();
				var eday =   ed +"-"+ months[e.getMonth()] +"-"+e.getFullYear();
				dwldLink.setAttribute("download", "REPORTS-COURSE-"+$scope.decry.ctn+"-"+eday+".csv");
			} else {
				var e = new Date();
				var ed = e.getDate().toString().length > 1 ? e.getDate() : "0"+e.getDate();
				var eday =   ed +"-"+ months[e.getMonth()] +"-"+e.getFullYear();
				dwldLink.setAttribute("download", "REPORTS-CONTENT-"+$scope.decry.ctn+"-CHART-"+aday +"-"+bday+".csv");
			}
			
			dwldLink.style.visibility = "hidden";
			document.body.appendChild(dwldLink);
			dwldLink.click();
			document.body.removeChild(dwldLink);
			   
			}
			$scope.strRep = function(data) {
			   if(typeof data == "string") {
				 let newData = data.replace(/,/g, " ");
				  return newData;
			   }
			   else if(typeof data == "undefined") {
				 return "-";
			   }
			   else if(typeof data == "number") {
				 return  data.toString();
			   }
			   else {
				 return data;
			   }
			 }
			$scope.ConvertToCSV = function(objArray, headerList,type) {
			   console.log(objArray);
			   console.log(headerList);
			   let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
			   let str = '';
			   let row = '';
			
			   let newHeaders = ["Date","User Started", "User Completed","Bounce Views"];
			  
				if(type == 'contentdash'){
				 newHeaders = ["Date","Unique View", "Total Views","Bounce Views","Shared"];
				}
				if(type == 'cuser'){
				 newHeaders = ["User Name", "Tenant Name","Start Date","Completed Date"];
				}
				if(type == 'contentuser'){
				 newHeaders = ["User Name", "Tenant Name","Viewed Date","Duration"];
				}
			  
			   for (let index in newHeaders) {
				 row += newHeaders[index] + ',';
			   }
			   row = row.slice(0, -1);
			   str += row + '\r\n';
			   for (let i = 0; i < array.length; i++) {
				 //let line = (i + 1) + '';
				  let line = '';
				 for (let index in headerList) {
				   let head = headerList[index];
			
				   line += headerList[headerList.length -1] == headerList[index] ? $scope.strRep(array[i][head])   :  $scope.strRep(array[i][head]) +',';
				 }
				 str += line + '\r\n';
			   }
			   return str;
			 }
	$scope.home();
	$scope.viewtenant = function() {
		$scope.loading = true;
		$scope.decry["status"] = "Content";
		localStorage.setItem("786a2y1e",$crypto.encrypt(JSON.stringify($scope.decry), config.key));
		$window.location.href="#viewtenant";
	}
	$scope.loadPage = function() {
		$scope.loading = true;
		$window.location.href = '#viewreports';
	}
	$scope.handler = function(event){
		
		$scope.dateb = event;
	if($scope.datea != undefined){
		var a = new Date($scope.datea);
		var b = new Date($scope.dateb);
		bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
        bd = b.getDate().toString().length > 1 ? b.getDate() : "0"+b.getDate();
        var aday = new Date(a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate());
		var bday = new Date(b.getFullYear() + "-" + bm + "-" + bd);
		
		if(aday > bday) {
			swal({title: "", text: "From Date should be less than To Date", type: "warning",buttonsStyling:false,allowOutsideClick: false,
			allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
		} else {
			if($scope.datea != '' && $scope.dateb != ''){

			$scope.unique = [];
			$scope.tviews = [];
			$scope.bviews = [];
			$scope.sviews = [];
			$scope.uviews = $scope.decry.userrow.uviews == undefined ? [] : $scope.decry.userrow.uviews;
			$scope.dviews = [];
			if($scope.uviews.length > 0){
				
			for(var i=0; i< $scope.uviews.length; i++){
				var c = new Date($scope.uviews[i].day);

				cm = (c.getMonth() + 1).toString().length > 1 ? (c.getMonth() + 1) : ("0"+(c.getMonth() + 1));
                    cd = c.getDate().toString().length > 1 ? c.getDate() : "0"+c.getDate();
					var cday = new Date(c.getFullYear() + "-" + cm + "-" + cd);

				if(cday >= aday && cday <= bday) {
					$scope.unique.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].unique});
					$scope.tviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].view});
					$scope.bviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].bounce});
					if($scope.uviews[i].shared != undefined){
						$scope.sviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].shared});
						} 
						if($scope.uviews[i].sharedotv != undefined){
							$scope.sviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].sharedotv});
						} 
				$scope.dviews.push($scope.uviews[i]);
				}
				
			}
			}
			var Difference_In_Time = bday.getTime() - aday.getTime(); 
			var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
			var sindex = $scope.unique.findIndex(x => x.x === aday.getTime());
			if(sindex == -1){
				$scope.unique.push({"x":aday.getTime(),"y":0});
				$scope.tviews.push({"x":aday.getTime(),"y":0});
				$scope.bviews.push({"x":aday.getTime(),"y":0});
				$scope.sviews.push({"x":aday.getTime(),"y":0});	

			}
			for(var g=1;g<Difference_In_Days;g++){
				
				var la = aday.setDate(aday.getDate() + 1);
				
				var aindex = $scope.unique.findIndex(x => x.x === la);
				
				if(aindex == -1){
					$scope.unique.push({"x":la,"y":0});
					$scope.tviews.push({"x":la,"y":0});
					$scope.bviews.push({"x":la,"y":0});
					$scope.sviews.push({"x":la,"y":0});	
	
				}
			}
			
			
			var bindex = $scope.unique.findIndex(x => x.x === bday.getTime());
			
			if(bindex == -1){
				$scope.unique.push({"x":bday.getTime(),"y":0});
				$scope.tviews.push({"x":bday.getTime(),"y":0});
				$scope.bviews.push({"x":bday.getTime(),"y":0});
				$scope.sviews.push({"x":bday.getTime(),"y":0});	

			}
			if($scope.tviews.length == 0 && $scope.unique.length == 0 && $scope.bviews.length == 0 && $scope.sviews.length == 0) {
				var dat = aday.getTime();
				$scope.unique.push({"x":dat,"y":0});
				$scope.tviews.push({"x":dat,"y":0});
				$scope.bviews.push({"x":dat,"y":0});
				$scope.sviews.push({"x":dat,"y":0});
				var dat1 = bday.getTime();
				$scope.unique.push({"x":dat1,"y":0});
				$scope.tviews.push({"x":dat1,"y":0});
				$scope.bviews.push({"x":dat1,"y":0});
				$scope.sviews.push({"x":dat1,"y":0});
			}
			$scope.unique = $scope.unique.sort(function(x, y){
				return x.x - y.x;
			});
			$scope.tviews = $scope.tviews.sort(function(x, y){
				return x.x - y.x;
			});
			$scope.bviews = $scope.bviews.sort(function(x, y){
				return x.x - y.x;
			});
			$scope.sviews = $scope.sviews.sort(function(x, y){
				return x.x - y.x;
			});
			
			$scope.data12 = [
				{
					values: $scope.unique,      
					key: 'Unique Views',
					color: '#13599a', 
				},
				{
					values:$scope.tviews,
					key: 'Total Views',
					color: '#f5a138'
				},
				{
				  values: $scope.bviews,
				  key: 'Bounce Views',
				  color: '#FF0000'
			  },	{
				values: $scope.sviews,
				key: 'Shared',
				color: '#6E2B69'
			}];
			
		}
		}	
	}
	}
	$scope.handler1 = function(event){
		$scope.datea= event;
	if($scope.dateb != undefined){

		var a = new Date($scope.datea);
		var b = new Date($scope.dateb);
		
		bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
        bd = b.getDate().toString().length > 1 ? b.getDate() : "0"+b.getDate();
        var aday = new Date(a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate());
		var bday = new Date(b.getFullYear() + "-" + bm + "-" + bd);
		
		if(aday > bday) {
			swal({title: "", text: "From Date should be less than To Date", type: "warning",buttonsStyling:false,allowOutsideClick: false,
			allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
		} else {
			if($scope.datea != '' && $scope.dateb != ''){
				$scope.unique = [];
				$scope.tviews = [];
				$scope.bviews = [];
				$scope.sviews = [];
				$scope.uviews = $scope.decry.userrow.uviews == undefined ? [] : $scope.decry.userrow.uviews;
				if($scope.uviews.length > 0){
					$scope.dviews = [];
				for(var i=0; i< $scope.uviews.length; i++){
					var c = new Date($scope.uviews[i].day);

					cm = (c.getMonth() + 1).toString().length > 1 ? (c.getMonth() + 1) : ("0"+(c.getMonth() + 1));
                    cd = c.getDate().toString().length > 1 ? c.getDate() : "0"+c.getDate();
					var cday = new Date(c.getFullYear() + "-" + cm + "-" + cd);

					if(cday >= aday && cday <= bday) {
						$scope.unique.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].unique});
						$scope.tviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].view});
						$scope.bviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].bounce});
						if($scope.uviews[i].shared != undefined){
							$scope.sviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].shared});
							} 
							if($scope.uviews[i].sharedotv != undefined){
								$scope.sviews.push({"x":$scope.uviews[i].day,"y":$scope.uviews[i].sharedotv});
							} 
						$scope.dviews.push($scope.uviews[i]);
					}
					
				}
				}
				var Difference_In_Time = bday.getTime() - aday.getTime(); 
				var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
				var sindex = $scope.unique.findIndex(x => x.x === aday.getTime());
				if(sindex == -1){
					$scope.unique.push({"x":aday.getTime(),"y":0});
					$scope.tviews.push({"x":aday.getTime(),"y":0});
					$scope.bviews.push({"x":aday.getTime(),"y":0});
					$scope.sviews.push({"x":aday.getTime(),"y":0});	
	
				}
				for(var g=1;g<Difference_In_Days;g++){
					var la = aday.setDate(aday.getDate() + 1);
					
					var aindex = $scope.unique.findIndex(x => x.x === la);
					
					if(aindex == -1){
						$scope.unique.push({"x":la,"y":0});
						$scope.tviews.push({"x":la,"y":0});
						$scope.bviews.push({"x":la,"y":0});
						$scope.sviews.push({"x":la,"y":0});	
		
					}
				}
				
				
				var bindex = $scope.unique.findIndex(x => x.x === bday.getTime());
				
				if(bindex == -1){
					$scope.unique.push({"x":bday.getTime(),"y":0});
					$scope.tviews.push({"x":bday.getTime(),"y":0});
					$scope.bviews.push({"x":bday.getTime(),"y":0});
					$scope.sviews.push({"x":bday.getTime(),"y":0});	
	
				}
				if($scope.tviews.length == 0 && $scope.unique.length == 0 && $scope.bviews.length == 0 && $scope.sviews.length == 0) {
					var dat = aday.getTime();
					$scope.unique.push({"x":dat,"y":0});
					$scope.tviews.push({"x":dat,"y":0});
					$scope.bviews.push({"x":dat,"y":0});
					$scope.sviews.push({"x":dat,"y":0});
					var dat1 = bday.getTime();
					$scope.unique.push({"x":dat1,"y":0});
					$scope.tviews.push({"x":dat1,"y":0});
					$scope.bviews.push({"x":dat1,"y":0});
					$scope.sviews.push({"x":dat1,"y":0});
				}
				$scope.unique = $scope.unique.sort(function(x, y){
					return x.x - y.x;
				});
				$scope.tviews = $scope.tviews.sort(function(x, y){
					return x.x - y.x;
				});
				$scope.bviews = $scope.bviews.sort(function(x, y){
					return x.x - y.x;
				});
				$scope.sviews = $scope.sviews.sort(function(x, y){
					return x.x - y.x;
				});
				
				$scope.data12 = [
					{
						values: $scope.unique,      
						key: 'Unique Views',
						color: '#13599a', 
					},
					{
						values:$scope.tviews,
						key: 'Total Views',
						color: '#f5a138'
					},
					{
					  values: $scope.bviews,
					  key: 'Bounce Views',
					  color: '#FF0000'
				  }, 	{
					values: $scope.sviews,
					key: 'Shared',
					color: '#6E2B69'
				}];
		}
		
	}
	}
}
$scope.mhandler = function(event){
		
	$scope.dateb = event;
	
if($scope.datea != undefined){
	var a = new Date($scope.datea);
	var b = new Date($scope.dateb);
	
	bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
	bd = b.getDate().toString().length > 1 ? b.getDate() : "0"+b.getDate();
	var aday = new Date(a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate());
	var bday = new Date(b.getFullYear() + "-" + bm + "-" + bd);

	if(aday > bday) {
		swal({title: "", text: "From Date should be less than To Date", type: "warning",buttonsStyling:false,allowOutsideClick: false,
		allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	} else {
		if($scope.datea != '' && $scope.dateb != ''){

			$scope.unique = [];
			$scope.tviews = [];
			$scope.bviews = [];
			$scope.sviews = [];
			$scope.uviews =  $scope.decry.userrow.TSCB == undefined ? [] : $scope.decry.userrow.TSCB;
			$scope.dviews = [];
			if($scope.uviews.length > 0){
			for(var i=0; i< $scope.uviews.length; i++){
				var c = new Date($scope.uviews[i].DAY);
				cm = (c.getMonth() + 1).toString().length > 1 ? (c.getMonth() + 1) : ("0"+(c.getMonth() + 1));
				cd = c.getDate().toString().length > 1 ? c.getDate() : "0"+c.getDate();
				var cday = new Date(c.getFullYear() + "-" + cm + "-" + cd);
			if(cday >= aday && cday <= bday) {
				$scope.unique.push({"x":$scope.uviews[i].DAY,"y":$scope.uviews[i].SUB == undefined ? 0 : $scope.uviews[i].SUB});
				$scope.tviews.push({"x":$scope.uviews[i].DAY,"y":$scope.uviews[i].CON == undefined ? 0 : $scope.uviews[i].CON});
				$scope.bviews.push({"x":$scope.uviews[i].DAY,"y":$scope.uviews[i].BOUNCE == undefined ? 0 : $scope.uviews[i].BOUNCE});
				
				$scope.dviews.push($scope.uviews[i]);
			}
		}
			}
			var Difference_In_Time = bday.getTime() - aday.getTime(); 
			var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
			var sindex = $scope.unique.findIndex(x => x.x === aday.getTime());
			if(sindex == -1){
				$scope.unique.push({"x":aday.getTime(),"y":0});
				$scope.tviews.push({"x":aday.getTime(),"y":0});
				$scope.bviews.push({"x":aday.getTime(),"y":0});
				$scope.sviews.push({"x":aday.getTime(),"y":0});	

			}
			for(var g=1;g<Difference_In_Days;g++){
				var la = aday.setDate(aday.getDate() + 1);
				
				var aindex = $scope.unique.findIndex(x => x.x === la);
				
				if(aindex == -1){
					$scope.unique.push({"x":la,"y":0});
					$scope.tviews.push({"x":la,"y":0});
					$scope.bviews.push({"x":la,"y":0});
					
	
				}
			}
			
			
			var bindex = $scope.unique.findIndex(x => x.x === bday.getTime());
			
			if(bindex == -1){
				$scope.unique.push({"x":bday.getTime(),"y":0});
				$scope.tviews.push({"x":bday.getTime(),"y":0});
				$scope.bviews.push({"x":bday.getTime(),"y":0});
				

			}
			if($scope.tviews.length == 0 && $scope.unique.length == 0 && $scope.bviews.length == 0) {
				var dat = aday.getTime();
				$scope.unique.push({"x":dat,"y":0});
				$scope.tviews.push({"x":dat,"y":0});
				$scope.bviews.push({"x":dat,"y":0});
				var dat1 = bday.getTime();
				$scope.unique.push({"x":dat1,"y":0});
				$scope.tviews.push({"x":dat1,"y":0});
				$scope.bviews.push({"x":dat1,"y":0});
			}
			$scope.unique = $scope.unique.sort(function(x, y){
				return x.x - y.x;
			});
			$scope.tviews = $scope.tviews.sort(function(x, y){
				return x.x - y.x;
			});
			$scope.bviews = $scope.bviews.sort(function(x, y){
				return x.x - y.x;
			});
			
            $scope.data12 = [
              {
                  values: $scope.unique,      
                  key: 'Users Started',
                  color: '#13599a', 
              },
              {
                  values:$scope.tviews,
                  key: 'Users Completed',
                  color: '#f5a138'
			  },
			  {
				values: $scope.bviews,
				key: 'Bounce Views',
				color: '#FF0000'
			}];
	}
	}	
}
}
$scope.mhandler1 = function(event){
	$scope.datea= event;
if($scope.dateb != undefined){

	var a = new Date($scope.datea);
	var b = new Date($scope.dateb);
	
	bm = (b.getMonth() + 1).toString().length > 1 ? (b.getMonth() + 1) : "0"+(b.getMonth() + 1);
	bd = b.getDate().toString().length > 1 ? b.getDate() : "0"+b.getDate();
	var aday = new Date(a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate());
	var bday = new Date(b.getFullYear() + "-" + bm + "-" + bd);

	if(aday > bday) {
		swal({title: "", text: "From Date should be less than To Date", type: "warning",buttonsStyling:false,allowOutsideClick: false,
		allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
	} else {
		if($scope.datea != '' && $scope.dateb != ''){

			$scope.unique = [];
			$scope.tviews = [];
			$scope.bviews = [];
			$scope.sviews = [];
			$scope.uviews =  $scope.decry.userrow.TSCB == undefined ? [] : $scope.decry.userrow.TSCB;
			if($scope.uviews.length > 0){
				$scope.dviews = [];
			for(var i=0; i< $scope.uviews.length; i++){
				var c = new Date($scope.uviews[i].DAY);
			        cm = (c.getMonth() + 1).toString().length > 1 ? (c.getMonth() + 1) : ("0"+(c.getMonth() + 1));
                    cd = c.getDate().toString().length > 1 ? c.getDate() : "0"+c.getDate();
					var cday = new Date(c.getFullYear() + "-" + cm + "-" + cd);
			if(cday >= aday && cday <= bday) {
				$scope.unique.push({"x":$scope.uviews[i].DAY,"y":$scope.uviews[i].SUB == undefined ? 0 : $scope.uviews[i].SUB});
				$scope.tviews.push({"x":$scope.uviews[i].DAY,"y":$scope.uviews[i].CON == undefined ? 0 : $scope.uviews[i].CON});
				$scope.bviews.push({"x":$scope.uviews[i].DAY,"y":$scope.uviews[i].BOUNCE == undefined ? 0 : $scope.uviews[i].BOUNCE});
				$scope.dviews.push($scope.uviews[i]);
			}
		}
			}
			var Difference_In_Time = bday.getTime() - aday.getTime(); 
			var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
			var sindex = $scope.unique.findIndex(x => x.x === aday.getTime());
			if(sindex == -1){
				$scope.unique.push({"x":aday.getTime(),"y":0});
				$scope.tviews.push({"x":aday.getTime(),"y":0});
				$scope.bviews.push({"x":aday.getTime(),"y":0});
				

			}
			for(var g=1;g<Difference_In_Days;g++){
				var la = aday.setDate(aday.getDate() + 1);
				
				var aindex = $scope.unique.findIndex(x => x.x === la);
				
				if(aindex == -1){
					$scope.unique.push({"x":la,"y":0});
					$scope.tviews.push({"x":la,"y":0});
					$scope.bviews.push({"x":la,"y":0});
					
	
				}
			}
			
			
			var bindex = $scope.unique.findIndex(x => x.x === bday.getTime());
			
			if(bindex == -1){
				$scope.unique.push({"x":bday.getTime(),"y":0});
				$scope.tviews.push({"x":bday.getTime(),"y":0});
				$scope.bviews.push({"x":bday.getTime(),"y":0});
				

			}
			if($scope.tviews.length == 0 && $scope.unique.length == 0 && $scope.bviews.length == 0) {
				var dat = aday.getTime();
				$scope.unique.push({"x":dat,"y":0});
				$scope.tviews.push({"x":dat,"y":0});
				$scope.bviews.push({"x":dat,"y":0})
				var dat1 = bday.getTime();
				$scope.unique.push({"x":dat1,"y":0});
				$scope.tviews.push({"x":dat1,"y":0});
				$scope.bviews.push({"x":dat1,"y":0})
			}
			$scope.unique = $scope.unique.sort(function(x, y){
				return x.x - y.x;
			});
			$scope.tviews = $scope.tviews.sort(function(x, y){
				return x.x - y.x;
			});
			$scope.bviews = $scope.bviews.sort(function(x, y){
				return x.x - y.x;
			});
			
            $scope.data12 = [
              {
                  values: $scope.unique,      
                  key: 'Users Started',
                  color: '#13599a', 
              },
              {
                  values:$scope.tviews,
                  key: 'Users Completed',
                  color: '#f5a138'
			  },
			  {
				values: $scope.bviews,
				key: 'Bounce Views',
				color: '#FF0000'
			}];
	}
	
}
}
}
};

app.controller('viewtenantreportCtrl', viewtenantreportCtrl);
viewtenantreportCtrl.$inject = ['$scope', '$http', '$location', '$window','NgTableParams','config','$crypto', '$sce','ulists'];

app.factory("viewuserdata", function($window, $q, config,$crypto){
    return {
    	viewuserdata: function(){
    		var listtopics1,decry;
    		
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
    		   listtopics1 = getusersession();
    		  
    	    }
    	    else {
    	    	localStorage.clear();
    	    	$window.location.href = '#login';
    	    }
			
			function getdata(token){
						
						var apigClient = apigClientFactory.newClient({invokeUrl: decry.api,});
							var params = {};
							var body = {
								oid : decry.tenant,
								tid: decry.ctid,
								action: decry.caction,
							};
							
							
								var additionalParams = {
										headers: {Authorization : token
										}
								};
								
								var data = apigClient.getContentViewedUsersPost(params, body, additionalParams)
									.then(function(result){
										var response = JSON.stringify(result.data);
										
										response=JSON.parse(response);
										//alert(JSON.stringify(response))
										return $q.when(JSON.stringify(response));

									}).catch( function(result){
											
										var json = JSON.stringify(result);
										var json1 = json.toString();
										return $q.when("hello");
										
									});
									return $q.when(data);	 
			}

			function getusersession(){
						 return new Promise((resolve, reject) => {
							 cognitoUser.getSession((err, session) =>{
								if (err) {
									swal({title: "Oops!", text: "Session has timed out, Please login again.", type: "error",buttonsStyling:false,allowOutsideClick: false,
		     			                allowEscapeKey:false, width: '400px',showConfirmButton: true, confirmButtonText: 'OK', customClass: 'sweetalert-confirmOk',confirmButtonClass:'button1'});
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

    	return $q.when(listtopics1);
    }
    };
});