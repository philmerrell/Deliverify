(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .service('StoreService', StoreService);
    
    function StoreService($firebaseArray, $firebaseObject, $state) {
      var ref = null;
      var storeObj = null;

      var service = {
        addStoreHours   : addStoreHours,
        removeStoreHours  : removeStoreHours,
        createNewStore  : createNewStore,
        saveStore       : saveStore,
        getStoreBranding: getStoreBranding,
        getStoreHours   : getStoreHours,
        getStoreInfo    : getStoreInfo,
        getDemoStore    : getDemoStore,
        getStoreRef     : getStoreRef,
        setStoreRef     : setStoreRef,
        getStoreObj     : getStoreObj
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
        getStoreHours().$remove(hours);
      }

      function getStoreInfo() {
        return $firebaseObject(ref.child('info'));
      }

      function getStoreBranding() {
        return $firebaseObject(ref.child('branding'));
      }

      function getStoreHours() {
        return $firebaseArray(ref.child('hours'));
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

      // function getIncomingOrders() {

      //   if(storeId === 'demo') {
      //     return $firebaseArray(ref.orderByChild("progress").equalTo("Ordered"));
      //   } else {}
      // }

      // function getReadyForDeliveryOrders() {
      //   return $firebaseArray(ref.orderByChild("progress").equalTo("Made"));
      // }

      // function getEnrouteDeliveryOrders() {
      //   return $firebaseArray(ref.orderByChild("progress").equalTo("Delivering"));
      // }
      
      function setStoreObj(id) {
        var storeRef = $firebaseObject(ref);
      }

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

      //function updateDeliveryStatusToEnroute(order) {
      //  order.orderStatus = 'Order Enroute';
      //  order.progress = 'Delivering';
      //  order.selected = false;
      //
      //  var orderRef = ref.child(order.$id);
      //  orderRef.update(order);
      //
      //  //ref.update(order);
      //
      //}
    }
})();