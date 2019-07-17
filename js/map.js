'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPinButton = map.querySelector('.map__pin--main');
  var formAddress = document.querySelector('input[name="address"]');
  var pointsA = {};
  var isActive = false;
  var MapLimit = {
    TOP: 130,
    BOTTOM: 630,
  };
  var MainPin = {
    WIDTH: 32,
    HEIGHT: 82,
    initialCoords: '',
    x: 0,
    y: 0
  };

  var MainPinLimit = {
    left: -MainPin.WIDTH,
    right: map.offsetWidth - MainPin.WIDTH,
    top: MapLimit.TOP - MainPin.HEIGHT,
    bottom: MapLimit.BOTTOM - MainPin.HEIGHT
  };

  var limitCoords = function () {
    switch (true) {
      case mainPinButton.offsetLeft < MainPinLimit.left:
        mainPinButton.style.left = MainPinLimit.left + 'px';
        break;
      case mainPinButton.offsetLeft > MainPinLimit.right:
        mainPinButton.style.left = MainPinLimit.right + 'px';
        break;
      case mainPinButton.offsetTop < MainPinLimit.top:
        mainPinButton.style.top = MainPinLimit.top + 'px';
        break;
      case mainPinButton.offsetTop > MainPinLimit.bottom:
        mainPinButton.style.top = MainPinLimit.bottom + 'px';
        break;
    }
  };

  var getPinCoords = function () {
    formAddress.value = (mainPinButton.offsetLeft + MainPin.WIDTH) + ', ' + (mainPinButton.offsetTop + MainPin.HEIGHT);
    return formAddress.value;
  };

  var saveMainPinCoords = function () {
    MainPin.x = mainPinButton.offsetLeft;
    MainPin.y = mainPinButton.offsetTop;
  };

  saveMainPinCoords();
  MainPin.initialCoords = getPinCoords();

  var activateMap = function () {
    window.switch.on();
    window.pin.show();
    isActive = !isActive;
  };

  var onMainPinMouseDown = function (evtDown) {
    activateMap();
    pointsA = {
      x: evtDown.clientX,
      y: evtDown.clientY
    };
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  };

  var onDocumentMouseMove = function (evtMove) {
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
    mainPinButton.style.left = (mainPinButton.offsetLeft - shift.x) + 'px';
    mainPinButton.style.top = (mainPinButton.offsetTop - shift.y) + 'px';
    limitCoords();
    getPinCoords();
  };

  var onDocumentMouseUp = function () {
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);
  };

  mainPinButton.addEventListener('mousedown', onMainPinMouseDown);

  window.map = {
    container: map,
    initialPinAddress: function () {
      formAddress.value = MainPin.initialCoords;
    },
    initialPinCoords: function () {
      mainPinButton.style.left = MainPin.x + 'px'; mainPinButton.style.top = MainPin.y + 'px';
    }
  };
})();
