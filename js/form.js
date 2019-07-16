'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var selectType = adForm.querySelector('#type');
  var inputPrice = adForm.querySelector('#price');
  var selectRooms = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var selectTimeIn = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');

  var Types = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  selectType.addEventListener('change', function () {
    inputPrice.min = inputPrice.placeholder = Types[selectType.value];
  });

  selectTimeIn.addEventListener('change', function () {
    selectTimeOut.value = selectTimeIn.value;
  });

  selectTimeOut.addEventListener('change', function () {
    selectTimeIn.value = selectTimeOut.value;
  });

  selectRooms.addEventListener('change', function (evt) {
    var index = evt.target.selectedIndex;
    selectCapacity.value = selectCapacity[index].value;
    selectCapacity[index].selected = true;
  });

  selectCapacity.addEventListener('change', function (evt) {
    var index = evt.target.selectedIndex;
    selectRooms.value = selectRooms[index].value;
    selectRooms[index].selected = true;
  });

})();
