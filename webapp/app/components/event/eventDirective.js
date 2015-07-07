'use strict';

//So you need the empty [] to declare the module, if you don't you just reference it
angular.module('components',[])

.controller('SubEventController', function ($scope, $element) {
  $scope.expanded = false;
  $scope.expand = function () {
    $scope.expanded = !$scope.expanded;
  };
})

.directive('eventcomponent', function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      subEvent: "=subEvent"
    },
    templateUrl: "app/components/event/event.html",
  };
});
