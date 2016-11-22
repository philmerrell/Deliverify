(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .controller('OrdersCtrl', OrdersCtrl);
    
    function OrdersCtrl($mdToast, $scope, AppService, StoreService) {
      var vm = this;
      var deliveryCartToast;

      vm.deliveryCart = [];
      vm.orders = [];
      vm.ordersLoaded = false;
      vm.ready = [];
      vm.enroute = [];

      vm.acknowledgeOrder = acknowledgeOrder;
      vm.enroute = enroute;
      vm.readyForDelivery = readyForDelivery;
      vm.saveOrder = saveOrder;
      vm.updateDeliveryCart = updateDeliveryCart;
      
      
      //////////////////////////
      
      activate();
      
      function activate() {
        AppService.setNavTitle('ORDERS');
        AppService.setNavActions(false);
        // getIncomingOrders();
        // getReadyForDeliveryOrders();
        // getEnrouteDeliveryOrders();
      }
      
      function getIncomingOrders() {
        vm.orders = StoreService.getIncomingOrders();

        vm.orders.$loaded(function() { vm.ordersLoaded = true; });
        return vm.orders;
      }
      
      function acknowledgeOrder(order) {
        order.orderStatus = 'Acknowledged';
        vm.orders.$save(order);
      }

      function readyForDelivery(order) {
        order.orderStatus = 'Ready For Delivery';
        order.progress = 'Made';
        vm.orders.$save(order);
      }

      function enroute(order) {
        order.orderStatus = 'Order Enroute';
        order.progress = 'Delivering';
        //StoreService.updateDeliveryStatusToEnroute(order);
        vm.ready.$save(order);

      }

      function getEnrouteDeliveryOrders() {
        vm.enroute = StoreService.getEnrouteDeliveryOrders();
        return vm.enroute;
      }

      function getReadyForDeliveryOrders() {
        vm.ready = StoreService.getReadyForDeliveryOrders();
        return vm.ready;
      }
      
      function saveOrder() {
        vm.orders.$save(order);
      }

      function updateDeliveryCart(order) {

        var isFound = _.find(vm.deliveryCart, order);

        if(isFound) {
          _.pull(vm.deliveryCart, order)
        } else {
          vm.deliveryCart.push(order);
        }

      }

      function updateDeliveryStatusToEnRoute() {
        _.forEach(vm.deliveryCart, function(order) {
          enroute(order);
        });

        vm.deliveryCart = [];

      }

      function showDeliveryCartToast() {
          deliveryCartToast = $mdToast.simple()
            .textContent('Deliver '+vm.deliveryCart.length + ' items')
            .action('Okay')
            .hideDelay(0)
            .highlightAction(true)
            //.highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
            .position('bottom right');
          $mdToast.show(deliveryCartToast).then(function(response) {
            if ( response == 'ok' ) {
              updateDeliveryStatusToEnRoute();
            }
          });
      }

      $scope.$watch(function() { return vm.deliveryCart}, function(newVal) {
        if(newVal.length > 0) {
          showDeliveryCartToast();
        } else {
          $mdToast.hide(deliveryCartToast);
        }
      }, true);
    }
})();