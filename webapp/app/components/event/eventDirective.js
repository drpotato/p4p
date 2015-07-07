'use strict';

angular.module('esad.subEvent', [])

.controller('SubEventController', function ($scope, $element) {
  $scope.expanded = false;
  $scope.expand = function () {
    $scope.expanded = !$scope.expanded;
  };
})

.directive('subEvent', function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      subEvent: "=subEvent"
    },
    templateUrl: "app/components/event/event.html",
  };
});
