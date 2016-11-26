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
          },
          resolve: {
            // controller will not be loaded until $requireSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["UserService", function(UserService) {
              // $requireSignIn returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $stateChangeError (see above)
              return UserService.getAuthObj().$requireSignIn();
            }]
          }
        });
    }
})();