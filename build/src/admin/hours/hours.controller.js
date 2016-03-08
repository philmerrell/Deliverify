(function() {
  'use strict';
  
  angular
    .module('app.admin')
    .controller('HoursCtrl', HoursCtrl)
  ;
  
  function HoursCtrl(AppService) {
    var vm = this;
    vm.addHours = addHours;
    vm.removeHours = removeHours;

    vm.hours = [];
    
    ///////////////////////////////////////////////

    activate();

    function activate() {
      setNavActions();
      loadHours();
    }

    function setNavActions() {
      AppService.setNavTitle('HOURS');
      AppService.setNavActions({state: 'admin.menuItem', param: {name: 'new'}, title: 'Add hours'});
    }


    function addHours(hours) {
      vm.hours.push(hours);

    }

    function removeHours(hour) {
      console.log(hour);
      _.pull(vm.hours, hour);
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