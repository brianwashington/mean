angular
  .module('loc8rApp')
  .filter('formatDistance', formatDistance);

let _isNumeric = function (n) {
return !isNaN(parseFloat(n)) && isFinite(n);
};


let formatDistance = function() {
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