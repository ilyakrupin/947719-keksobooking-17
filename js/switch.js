'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var filters = window.map.wrap.querySelector('.map__filters');
  var filterList = filters.children;
  var adList = adForm.children;

  var toggleTag = function (status) {
    filterList.disabled = status;
    adList.disabled = status;
  };

  var toggleFadeOut = function () {
    window.map.wrap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  var toggleFadeIn = function () {
    window.map.wrap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  var activateForm = function () {
    toggleFadeOut();
    toggleTag(false);
  };

  var deactivateForm = function () {
    toggleFadeIn();
    toggleTag(true);
  };

  window.switch = {
    on: activateForm,
    off: deactivateForm
  };
})();
