'use strict';

(function () {

  var Pin = {
    width: 50 / 2,
    height: 70,
    template: document.querySelector('#pin').content.querySelector('.map__pin')
  };

  var pinBoundaries = {
    left: -Pin.width / 2,
    right: window.data.Map.area.offsetWidth - Pin.width / 2,
    top: window.data.Map.areaLimitTop - Pin.height,
    bottom: window.data.Map.areaLimitBottom - Pin.height
  };

  var loadPin = function (template, object) {
    var clone = template.cloneNode(true);
    clone.style.left = (object.location.x) + 'px';
    clone.style.top = (object.location.y - Pin.height) + 'px';
    clone.querySelector('img').src = object.author.avatar;
    clone.querySelector('img').alt = 'Заголовок объявления';
    return clone;
  };

  var renderPins = function (template, object) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.Pin.total; i++) {
      fragment.appendChild(loadPin(template, object[i]));
    }

    return fragment;
  };

  var getRandomLocation = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomTypes = function (array) {
    return Math.floor(Math.random() * array.length - 1);
  };

  var buildPins = function () {
    var array = [];

    for (var i = 0; i < window.data.Pin.total; i++) {
      array[i] =
          {
            'author': {
              'avatar': 'img/avatars/user0' + (i + 1) + '.png'
            },
            'offer': {
              'type': getRandomTypes(window.data.Pin.types)
            },
            'location': {
              'x': getRandomLocation(pinBoundaries.left + Pin.width, pinBoundaries.right - Pin.width),
              'y': getRandomLocation(pinBoundaries.top + Pin.height, pinBoundaries.bottom - Pin.height)
            }
          };
    }

    return array;
  };

  window.showPinsOnMap = renderPins(Pin.template, buildPins());
})();
