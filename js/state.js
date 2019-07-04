'use strict';

(function () {

  var filters = document.querySelector('.map__filters');
  var filterList = filters.children;
  var adForm = document.querySelector('.ad-form');
  var adList = adForm.children;

  var elementStatus = function (tagList) {
    for (var i = 0; i < tagList.length; i++) {
      tagList[i].disabled = false;
    }
  };

  // var elementStatus = function (tagList) {
  //   for (var i = 0; i < tagList.length; i++) {
  //     tagList[i].disabled = false;
  //   }
  //
  //   tagList.forEach(function (element) {
  //     element.disabled = false;
  //   })
  // };

  window.switchElement = function () {
    elementStatus(filterList);
    elementStatus(adList);
  };

})();
