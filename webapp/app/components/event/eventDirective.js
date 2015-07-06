'use strict';

angular.module('components', [])

//.controller(function ($scope, $element) {
//  $scope.expanded = false;
//  $scope.expand = function () {
//    $scope.expanded = !$scope.expanded;
//  };
//})

.directive('eventitem', function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      event: "=event"
    },
    //templateUrl: 'app/components/event/event.html',
    controller: function ($scope, $element) {
      $scope.expanded = false;
      $scope.expand = function () {
        $scope.expanded = !$scope.expanded;
      };
    },
    template: '<div ng-click="expand()" class="panel-body">' +
    '<h3>{{event.title}}</h3>' +
    '<div class="expandable" ng-class="{visible:expanded}">' +
    '<h3>{{event.location}}</h3>' +
    '<h3>{{event.start}}</h3>' +
    '<h3>{{event.end}}</h3>' +
    '<p>{{event.description}}</p>' +
    '<p ng-if="event.tags">Tags: <a ng-repeat="tag in event.tags">{{ tag }} </a></p>' +
    '<ul>' +
    '<li ng-repeat="person in event.people">' +
    '<h3>{{person.name}}</h3>' +
    '<div>{{person.role}}</div>' +
    '<div ng-if="person.contactDetails">' +
    '<div>Contact Details:</div>' +
    '<ul>' +
    '<li ng-repeat="detail in person.contactDetails"> {{detail.type}} - {{detail.value}}</li>' +
    '</ul>' +
    '</div>' +
    '</li>' +
    '</ul>' +
    '<div>' +
    '</div>',
    replace: true
  };
});
