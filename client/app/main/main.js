angular.module('jobTracker.landing', [])
.controller('landingController', function($scope, $location) {
  $scope.navButton = "Sign Up!";

  $scope.buttonFunc = function() {
    $location.path("/signup");
  };
   $scope.demoClick = function() {
    $location.path("/mainList");
  };

  $scope.isActive = function(viewLocation) {
    return viewLocation === $location.path();
  };

})
.directive('landingDir', () => {
  return {
    transclude: true,
    restrict: 'E',
    templateUrl: 'app/main/main.html'
  }
})