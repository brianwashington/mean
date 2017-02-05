angular
  .module('loc8rApp')
  .service('loc8rData', loc8rData);

function loc8rData ($http) {
  let locationByCoords = function (lat, lng) {
    return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=500');
  };

  return {
    locationByCoords : locationByCoords
  };
}