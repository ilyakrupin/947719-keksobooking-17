'use strict';

(function () {

  var filters = document.querySelector('.map__filters');
  var filterList = filters.children;
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var adList = adForm.children;

  var toggleTag = function (tagList, status) {
    [].forEach.call(tagList, function (element) {
      element.disabled = status;
    });
  };

  var fadeOut = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  var fadeIn = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  toggleTag(filterList, true);
  toggleTag(adList, true);

  var activateForm = function () {
    fadeOut();
    toggleTag(filterList, false);
    toggleTag(adList, false);
  };

  var deactivateForm = function () {
    fadeIn();
    toggleTag(filterList, true);
    toggleTag(adList, true);
  };

  window.state = {
    activate: activateForm,
    deactivate: deactivateForm
  };
})();
