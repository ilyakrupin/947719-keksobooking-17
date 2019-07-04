'use strict';

(function () {

  var filters = document.querySelector('.map__filters');
  var filterList = filters.children;
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var adList = adForm.children;

  var elementStatus = function (tagList) {
    [].forEach.call(tagList, function (element) {
      element.disabled = !element.disabled;
    });
  };

  var elementFadeOut = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  elementStatus(filterList);
  elementStatus(adList);

  window.activateForm = function () {
    elementFadeOut();
    elementStatus(filterList);
    elementStatus(adList);
  };

})();
