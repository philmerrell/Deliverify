(function() {
  'use strict';
  
  angular
    .module('app.admin', ['ui.router'])
    .config(AdminConfig);
    
    
    function AdminConfig($stateProvider) {
      $stateProvider
        .state('admin', {
          abstract: true,
          url: '/admin?store',
          views: {
            "main": {
              template: '<div ui-view="admin"></div>',
              controller: 'AdminCtrl as vm'
            },
            "rightSidenav": {
              template: '<div ui-view="adminNav"></div>'
            }
          }
        })
        
        .state('admin.orders', {
          url: '/orders',
          views: {
            "admin": {
              templateUrl: 'src/admin/orders/orders.html',
              controller: 'OrdersCtrl as vm'
            }
          }
        })
        
        .state('admin.menu', {
          url: '/menu',
          views: {
            "admin": {
              templateUrl: 'src/admin/menu/menu.html',
              controller: 'MenuCtrl as vm'
            }
            // "adminNav": {
            //   templateUrl: 'src/admin/menu/menuItem.html',
            //   controller: 'MenuItemCtrl as vm'
            // }
          }
        })
        
        .state('admin.menuItem', {
          url: '/menu/:name',
          views: {
            "admin": {
              templateUrl: 'src/admin/menu/menuItem.html',
              controller: 'MenuItemCtrl as vm'
            }
          }
        })
        
        .state('admin.storeInfo', {
          url: '/info',
          views: {
            "admin": {
              templateUrl: 'src/admin/storeInfo/storeInfo.html',
              controller: 'StoreInfoCtrl as vm'
            }
          }
        })
        
        .state('admin.hours', {
          url: '/hours',
          views: {
            "admin": {
              templateUrl: 'src/admin/hours/hours.html',
              controller: 'HoursCtrl as vm'
            }
          }
        })
        
        .state('admin.zones', {
          url: '/zones',
          views: {
            "admin": {
              templateUrl: 'src/admin/delivery-zones/deliveryZones.html',
              controller: 'DeliveryZonesCtrl as vm'
            }
          }
        })

        .state('admin.settings', {
          url: '/settings',
          views: {
            "admin": {
              templateUrl: 'src/admin/settings/settings.html',
              controller: 'SettingsCtrl as vm'
            }
          }
        })

        .state('admin.contactInfo', {
          url: '/contact',
          views: {
            "admin": {
              templateUrl: 'src/admin/contactInfo/contactInfo.html',
              controller: 'ContactInfoCtrl as vm'
            }
          }
        })

        .state('admin.account', {
          url: '/account',
          views: {
            "admin": {
              templateUrl: 'src/admin/account/account.html',
              controller: 'AccountCtrl as vm'
            }
          }
        })
        ;
    }
})();