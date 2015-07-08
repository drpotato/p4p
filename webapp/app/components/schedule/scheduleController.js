'use strict';

angular.module('esad.schedule', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'app/components/schedule/schedule.html'
  })
}])

.controller(function () {
  // TODO: Migrate EventController here.
});
