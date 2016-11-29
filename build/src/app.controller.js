(function() {
  'use strict';
  
  angular
    .module('app')
    .controller('AppCtrl', AppCtrl);
  
  function AppCtrl($mdMedia, $mdSidenav, $mdToast, $state, AppService, UserService, StoreService, MenuService, UploadService) {
    var vm = this;
    
    vm.closeSidenav = closeSidenav;
    vm.state = $state;
    vm.go = go;
    vm.startFreeTrial = startFreeTrial;
    vm.openSidenav = openSidenav;
    vm.userService = UserService;
    vm.shouldLockOpen = shouldLockOpen;
    vm.appService = AppService;
    vm.signInWithGoogle = signInWithGoogle;
    vm.signOut = signOut;
    
    // TODO: move into seperate component for free trial form
    vm.domainify = domainify;

    vm.currentUser = null;
    vm.store = null;
    
    activate();
    
    /////////////////////////////
    
    
    function activate() {
      UserService.getAuthObj()
        .$onAuthStateChanged(function(user) {
          if(user) {
            vm.currentUser = user;
            StoreService.setStoreRef(user.uid);
            MenuService.setMenuRef(user.uid);
            UploadService.setStorageRef(user.uid);
            vm.store = StoreService.getStoreObj();
          }
          
        });
    }
    
    function domainify(storeName) {
      var domain = storeName.replace(/\s+/g, '-');
      return domain.toLowerCase();
    }
    
    function closeSidenav(side) {
      $mdSidenav(side).close();
    }
    
    function go(state) {
      closeSidenav('left');
      $state.go(state);
    }

    function navigateAfterSignIn() {
      if(vm.store.info) {
        go('admin.menu');
      } else {
        go('freeTrialForm');
      }
    }
    
    function openSidenav(side) {
      $mdSidenav(side)
        .toggle()
        .then(function () {});    
    }

    function signInWithGoogle() {
      UserService.signInWithGoogle()
        .then(function(result){
          var user = result.user;
            vm.currentUser = user;
            StoreService.setStoreRef(user.uid);
            UploadService.setStorageRef(user.uid);
            vm.store = StoreService.getStoreObj();
            navigateAfterSignIn();
          
        }).catch(function(error) {
          console.log('Error: ', error);
        });
    }

    function signOut() {
      UserService.getAuthObj().$signOut()
        .then(function() {
          vm.currentUser = null;
          vm.store = null;
          $state.go('home');
        });
    }
    
    function startFreeTrial(info) {
      closeSidenav('left');
      AppService.setFreeTrialInfo(info);
      $state.go('freeTrialForm');
    }
    
    function shouldLockOpen() {
      $state.current.name
      if($mdMedia('gt-sm') && vm.currentUser && vm.store.branding.name) {
        return true;
      } else {
        return false;
      }
    }
    
  }
})();