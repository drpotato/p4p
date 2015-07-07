'use strict';

angular.module('components')
  
.controller('MapController', function ($scope, $element) {
  $scope.mapExpanded = false;
  $scope.doSearch = function () {
    if ($scope.location) {
      console.log($scope.location);
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var usersLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          console.log(usersLocation);
          $scope.map = new google.maps.Map(document.getElementById("gmaps"), {
            center: usersLocation,
            zoom: 15
          });
          var infowindow = new google.maps.InfoWindow();
          var service = new google.maps.places.PlacesService($scope.map);
          service.textSearch({
            query: $scope.location,
            location: usersLocation,
            radius: 10000
          }, function (results, status) {
            $scope.mapExpanded = true;
            for (var i = 0; i < results.length; i++) {
              var placeLoc = results[i].geometry.location;
              var marker = new google.maps.Marker({
                map: $scope.map,
                position: results[i].geometry.location
              });
              if (i === 0) {
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
})
  
.directive('map', function () {
  return {
    restict: 'E',
    transclude: true,
    scope: {
      location: "=location"
    },
    templateUrl: 'app/components/map/map.html'
  }
});
