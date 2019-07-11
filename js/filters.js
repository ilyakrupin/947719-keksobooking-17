'use strict';

(function () {
  var typeFilter = window.map.element.querySelector('#housing-type');

  var onTypeFilterChange = function () {
    var filteredPins = window.pin.slice();

    console.log(window.pin);
    // сделать выборку

    window.pin.render(filteredPins);
  };

  typeFilter.addEventListener('change', onTypeFilterChange);
})();
