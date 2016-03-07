(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('SettingsCtrl', SettingsCtrl);


  function SettingsCtrl($mdToast, AppService) {
    var vm = this;

    AppService.setNavTitle('SETTINGS');

    vm.app = {
      displayName: 'Mealatron 9000',
      tagline: 'The most advanced delivery sandwich ever'
    };

    vm.saveSettings = saveSettings;


    function saveSettings(settings) {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Settings updated')
          .position('bottom right')
          .hideDelay(3000)
      );
    }
  }
})();