(function() {
  'use strict';
  
  angular
    .module('app')
    .controller('AppCtrl', AppCtrl);
  
  function AppCtrl($mdMedia, $mdSidenav, $state, AppService, UserService) {
    var vm = this;
    
    vm.closeSidenav = closeSidenav;
    vm.state = $state;
    vm.go = go;
    vm.startFreeTrial = startFreeTrial;
    vm.openSidenav = openSidenav;
    vm.userService = UserService;
    vm.shouldLockOpen = shouldLockOpen;
    vm.appService = AppService;
    
    // TODO: move into seperate component for free trial form
    vm.domainify = domainify;
    
    activate();
    
    /////////////////////////////
    
    
    function activate() {
      
    }
    
    function domainify(storeName) {
      var domain = storeName.replace(/\s+/g, '');
      return domain.toLowerCase();
    }
    
    function closeSidenav(side) {
      $mdSidenav(side).close();
    }
    
    function go(state) {
      closeSidenav('left');
      $state.go(state);
    }
    
    function openSidenav(side) {
      $mdSidenav(side)
        .toggle()
        .then(function () {});    
    }
    
    function startFreeTrial(info) {
      closeSidenav('left');
      AppService.setFreeTrialInfo(info);
      $state.go('freeTrialForm');
    }
    
    function shouldLockOpen() {
      
      $state.current.name
      
      if($mdMedia('gt-sm') && UserService.getCurrentUser()) {
        return true;
      } else {
        return false;
      }
      
    }
    
  }
})();