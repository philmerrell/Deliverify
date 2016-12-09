(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .controller('MenuItemCtrl', MenuItemCtrl);
    
    function MenuItemCtrl($mdDialog, $mdToast, $scope, $state, StoreService, AppService, MenuService, UploadService) {
      var vm = this;
      var newImage = false;
      vm.costInput = {};
      vm.menuService = MenuService;
      vm.previewImage = false;

      vm.addCost = addCost;
      vm.deleteCost = deleteCost;
      vm.deleteMenuItem = deleteMenuItem;
      vm.fileChanged = fileChanged;
      vm.saveMenuItem = saveMenuItem;
      vm.transformIngredientChip = transformIngredientChip;
      vm.menuCategories = MenuService.getMenuCategories();

      AppService.setNavTitle('MENU');

      activate();
      
      //////////////////////////
      
      function activate() {
        if($state.params.name === 'new') {
          vm.menuItem = {
            ingredients: [],
            prices: []
          };
        } else {
          vm.menuItem = MenuService.getMenuItem();
        }

      }

      function addCost() {
        if(angular.isUndefined(vm.menuItem.prices)) {
          vm.menuItem.prices = [];
        }
        vm.menuItem.prices.push(vm.costInput);
      }

      function deleteCost(cost) {
        _.pull(vm.menuItem.prices, cost)
      }
      
      function deleteMenuItem(item, ev) {

        var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this item?')
          .textContent('This item will be removed from your menu.')
          .ariaLabel('Delete menu item?')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');
          
          $mdDialog.show(confirm).then(function() {
            // _.pull(MenuService.getMenuItems(), item);
            console.log(item);
            MenuService.removeMenuItem(item);
            showToast('Menu item removed');
            $state.go('admin.menu');
          }, function() {
           
          });
        
      }
      
      function transformIngredientChip(ingredient) {
        // If it is an object, it's already a known chip
        if (angular.isObject(ingredient)) {
          return ingredient;
        }
        // Otherwise, create a new one
        return { Name: ingredient, type: 'new' }
      }

      function saveMenuItem(item) {

          if(vm.previewImage) {
            // If an image url exists, we need to delete and image
            if(item.image.url) {
              deleteImage().then(function() {
                uploadImage(newImage).then(function(imageURL) {
                  item.image.url = imageURL;
                  save(item);
                });
              });

            // An image url doesn't exist, so no image needs to be deleted.
            } else {
              uploadImage(newImage).then(function(imageURL) {
                item.image.url = imageURL;
                save(item);
              });
            }
          // We just need to update the attributes, no image.
          } else {
            save(item);
          }

      }

      function save(item) {
        if (item.$id) {
          MenuService.saveMenuItem(item);
        } else {
          MenuService.addMenuItem(item);
        }
        showToast('Menu item saved');
        $state.go('admin.menu');
      }

      
      function showToast(content) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(content)
            .position('bottom right')
            .hideDelay(3000)
        );
      }

      function fileChanged(el) {
        vm.previewImage = {};
        newImage = el.files[0];
        console.log('newImage', newImage);
        vm.previewImage.name = newImage.name;
        vm.previewImage.url = window.URL.createObjectURL(newImage);
        $scope.$apply();

      }

    function uploadImage(file) {
      vm.menuItem.image.fileName = file.name;
      return UploadService.uploadImage(file, 'menu/');
    }

    function deleteImage() {
      return UploadService.deleteImage(vm.menuItem.image.url);
    }
      
    }
})();