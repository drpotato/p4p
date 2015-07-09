'use strict';

angular.module('esad.subEvent', ['ui.bootstrap','ui.bootstrap.modal'])

.controller('SubEventController', function ($scope, $modal) {
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
}).controller('SubEventModalInstanceCtrl', function ($scope, $modalInstance, subEvent) {
  $scope.subEvent = subEvent;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
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
