'use strict';

(function () {
  var ESC = 27;
  var PIN_COUNT = 5;

  var pins = [];

  var Pin = {
    width: 25,
    height: 70,
    template: document.querySelector('#pin').content.querySelector('.map__pin')
  };

  var Error = {
    template: document.querySelector('#error').content.querySelector('.error')
  };

  var onPinButtonClick = function (data) {
    window.card.show(data);
  };

  var loadPin = function (object) {
    var clone = Pin.template.cloneNode(true);
    clone.style.left = (object.location.x) + 'px';
    clone.style.top = (object.location.y - Pin.height) + 'px';
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
    var oldPins = window.map.element.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (oldPins) {
      oldPins.forEach(function (item) {
        window.map.element.removeChild(item);
      });
    }
  };

  var renderPins = function (object) {
    removePins();
    var fragment = document.createDocumentFragment();

    object.forEach(function (element) {
      fragment.appendChild(loadPin(element));
    });

    window.map.element.appendChild(fragment);
  };

  var showError = function (message) {
    var errorMessage = Error.template.cloneNode(true);
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

  window.load(onSuccess, showError);

  window.pin = {
    show: function () {
      renderPins(pins.slice(0, PIN_COUNT));
    },
    data: function () {
      return pins;
    },
    render: renderPins
  };

})();
