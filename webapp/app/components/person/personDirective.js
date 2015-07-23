'use strict';

angular.module('esad.person', [])

.directive('person', function () {
  return {
    restrict: 'E',
    scope: {
      person: '='
    },
    templateUrl: 'app/components/person/personView.html'
  }
})

.controller('PersonController', function($scope, $modalInstance, subEvent, calendarGenerator) {

  $scope.subEvent = subEvent;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.save = function () {
    calendarGenerator.addSubEvent($scope.subEvent);
  };
});
