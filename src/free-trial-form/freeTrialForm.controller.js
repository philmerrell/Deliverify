(function() {
  'use strict';
  
  angular
    .module('app.freeTrialForm')
    .controller('FreeTrialFormCtrl', FreeTrialFormCtrl);
    
    function FreeTrialFormCtrl($state, AppService, StoreService, UserService) {
      var vm = this;
      vm.createTrialUser = createTrialUser;
      
      
      //////////////////////////
      
      
      function createTrialUser(trialUser) {
        var trialInfo = AppService.getFreeTrialInfo();
        console.log(trialInfo);
        trialInfo.contact = trialUser;
        UserService.setCurrentUser(trialInfo);
        var storeId = StoreService.createNewStore(trialInfo);
        $state.go('admin.orders', {store: storeId});
      }
    }
})();