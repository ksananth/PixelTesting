//var app = angular.module("AutomateScreenshotApp", ['angularjs-dropdown-multiselect']);
 var app = angular.module('myApp', ['ngNotificationsBar', 'ngSanitize','ngRoute', 'toaster','angularjs-dropdown-multiselect','ngAnimate']);

// Controller Part
app.controller("ManageScreenshotsController", function($scope, $http, $filter,$rootScope) {
 
  
 
    var tabs = document.getElementsByClassName('Tab');
    $scope.screens = [];
    $scope.selectedBrand = "fortis";
    $scope.selectedBrandScreens = [];

    $scope.toggleObject = {item: -1};
   
    // Now load the data from server
    _refreshEmployeeData();
 
   $scope.onTabChanges = function(currentTabIndex){
        console.log('Current tab ' + currentTabIndex);
        localStorage.setItem('active',currentTabIndex);
        console.log(localStorage.getItem('active'));
        $scope.toggleObject = {item: -1};
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
                $rootScope.screens=(res.data);
                $scope.loadScreenByBrand($scope.selectedBrand);
                console.log($scope.screens);
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }



   ////////////////////// BRAND ////////////////
  $scope.brandModel = [];
  $scope.brandSettings = {
      scrollableHeight: '500px',
      scrollable: true,
      enableSearch: true,
      dynamicTitle:"test"
  };
  $scope.brandText = {
      buttonDefaultText: 'Select Brand'            
   };
  $scope.brandData = [{
        "label": "Fortis",
            "id": "fortisd"
    }, {
        "label": "Hellobank",
            "id": "hellobank"
    }, {
        "label": "Fintro",
            "id": "fintro"
  }];
   //////////////////SCREEN///////////////

  $scope.screenModel = [];
  $scope.screenSettings = {
      scrollableHeight: '500px',
      scrollable: true,
      enableSearch: true,
      dynamicTitle:"test"
  };
   $scope.screenText = {
      buttonDefaultText: 'Select Screen'            
   };
     $scope.screenData = [{
        "label": "Language Screen",
            "id": "language"
    }, {
        "label": "Email Screen",
            "id": "email"
    }, {
        "label": "Condition Screen",
            "id": "condition"
  }, {
        "label": "OCR Screen",
            "id": "ocr"
  }, {
        "label": "Result Screen",
            "id": "result"
  }, {
        "label": "Summary Screen",
            "id": "summary"
  }, {
        "label": "Back Card Screen",
            "id": "backcard"
  }, {
        "label": "Front card Screen",
            "id": "front"
  }, {
        "label": "Condition Screen",
            "id": "condition"
  }, {
        "label": "Condition Screen",
            "id": "condition"
  }, {
        "label": "Condition Screen",
            "id": "condition"
  }, {
        "label": "Condition Screen",
            "id": "condition"
  }];

//////////////////LANGUAGE///////////////

  $scope.languageModel = [];
  $scope.languageSettings = {
      scrollableHeight: '500px',
      scrollable: true,
      enableSearch: true,
      dynamicTitle:"test"
  };
   $scope.languageText = {
      buttonDefaultText: 'Select Language'            
   };
     $scope.languageData = [{
        "label": "English",
            "id": "en"
    }, {
        "label": "French",
            "id": "fr"
    }, {
        "label": "Dutch",
            "id": "nl"
  },
  {
        "label": "German",
            "id": "de"
  }];

/////////////////Device//////////////////////
  $scope.deviceModel = [];
  $scope.deviceSettings = {
      scrollableHeight: '500px',
      scrollable: true,
      enableSearch: true,
      dynamicTitle:"test"
  };
   $scope.deviceText = {
      buttonDefaultText: 'Select Device'            
   };
     $scope.deviceData = [{
        "label": "Samsung J5",
            "id": "samsung"
    }, {
        "label": "Nexus 6P",
            "id": "nexus"
    }, {
        "label": "MI2",
            "id": "mi2"
  }, {
        "label": "Oppo",
            "id": "oppo"
  }, {
        "label": "Huewai",
            "id": "Huewai"
  }];
 ///////////////////////////////////////////
 
 
 
    });