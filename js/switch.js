'use strict';

(function () {
  var mapFaded = document.querySelector('.map--faded');
  var adForm = document.querySelector('.ad-form');
  var filters = document.querySelector('.map__filters');
  var filterList = filters.children;
  var adList = adForm.children;

  var toggleTag = function (status) {
    [].forEach.call(filterList, function (element) {
      element.disabled = status;
    });
    [].forEach.call(adList, function (element) {
      element.disabled = status;
    });
  };

  var toggleFadeOut = function () {
    mapFaded.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  var toggleFadeIn = function () {
    mapFaded.classList.add('map--faded');
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
