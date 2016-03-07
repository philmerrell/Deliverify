(function() {
  'use strict';
  
  angular
    .module('app.services')
    .factory('AppService', AppService);
   
    
    function AppService() {
      
      var navTitle = '';
      var navActions = [];
      var freeTrialInfo = {};
      
      return {
        getNavTitle: getNavTitle,
        setNavTitle: setNavTitle,
        setNavActions: setNavActions,
        getNavActions: getNavActions,
        getFreeTrialInfo: getFreeTrialInfo,
        setFreeTrialInfo: setFreeTrialInfo
        
      }
      
      function getNavTitle() {
        return navTitle;
      }
      
      function setNavTitle(title) {
        navTitle = title;
        return navTitle;
      }
      
      function setNavActions(actions) {
        navActions = actions;
      }
      
      function getNavActions() {
        return navActions;
      }
      
      function setFreeTrialInfo(info) {
        freeTrialInfo.info = info;
      }
      
      function getFreeTrialInfo() {
        return freeTrialInfo;
      }
      
    }
})();