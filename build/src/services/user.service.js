(function() {
  'use strict';
  
  angular
    .module('app.services')
    .factory('UserService', UserService);
   
    
    function UserService($firebaseAuth) {
      
      var currentUser = false;
      var authObj = $firebaseAuth();
      
      return {
        getCurrentUser    : getCurrentUser,
        setCurrentUser    : setCurrentUser,
        signInWithGoogle  : signInWithGoogle
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
            console.log("Signed in as:", result.user);
            return result;
          })
          .catch(function(error) {
            console.error("Authentication failed:", error);
            return error;
        });
    }
      
    }
})();