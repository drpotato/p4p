'use strict';

angular.module('esad.dataImport', ['ngRoute','esad.openConferenceFormat','esad.fileUpload','esad.errorView'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/import', {
    templateUrl: 'app/components/dataImport/importPageView.html',
    controller: 'importPageController'
  })
}])

.controller('importPageController', function ($scope,openConfXML ,openConferenceFormat,displayError) {
  $scope.onLoad = function(e){
    var xml = openConfXML.parse(e.target.result);
    console.log(xml);
    var eventJSON = openConfXML.convert(xml);
    var result = openConferenceFormat.validate(eventJSON);
    if(result.valid === true){
      $scope.download(eventJSON);
    }else{
      displayError.display(result.errors);
    }
  };
  
  
  $scope.download = function(eventJSON) {
    var objString = JSON.stringify(eventJSON, null, 2);
    var url = 'data:text/json;charset=utf8,' + encodeURIComponent(objString);

    // There's probably a more angular way of doing this.
    window.open(url, '_blank');
    window.focus();
  };

});
