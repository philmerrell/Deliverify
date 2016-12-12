/**
 * Created by philmerrell on 12/9/16.
 */
(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('LocationsCtrl', LocationsCtrl)
  ;

  function LocationsCtrl($state, AppService, StoreService) {
    var vm = this;

    vm.locations = [];
    vm.dataLoaded = false;

    vm.editLocation = editLocation;

    activate();

    /////////////////////

    function activate() {
      AppService.setNavTitle('LOCATIONS');
      getStoreLocations();
    }

    function editLocation(event, location) {
        StoreService.setStoreLocation(location);
        $state.go('admin.locationDetail', {name: location.Name});
    }

    function getStoreLocations() {
      vm.locations = StoreService.getStoreLocations();
      vm.dataLoaded = true;
      return vm.locations;
    }


  }
})();