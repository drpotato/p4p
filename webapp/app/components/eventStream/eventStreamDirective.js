'use strict';

angular.module('esad.stream', [])

.controller('StreamController', function ($scope, $element,$filter) {
  $scope.subEvents = $scope.events.filter(function(item){
    return (item.location === $scope.name);
  });
  
 
  $scope.$watch('query',function(){
    var numEvents = $filter("filter")($scope.subEvents, $scope.query).length;
    if (numEvents > 0){
      $scope.display = {'display':'block'};  
    }else{
      console.log("Hide");
      $scope.display = {'display':'none'};
    }
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
