'use strict';

(function () {
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var ESC = 27;
  var Property = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var getWordEndings = function (number, nominative, genitiveSingular, genitivePlural) {
    number %= 100;

    if (number > 14) {
      number %= 10;
    }
    switch (true) {
      case number === 1:
        return nominative;
      case number >= 2 && number <= 4:
        return genitiveSingular;
      case number >= 10 && number <= 14:
        return genitivePlural;
      default:
        return genitivePlural;
    }
  };

  var removeCard = function () {
    var popup = window.map.wrap.querySelector('.popup');
    if (popup) {
      window.map.wrap.removeChild(popup);
    }
  };

  var renderCard = function (data) {
    removeCard();
    window.map.wrap.appendChild(getCard(data));
  };

  var getCard = function (object) {
    var clone = template.cloneNode(true);
    var cardFeatures = clone.querySelector('.popup__features');
    var cardPhotos = clone.querySelector('.popup__photos');
    var cardPhoto = cardPhotos.querySelector('.popup__photo');
    var closeButton = clone.querySelector('.popup__close');

    clone.querySelector('.popup__avatar').src = object.author.avatar;
    clone.querySelector('.popup__title').textContent = object.offer.title;
    clone.querySelector('.popup__text--address').textContent = object.offer.adress;
    clone.querySelector('.popup__text--price').textContent = object.offer.price + '\u20bd/ночь';
    clone.querySelector('.popup__type').textContent = Property[object.offer.type];
    clone.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' ' + getWordEndings(object.offer.rooms, 'комната', 'комнаты', 'комнат') + ' для ' + object.offer.guests + ' ' + getWordEndings(object.offer.guests, 'гостя', 'гостей', 'гостей');
    clone.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    clone.querySelector('.popup__description').textContent = object.offer.description;

    if (object.offer.features.length > 0) {
      object.offer.features.forEach(function (element) {
        var featureItem = document.createElement('li');
        featureItem.className = 'popup__feature popup__feature--' + element;
        cardFeatures.appendChild(featureItem);
      });
    } else {
      cardFeatures.remove();
    }

    object.offer.photos.forEach(function (element) {
      var cloneCardPhoto = cardPhoto.cloneNode(true);
      cloneCardPhoto.src = element;
      cardPhotos.appendChild(cloneCardPhoto);
    });
    cardPhotos.firstElementChild.remove();

    closeButton.addEventListener('click', function () {
      removeCard();
    });

    return clone;
  };

  document.addEventListener('keyup', function (evt) {
    if (evt.keyCode === ESC) {
      removeCard();
    }
  });

  window.card = {
    remove: removeCard,
    render: renderCard
  };
})();
