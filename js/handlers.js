'use strict';

(function () {

  var cardContainer = document.querySelector('.map');
  var ESC = 27;

  var onCloseButtonEscPress = function (evt) {
    if (evt.keyCode === ESC) {
      var lots = cardContainer.querySelectorAll('article[lot]');
      lots.forEach(function (element) {
        element.style.visibility = 'hidden';
      });
    }
  };

  var onPinButtonClick = function (evt) {
    var lots = cardContainer.querySelectorAll('article[lot]');
    lots.forEach(function (element) {
      element.style.visibility = 'hidden';
    });
    if (evt.currentTarget.getAttribute('lot')) {
      var lot = cardContainer.querySelector('article[lot="' + evt.currentTarget.getAttribute('lot') + '"]');
      lot.style.visibility = 'visible';

      lot.querySelector('.popup__close').addEventListener('click', function () {
        lot.style.visibility = 'hidden';
        document.removeEventListener('keydown', onCloseButtonEscPress);
      });
    }
  };

  document.addEventListener('keydown', onCloseButtonEscPress);

  window.handlers = {
    onPinButtonClick: onPinButtonClick
  };

})();
