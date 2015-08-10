'use strict';

angular.module('esad.listView', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/list', {
    templateUrl: 'app/components/listView/listView.html',
  })
}]);