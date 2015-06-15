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
            '<div class="expandable" ng-class="{visible:expanded}">'+
                '<h3>{{event.location}}</h3>' + 
                '<h3>{{event.start}}</h3>' +
                '<h3>{{event.end}}</h3>' + 
                '<p>{{event.description}}</p>' +
                '<ul>' +
                    '<li ng-repeat="person in event.people">' +
                         '<h3>{{person.name}}</h3>' +
                    '</li>' +
                '</ul>' +
            '<div>'+
        '</div>',
      replace: true
    };
  }).directive('map',function(){
    return {
        restict: 'E',
        transclude:true,
        scope: {
            location:"=location"
        },
        controller: function($scope,$element){
            $scope.mapExpanded = false;
            
            
            $scope.doSearch = function(){
                
                if ($scope.location){
                    console.log($scope.location);
                    if ("geolocation" in navigator) {
                      navigator.geolocation.getCurrentPosition(function(position) {
                          var usersLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                          console.log(usersLocation);
                          $scope.map = new google.maps.Map(document.getElementById("gmaps"), {
                                center:usersLocation,
                                zoom:15
                          });
                          var infowindow = new google.maps.InfoWindow();
                          var service = new google.maps.places.PlacesService($scope.map);
                          service.textSearch({
                              query: $scope.location,
                              location: usersLocation,
                              radius: 10000
                          }, function(results,status){
                                $scope.mapExpanded = true;
                                for (var i = 0; i < results.length; i++) {
                                    var placeLoc = results[i].geometry.location;
                                    var marker = new google.maps.Marker({
                                        map: $scope.map,
                                        position: results[i].geometry.location
                                    });
                                    if (i === 0){
                                        $scope.map.setCenter(results[i].geometry.location);
                                    }
                                }
                          });
                      });
                    } else {
                        alert("No Geolocation");
                    }
                }
            }
        },
        template: '<h3 ng-click="doSearch()">{{location}}</h3>' +
                    '<div id="gmaps" class="mapWindow" ng-class="{visible:mapExpanded}"></div>'
    }
})