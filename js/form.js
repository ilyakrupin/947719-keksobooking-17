'use strict';

var selectType = adForm.querySelector('#type');
var inputPrice = adForm.querySelector('#price');

var Types = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

selectType.addEventListener('change', function (evt) {
  inputPrice.min = inputPrice.placeholder = Types[evt.target.value];
});

var selectTimeIn = adForm.querySelector('#timein');
var selectTimeOut = adForm.querySelector('#timeout');

selectTimeIn.addEventListener('change', function (evt) {
  selectTimeOut.value = evt.target.value;
  selectTimeOut[evt.currentTarget.selectedIndex].selected = true;
});

selectTimeOut.addEventListener('change', function (evt) {
  selectTimeIn.value = evt.target.value;
});

var selectRooms = adForm.querySelector('#room_number');
var selectCapacity = adForm.querySelector('#capacity');

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
