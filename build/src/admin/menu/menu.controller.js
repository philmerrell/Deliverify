(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .controller('MenuCtrl', MenuCtrl);
    
    
    function MenuCtrl($mdToast, $scope, $state, $mdSidenav, AppService, MenuService) {
      var vm = this;

      vm.menuItems = MenuService.getMenuItems();

      console.log(vm.menuItems);

      var menuCategories;
      
      vm.items = _.groupBy([], 'Group');
      vm.editMenuItem = editMenuItem;
      vm.addMenuItem = addMenuItem;
      vm.addCategoryName = addCategoryName;
      vm.removeCategory = removeCategory;
      vm.categories = ["Sandwiches", "Drinks"];
      
      activate();
      
      ///////////////////
      
      function activate() {
        setNavActions();
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
      
      function addCategoryName(name) {
        vm.categories.push(name);
        vm.categoryName = '';
        $mdToast.show(
          $mdToast.simple()
            .textContent('Category added')
            .position('bottom right')
            .hideDelay(3000)
        );
      }
      
      function removeCategory(category) {
        _.pull(vm.categories, category);
        $mdToast.show(
          $mdToast.simple()
            .textContent('Category removed')
            .position('bottom right')
            .hideDelay(3000)
        );
      }
      
      function setNavActions() {
        AppService.setNavTitle('MENU');
        // AppService.setNavActions({url: '#/admin/menu/new?store=demo', title: 'Add item'});
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