'use strict';

(function () {
  var mainPinButton = window.global.MAP.querySelector('.map__pin--main');
  var formAddress = document.querySelector('input[name="address"]');
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var pins = [];
  var pointsA = {};
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
    right: window.global.MAP.offsetWidth - MainPin.WIDTH,
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

  var findDefaultPinAddress = function () {
    formAddress.value = MainPin.initialCoords;
  };

  var findDefaultPinCoords = function () {
    mainPinButton.style.left = MainPin.x + 'px'; mainPinButton.style.top = MainPin.y + 'px';
  };

  var getPinCoords = function () {
    formAddress.value = (mainPinButton.offsetLeft + MainPin.WIDTH) + ', ' + (mainPinButton.offsetTop + MainPin.HEIGHT);
    return formAddress.value;
  };

  var saveMainPinCoords = function () {
    MainPin.x = mainPinButton.offsetLeft;
    MainPin.y = mainPinButton.offsetTop;
  };

  window.switch.off();
  saveMainPinCoords();
  MainPin.initialCoords = getPinCoords();

  var onMainPinMouseDown = function (evtDown) {
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

  var onError = function (message) {
    var errorMessage = errorTemplate.cloneNode(true);
    errorMessage.firstElementChild.textContent = message;
    main.appendChild(errorMessage);

    main.addEventListener('mouseup', function () {
      errorMessage.remove();
    });

    document.addEventListener('keyup', function (evt) {
      if (evt.keyCode === window.global.ESC) {
        errorMessage.remove();
      }
    });

    window.form.deactivateMap();
  };

  var onSuccess = function (data) {
    pins = data.slice();
    window.pin.renderPins(pins);
  };

  var getData = function () {
    return pins;
  };

  var onDocumentMouseUp = function () {
    if (window.global.MAP.classList.contains('map--faded')) {
      window.backend.dbquery(onSuccess, onError);
      window.form.activateMap();
    }
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);
  };

  mainPinButton.addEventListener('mousedown', onMainPinMouseDown);

  window.map = {
    getData: getData,
    findDefaultPinAddress: findDefaultPinAddress,
    findDefaultPinCoords: findDefaultPinCoords
  };
})();
