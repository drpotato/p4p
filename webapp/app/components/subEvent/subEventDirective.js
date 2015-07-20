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
  
  $scope.$watch('query',function(newValue){
    if ($scope.query.length > 0){
      $scope.hint  = "";
      angular.forEach($scope.subEvent,function(value,key){
        if (typeof(value) === "string"){
          if (value.indexOf($scope.query) > 0){
            //console.log(key,value);
            $scope.hint += value + " ";
          }
        }else{
          console.log(value,"is not a string");
        }  
      });
    }else{
      $scope.hint = null;
    }
  });
  
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
      subEvent: "=subEvent",
      query:"="
    },
    templateUrl: "app/components/subEvent/subEvent.html"
  };
});
