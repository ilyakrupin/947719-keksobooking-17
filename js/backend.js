'use strict';

(function () {
  var Url = {
    DOWNLOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };
  var JSON_TYPE = 'json';
  var MAX_RESPONSE_TIME = 5000;
  var HTTP_OK = 200;

  var connect = function (onSuccess, onError, data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = JSON_TYPE;
    xhr.timeout = MAX_RESPONSE_TIME;

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка загрузки данных');
    });

    xhr.addEventListener('timeout', function () {
      onError('Данные загрузить не удалось');
    });

    if (data) {
      xhr.open('POST', Url.UPLOAD);
      xhr.send(data);
    } else {
      xhr.open('GET', Url.DOWNLOAD);
      xhr.send();
    }
  };

  window.backend = {
    dbquery: connect
  };
})();
