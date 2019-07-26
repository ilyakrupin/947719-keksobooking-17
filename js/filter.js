'use strict';

(function () {
  var formFilters = window.global.MAP.querySelector('.map__filters');
  var priceMap = {
    'low': {
      start: 0,
      end: 1000
    },
    'middle': {
      start: 10000,
      end: 50000
    },
    'high': {
      start: 50000,
      end: Infinity
    }
  };
  var filterRules = {
    'housing-type': function (data, filter) {
      return data.offer.type === filter.value;
    },
    'housing-price': function (data, filter) {
      return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
    },
    'housing-rooms': function (data, filter) {
      return filter.value === data.offer.rooms.toString();
    },
    'housing-guests': function (data, filter) {
      return filter.value === data.offer.guests.toString();
    },
    'housing-features': function (data, filter) {
      var checkListElements = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));

      return checkListElements.every(function (it) {
        return data.offer.features.some(function (feature) {
          return feature === it.value;
        });
      });
    }
  };

  var getFilterData = function (data, elements) {
    return data.filter(function (item) {
      return elements.every(function (filter) {
        return (filter.value === 'any') ? true : filterRules[filter.id](item, filter);
      });
    });
  };

  var resetFilter = function () {
    formFilters.reset();
  };

  var onFormFiltersChange = function () {
    var filterElements = [];
    filterElements = Array.from(formFilters.children);
    window.card.remove();
    window.pin.render(getFilterData(window.pin.data(), filterElements));
  };

  formFilters.addEventListener('change', onFormFiltersChange);

  window.filter = {
    reset: resetFilter
  };
})();
