(function() {
  'use strict';
  
  angular
    .module('app.admin', ['ui.router'])
    .config(AdminConfig);
    
    
    function AdminConfig($stateProvider) {
      $stateProvider
        .state('admin', {
          abstract: true,
          url: '/admin',
          views: {
            "main": {
              template: '<div ui-view="admin"></div>',
              controller: 'AdminCtrl as vm'
            },
            "rightSidenav": {
              template: '<div ui-view="adminNav"></div>'
            }
          },
          resolve: {
            // controller will not be loaded until $requireSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["UserService", function(UserService) {
              // $requireSignIn returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $stateChangeError (see above)
              return UserService.getAuthObj().$requireSignIn();
            }]
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
        
        .state('admin.branding', {
          url: '/settings/branding',
          views: {
            "admin": {
              templateUrl: 'src/admin/settings/branding/branding.html',
              controller: 'BrandingCtrl as vm'
            }
          }
        })
        
        .state('admin.hours', {
          url: '/settings/hours',
          views: {
            "admin": {
              templateUrl: 'src/admin/settings/hours/hours.html',
              controller: 'HoursCtrl as vm'
            }
          }
        })

        .state('admin.locations', {
          url: '/settings/locations',
          views: {
            "admin": {
              templateUrl: 'src/admin/settings/locations/locations.html',
              controller: 'LocationsCtrl as vm'
            }
          }
        })
        
        .state('admin.zones', {
          url: '/settings/zones',
          views: {
            "admin": {
              templateUrl: 'src/admin/settings/delivery-zones/deliveryZones.html',
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
          url: '/settings/contact',
          views: {
            "admin": {
              templateUrl: 'src/admin/settings/contact-info/contactInfo.html',
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