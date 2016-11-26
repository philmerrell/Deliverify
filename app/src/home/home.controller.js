(function() {
  'use strict';
  
  angular
    .module('app.home')
    .controller('HomeCtrl', HomeCtrl);
    
    function HomeCtrl($mdSidenav, $state, currentAuth) {
      var vm = this;
      
      vm.openFreeTrial = openFreeTrial;
      // vm.startDemo = startDemo;
      // vm.userService = UserService;

      activate();
      
      
      ///////////////////////////

      function activate() {
        if(currentAuth) {
          $state.go('admin.menu');
        }
      }
      
      function openFreeTrial() {
        $mdSidenav('left')
          .toggle()
          .then(function () {});
      }
      
      // function startDemo() {
      //   UserService.setCurrentUser({});
      //   $state.go('admin.orders', {store: 'demo'});
      // }
    }
})();