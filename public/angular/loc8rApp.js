angular.module('loc8rApp', []);

let locationListCtrl = function($scope, loc8rData, geolocation) {
  $scope.message = "Searching for nearby places.";

  $scope.getData = function(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    console.log(lat);
    console.log(lng);

    $scope.message = "Searching for nearby places.";
    loc8rData.locationByCoords(lat, lng)
    .then((data) => {
      $scope.message = data.data.length > 0 ? "" : "No locations found";
      $scope.data = { locations: data.data };
    }, (e) => {
      $scope.message = "Sorry, something's gone wrong";
      console.log(e);
    });
  };

  $scope.showError = function(error) {
    $scope.$apply(function() {
      $scope.message = error.message;
    });
  };

  $scope.noGeo = function() {
    $scope.$apply(function() {
      $scope.message = "Geolocation not supported by this browser.";
    });
  };

  geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};

let _isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let _formatDistance = function() {
  return function(distance) {
    let numDistance; 
    let unit = '';

    if(distance && _isNumeric(distance)) {
      if(distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = 'km';
      } else {
        numDistance = parseInt(distance * 1000,10);
        unit = 'm';
      }
      return numDistance + unit;
    } else {
      return "?";
    }
  };
};

let ratingStars = function() {
  return {
    scope: {
      thisRating: '=rating'
    },
    templateUrl: '/angular/rating-stars.html'
  };
};

let loc8rData = function($http) {
  let locationByCoords = function(lat, lng) {
    return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');  
  };

  return {
    locationByCoords: locationByCoords
  }  
};

let geolocation = function() {
  let getPosition = function(cbSuccess, cbError, cbNoGeo) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    } else {
      cbNoGeo();
    }
  };
  return {
    getPosition: getPosition
  };
};

angular
  .module('loc8rApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('_formatDistance', _formatDistance)
  .directive('ratingStars', ratingStars)
  .service('loc8rData', loc8rData)
  .service('geolocation', geolocation);