'use strict';

angular.module('esad.fileUpload',[])


.directive('customOnChange', function (fileUpload) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var callback = scope.$eval(attrs.customOnChange);
      fileUpload.callback = callback;
      element.bind('change',{callback:callback}, fileUpload.uploadFile);
    }
  };
})

.factory('fileUpload',function(){
  
  var uploadFile = function (evt) {
    var files = evt.target.files; // FileList object

    if (files.length != 1) {
      alert("Only 1 file");
    }
    var file = files[0];
    var reader = new FileReader();
    
    reader.onload = evt.data.callback;
    reader.readAsText(file);
  };
  
  return {
    uploadFile:uploadFile
  }
})
