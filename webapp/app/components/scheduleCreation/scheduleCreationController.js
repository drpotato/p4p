'use strict';

angular.module('esad.scheduleCreation', ['ngRoute', 'angular-json-editor', 'cfp.hotkeys', 'esad.openConferenceFormat'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/new', {
    templateUrl: 'app/components/scheduleCreation/scheduleCreationView.html',
    controller: 'ScheduleCreationController'
  })
}])

.controller('ScheduleCreationController', function ($scope, openConferenceFormat, hotkeys) {
  $scope.schema = openConferenceFormat.schema;
  $scope.newSchedule = JSON.parse(localStorage.getItem('newSchedule.json'));

  $scope.formChanged = function (form) {
    $scope.newSchedule = form;
    localStorage.setItem('newSchedule.json', JSON.stringify(form));
  };

  $scope.download = function() {
    var objString = JSON.stringify($scope.newSchedule, null, 2);
    var url = 'data:text/json;charset=utf8,' + encodeURIComponent(objString);

    // There's probably a more angular way of doing this.
    window.open(url, '_blank');
    window.focus();
  };

  hotkeys.add({
    combo: 'mod+s',
    description: 'Save schedule',
    callback: function (event) {
      event.preventDefault();
      $scope.download()
    }
  });

});
