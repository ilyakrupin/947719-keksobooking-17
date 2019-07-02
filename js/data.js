'use strict';

(function () {

  window.data = {
    Map: {
      area: document.querySelector('.map'),
      areaLimitTop: 130,
      areaLimitBottom: 630,
    },
    Pin: {
      types: ['palace', 'flat', 'house', 'bungalo']
    },
    Types: {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    },
  };

})();
