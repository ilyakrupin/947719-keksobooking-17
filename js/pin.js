'use strict';

(function () {
  var ESC = 27;
  var PIN_COUNT = 5;
  var DEBOUNCE_INTERVAL = 500;
  var Pin = {
    WIDTH: 25,
    HEIGHT: 70
  };
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var pins = [];

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

  var onPinButtonClick = function (data) {
    window.card.render(data);
  };

  var loadPin = function (object) {
    var clone = pinTemplate.cloneNode(true);
    clone.style.left = (object.location.x - Pin.WIDTH) + 'px';
    clone.style.top = (object.location.y - Pin.HEIGHT) + 'px';
    clone.firstElementChild.src = object.author.avatar;
    clone.firstElementChild.alt = object.offer.title;

    clone.addEventListener('click', function () {
      onPinButtonClick(object);
    });

    return clone;
  };

  var onSuccess = function (data) {
    pins = data.slice();
  };

  var removePins = function () {
    var oldPins = window.map.container.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (oldPins) {
      oldPins.forEach(function (item) {
        window.window.map.container.removeChild(item);
      });
    }
  };

  var renderPins = function (object) {
    removePins();
    var fragment = document.createDocumentFragment();

    object.forEach(function (element) {
      fragment.appendChild(loadPin(element));
    });

    window.map.container.appendChild(fragment);
  };

  var onError = function (message) {
    var errorMessage = errorTemplate.cloneNode(true);
    errorMessage.firstElementChild.textContent = message;
    Error.container.appendChild(errorMessage);

    Error.container.addEventListener('mouseup', function () {
      errorMessage.remove();
    });

    document.addEventListener('keyup', function (evt) {
      if (evt.keyCode === ESC) {
        errorMessage.remove();
      }
    });
  };

  window.backend.dbquery(onSuccess, onError);

  window.pin = {
    show: function () {
      renderPins(pins.slice(0, PIN_COUNT));
    },
    remove: removePins,
    data: function () {
      return pins;
    },
    render: debounce(renderPins)
  };

})();
