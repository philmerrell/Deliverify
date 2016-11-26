(function() {
  'use strict';
  
  angular
    .module('app.freeTrialForm')
    .controller('FreeTrialFormCtrl', FreeTrialFormCtrl);
    
    function FreeTrialFormCtrl($state, AppService, StoreService, UserService, currentAuth) {
      var vm = this;
      vm.createTrialUser = createTrialUser;
      vm.storeName = null;
      
      //////////////////////////
      
      function createTrialUser() {
        StoreService.createNewStore(vm.storeName);
        $state.go('admin.menu');
      }
    }
})();