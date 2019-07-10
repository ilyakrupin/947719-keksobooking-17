'use strict';

(function () {

  var template = document.querySelector('#card').content.querySelector('.map__card');
  var container = document.querySelector('.map');
  var block = container.querySelector('.map__filters-container');

  var classList = {
    avatar: '.popup__avatar',
    title: '.popup__title',
    address: '.popup__text--address',
    price: '.popup__text--price',
    type: '.popup__type',
    capacity: '.popup__text--capacity',
    time: '.popup__text--time',
    features: '.popup__features',
    description: '.popup__description',
    photos: '.popup__photos',
    photo: '.popup__photo'
  };

  var typeProperty = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var numDecline = function (number, nominative, genitiveSingular, genitivePlural) {
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

  var loadCard = function (object) {
    var clone = template.cloneNode(true);
    var cardFeatures = clone.querySelector(classList.features);
    var cardPhotos = clone.querySelector(classList.photos);
    var cardPhoto = cardPhotos.querySelector(classList.photo);

    clone.querySelector(classList.avatar).src = object.author.avatar;
    clone.querySelector(classList.title).textContent = object.offer.title;
    clone.querySelector(classList.address).textContent = object.offer.adress;
    clone.querySelector(classList.price).textContent = object.offer.price + '₽/ночь';
    clone.querySelector(classList.type).textContent = typeProperty[object.offer.type];
    clone.querySelector(classList.capacity).textContent = object.offer.rooms + ' ' + numDecline(object.offer.rooms, 'комната', 'комнаты', 'комнат') + ' для ' + object.offer.guests + ' ' + numDecline(object.offer.guests, 'гостя', 'гостей', 'гостей');
    clone.querySelector(classList.time).textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    clone.querySelector(classList.description).textContent = object.offer.description;

    object.offer.features.forEach(function (element) {
      var newLi = document.createElement('li');
      newLi.className = 'popup__feature popup__feature--' + element;
      cardFeatures.appendChild(newLi);
    });

    object.offer.photos.forEach(function (element) {
      var cloneCardPhoto = cardPhoto.cloneNode(true);
      cloneCardPhoto.src = element;
      cardPhotos.appendChild(cloneCardPhoto);
    });
    cardPhotos.firstElementChild.remove();

    clone.style.visibility = 'hidden';
    clone.setAttribute('lot', object.lot);

    return clone;
  };

  var renderCards = function (object) {
    var fragment = document.createDocumentFragment();

    object.forEach(function (element) {
      fragment.appendChild(loadCard(element));
    });

    container.insertBefore(fragment, block);
  };

  var hideCards = function () {
    var cards = container.querySelectorAll('article[lot]');
    cards.forEach(function (element) {
      element.style.visibility = 'hidden';
    });
  };

  window.card = {
    renderCards: renderCards,
    hideCards: hideCards
  };

})();
