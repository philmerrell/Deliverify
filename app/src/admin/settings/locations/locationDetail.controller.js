/**
 * Created by philmerrell on 12/10/16.
 */
(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('LocationDetailCtrl', LocationDetailCtrl);

  function LocationDetailCtrl($mdDialog, $mdToast, $state, AppService, StoreService) {

    var vm = this;

    vm.location = {};

    vm.deleteStoreLocation = deleteStoreLocation;
    vm.saveStoreLocation = saveStoreLocation;

    activate();

    ////////////////////////////////////

    function activate() {
      if($state.params.name === 'new') {
        vm.location = {
          hours: [],
          deliveryZone: []
        };
      } else {
        vm.location = StoreService.getStoreLocation();
      }

      var storeName = angular.isDefined(vm.location.name) ? vm.location.name.toUpperCase() : 'ADD LOCATION';
      AppService.setNavTitle(storeName);
    }


    function saveStoreLocation() {
      if (vm.location.$id) {
        StoreService.saveStoreLocation(vm.location);
      } else {
        StoreService.addStoreLocation(vm.location);
      }
      showToast('Menu item saved');
      $state.go('admin.locations');
    }

    function showToast(content) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(content)
          .position('top right')
          .hideDelay(3000)
      );
    }

    function deleteStoreLocation(location, ev) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete this location?')
        .textContent('This location will be removed.')
        .ariaLabel('Delete location?')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        StoreService.removeStoreLocation(location);
        showToast('Location was removed');
        $state.go('admin.locations');
      }, function() {});

    }



  }

})();