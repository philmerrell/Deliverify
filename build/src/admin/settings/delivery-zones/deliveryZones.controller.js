(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .controller('DeliveryZonesCtrl', DeliveryZonesCtrl);
    
    
    function DeliveryZonesCtrl(AppService) {
      var vm = this;

      vm.zone = [
        { latitude: 43.61327319920036, longitude: -116.19071960449219},
        { latitude: 43.61650452007728, longitude: -116.19346618652344},
        { latitude: 43.62072983154074, longitude: -116.19509696960449},
        { latitude: 43.62228318022436, longitude:-116.1957836151123},
        { latitude: 43.624147145668076, longitude: -116.18865966796875},
        { latitude: 43.63390095551942, longitude: -116.19338035583496},
        { latitude: 43.6336524704596, longitude: -116.20368003845215},
        { latitude: 43.64042332086611, longitude: -116.20316505432129},
        { latitude: 43.64060966375876, longitude: -116.19930267333984},
        { latitude: 43.642473060898425, longitude: -116.19715690612793},
        { latitude: 43.64539226688458, longitude: -116.19166374206543},
        { latitude: 43.6471934083222, longitude: -116.20453834533691},
        { latitude: 43.642162498722, longitude: -116.20917320251465},
        { latitude: 43.650050280518336, longitude: -116.22427940368652},
        { latitude: 43.655949912568225, longitude: -116.23354911804199},
        { latitude: 43.641230802560266, longitude: -116.23354911804199},
        { latitude: 43.63986428872046, longitude: -116.23560905456543},
        { latitude: 43.61296248611951, longitude: -116.19089126586914},
        { latitude: 43.61296248611951, longitude: -116.19082689285278},
        { latitude: 43.61322659234057, longitude: -116.1907410621643}
    ];


      vm.map = { center: {latitude: 43.632716, longitude: -116.208358}, zoom: 13 };

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
        AppService.setNavTitle('DELIVERY MAP');
        AppService.setNavActions({url: 'http://philmerrell.github.io/deliver-client/', title: 'View app'});
      }

      
    }
})();