(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .controller('MenuCtrl', MenuCtrl);
    
    
    function MenuCtrl($mdToast, $q, $scope, $state, $mdSidenav, AppService, MenuService) {

      var vm = this;
      
      vm.dataLoaded = false;
      vm.menuCategories = {};
      vm.menuHasItems = false;
      vm.menuItems = {};
      vm.category = { name: '' };
      vm.editMenuItem = editMenuItem;
      vm.addMenuItem = addMenuItem;
      vm.addCategoryName = addCategoryName;
      vm.removeCategory = removeCategory;
      
      activate();
      
      ///////////////////
      
      function activate() {
        setNavActions();
        var promises = [getMenuItems(), getMenuCategories()];
        return $q.all(promises).then(function() {
          vm.dataLoaded = true;
        });
        
      }
      
      function editMenuItem(event, item) {
        MenuService.setMenuItem(item);
        // openSidenav();
        $state.go('admin.menuItem', {name: item.Name});
      }
      
      function addMenuItem() {
        MenuService.setMenuItem(false);
        // openSidenav();
        $state.go('admin.menuItem');
        
      }
      
      function addCategoryName() {
        MenuService.addMenuCategory(vm.category);
        vm.category.name = '';
        $mdToast.show(
          $mdToast.simple()
            .textContent('Category added')
            .position('top right')
            .hideDelay(3000)
        );
      }

      function getMenuItems() {
        return MenuService.getMenuItems().$loaded()
          .then(function(items) {
            vm.menuItems = _.groupBy(items, 'category.name');
            vm.menuHasItems = _.some(vm.menuItems);
            console.log(vm.menuItems);
          });
      }

      function getMenuCategories() {
        return MenuService.getMenuCategories().$loaded()
          .then(function(categories) {
            vm.menuCategories = categories;
          });
      }
      
      function removeCategory(category) {
        MenuService.removeMenuCategory(category);
        $mdToast.show(
          $mdToast.simple()
            .textContent('Category removed')
            .position('top right')
            .hideDelay(3000)
        );
      }
      
      function setNavActions() {
        AppService.setNavTitle('MENU');
        // AppService.setNavActions({url: '#/admin/menu/new?store=demo', title: 'Add item'});
      }

      function showAddCategoryModal() {

      }
      
      $scope.$on('$destroy', function(){
        AppService.setNavActions(false);
      });
      
      // $scope.$watch(function () {return MenuService.getMenuItems();}, function(newVals) { vm.items = newVals;})
      
      // function openSidenav() {
      //   $mdSidenav('right')
      //     .toggle()
      //     .then(function () {});
      // }
      
      
    }
})();