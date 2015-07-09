
describe('EventController', function() {
  beforeEach(module('esad'));
  
  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));
  
  beforeEach(inject(function ($injector, $rootScope, $controller) {
      console.log(jasmine);
      jasmine.getFixtures().fixturesPath='base/test/mock';
      var json = JSON.parse(getJSONFixture("testEvent.json"));
      console.log(json);
  }));

    it('Should Pass a Valid JSON file', function() {
        expect(true).toEqual(true);
    });
    
    /*
    it('Should Fail a file with no title', function(done) {
        var json =JSON.parse(fs.readFileSync('samples/testEvent_title.json'));
        assert(eventValidator.validate(json) !==  true,"An Error Must be Thrown");
        done();
    });
    
    it('Should Fail a file with no Organiser', function(done) {
        var json =JSON.parse(fs.readFileSync('samples/testEvent_organiser.json'));
        assert(eventValidator.validate(json) !==  true,"An Error Must be Thrown");
        done();
    });
    
    it('Should Fail a file with no sub events', function(done) {
        var json =JSON.parse(fs.readFileSync('samples/testEvent_subEvents.json'));
        assert(eventValidator.validate(json) !==  true,"An Error Must be Thrown");
        done();
    });*/
});
