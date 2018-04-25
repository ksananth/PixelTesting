var app = angular.module("AutomateScreenshotApp", []);
 
// Controller Part
app.controller("ManageScreenshotsController", function($scope, $http, $filter) {
 
 
    var tabs = document.getElementsByClassName('Tab');
    $scope.screens = [];
    $scope.selectedBrand = "fortis";
    $scope.selectedBrandScreens = [{"screenName": "Email screen"}];
   
    // Now load the data from server
    _refreshEmployeeData();
 
   $scope.onTabChanges = function(currentTabIndex){
        console.log('Current tab ' + currentTabIndex);
        localStorage.setItem('active',currentTabIndex);
        console.log(localStorage.getItem('active'));
      };

       $scope.javaScriptCallAngularJS = function(value) {
            $scope.selectedBrand = value;
            console.log("Selected brand-"+$scope.selectedBrand);
            console.log($scope.screens[$scope.selectedBrand.toLowerCase()]);
            $scope.selectedBrandScreens=($scope.screens[$scope.selectedBrand.toLowerCase()]) ;
            $scope.$apply();
        };
  
    // Private Method  
    // HTTP GET- get all screens collection
    // Call: http://localhost:8080/service/parseFolder.php
    function _refreshEmployeeData() {
        $http({
            method: 'GET',
            url: 'service/parseFolder.php'
        }).then(
            function(res) { // success
                $scope.screens=(res.data);
                console.log($scope.screens);
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }
 
});