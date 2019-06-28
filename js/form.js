'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var selectType = adForm.querySelector('#type');
  var inputPrice = adForm.querySelector('#price');
  var selectRooms = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var selectTimeIn = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');

  selectType.addEventListener('change', function (evt) {
    inputPrice.min = inputPrice.placeholder = window.data.Types[evt.target.value];
  });

  selectTimeIn.addEventListener('change', function (evt) {
    selectTimeOut.value = evt.target.value;
    selectTimeOut[evt.currentTarget.selectedIndex].selected = true;
  });

  selectTimeOut.addEventListener('change', function (evt) {
    selectTimeIn.value = evt.target.value;
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
