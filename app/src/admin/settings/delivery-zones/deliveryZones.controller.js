(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .controller('DeliveryZonesCtrl', DeliveryZonesCtrl);
    
    
    function DeliveryZonesCtrl(AppService) {
      var vm = this;

      vm.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

      vm.drawingManagerOptions = {
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT,
            drawingModes: [
              google.maps.drawing.OverlayType.POLYGON
            ]
        },
        circleOptions: {
          fillColor: '#ffff00',
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1
          }
        };
        
        vm.drawingManagerControl = {};

      activate();

      ////////////////////////////////////

      function activate() {
        AppService.setNavTitle('DELIVERY ZONES');
        AppService.setNavActions({url: 'http://philmerrell.github.io/deliver-client/', title: 'View app'});
      }

      
    }
})();