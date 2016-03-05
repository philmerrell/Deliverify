(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AccountCtrl', AccountCtrl)
  ;

  function AccountCtrl(AppService) {
    var vm = this;

    AppService.setNavTitle('ACCOUNT');
  }
})();