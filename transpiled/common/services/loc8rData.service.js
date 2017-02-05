'use strict';

(function () {
  angular.module('loc8rApp').service('loc8rData', loc8rData);

  loc8rData.$inject = ['$http'];
  function loc8rData($http) {
    var locationByCoords = function locationByCoords(lat, lng) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=500');
    };

    var locationById = function locationById(locationid) {
      return $http.get('/api/locations/' + locationid);
    };

    var addReviewById = function addReviewById(locationid, data) {
      return $http.post('/api/locations/' + locationid + '/reviews', data);
    };

    return {
      locationByCoords: locationByCoords,
      locationById: locationById,
      addReviewById: addReviewById
    };
  }
})();