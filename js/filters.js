'use strict';

(function () {
  var formFilters = window.map.element.querySelector('.map__filters');
  var filterElements = Array.from(document.querySelector('.map__filters').children);

  var filterRules = function (data, filter) {
    return filter.value === data.offer.type;
  };


  var onFormFiltersChange = function (evt) {
    var xhrData = window.pin.data();

    var newArray = function () {
    // возвращает новый массив по условию функции для элементов true
      return xhrData.filter(function (item) {
        // передаем из xhrData текущий элемент массива
        return filterRules(item, evt.target);
      });
    };

    var newData = newArray();

    window.pin.render(newData);
  };

  formFilters.addEventListener('change', onFormFiltersChange);
})();
