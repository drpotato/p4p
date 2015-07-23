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
  
  var setSaveButtonText = function(savedState){
    if (savedState){
      $scope.saveText = "Delete from Saved Events";
    }else{
      $scope.saveText= "Save this event";
    }
    
  }
  
  setSaveButtonText(calendarGenerator.getSubEventSaveStatus($scope.subEvent) === "saved");
  
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.save = function () {
    if (calendarGenerator.getSubEventSaveStatus($scope.subEvent) === "saved"){
      calendarGenerator.removeSubEvent($scope.subEvent);
    }else{
      calendarGenerator.addSubEvent($scope.subEvent);
    }
  };
  
  
  calendarGenerator.onSubEventSaveStatusChange($scope.subEvent,function(status){
    setSaveButtonText(status === "saved");
  });
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
  
  $scope.display = {'display':'none'};  
  
  calendarGenerator.onSubEventSaveStatusChange($scope.subEvent,function(status){
    if (status === "saved"){
      $scope.display = {'display':'block'};  
    }else{
      $scope.display = {'display':'none'};  
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
