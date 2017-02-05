angular
  .module('loc8rApp')
  .service('loc8rData', loc8rData);

function loc8rData ($http) {
  let locationByCoords = function (lat, lng) {
    console.log(lat);
    return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
  };

  return {
    locationByCoords : locationByCoords
  };
}