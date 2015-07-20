'use strict';

angular.module('esad.subEvent', ['ui.bootstrap','ui.bootstrap.modal','esad.calendarGenerator'])

.controller('SubEventController', function ($scope, $modal,calendarGenerator) {
  $scope.expanded = false;
  $scope.expand = function (size) {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'myModalContent.html',
      controller: 'SubEventModalInstanceCtrl',
      size: size,
      resolve: {
        subEvent: function () {
          return $scope.subEvent;
        }
      }
    });
  };
}).controller('SubEventModalInstanceCtrl', function ($scope, $modalInstance, subEvent,calendarGenerator) {
  $scope.subEvent = subEvent;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.save = function () {
    calendarGenerator.addSubEvent($scope.subEvent);
  };
})
.directive('subEvent', function () {
  return {
    restrict: 'E',
    scope: {
      subEvent: "=subEvent"
    },
    templateUrl: "app/components/subEvent/subEvent.html"
  };
});
