'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPinButton = map.querySelector('.map__pin--main');
  var formAddress = document.querySelector('input[name="address"]');
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

  var makeMainPinBackAgain = function () {
    MainPin.x = mainPinButton.offsetLeft;
    MainPin.y = mainPinButton.offsetTop;
  };

  makeMainPinBackAgain();
  MainPin.initialCoords = getPinCoords();

  var turnOn = function () {
    window.state.activate();
    window.pin.show();
    isActive = true;
  };

  mainPinButton.addEventListener('mousedown', function (evtDown) {

    var pointsA = {
      x: evtDown.clientX,
      y: evtDown.clientY
    };

    var onMainPinMouseMove = function (evtMove) {

      if (!isActive) {
        turnOn();
      }

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

    var onMainPinMouseUp = function () {
      document.removeEventListener('mousemove', onMainPinMouseMove);
      document.removeEventListener('mouseup', onMainPinMouseMove);
      mainPinButton.removeEventListener('mousemove', onMainPinMouseMove);
    };

    document.addEventListener('mousemove', onMainPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);
    mainPinButton.addEventListener('mousemove', onMainPinMouseMove);
  });

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
