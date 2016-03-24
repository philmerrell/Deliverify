(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .controller('HoursCtrl', HoursCtrl)
  ;
  
  function HoursCtrl($mdToast, AppService) {
    var vm = this;
    vm.addHours = addHours;
    vm.removeHours = removeHours;

    vm.hours = [];
    vm.newHours = {};
    
    ///////////////////////////////////////////////

    activate();

    function activate() {
      setNavActions();
      loadHours();
    }

    function setNavActions() {
      AppService.setNavTitle('HOURS');
      AppService.setNavActions({url: 'http://philmerrell.github.io/deliver-client/', title: 'View app'});
    }


    function addHours(hours) {
      vm.hours.push(hours);
      vm.newHours = {};

      $mdToast.show(
        $mdToast.simple()
          .textContent('hours saved')
          .position('bottom right')
          .hideDelay(3000)
      );

    }

    function removeHours(hour) {
      console.log(hour);
      _.pull(vm.hours, hour);
      $mdToast.show(
        $mdToast.simple()
          .textContent('hours removed')
          .position('bottom right')
          .hideDelay(3000)
      );
    }

    function loadHours() {
      vm.hours = [
        {
          startTime: '10:00 AM', endTime: '10:00 PM', day: 'Monday'
        },
        {
          startTime: '10:00 AM', endTime: '10:00 PM', day: 'Tuesday'
        },
        {
          startTime: '10:00 AM', endTime: '10:00 PM', day: 'Wednesday'
        },
        {
          startTime: '10:00 AM', endTime: '10:00 PM', day: 'Thursday'
        },
        {
          startTime: '10:00 AM', endTime: '10:00 PM', day: 'Friday'
        },
        {
          startTime: '10:00 AM', endTime: '10:00 PM', day: 'Saturday'
        },
        {
          startTime: '10:00 AM', endTime: '10:00 PM', day: 'Sunday'
        }
      ];

      return vm.hours;
    }

  }
})();