(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .directive('apsUploadFile', apsUploadFile);

function apsUploadFile() {
    var directive = {
        restrict: 'E',
        templateUrl: 'src/admin/file-upload.html',
        link: apsUploadFileLink
    };
    return directive;
}

function apsUploadFileLink(scope, element, attrs) {
  
    var el = angular.element(element)
    //   console.log('Button', el.find('button'));

    var input = angular.element(el.querySelector('#fileInput'));
    var button = el.find('#uploadButton');
    var textInput = el.find('#textInput');


    if (input.length && button.length) {
      button.click(function() {
       input.click() 
      });
    }

    console.log('Input: ', input);
    input.on('change', function (e) {
        var files = e.target.files;
        if (files[0]) {
            scope.fileName = files[0].name;
        } else {
            scope.fileName = null;
        }
        scope.$apply();
    });
}
})();