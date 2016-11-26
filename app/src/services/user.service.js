(function() {
  'use strict';
  
  angular
    .module('app.services')
    .factory('UserService', UserService);
   
    
    function UserService($firebaseAuth) {
      
      var currentUser = false;
      var authObj = $firebaseAuth();
      
      return {
        getAuthObj        : getAuthObj,
        getCurrentUser    : getCurrentUser,
        setCurrentUser    : setCurrentUser,
        signInWithGoogle  : signInWithGoogle
      }

      function getAuthObj() {
        return authObj;
      }
      
      function getCurrentUser() {
        return currentUser;
      }
      
      function setCurrentUser(user) {
        currentUser = user;
        return currentUser;
      }

      function signInWithGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        
        return authObj.$signInWithPopup(provider)
          .then(function(result) {
            setCurrentUser(result.user);
            return result;
          })
          .catch(function(error) {
            console.error("Authentication failed:", error);
            return error;
        });
    }
      
    }
})();