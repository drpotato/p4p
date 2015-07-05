var eventApp = angular.module('event', ['components']);

eventApp.directive('customOnChange', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeFunc);
    }
  };
});

eventApp.controller('EventController', function ($scope, $http, openConferenceFormat) {

    $scope.validate = function () {
      var eventJSON = JSON.parse($scope.jsonText);
      var result = openConferenceFormat.validate(eventJSON);
      if (result.errors) {
          //Handle Error States
          $scope.event = null;
          result.errors.forEach(function (error) {
            alert(error.field + " " + error.message);
          });
        } else {
          $scope.event = eventJSON.event;
          console.log($scope.event);
        }
    };

    $scope.makeICS = function(){
        //TODO: maybe this can be an angular module so we don't have to declare it in the html as well?
        var cal = ics();
        $scope.event.subEvents.forEach(function(subEvent){
            console.log(subEvent);
            cal.addEvent(subEvent.title,subEvent.title,subEvent.location,subEvent.startTime, subEvent.endTime);
        });
        cal.download();
    };


});
