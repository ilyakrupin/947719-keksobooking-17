'use strict';

(function () {

  var cardContainer = document.querySelector('.map');

  window.onButtonClick = function (evt) {
    var lots = cardContainer.querySelectorAll('article[lot]');
    lots.forEach(function (element) {
      element.style.visibility = 'hidden';
    });
    if (evt.currentTarget.getAttribute('lot')) {
      var lot = cardContainer.querySelector('article[lot="' + evt.currentTarget.getAttribute('lot') + '"]');
      lot.style.visibility = 'visible';
    }
  };

})();
