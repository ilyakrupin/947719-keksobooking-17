'use strict';

(function () {
  var main = document.querySelector('main');
  var selectType = window.global.FORM.querySelector('#type');
  var inputPrice = window.global.FORM.querySelector('#price');
  var selectRooms = window.global.FORM.querySelector('#room_number');
  var selectCapacity = window.global.FORM.querySelector('#capacity');
  var selectTimeIn = window.global.FORM.querySelector('#timein');
  var selectTimeOut = window.global.FORM.querySelector('#timeout');
  var resetButton = window.global.FORM.querySelector('.ad-form__reset');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessage = successTemplate.cloneNode(true);
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);
  var errorButton = errorTemplate.querySelector('.error__button');

  var TYPES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var ROOMS = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0'],
    'MIN': '1',
    'MAX': '100',
    'VIP': '0'
  };

  selectType.addEventListener('change', function () {
    inputPrice.min = inputPrice.placeholder = TYPES[selectType.value];
  });

  selectTimeIn.addEventListener('change', function () {
    selectTimeOut.value = selectTimeIn.value;
  });

  selectTimeOut.addEventListener('change', function () {
    selectTimeIn.value = selectTimeOut.value;
  });

  var onRoomsChange = function () {
    if (selectRooms.options.length > 0) {
      [].forEach.call(selectCapacity.options, function (item) {
        item.selected = (ROOMS[selectRooms.value][0] === item.value);
        item.disabled = !(ROOMS[selectRooms.value].indexOf(item.value) >= 0);
      });
    }
  };

  var onCapacityChange = function () {
    switch (true) {
      case (selectCapacity.value > selectRooms.value && selectCapacity.value !== ROOMS['VIP']):
        selectRooms.value = selectCapacity.value;
        break;
      case (selectCapacity.value === ROOMS['VIP']):
        selectRooms.value = ROOMS['MAX'];
        break;
      case (selectCapacity.value === ROOMS['MIN'] && selectRooms.value === ROOMS['MAX']):
        selectRooms.value = ROOMS['MIN'];
    }
  };

  var resetForm = function () {
    [].forEach.call(selectCapacity.options, function (item) {
      item.selected = false;
      item.disabled = false;
    });
    window.global.FORM.reset();
  };

  var removeErrorMessage = function (evt) {
    if (evt.type === 'click' || evt.keyCode === window.global.ESC) {
      main.removeChild(errorMessage);
      document.removeEventListener('keydown', removeErrorMessage);
      errorButton.removeEventListener('click', removeErrorMessage);
      document.removeEventListener('click', removeErrorMessage);
    }
  };

  var deactivateMap = function () {
    resetForm();
    window.filter.reset();
    window.pin.remove();
    window.card.remove();
    window.switch.off();
    window.file.reset();
    window.map.findDefaultPinAddress();
    window.map.findDefaultPinCoords();
  };

  var activateMap = function () {
    window.switch.on();
    window.file.activate();
  };

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivateMap();
  });

  var removeSuccessMessage = function (evt) {
    if (evt.type === 'click' || evt.keyCode === window.global.ESC) {
      main.removeChild(successMessage);
      document.removeEventListener('keydown', removeSuccessMessage);
      document.removeEventListener('click', removeSuccessMessage);
    }
  };

  var errorHandler = function () {
    main.appendChild(errorMessage);
    document.addEventListener('click', removeErrorMessage);
    errorButton.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', removeErrorMessage);
  };

  var successHandler = function () {
    main.appendChild(successMessage);
    document.addEventListener('click', removeSuccessMessage);
    document.addEventListener('keydown', removeSuccessMessage);
  };

  selectCapacity.addEventListener('change', onCapacityChange);
  selectRooms.addEventListener('change', onRoomsChange);
  window.global.FORM.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.dbquery(successHandler, errorHandler, new FormData(window.global.FORM));
    deactivateMap();
  });

  window.form = {
    activateMap: activateMap,
    deactivateMap: deactivateMap
  };
})();
