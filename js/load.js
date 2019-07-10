'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var HTTP_OK = 200;

  window.load = function (onSuccessPins, onSuccessCards, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_OK) {
        var xhrResponse = xhr.response;
        xhrResponse.forEach(function (element, index) {
          element.lot = 'lot' + index;
        });
        onSuccessPins(xhrResponse);
        onSuccessCards(xhrResponse);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL);
    xhr.send();
  };

})();
