(function() {
  'use strict';
  
  angular
    .module('app.freeTrialForm')
    .controller('FreeTrialFormCtrl', FreeTrialFormCtrl);
    
    function FreeTrialFormCtrl($state, AppService, StoreService, UserService) {
      var vm = this;
      vm.createTrialUser = createTrialUser;
      vm.store = {};
      
      
      //////////////////////////
      
      
      function createTrialUser() {
        // var trialInfo = AppService.getFreeTrialInfo();
        // console.log(trialInfo);
        // trialInfo.contact = trialUser;
        // UserService.setCurrentUser(trialInfo);
        StoreService.setStoreRef(UserService.getCurrentUser().uid);

        var storeId = StoreService.createNewStore(vm.store);
        $state.go('admin.orders', { store: storeId });
      }
    }
})();