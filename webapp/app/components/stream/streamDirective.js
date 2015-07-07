'use strict';

//So you need the empty [] to declare the module, if you don't you just reference it
angular.module('components')

.controller('StreamController', function ($scope, $element) {

})

.directive('streamcomponent', function () {
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
