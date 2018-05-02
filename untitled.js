var app = angular.module('myApp', ['ngNotificationsBar', 'ngSanitize','ngRoute', 'toaster','angularUtils.directives.dirPagination','angular-confirm']);
var dashboardRendered=false;

app.config(['notificationsConfigProvider', function(notificationsConfigProvider){
	notificationsConfigProvider.setHideDelay(3000);
	notificationsConfigProvider.setAutoHide(false);
	notificationsConfigProvider.setAcceptHTML(true);
}]);

app.filter('secondDropdown', function () {
    return function (secondSelect, firstSelect) {
        var filtered = [];
        if (firstSelect === null) {
            return filtered;
        }
        angular.forEach(secondSelect, function (s2) {
            if (s2.type_category == firstSelect) {
                filtered.push(s2);
            }
        });
        return filtered;
    };
});

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
            title: 'Login',
            templateUrl: 'partials/chart.html',
            controller: 'authCtrl'
        })
        .when('/', {
            redirectTo: '/dashboard'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
  }])
    .run(function ($rootScope, $location, Data) {

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
			$rootScope.dashboardRendered = false;
			
	
        });
    });