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

  $scope.onSubmit = function () {
    console.log('onSubmit data in sync controller', $scope.editor.getValue());
  };

  $scope.onAction2 = function () {
    console.log('onAction2');
  };


});
