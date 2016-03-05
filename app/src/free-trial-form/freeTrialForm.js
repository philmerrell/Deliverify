(function() {
  'use strict';
  
  angular
    .module('app.freeTrialForm', ['ui.router'])
    .config(FreeTrialFormConfig);
    
    function FreeTrialFormConfig($stateProvider) {
      $stateProvider
        .state('freeTrialForm', {
          url: '/your-info',
          views: {
            "main": {
              templateUrl: 'src/free-trial-form/freeTrialForm.html',
              controller: 'FreeTrialFormCtrl as vm'
            }
          }
        })
    }
})();