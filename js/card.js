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

  var getRoomsAndGuests = function (rooms, guests) {
    return rooms + ' ' + getWordEndings(rooms, 'комната', 'комнаты', 'комнат') + ' для ' + guests + ' ' + getWordEndings(guests, 'гостя', 'гостей', 'гостей');
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
    var cardAvatar = clone.querySelector('.popup__avatar');
    var cardTitle = clone.querySelector('.popup__title');
    var cardAddress = clone.querySelector('.popup__text--address');
    var cardPrice = clone.querySelector('.popup__text--price');
    var cardType = clone.querySelector('.popup__type');
    var cardCapacity = clone.querySelector('.popup__text--capacity');
    var cardTime = clone.querySelector('.popup__text--time');
    var cardDescription = clone.querySelector('.popup__description');
    var cardFeatures = clone.querySelector('.popup__features');
    var cardPhotos = clone.querySelector('.popup__photos');
    var cardPhoto = cardPhotos.querySelector('.popup__photo');
    var closeButton = clone.querySelector('.popup__close');

    cardAvatar.src = (object.author.avatar) ? object.author.avatar : cardAvatar.remove();
    cardTitle.textContent = (object.offer.title) ? object.offer.title : cardTitle.remove();
    cardAddress.textContent = (object.offer.adress) ? object.offer.adress : cardAddress.remove();
    cardPrice.textContent = (object.offer.price) ? object.offer.price + '\u20bd/ночь' : cardPrice.remove();
    cardType.textContent = (object.offer.type) ? Property[object.offer.type] : cardType.remove();
    cardCapacity.textContent = (object.offer.rooms && object.offer.guests) ? getRoomsAndGuests(object.offer.rooms, object.offer.guests) : cardCapacity.remove();
    cardTime.textContent = (object.offer.checkin && object.offer.checkout) ? 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout : cardTime.remove();
    cardDescription.textContent = (object.offer.description) ? object.offer.description : cardDescription.remove();

    if (object.offer.features.length > 0) {
      object.offer.features.forEach(function (element) {
        var featureItem = document.createElement('li');
        featureItem.className = 'popup__feature popup__feature--' + element;
        cardFeatures.appendChild(featureItem);
      });
    } else {
      cardFeatures.remove();
    }

    if (object.offer.photos.length > 0) {
      object.offer.photos.forEach(function (element) {
        var cloneCardPhoto = cardPhoto.cloneNode(true);
        cloneCardPhoto.src = element;
        cardPhotos.appendChild(cloneCardPhoto);
      });
    }
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
