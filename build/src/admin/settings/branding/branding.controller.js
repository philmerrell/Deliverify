(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('BrandingCtrl', SettingsCtrl);


  function SettingsCtrl($mdToast, AppService) {
    var vm = this;

    vm.app = {
      displayName: 'Joe\'s Sandwiches',
      tagline: 'The most powerful sandwich system ever',
      primaryColor: "#387EF5",
      secondaryColor: '#5BE283',
      attentionColor: '#F53D3D',
      imagePath: 'assets/img/freshblur.jpg',
      marketingMessage: '<h3>Simple Ordering</h3><p>So simple a baby could do it.</p><hr><h3>Delicious Food</h3><p>Prepared by people that don\'t hate their jobs.</p><hr><h3>Fast Delivery</h3><p>We\'re timed for analytics and stuff.</p><hr><h3>Real-time Tracking</h3><p>Behold the power of our sandwich tracking technology.</p><hr>'

    };

    vm.saveSettings = saveSettings;

    activate();


    /////////////////////////////////

    function activate() {
      AppService.setNavTitle('BRANDING');
      AppService.setNavActions({url: 'http://philmerrell.github.io/deliver-client/', title: 'View app'});
    }

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