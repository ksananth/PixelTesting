var app = angular.module("AutomateScreenshotApp", [ 'dropdown-multiselect' ]);
 
// Controller Part
app.controller("ManageScreenshotsController", function($scope, $http, $filter) {
 
 
    var tabs = document.getElementsByClassName('Tab');
    $scope.screens = [];
    $scope.selectedBrand = "fortis";
    $scope.selectedBrandScreens = [];
   
    // Now load the data from server
    _refreshEmployeeData();
 
   $scope.onTabChanges = function(currentTabIndex){
        console.log('Current tab ' + currentTabIndex);
        localStorage.setItem('active',currentTabIndex);
        console.log(localStorage.getItem('active'));
      };

       $scope.loadScreenByBrand = function(value) {
            $scope.selectedBrand = value;
            console.log("Selected brand-"+$scope.selectedBrand);
            console.log($scope.screens[$scope.selectedBrand.toLowerCase()]);
            $scope.selectedBrandScreens=($scope.screens[$scope.selectedBrand.toLowerCase()]) ;
            CheckScopeBeforeApply();
        };

    function CheckScopeBeforeApply() {
        if(!$scope.$$phase) {
             $scope.$apply();
        }
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
                $scope.loadScreenByBrand($scope.selectedBrand);
                console.log($scope.screens);
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }



    var options = [ {
          'Id': 1,
          'Name': 'Batman',
          'Costume': 'Black'
      }, {
          'Id': 2,
          'Name': 'Superman',
          'Costume': 'Red & Blue'
      }, {
          'Id': 3,
          'Name': 'Hulk',
          'Costume': 'Green'
      }, {
          'Id': 4,
          'Name': 'Flash',
          'Costume': 'Red'
      }, {
          'Id': 5,
          'Name': 'Dare-Devil',
          'Costume': 'Maroon'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }, {
          'Id': 6,
          'Name': 'Wonder-woman',
          'Costume': 'Red'
      }];
  
  $scope.config = {
      options: options,
      trackBy: 'Id',
      displayBy: [ 'Name' ],
      icon: 'glyphicon glyphicon-unchecked',
      displayBadge: true,
      height: '200px',
      filter: true,
      multiSelect: true
  };
 
});