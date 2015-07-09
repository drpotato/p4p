
describe('EventController', function() {
  beforeEach(module('esad'));
  
  var $controller;
  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));
  
    it('Should Pass a Valid JSON file', function() {
        var json = readJSON("samples/testEvent.json");
        var $scope = {};
        var controller = $controller('EventController', { $scope: $scope });
        expect($scope.validateFile(json).valid).toEqual(true);
    });
    
    
    it('Should Fail a file with no title', function() {
        var json = readJSON("samples/testEvent_title.json");
        var $scope = {};
        var controller = $controller('EventController', { $scope: $scope });
        expect($scope.validateFile(json).valid).toEqual(false);
      
    });
    
    it('Should Fail a file with no Organiser', function() {
        var json = readJSON("samples/testEvent_organiser.json");
        var $scope = {};
        var controller = $controller('EventController', { $scope: $scope });
        expect($scope.validateFile(json).valid).toEqual(false);
    });
    
    it('Should Fail a file with no sub events', function() {
        var json = readJSON("samples/testEvent_subEvents.json");
        var $scope = {};
        var controller = $controller('EventController', { $scope: $scope });
        expect($scope.validateFile(json).valid).toEqual(false);
    });
});
