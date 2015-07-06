'use strict';

//So you need the empty [] to declare the module, if you don't you just reference it
var componentsModule = angular.module('components');

componentsModule.directive('streamcomponent', function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      name : "=name",
      events : "=events"
    },
    //templateUrl: 'app/components/event/event.html',
    controller: function ($scope, $element) {
      
      
    },
    templateUrl: 'app/components/stream/stream.html',
    replace: true
  };
});
