app.controller("screenController", function($scope, $http, $filter,$rootScope,$location) {
	console.log('root'+$rootScope.screens);
	$scope.selectedScreenName = $location.search().screen;
	$scope.screensObj = ($scope.screens[$scope.selectedBrand.toLowerCase()]);
	$scope.selectedScreenImg = $filter('filter')($scope.screensObj, {'screenName':$scope.selectedScreenName});

	$scope.getUrl = function(label){
    	return label.replace('../', '');
  	}

});