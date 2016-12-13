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

    vm.addHours = addHours;
    vm.deleteStoreLocation = deleteStoreLocation;
    vm.removeHours = removeHours;
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

    function addHours(hours) {
      hours.startTime = hours.startTime.getTime();
      hours.endTime = hours.endTime.getTime();
      if(angular.isUndefined(vm.location.hours)) {
        vm.location.hours = [];
      }
      vm.location.hours.push(hours);

      // StoreService.addStoreHours(hours);
      // vm.hours.push(hours);
      vm.newHours = {};
      saveStoreLocation(vm.location);

    }

    function removeHours(hours) {
      StoreService.removeStoreHours(hours);
      $mdToast.show(
        $mdToast.simple()
          .textContent('hours removed')
          .position('bottom right')
          .hideDelay(3000)
      );
    }


    function saveStoreLocation(location) {
      // console.log(vm.location);
      if (vm.location.$id) {
        StoreService.saveStoreLocation(location);
      } else {
        StoreService.addStoreLocation(location);
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