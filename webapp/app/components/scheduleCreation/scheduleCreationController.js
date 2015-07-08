'use strict';

angular.module('esad.scheduleCreation', ['ngRoute'])

.config(['$routeProvider',function ($routeProvider) {
  $routeProvider.when('/new', {
    templateUrl: 'app/components/scheduleCreation/scheduleCreationView.html',
    controller: 'ScheduleCreationController'
  })
}])

.controller('ScheduleCreationController', function () {

});
