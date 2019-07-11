'use strict';

(function () {
  var formFilters = window.map.element.querySelector('.map__filters');
  var filterElements = Array.from(document.querySelector('.map__filters').children);

  var filterRules = function (data, filter) {
    return filter.value === data.offer.type;
  };

  var filterData = function (data) {
  // возвращает новый массив по условию функции для элементов true
    return data.filter(function (item) {
      // передаем из xhrData текущий элемент массива
      return filterElements.every(function (filter) {
        return (filter.value === 'any') ? true : filterRules(item, filter);
      });
    });
  };

  var onFormFiltersChange = function (evt) {
    var xhrData = window.pin.data();
    console.log(filterData(xhrData));
    console.log(evt.target.value);
    window.pin.render(filterData(xhrData));
  };

  formFilters.addEventListener('change', onFormFiltersChange);
})();
