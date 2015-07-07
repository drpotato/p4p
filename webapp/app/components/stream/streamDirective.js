'use strict';

angular.module('esad.stream', [])

.controller('StreamController', function ($scope, $element) {

})

.directive('eventStream', function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      name : "=name",
      events : "=events"
    },
    templateUrl: 'app/components/stream/stream.html',
  };
});
