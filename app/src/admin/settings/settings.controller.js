(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('SettingsCtrl', StoreInfoCtrl);


  function StoreInfoCtrl($mdToast, AppService) {
    var vm = this;

    vm.store = {
      displayName: 'Joe\'s Sandwiches',
      tagline: 'The most advanced delivery system ever',
      address: '111 N. 11th St',
      city: 'Boise',
      state: 'Id',
      zip: '83702',
      email: 'hello@joessandwiches.com',
      phone: '208-331-1734'
    };

    vm.saveStoreInfo = saveStoreInfo;

    activate();

    ////////////////////////////////////////////

    function activate() {
      AppService.setNavTitle('SETTINGS');
      AppService.setNavActions({url: 'http://philmerrell.github.io/deliver-client/', title: 'View app'});
    }


    function saveStoreInfo(storeInfo) {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Info saved')
          .position('bottom right')
          .hideDelay(3000)
      );
    }
  }
})();