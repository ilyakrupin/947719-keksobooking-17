'use strict';

var OBJECTS_AMOUNT = 8;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var filters = document.querySelector('.map__filters');
var filterList = filters.children;
var adForm = document.querySelector('.ad-form');
var adList = adForm.children;
var inputAddress = document.querySelector('input[name="address"]');

var Pin = {
  width: 50,
  height: 70
};

var MainPin = {
  width: 64,
  height: 82
};

var mapBorders = {
  left: map.offsetLeft,
  right: map.offsetLeft + map.offsetWidth - MainPin.width / 2,
};

var mapLimits = {
  left: 0,
  right: map.offsetWidth,
  top: 130,
  bottom: 630
};

var types = ['palace', 'flat', 'house', 'bungalo'];

var findTemplate = function (classParent, classChild) {
  return document.querySelector(classParent)
      .content
      .querySelector(classChild);
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

  for (var i = 0; i < OBJECTS_AMOUNT; i++) {
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

var buildObjects = function () {
  var array = [];

  for (var i = 0; i < OBJECTS_AMOUNT; i++) {
    array[i] =
        {
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png'
          },
          'offer': {
            'type': getRandomTypes(types)
          },
          'location': {
            'x': getRandomLocation(mapLimits.left + Pin.width, mapLimits.right - Pin.width),
            'y': getRandomLocation(mapLimits.top, mapLimits.bottom - Pin.height)
          }
        };
  }

  return array;
};

var showPinsOnMap = renderPins(findTemplate('#pin', '.map__pin'), buildObjects());

var removeClass = function (classParent, classChild) {
  document.querySelector(classParent).classList.remove(classChild);
};

var elementStatus = function (tagList) {
  for (var i = 0; i < tagList.length; i++) {
    tagList[i].disabled = false;
  }
};

var switchElement = function () {
  elementStatus(filterList);
  elementStatus(adList);
};

var limitPinCoords = function () {
  switch (true) {
    case mainPin.offsetLeft < mapLimits.left:
      mainPin.style.left = mapLimits.left + 'px';
      break;
    case mainPin.offsetRight > mapLimits.right:
      mainPin.style.right = mapLimits.right + 'px';
      break;
    case mainPin.offsetTop < mapLimits.top:
      mainPin.style.top = mapLimits.top + 'px';
      break;
    case mainPin.offsetTop > mapLimits.bottom:
      mainPin.style.bottom = mapLimits.bottom + 'px';
      break;
  }
};

var showPinCoords = function () {
  inputAddress.value = (mainPin.offsetLeft + MainPin.width / 2) + ', ' + (mainPin.offsetTop + MainPin.height);
};

showPinCoords();
switchElement();

mainPin.addEventListener('mousedown', function (evtDown) {

  var pointsA = {
    x: evtDown.clientX,
    y: evtDown.clientY
  };

  var onMainPinMouseMoveActive = function () {
    switchElement();
    removeClass('.map', 'map--faded');
    removeClass('.ad-form', 'ad-form--disabled');
    mapPins.appendChild(showPinsOnMap);
    mainPin.removeEventListener('mousemove', onMainPinMouseMoveActive);
  };

  var onMainPinMouseMove = function (evtMove) {

    if ((evtMove.clientX < mapBorders.right) && (evtMove.clientY < mapLimits.bottom)) {

      var pointsB = {
        x: evtMove.clientX,
        y: evtMove.clientY,
      };

      var shift = {
        x: pointsA.x - pointsB.x,
        y: pointsA.y - pointsB.y
      };

      pointsA = {
        x: pointsB.x,
        y: pointsB.y
      };

      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';

      limitPinCoords();
      showPinCoords();
    }
  };

  var onMainPinMouseUp = function () {
    showPinCoords();
    map.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinMouseMove);
  };

  map.addEventListener('mousemove', onMainPinMouseMove);
  document.addEventListener('mouseup', onMainPinMouseUp);
  mainPin.addEventListener('mousemove', onMainPinMouseMoveActive);
});
