(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .service('StoreService', StoreService);
    
    function StoreService($firebaseArray, $state) {
      var storeId = '';
      var storeRef;
      var firebase = new Firebase("https://deliverify-phil.firebaseio.com/stores/");
      
      var service = {
        createNewStore      : createNewStore,
        getDemoStore        : getDemoStore,
        getIncomingOrders   : getIncomingOrders,
        getStoreId          : getStoreId,
        setStoreId          : setStoreId,
        getStoreRef         : getStoreRef,
        setStoreRef         : setStoreRef
      };
      
      return service;
      
      ////////////////////////////////////////////////
      
      function createNewStore(freeTrialInfo) {
        var store = firebase.push(freeTrialInfo);
        
        return store.key();
      }
      
      
      function getDemoStore() {
        
        return {
          storeInfo: {
            displayName: 'The Appwich 5000',
            tagline: 'The most advanced delivery system ever',
            address: '111 N. 11th St',
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
      
      function getMenuItems() {
        
      }
      
      // Firebase
      
      function getIncomingOrders() {
        
        if(storeId === 'demo') {
          var ref = new Firebase("https://philmerrell.firebaseio.com/orders/");
          return $firebaseArray(ref.orderByChild("progress").equalTo("Ordered"));
        } else {
          var ref = new Firebase("https://philmerrell.firebaseio.com/orders/");
          return $firebaseArray(ref.orderByChild("progress").equalTo("Ordered"));
        }
        
      }
      
      function getStoreId() {
        return storeId;
        
      }
      
      function setStoreId(id) {
        storeId = id;
        service.setStoreRef(storeId);
        return storeId;
      }
      
      function setStoreRef(id) {
        var storeRef = new Firebase("https://deliverify-phil.firebaseio.com/stores/"+id);
      }
      
      function getStoreRef() {
        return storeRef;
      }
    }
})();