'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var selectType = adForm.querySelector('#type');
  var inputPrice = adForm.querySelector('#price');
  var selectRooms = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var selectTimeIn = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');

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
    var index = selectCapacity.selectedIndex;
    selectRooms.value = selectRooms[index].value;
    selectRooms[index].selected = true;
  };

  selectCapacity.addEventListener('change', onCapacityChange);
  selectRooms.addEventListener('change', onRoomsChange);

})();
