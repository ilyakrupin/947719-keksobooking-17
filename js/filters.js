'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var typeFilter = map.querySelector('#housing-type');

  var onTypeFilterChange = function () {
    var mapPinsList = mapPins.querySelectorAll('button[housing]');
    window.card.hideCards();

    [].forEach.call(mapPinsList, function (element, index) {
      element.style.visibility = (typeFilter.value === element.getAttribute('housing')) ? 'visible' : 'hidden';
      if (typeFilter.value === 'any' && index < window.data.Pin.count) {
        element.style.visibility = 'visible';
      }
    });
  };

  typeFilter.addEventListener('change', onTypeFilterChange);
})();
