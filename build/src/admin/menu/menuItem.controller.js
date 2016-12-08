(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .controller('MenuItemCtrl', MenuItemCtrl);
    
    function MenuItemCtrl($mdDialog, $mdToast, $scope, $state, StoreService, AppService, MenuService, UploadService) {
      var vm = this;
      vm.costInput = {};
      vm.menuService = MenuService;

      vm.addCost = addCost;
      vm.deleteCost = deleteCost;
      vm.deleteMenuItem = deleteMenuItem;
      vm.fileChanged = fileChanged;
      vm.saveMenuItem = saveMenuItem;
      vm.transformIngredientChip = transformIngredientChip;
      vm.menuCategories = MenuService.getMenuCategories();

      AppService.setNavTitle('MENU');

      var menuItems = MenuService.getMenuItems();
      
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
            showToast('Menu item removed')
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

        if(item.$id) {
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
        var file = el.files[0];
        if(vm.menuItem.image) {
          deleteImage().then(function() {
            uploadImage(file);
          });
        } else {
          uploadImage(file);
        }
      }

    function uploadImage(file) {
      return UploadService.uploadImage(file, 'menu/')
        .then(function(imageURL) {
          vm.menuItem.image = {
            fileName: file.name,
            url: imageURL
          };
        });
    }

    function deleteImage() {
      return UploadService.deleteImage(vm.menuItem.image.url);
    }
      
    }
})();