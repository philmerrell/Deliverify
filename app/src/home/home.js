(function() {
  'use strict';
  
  angular
    .module('app.home', ['ui.router'])
    .config(HomeConfig);
    
  function HomeConfig($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        views: {
          "main": {
            templateUrl: 'src/home/home.html',
            controller: 'HomeCtrl as vm'
          }
        }
      });
  }  
    
})();