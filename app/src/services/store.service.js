(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .service('StoreService', StoreService);
    
    function StoreService($firebaseArray, $firebaseObject, $state) {
      var ref = null;
      var hoursArray = null;
      var storeObj = null;
      var storeLocation = null;
      var storeLocations = null;

      var service = {
        addStoreHours       : addStoreHours,
        addStoreLocation    : addStoreLocation,
        createNewStore      : createNewStore,
        getStoreObj         : getStoreObj,
        getStoreBranding    : getStoreBranding,
        getStoreHours       : getStoreHours,
        getStoreInfo        : getStoreInfo,
        getStoreLocations   : getStoreLocations,
        getStoreLocation    : getStoreLocation,
        getDemoStore        : getDemoStore,
        getStoreRef         : getStoreRef,
        removeStoreHours    : removeStoreHours,
        removeStoreLocation : removeStoreLocation,
        saveStore           : saveStore,
        saveStoreLocation   : saveStoreLocation,
        setStoreLocation    : setStoreLocation,
        // setStoreObj         : setStoreObj,
        setStoreRef         : setStoreRef
      };
      
      return service;
      
      ////////////////////////////////////////////////
      
      function createNewStore(storeName) {
        var store = {
          branding: {
            name: storeName
          }
        };
        var store = ref.set(store);
      }

      function saveStore(store) {
        store.$save().then(function(ref) {
        }, function(error) {
          console.log("Error:", error);
        });
      }

      function addStoreHours(hours) {
        getStoreHours().$add(hours);
      }

      function removeStoreHours(hours) {
        console.log(getStoreHours(), hours);
        getStoreHours().$remove(hours).catch(function(err) {
          console.log(err);
        });
      }

      function addStoreLocation(location) {
        getStoreLocations().$add(location);
      }

      function getStoreLocation() {
        return storeLocation;
      }

      function setStoreLocation(location) {
        storeLocation = location
      }

      function removeStoreLocation(location) {
        getStoreLocations().$remove(location.$id);
      }

      function saveStoreLocation(location) {
        console.log(getStoreLocations(), location);
        getStoreLocations().$save(location);
      }

      function getStoreInfo() {
        return $firebaseObject(ref.child('info'));
      }

      function getStoreBranding() {
        return $firebaseObject(ref.child('branding'));
      }

      function getStoreHours() {
        if(!hoursArray) {
          hoursArray = $firebaseArray(ref.child('hours'));
        }
        return hoursArray;
      }

      function getStoreLocations() {
        if(!storeLocations) {
          storeLocations = $firebaseArray(ref.child('locations'));
        }
        return storeLocations;
      }

      function getDemoStore() {
        return {
          info: {
            name: 'The Appwich 5000',
            tagline: 'The most advanced delivery system ever',
            address: '111 N. 11th St',
            address2: '',
            city: 'Boise',
            state: 'Id',
            zip: '83702',
            email: 'hello@theappwich5000.com',
            phone: '208-331-1734',
            hours: [],
            deliveryZones: []        
          },
          menu: {
            items: [],
            categories:['Sandwiches', 'Drinks']
          },
          orders: []
                    
        }
      }
      
      // function setStoreObj(id) {
      //   var storeRef = $firebaseObject(ref);
      // }

      function setStoreRef(uid) {
        ref = firebase.database().ref('stores/' + uid);
      }
      
      function getStoreRef() {
        return ref;
      }

      function getStoreObj() {
        storeObj = $firebaseObject(ref);
        return storeObj;
      }

    }
})();