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
    console.log(JSON.stringify(form));
    $scope.schedule = form;
  };

  var json = JSON.stringify($scope.form);

  $scope.url = URL.createObjectURL(new Blob([json], {type: "application/json"}));
});
