'use strict';

angular.module('esad.subEvent', ['ui.bootstrap','ui.bootstrap.modal','esad.calendarGenerator'])

.controller('SubEventController', function ($scope, $modal,calendarGenerator) {
  $scope.expanded = false;
  $scope.saved = false;
  $scope.expand = function (size) {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'myModalContent.html',
      controller: 'SubEventModalInstanceCtrl',
      size: size,
      resolve: {
        subEvent: function () {
          return $scope.subEvent;
        },
        saved: function () {
          return $scope.saved;
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
    transclude:true,
    scope: {
      subEvent: "=subEvent"
    },
    templateUrl: "app/components/subEvent/subEvent.html"
  };
}).controller('SelectedEventIndicator', function ($scope,calendarGenerator) {
  
  $scope.display = "";
  
  calendarGenerator.onSubEventSaveStatusChange($scope.subEvent,function(status){
    if (status === "saved"){
      $scope.display = "I have been saved";
    }else{
      $scope.display = "";
    }
  });
  
}).directive('selectedEventIndicator',function(){
  return {
    restrict: 'E',
    require: ['^subEvent', 'selectedEventIndicator'],
    scope: {
      subEvent:'='
    },
    templateUrl: "app/components/subEvent/selectedEventIndicator.html"
  };
});
