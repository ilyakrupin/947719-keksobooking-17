'use strict';

(function () {
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var ESC = 27;
  var ClassList = {
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
    photo: '.popup__photo',
    button: '.popup__close'
  };
  var TypeProperty = {
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
    var cardFeatures = clone.querySelector(ClassList.features);
    var cardPhotos = clone.querySelector(ClassList.photos);
    var cardPhoto = cardPhotos.querySelector(ClassList.photo);
    var closeButton = clone.querySelector(ClassList.button);

    clone.querySelector(ClassList.avatar).src = object.author.avatar;
    clone.querySelector(ClassList.title).textContent = object.offer.title;
    clone.querySelector(ClassList.address).textContent = object.offer.adress;
    clone.querySelector(ClassList.price).textContent = object.offer.price + '\u20bd/ночь';
    clone.querySelector(ClassList.type).textContent = TypeProperty[object.offer.type];
    clone.querySelector(ClassList.capacity).textContent = object.offer.rooms + ' ' + getWordEndings(object.offer.rooms, 'комната', 'комнаты', 'комнат') + ' для ' + object.offer.guests + ' ' + getWordEndings(object.offer.guests, 'гостя', 'гостей', 'гостей');
    clone.querySelector(ClassList.time).textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    clone.querySelector(ClassList.description).textContent = object.offer.description;

    object.offer.features.forEach(function (element) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + element;
      cardFeatures.appendChild(featureItem);
    });

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
