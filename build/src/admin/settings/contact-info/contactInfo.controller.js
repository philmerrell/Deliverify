(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('ContactInfoCtrl', ContactInfoCtrl);


  function ContactInfoCtrl($mdToast, $state, AppService, StoreService) {
    var vm = this;

    
    vm.info = StoreService.getStoreInfo();
    vm.saveStoreInfo = saveStoreInfo;

    activate();

    ////////////////////////////////////

    function activate() {
      AppService.setNavTitle('CONTACT INFO');
      // AppService.setNavActions({url: 'http://philmerrell.github.io/deliver-client/', title: 'View app'});
    }


    function saveStoreInfo() {
      StoreService.saveStore(vm.info);
      $mdToast.show(
        $mdToast.simple()
          .textContent('Info saved')
          .position('bottom right')
          .hideDelay(3000)
      );

      $state.go('admin.settings');
    }
  }
})();