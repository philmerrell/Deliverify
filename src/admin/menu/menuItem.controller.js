(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .controller('MenuItemCtrl', MenuItemCtrl);
    
    function MenuItemCtrl($mdDialog, $mdToast, $scope, $state, StoreService, AppService, MenuService) {
      var vm = this;
      vm.menuService = MenuService;
      
      vm.deleteMenuItem = deleteMenuItem;
      vm.saveMenuItem = saveMenuItem;
      vm.transformIngredientChip = transformIngredientChip;
      AppService.setNavTitle('MENU');

      var menuItems = MenuService.getMenuItems();
      
      activate();
      
      //////////////////////////
      
      function activate() {
        if($state.params.name === 'new') {
          vm.menuItem = {
            Ingredients: []
          };
        } else {
          vm.menuItem = MenuService.getMenuItem();
        }

      }
      
      function deleteMenuItem(item, ev) {

        var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this item?')
          .textContent('This item will be removed from your menu.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');
          
          $mdDialog.show(confirm).then(function() {
            _.pull(MenuService.getMenuItems(), item);
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
        // MenuService.addMenuItems(item);
        menuItems.$add(item);
        console.log(item);
      
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
      
    }
})();