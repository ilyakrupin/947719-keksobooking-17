'use strict';

(function () {

  var MainPin = {
    width: 64 / 2,
    height: 82,
    button: document.querySelector('.map__pin--main'),
    input: document.querySelector('input[name="address"]')
  };

  var mainPinBoundaries = {
    left: -MainPin.width,
    right: window.data.Map.area.offsetWidth - MainPin.width,
    top: window.data.Map.areaLimitTop - MainPin.height,
    bottom: window.data.Map.areaLimitBottom - MainPin.height
  };

  var removeClass = function (classParent, classChild) {
    document.querySelector(classParent).classList.remove(classChild);
  };

  var limitCoords = function () {
    switch (true) {
      case MainPin.button.offsetLeft < mainPinBoundaries.left:
        MainPin.button.style.left = mainPinBoundaries.left + 'px';
        break;
      case MainPin.button.offsetLeft > mainPinBoundaries.right:
        MainPin.button.style.left = mainPinBoundaries.right + 'px';
        break;
      case MainPin.button.offsetTop < mainPinBoundaries.top:
        MainPin.button.style.top = mainPinBoundaries.top + 'px';
        break;
      case MainPin.button.offsetTop > mainPinBoundaries.bottom:
        MainPin.button.style.top = mainPinBoundaries.bottom + 'px';
        break;
    }
  };

  var showPinCoords = function () {
    MainPin.input.value = (MainPin.button.offsetLeft + MainPin.width) + ', ' + (MainPin.button.offsetTop + MainPin.height);
  };

  showPinCoords();

  MainPin.button.addEventListener('mousedown', function (evtDown) {

    var pointsA = {
      x: evtDown.clientX,
      y: evtDown.clientY
    };

    var onMainPinMouseMoveActive = function () {
      window.activateForm();
      removeClass('.map', 'map--faded');
      removeClass('.ad-form', 'ad-form--disabled');
      window.showPins();
      MainPin.button.removeEventListener('mousemove', onMainPinMouseMoveActive);
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

      MainPin.button.style.left = (MainPin.button.offsetLeft - shift.x) + 'px';
      MainPin.button.style.top = (MainPin.button.offsetTop - shift.y) + 'px';

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
    MainPin.button.addEventListener('mousemove', onMainPinMouseMoveActive);
  });

})();
