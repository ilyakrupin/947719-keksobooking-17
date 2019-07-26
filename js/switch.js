'use strict';

(function () {
  var mapFaded = document.querySelector('.map--faded');
  var mapFilters = window.global.MAP.querySelector('.map__filters');
  var filterList = mapFilters.children;
  var formList = window.global.FORM.children;

  var toggleTag = function (status) {
    [].forEach.call(filterList, function (element) {
      element.disabled = status;
    });
    [].forEach.call(formList, function (element) {
      element.disabled = status;
    });
  };

  var toggleFadeOut = function () {
    mapFaded.classList.remove('map--faded');
    window.global.FORM.classList.remove('ad-form--disabled');
  };

  var toggleFadeIn = function () {
    mapFaded.classList.add('map--faded');
    window.global.FORM.classList.add('ad-form--disabled');
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
