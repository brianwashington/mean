'use strict';

(function () {
  angular.module('loc8rApp').controller('locationDetailCtrl', locationDetailCtrl);

  locationDetailCtrl.$inject = ['$routeParams', '$modal', 'loc8rData'];
  function locationDetailCtrl($routeParams, $modal, loc8rData) {
    var vm = this;
    vm.locationid = $routeParams.locationid;

    loc8rData.locationById(vm.locationid).then(function (data) {
      vm.data = { location: data };
      vm.pageHeader = {
        title: vm.data.location.data.name
      };
    }, function (e) {
      console.log(e);
    });

    vm.popupReviewForm = function () {
      var modalInstance = $modal.open({
        templateUrl: '/reviewModal/reviewModal.view.html',
        controller: 'reviewModalCtrl as vm',
        resolve: {
          locationData: function locationData() {
            return {
              locationid: vm.locationid,
              locationName: vm.data.location.data.name
            };
          }
        }
      });
      modalInstance.result.then(function (data) {
        vm.data.location.reviews.push(data);
      });
    };
  }
})();