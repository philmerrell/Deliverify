(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('BrandingCtrl', SettingsCtrl);


  function SettingsCtrl($mdToast, AppService, StoreService) {
    var vm = this;

    vm.branding = StoreService.getStoreBranding();

    vm.saveStoreInfo = saveStoreInfo;

    activate();


    /////////////////////////////////

    function activate() {
      AppService.setNavTitle('BRANDING');
      // AppService.setNavActions({url: 'http://philmerrell.github.io/deliver-client/', title: 'View app'});
    }

    function saveStoreInfo() {
      StoreService.saveStore(vm.branding);
      $mdToast.show(
        $mdToast.simple()
          .textContent('Settings updated')
          .position('bottom right')
          .hideDelay(3000)
      );
    }
  }
})();