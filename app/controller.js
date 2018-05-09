app.controller("screenController", function($scope, $http, $filter,$rootScope,$location,toaster) {
	console.log('root'+$rootScope.screens);
	$scope.selectedScreenName = $location.search().screen;
	$scope.screensObj = ($scope.screens[$scope.selectedBrand.toLowerCase()]);
	$scope.selectedScreenImg = $filter('filter')($scope.screensObj, {'screenName':$scope.selectedScreenName});

 toaster.pop("data.status", "", $scope.selectedScreenName+" selected", 2000, 'trustedHtml');
	$scope.getUrl = function(label){
    	return label.replace('../', '');
  	}

});