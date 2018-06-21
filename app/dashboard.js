//var app = angular.module('myApp', ['ngNotificationsBar', 'ngSanitize','ngRoute', 'toaster','angularjs-dropdown-multiselect']);
var dashboardRendered=false;

app.config(['notificationsConfigProvider', function(notificationsConfigProvider){
	notificationsConfigProvider.setHideDelay(3000);
	notificationsConfigProvider.setAutoHide(false);
	notificationsConfigProvider.setAcceptHTML(true);
}]);


app.directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="overlay"><div id="loading-img"></div></div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val){
					   if(window.JSInterface!=undefined){
						  window.JSInterface.showLoading();
					   }else{
						  $(element).show();
					   }
				  }
                  else
                      {
                  
					  if(window.JSInterface!=undefined){
						 window.JSInterface.dismissLoading();
					   }else{
						$(element).hide();
					   }
                      
                      }
              });
        }
      }
  });
  
  app.directive('myDateFormat', function($filter) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
      var res=$filter('date')(new Date(), element.text());
        element.text(res);
      
      }
    };
  });
  
app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/dashboard', {
            title: 'dashboard',
            templateUrl: 'partials/dashboard.html',
            controller: 'screenController',
            animation: 'first'
        })
        .when('/searchResult', {
            title: 'Search',
            templateUrl: 'partials/searchResult.html',
            controller: 'screenController'
        })
        .when('/', {
            redirectTo: '/dashboard'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
  }])
    .run(function ($rootScope, $location) {

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
			$rootScope.dashboardRendered = false;
			
	
        });
    });