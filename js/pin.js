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
  width: 50 / 2,
  height: 70
};

var MainPin = {
  width: 64 / 2,
  height: 82
};

var pinLimits = {
  left: -Pin.width / 2,
  right: map.offsetWidth - Pin.width / 2,
  top: 130 - Pin.height,
  bottom: 630 - Pin.height
};

var mainPinLimits = {
  left: -MainPin.width,
  right: map.offsetWidth - MainPin.width,
  top: 130 - MainPin.height,
  bottom: 630 - MainPin.height
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
            'x': getRandomLocation(pinLimits.left + Pin.width, pinLimits.right - Pin.width),
            'y': getRandomLocation(pinLimits.top + Pin.height, pinLimits.bottom - Pin.height)
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

var limitCoords = function () {
  switch (true) {
    case mainPin.offsetLeft < mainPinLimits.left:
      mainPin.style.left = mainPinLimits.left + 'px';
      break;
    case mainPin.offsetLeft > mainPinLimits.right:
      mainPin.style.left = mainPinLimits.right + 'px';
      break;
    case mainPin.offsetTop < mainPinLimits.top:
      mainPin.style.top = mainPinLimits.top + 'px';
      break;
    case mainPin.offsetTop > mainPinLimits.bottom:
      mainPin.style.top = mainPinLimits.bottom + 'px';
      break;
  }
};

var showPinCoords = function () {
  inputAddress.value = (mainPin.offsetLeft + MainPin.width) + ', ' + (mainPin.offsetTop - MainPin.height);
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

    limitCoords();
    showPinCoords();
  };

  var onMainPinMouseUp = function () {
    showPinCoords();
    document.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinMouseMove);
  };

  document.addEventListener('mousemove', onMainPinMouseMove);
  document.addEventListener('mouseup', onMainPinMouseUp);
  mainPin.addEventListener('mousemove', onMainPinMouseMoveActive);
});
