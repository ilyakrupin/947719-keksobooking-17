'use strict';

var OBJECTS_AMOUNT = 8;
var map = document.querySelector('.map');

var Pin = {
  width: 50,
  height: 70
};

var MainPin = {
  width: 62,
  height: 84
};

var Map = {
  xMin: MainPin.width,
  xMax: map.offsetWidth,
  yMin: 130,
  yMax: 630
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
            'x': getRandomLocation(Map.xMin, Map.xMax),
            'y': getRandomLocation(Map.yMin, Map.yMax)
          }
        };
  }

  return array;
};

var mapPins = document.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var filters = document.querySelector('.map__filters');
var filterList = filters.children;
var adForm = document.querySelector('.ad-form');
var adList = adForm.children;
var inputAddress = document.querySelector('input[name="address"]');

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

switchElement();

var pinPoint = function () {
  inputAddress.value = (mainPin.offsetLeft + MainPin.width / 2) + ', ' + Math.round(mainPin.offsetTop + MainPin.height);
};

var pinsOnMap = renderPins(findTemplate('#pin', '.map__pin'), buildObjects());

mainPin.addEventListener('mousedown', function (evtDown) {

  var pointsA = {
    x: evtDown.clientX,
    y: evtDown.clientY
  };

  var limitBorders = function (currentCoords, minCoords, maxCoords) {
    if (currentCoords < minCoords) {
      return minCoords;
    } else if (currentCoords > maxCoords) {
      return maxCoords;
    } else {
      return currentCoords;
    }
  };

  var onMainPinMouseMoveActive = function () {
    switchElement();
    removeClass('.map', 'map--faded');
    removeClass('.ad-form', 'ad-form--disabled');
    mapPins.appendChild(pinsOnMap);
    mainPin.removeEventListener('mousemove', onMainPinMouseMoveActive);
  };

  var onMainPinMouseMove = function (evtMove) {

    var pointsB = {
      x: limitBorders(evtMove.clientX, Map.xMin, Map.xMax),
      y: limitBorders(evtMove.clientY, Map.yMin, Map.yMax),
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

    pinPoint();
  };

  var onMainPinMouseUp = function () {
    pinPoint();
    map.removeEventListener('mousemove', onMainPinMouseMove);
    map.removeEventListener('mouseup', onMainPinMouseMove);
  };

  map.addEventListener('mousemove', onMainPinMouseMove);
  map.addEventListener('mouseup', onMainPinMouseUp);
  mainPin.addEventListener('mousemove', onMainPinMouseMoveActive);

});
