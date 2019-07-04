'use strict';

(function () {

  var filters = document.querySelector('.map__filters');
  var filterList = filters.children;
  var adForm = document.querySelector('.ad-form');
  var adList = adForm.children;

  var elementStatus = function (tagList) {
    [].forEach.call(tagList, function (element) {
      element.disabled = !element.disabled;
    });
  };

  elementStatus(filterList);
  elementStatus(adList);

  window.activateForm = function () {
    elementStatus(filterList);
    elementStatus(adList);
  };

})();
