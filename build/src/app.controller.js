(function() {
  'use strict';
  
  angular
    .module('app')
    .controller('AppCtrl', AppCtrl);
  
  function AppCtrl($mdMedia, $mdSidenav, $mdToast, $state, AppService, UserService) {
    var vm = this;
    
    // vm.authObj = $firebaseAuth();
    vm.closeSidenav = closeSidenav;
    vm.state = $state;
    vm.go = go;
    vm.freeTrialInvite = freeTrialInvite;
    vm.startFreeTrial = startFreeTrial;
    vm.openSidenav = openSidenav;
    vm.userService = UserService;
    vm.shouldLockOpen = shouldLockOpen;
    vm.appService = AppService;
    vm.signInWithGoogle = signInWithGoogle;
    
    // TODO: move into seperate component for free trial form
    vm.domainify = domainify;
    
    activate();
    
    /////////////////////////////
    
    
    function activate() {
      // console.log('Auth: ', vm.authObj);
    }
    
    function domainify(storeName) {
      var domain = storeName.replace(/\s+/g, '-');
      return domain.toLowerCase();
    }
    
    function closeSidenav(side) {
      $mdSidenav(side).close();
    }

    function freeTrialInvite(email) {
      closeSidenav('left');
      $mdToast.show(
        $mdToast.simple()
          .textContent('You\'re all signed up!')
          .position('bottom right')
          .hideDelay(3000)
      );
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

    function signInWithGoogle() {
      UserService.signInWithGoogle()
        .then(function(result){
          console.log('Controller: ', result);
        });
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