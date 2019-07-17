'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var filters = window.map.container.querySelector('.map__filters');
  var filterList = filters.children;
  var adList = adForm.children;

  var toggleTag = function () {
    filterList.disabled = !filterList.disabled;
    adList.disabled = !adList.disabled;
  };

  var toggleFade = function () {
    window.map.container.classList.toggle('map--faded');
    adForm.classList.toggle('ad-form--disabled');
  };

  var activateForm = function () {
    toggleFade();
    toggleTag();
  };

  var deactivateForm = function () {
    toggleFade();
    toggleTag();
  };

  window.state = {
    activate: activateForm,
    deactivate: deactivateForm
  };
})();
