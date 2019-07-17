'use strict';

(function () {

  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var selectType = adForm.querySelector('#type');
  var inputPrice = adForm.querySelector('#price');
  var selectRooms = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var selectTimeIn = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');
  var resetButton = adForm.querySelector('.ad-form__reset');
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
    '100': ['0']
  };

  var ESC = 27;

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
    if (selectCapacity.value > selectRooms.value && selectCapacity.value !== '0') {
      selectRooms.value = selectCapacity.value;
    } else if (selectCapacity.value === '0') {
      selectRooms.value = '100';
    }
  };

  var removeErrorMessage = function (evt) {
    if (evt.type === 'click' || evt.keyCode === ESC) {
      main.removeChild(errorMessage);
      document.removeEventListener('keydown', removeErrorMessage);
      errorButton.removeEventListener('click', removeErrorMessage);
      document.removeEventListener('click', removeErrorMessage);
    }
  };

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    adForm.reset();
    window.pin.remove();
    window.card.remove();
    window.state.deactivate();
    window.map.initialPinAddress();
    window.map.initialPinCoords();
  });

  var removeSuccessMessage = function (evt) {
    if (evt.type === 'click' || evt.keyCode === ESC) {
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
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.dbquery(successHandler, errorHandler, new FormData(adForm));
  });

})();
