'use strict';

angular.module('esad.scheduleCreation', ['ngRoute', 'angular-json-editor', 'esad.openConferenceFormat'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/new', {
    templateUrl: 'app/components/scheduleCreation/scheduleCreationView.html',
    controller: 'ScheduleCreationController'
  })
}])

.controller('ScheduleCreationController', function ($scope, openConferenceFormat) {
  $scope.schema = openConferenceFormat.schema;
  $scope.schedule = {};

  $scope.formChanged = function (form) {
    $scope.schedule = form;
  };

  $scope.download = function() {
    var objString = JSON.stringify($scope.schedule);
    var url = 'data:text/json;charset=utf8,' + encodeURIComponent(objString);

    // There's probably a more angular way of doing this.
    window.open(url, '_blank');
    window.focus();
  }

});
