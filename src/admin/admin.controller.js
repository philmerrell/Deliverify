(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .controller('AdminCtrl', AdminCtrl);
    
    
    function AdminCtrl($location, StoreService) {
      var vm = this;
      
      var urlParams = $location.search();
      
      StoreService.setStoreId(urlParams.store);

      
    }
})();