(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .controller('OrdersCtrl', OrdersCtrl);
    
    function OrdersCtrl($firebaseArray, $state, AppService, StoreService) {
      var vm = this;
      var demoMode = $state.params;
      
      vm.orders = [];
      
      
      AppService.setNavTitle('ORDERS');
      //////////////////////////
      
      activate();
      
      function activate() {
        getIncomingOrders();
      }
      
      function getIncomingOrders() {
        vm.orders = StoreService.getIncomingOrders();    
        return vm.orders;
      }
      
      function acknowledgeOrder(order) {
        order.orderStatus = 'Acknowledged';
        this.orders.$save(order);
      }

      function readyForDelivery(order) {
        order.orderStatus = 'Ready For Delivery';
        order.progress = 'Made';
        this.orders.$save(order);
      }

      function enroute(order) {
        order.orderStatus = 'Order Enroute';
        order.progress = 'Delivering';
        
      }
      
      function saveOrder() {
        vm.orders.$save(order);
      }
    }
})();