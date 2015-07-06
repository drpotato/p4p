'use strict';

//So you need the empty [] to declare the module, if you don't you just reference it
var componentsModule = angular.module('components',[]);

componentsModule.directive('eventcomponent', function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      event: "=event"
    },
    //templateUrl: 'app/components/event/event.html',
    controller: function ($scope, $element) {
      $scope.expanded = false;
      $scope.expand = function () {
        $scope.expanded = !$scope.expanded;
      };
    },
    templateUrl: "app/components/event/event.html",
    replace: true
  };
});
