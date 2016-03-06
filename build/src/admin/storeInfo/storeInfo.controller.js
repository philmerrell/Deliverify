(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .controller('StoreInfoCtrl', StoreInfoCtrl);
    
    
    function StoreInfoCtrl($mdToast, AppService) {
      var vm = this;
      
      AppService.setNavTitle('STORE INFO')
      
      vm.store = {
        displayName: 'The Appwich 5000',
        tagline: 'The most advanced delivery system ever',
        address: '111 N. 11th St',
        city: 'Boise',
        state: 'Id',
        zip: '83702',
        email: 'hello@theappwich5000',
        phone: '208-331-1734'
      };
      
      vm.saveStoreInfo = saveStoreInfo;
      
      
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