'use strict';

(function () {
  var PIN_COUNT = 5;
  var DEBOUNCE_INTERVAL = 500;
  var Pin = {
    WIDTH: 25,
    HEIGHT: 70
  };

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var loadPin = function (object) {
    var clone = pinTemplate.cloneNode(true);
    clone.style.left = (object.location.x - Pin.WIDTH) + 'px';
    clone.style.top = (object.location.y - Pin.HEIGHT) + 'px';
    clone.firstElementChild.src = object.author.avatar;
    clone.firstElementChild.alt = object.offer.title;
    var onPinButtonClick = function () {
      window.card.render(object);
      clone.classList.add('map__pin--active');
    };
    clone.addEventListener('click', onPinButtonClick);

    return clone;
  };

  var renderPins = function (object) {
    removePins();
    var fragment = document.createDocumentFragment();

    object.forEach(function (element, index) {
      if (index <= PIN_COUNT) {
        fragment.appendChild(loadPin(element));
      }
    });

    window.global.MAP.appendChild(fragment);
  };

  var removePins = function () {
    var oldPins = window.global.MAP.querySelectorAll('.map__pin:not(.map__pin--main)');

    if (oldPins) {
      oldPins.forEach(function (item) {
        window.global.MAP.removeChild(item);
      });
    }
  };

  window.pin = {
    render: debounce(renderPins),
    remove: removePins
  };
})();
