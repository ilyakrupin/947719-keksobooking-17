'use strict';

(function () {
  var formFilters = window.map.element.querySelector('.map__filters');

  var filterRules = function (data, filter) {
    return data.offer.type === filter.value;
  };

  var filterData = function (data, elements) {
    return data.filter(function (item) {
      return elements.every(function (filter) {
        return (filter.value === 'any') ? true : filterRules(item, filter);
      });
    });
  };

  var onFormFiltersChange = function () {
    var newData = window.pin.data();
    var filterElements = [];
    filterElements[0] = Array.from(document.querySelector('.map__filters').children).shift();

    window.card.remove();
    window.pin.render(filterData(newData, filterElements));
  };

  formFilters.addEventListener('change', onFormFiltersChange);
})();
