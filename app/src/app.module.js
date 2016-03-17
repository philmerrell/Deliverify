(function() {
  'use strict';

  angular
    .module('app', ['ngMaterial', 'ui.router', 'uiGmapgoogle-maps', 'firebase', 'color.picker', 'textAngular', 'app.home', 'app.freeTrialForm', 'app.services', 'app.admin'])
    .config(function($mdThemingProvider, $mdIconProvider, $stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
      $mdIconProvider
        .defaultIconSet("./assets/svg/avatars.svg", 128)
        .icon("menu"       , "./assets/svg/menu.svg"        , 24)
        .icon("share"      , "./assets/svg/share.svg"       , 24)
        .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
        .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
        .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
        .icon("phone"      , "./assets/svg/phone.svg"       , 512);

      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('pink')
        .backgroundPalette('grey');

      $urlRouterProvider.otherwise("/");

      uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCjY6ww8ne3L5JBOpjvyWF4uDEwVBMbSsM',
        v: '3.23', //defaults to latest 3.X anyhow
        libraries: 'geometry,drawing'
      });
    });

})();