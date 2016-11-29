(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('BrandingCtrl', SettingsCtrl);


  function SettingsCtrl($mdToast, AppService, UploadService, StoreService) {
    var vm = this;

    vm.branding = StoreService.getStoreBranding();

    vm.fileChanged = fileChanged;
    vm.saveStoreInfo = saveStoreInfo;

    activate();


    /////////////////////////////////

    function activate() {
      AppService.setNavTitle('BRANDING');
      // AppService.setNavActions({url: 'http://philmerrell.github.io/deliver-client/', title: 'View app'});
    }

    function fileChanged(el) {
      var file = el.files[0];
      UploadService.uploadImage(file)
        .then(function(imageURL) {
          console.log(imageURL);
        });
    }

    function saveStoreInfo() {
      StoreService.saveStore(vm.branding);
      $mdToast.show(
        $mdToast.simple()
          .textContent('Settings updated')
          .position('top right')
          .hideDelay(3000)
      );
    }
  }
})();