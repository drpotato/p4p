angular.module('components', [])
  .directive('eventitem', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          event:"=event"
      },
      controller: function($scope, $element) {
        $scope.expanded = false;
        $scope.expand = function(){
            $scope.expanded = !$scope.expanded;
        };
      },
      template:
        '<div ng-click="expand()" class="panel-body">' +
            '<h3>{{event.title}}</h3>' +
            '<div class="eventListItem" ng-class="{visible:expanded}">'+
                '<h3>{{event.location}}</h3>' + 
                '<h3>{{event.start}}</h3>' +
                '<h3>{{event.end}}</h3>' + 
                '<p>{{event.description}}</p>' +
                '<ul>' +
                    '<li ng-repeat="person in event.people.person">' +
                         '<h3>{{person.name}}</h3>' +
                    '</li>' +
                '</ul>' +
            '<div>'+
        '</div>',
      replace: true
    };
  })