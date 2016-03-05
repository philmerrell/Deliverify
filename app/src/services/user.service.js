(function() {
  'use strict';
  
  angular
    .module('app.services', [])
    .factory('UserService', UserService);
   
    
    function UserService() {
      
      var currentUser = false;
      
      return {
        getCurrentUser: getCurrentUser,
        setCurrentUser: setCurrentUser
      }
      
      function getCurrentUser() {
        return currentUser;
      }
      
      function setCurrentUser(user) {
        currentUser = user;
        return currentUser;
      }
      
    }
})();