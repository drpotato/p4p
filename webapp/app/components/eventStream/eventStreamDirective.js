'use strict';

angular.module('esad.stream', [])

.controller('StreamController', function ($scope, $element) {
  $scope.subEvents = $scope.events.filter(function(item){
    return (item.location === $scope.name);
  });
})

.directive('eventStream', function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      name : "=",
      events : "=",
      query: "="
    },
    templateUrl: 'app/components/eventStream/eventStream.html'
  };
});
