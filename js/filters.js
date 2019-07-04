'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var typeFilter = map.querySelector('#housing-type');
  var onTypeFilterChange = function () {
    var mapPinsList = mapPins.querySelectorAll('button[id]');

    [].filter.call(mapPinsList, function (element) {
      element.style.visibility = 'hidden';
      return typeFilter.value === element.id;
    }).forEach(function (element, index) {
      if (index < window.data.Pin.count) {
        element.style.visibility = 'visible';
      }
    });

    [].filter.call(mapPinsList, function () {
      return typeFilter.value === 'any';
    }).forEach(function (element, index) {
      if (index < window.data.Pin.count) {
        element.style.visibility = 'visible';
      }
    });
  };

  typeFilter.addEventListener('change', onTypeFilterChange);

})();
