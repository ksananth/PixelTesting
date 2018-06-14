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

    $scope.doSearch = function(){
      console.log('doSearch ');
      console.log('brandModel '+ $scope.brandModel);
      console.log('screenModel '+ $scope.screenModel);
      console.log('deviceModel '+ $scope.deviceModel);
      console.log('languageModel '+ $scope.languageModel);

      $scope.searchedBrands =[];
      $scope.searchedScreens =[];
      $scope.searchedLanguage =[];
      $scope.searchedDevices =[];
    };

     $scope.clearSearch = function(){
          console.log('clearSearch ');
          _refreshEmployeeData();
     };

 
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
                _fillSearch();
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }


    function _fillSearch() {

           ////////////////////// BRAND ////////////////
          var brands = Object.keys($rootScope.screens);
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
          $scope.brandData = [];

          //Loop brand and create Brand filter
          for (i=0; i<brands.length; ++i) {
            var eachBrand = {
                              "label": brands[i],
                              "id": brands[i]
                            };
            $scope.brandData[i]=eachBrand;
          }

          //When Any brand selected, this watch will be executed
          $scope.$watch('brandModel', function( newValue, oldValue ){
             console.log('entireScope has changed---'+newValue+'-'+oldValue);
             var a=[];
              for (var i=0; i<newValue.length; i++) {
                   console.log(newValue[i].id);
                   $arra = $scope.getScreenNames(newValue[i].id);
                   console.log($arra);
                   Array.prototype.push.apply(a,$arra);
                   console.log(a);
                 }
                 $scope.screenData  = UniqueArraybyId(a ,"id");
          }, true);

            //Get Screen names from selected brand
             $scope.getScreenNames = function(value) {
                      $scope.selectedBrandScreens = ($scope.screens[value.toLowerCase()]) ;
                      var a=[];
                       for (var i=0; i<$scope.selectedBrandScreens.length; i++) {
                            var obj = { "label":$scope.selectedBrandScreens[i].screenName, "id":$scope.selectedBrandScreens[i].screenName};
                            console.log($scope.selectedBrandScreens[i].screenName);
                            a.push(obj);
                        }
                        return a;
                  };
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
    }



 






     function UniqueArraybyId(collection, keyname) {
               var output = [],
                   keys = [];

               angular.forEach(collection, function(item) {
                   var key = item[keyname];
                   if(keys.indexOf(key) === -1) {
                       keys.push(key);
                       output.push(item);
                   }
               });
         return output;
    };
 
    });