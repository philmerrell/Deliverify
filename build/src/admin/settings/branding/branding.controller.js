(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('BrandingCtrl', SettingsCtrl);


  function SettingsCtrl($mdToast, $scope, AppService, UploadService, StoreService) {
    var vm = this;
    var newImage = false;

    vm.branding = StoreService.getStoreBranding();
    vm.previewImage = false;

    vm.fileChanged = fileChanged;
    vm.saveStoreInfo = saveStoreInfo;

    activate();


    /////////////////////////////////

    function activate() {
      AppService.setNavTitle('BRANDING');
      // AppService.setNavActions({url: 'http://philmerrell.github.io/deliver-client/', title: 'View app'});
    }

    function fileChanged(el) {
      vm.previewImage = {};
      newImage = el.files[0];
      vm.previewImage.name = newImage.name;
      vm.previewImage.url = window.URL.createObjectURL(newImage);
      $scope.$apply();
    }

    function uploadImage(file) {
      vm.branding.image.name = file.name;
      return UploadService.uploadImage(file, 'brand/');

    }

    function deleteImage() {
      return UploadService.deleteImage(vm.branding.image.url);
    }

    function saveStoreInfo() {

      // TODO: Clean up and simplify promises
      // We want to save a new image since one is being previewed.
      if(vm.previewImage) {
        // If an image url exists, we need to delete and image
        if(vm.branding.image.url) {
          deleteImage().then(function() {
            uploadImage(newImage).then(function(imageURL) {
              vm.branding.image.url = imageURL;
              StoreService.saveStore(vm.branding);
            });
          });

        // An image url doesn't exist, so no image needs to be deleted.
        } else {
          uploadImage(newImage).then(function(imageURL) {
            vm.branding.image.url = imageURL;
            StoreService.saveStore(vm.branding);
          });
        }
      // We just need to update the attributes, no image.
      } else {

        StoreService.saveStore(vm.branding);
      }

      // TODO: Show when save is verified successful.
      $mdToast.show(
        $mdToast.simple()
          .textContent('Settings updated')
          .position('top right')
          .hideDelay(3000)
      );

    }
  }
})();