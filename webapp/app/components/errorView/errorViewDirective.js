'use strict';

angular.module('esad.errorView', ['ui.bootstrap','ui.bootstrap.modal'])

.factory('displayError',function(){
  var listeners = [];
  
  return {
    display:function(err){
      listeners.forEach(function(listener){
        listener(err);
      });
    },
    register:function(callback){
      listeners.push(callback);
    }
  };
})

.controller('ErrorViewController',function ($scope, $modal,displayError) { 
  displayError.register(function(error){
    $scope.errors = error;
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'errorViewModal.html',
      controller: 'ErrorViewModalInstanceCtrl',
      resolve: {
        errors: function () {
          return $scope.errors;
        }
      }
    });
  });

}).controller('ErrorViewModalInstanceCtrl', function ($scope, $modalInstance, errors) {
  $scope.errors = errors;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})
.directive('errorView', function () {
  return {
    restrict: 'E',
    scope: {
      errors: "="
    },
    templateUrl: "app/components/errorView/errorView.html"
  };
});
