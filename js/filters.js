'use strict';

(function() {

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var typeFilter = map.querySelector('#housing-type');
  var filterList = typeFilter.children;

  var onTypeFilterChange = function(evt) {
    var mapPinsList = mapPins.querySelectorAll('button');

    [].filter.call(mapPinsList, function(element) {
      element.style.visibility = 'hidden';
      return evt.target.value === element.id
    }).forEach(function(element) {
      element.style.visibility = 'visible';
    });

    [].filter.call(mapPinsList, function(element) {
      return evt.target.value === 'any'
    }).forEach(function(element) {
      element.style.visibility = 'visible';
    });

  };

  typeFilter.addEventListener('change', onTypeFilterChange);
})();
