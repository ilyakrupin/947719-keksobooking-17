'use strict';

var OBJECTS_AMOUNT = 8;
var map = document.querySelector('.map');

var Pin = {
  width: 50,
  height: 70
};

var MainPin = {
  width: 62 / 2,
  height: 84
};

var Map = {
  x1: Pin.width,
  x2: map.offsetWidth - Pin.width,
  y1: 130 + Pin.height,
  y2: 630
};

var types = ['palace', 'flat', 'house', 'bungalo'];

var findTemplate = function (classParent, classChild) {
  return document.querySelector(classParent)
      .content
      .querySelector(classChild);
};

var loadPin = function (template, object) {
  var clone = template.cloneNode(true);
  clone.style.left = (object.location.x - Pin.width / 2) + 'px';
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
            'x': getRandomLocation(Map.x1, Map.x2),
            'y': getRandomLocation(Map.y1, Map.y2)
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
    tagList[i].disabled = !tagList[i].disabled;
  }
};

var disableElement = function () {
  elementStatus(filterList);
  elementStatus(adList);
};

disableElement(true);

var pinPoint = function () {
  inputAddress.value = (mainPin.offsetLeft - MainPin.width) + ', ' + Math.round(mainPin.offsetTop + MainPin.height);
};

mainPin.addEventListener('mouseup', function () {
  pinPoint();
});

var pinsOnMap = renderPins(findTemplate('#pin', '.map__pin'), buildObjects());

mainPin.addEventListener('click', function () {
  disableElement(false);
  removeClass('.map', 'map--faded');
  removeClass('.ad-form', 'ad-form--disabled');
  mapPins.appendChild(pinsOnMap);
});
