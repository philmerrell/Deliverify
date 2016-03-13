(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .service('StoreService', StoreService);
    
    function StoreService($firebaseArray, $state) {
      var storeId = '';
      var storeRef;
      var firebase = new Firebase("https://deliverify-phil.firebaseio.com/stores/");
      var ref = new Firebase("https://philmerrell.firebaseio.com/orders/");


      var service = {
        createNewStore                : createNewStore,
        getDemoStore                  : getDemoStore,
        getEnrouteDeliveryOrders      : getEnrouteDeliveryOrders,
        getIncomingOrders             : getIncomingOrders,
        getReadyForDeliveryOrders     : getReadyForDeliveryOrders,
        getStoreId                    : getStoreId,
        setStoreId                    : setStoreId,
        getStoreRef                   : getStoreRef,
        setStoreRef                   : setStoreRef
        //updateDeliveryStatusToEnroute : updateDeliveryStatusToEnroute
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

      function getIncomingOrders() {
        
        if(storeId === 'demo') {
          return $firebaseArray(ref.orderByChild("progress").equalTo("Ordered"));
        } else {

        }
        
      }

      function getReadyForDeliveryOrders() {
        return $firebaseArray(ref.orderByChild("progress").equalTo("Made"));
      }

      function getEnrouteDeliveryOrders() {
        return $firebaseArray(ref.orderByChild("progress").equalTo("Delivering"));
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