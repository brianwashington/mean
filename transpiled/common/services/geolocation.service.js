'use strict';

(function () {
  angular.module('loc8rApp').service('geolocation', geolocation);

  function geolocation() {
    var getPosition = function getPosition(cbSuccess, cbError, cbNoGeo) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
      } else {
        cbNoGeo();
      }
    };
    return {
      getPosition: getPosition
    };
  }
})();