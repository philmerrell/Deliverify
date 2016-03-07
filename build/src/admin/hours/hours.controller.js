(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .controller('HoursCtrl', HoursCtrl)
  ;
  
  function HoursCtrl(AppService) {
    var vm = this;
    
    AppService.setNavTitle('DELIVERY HOURS');
  }
})();