'use strict';

(function () {

  var map = document.querySelector('.map');
  var mainPinButton = map.querySelector('.map__pin--main');
  var formAddress = document.querySelector('input[name="address"]');
  var MapLimit = {
    top: 130,
    bottom: 630,
  };

  var MainPin = {
    width: 32,
    height: 82,
    initialCoords: '',
    x: 0,
    y: 0
  };

  var mainPinBoundaries = {
    left: -MainPin.width,
    right: map.offsetWidth - MainPin.width,
    top: MapLimit.top - MainPin.height,
    bottom: MapLimit.bottom - MainPin.height
  };

  var limitCoords = function () {
    switch (true) {
      case mainPinButton.offsetLeft < mainPinBoundaries.left:
        mainPinButton.style.left = mainPinBoundaries.left + 'px';
        break;
      case mainPinButton.offsetLeft > mainPinBoundaries.right:
        mainPinButton.style.left = mainPinBoundaries.right + 'px';
        break;
      case mainPinButton.offsetTop < mainPinBoundaries.top:
        mainPinButton.style.top = mainPinBoundaries.top + 'px';
        break;
      case mainPinButton.offsetTop > mainPinBoundaries.bottom:
        mainPinButton.style.top = mainPinBoundaries.bottom + 'px';
        break;
    }
  };

  var showPinCoords = function () {
    formAddress.value = (mainPinButton.offsetLeft + MainPin.width) + ', ' + (mainPinButton.offsetTop + MainPin.height);
    return formAddress.value;
  };

  var makeMainPinBackAgain = function () {
    MainPin.x = mainPinButton.offsetLeft;
    MainPin.y = mainPinButton.offsetTop;
  };

  makeMainPinBackAgain();
  MainPin.initialCoords = showPinCoords();

  var onMainPinMouseMoveActive = function () {
    window.state.activate();
    window.pin.show();
    mainPinButton.removeEventListener('mouseup', onMainPinMouseMoveActive);
  };

  mainPinButton.addEventListener('mousedown', function (evtDown) {

    var pointsA = {
      x: evtDown.clientX,
      y: evtDown.clientY
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

      mainPinButton.style.left = (mainPinButton.offsetLeft - shift.x) + 'px';
      mainPinButton.style.top = (mainPinButton.offsetTop - shift.y) + 'px';

      limitCoords();
      showPinCoords();
    };

    var onMainPinMouseUp = function () {
      document.removeEventListener('mousemove', onMainPinMouseMove);
      document.removeEventListener('mouseup', onMainPinMouseMove);
      mainPinButton.removeEventListener('mousemove', onMainPinMouseMoveActive);
    };

    document.addEventListener('mousemove', onMainPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);
    mainPinButton.addEventListener('mouseup', onMainPinMouseMoveActive);
  });

  window.map = {
    element: map,
    initialPinAddress: function () {
      formAddress.value = MainPin.initialCoords;
    },
    initialPinCoords: function () {
      mainPinButton.style.left = MainPin.x + 'px'; mainPinButton.style.top = MainPin.y + 'px';
    }
  };

})();
