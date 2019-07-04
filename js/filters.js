'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var typeFilter = map.querySelector('#housing-type');

  var onTypeFilterChange = function () {
    var mapPinsList = mapPins.querySelectorAll('button[id]');

    [].forEach.call(mapPinsList, function (element, index) {
      element.style.visibility = (typeFilter.value === element.id) ? 'visible' : 'hidden';
      if (typeFilter.value === 'any' && index < window.data.Pin.count) {
        element.style.visibility = 'visible';
      }
    });
  };
  typeFilter.addEventListener('change', onTypeFilterChange);

})();
