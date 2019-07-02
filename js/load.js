'use strict';

(function () {
  var template = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var ESC = 27;

  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
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

    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  };

  var onError = function (message) {
    var errorMessage = template.cloneNode(true);
    errorMessage.children[0].textContent = message;
    main.appendChild(errorMessage);
    document.addEventListener('click', function () {
      errorMessage.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC) {
        errorMessage.remove();
      }
    });
  };

  var onSuccess = function (data) {
    console.log(data);
  };

  window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
})();
