'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.ad-form');
  var avatarInput = form.querySelector('#avatar');
  var photoInput = form.querySelector('#images');
  var avatarContainer = form.querySelector('.ad-form-header__preview');
  var imageContainer = form.querySelector('.ad-form__photo');
  var avatarImage = form.querySelector('.ad-form-header__preview > img');
  var galleryContainer = document.querySelector('.ad-form__photo-container');
  var oldAvatar;
  var newImageContainer;
  var oldPhoto;
  var dragSourceEl = null;

  var dropArea = form.querySelector('.ad-form__upload');
  var dropZone = dropArea.querySelector('.ad-form__drop-zone');
  var dragStyle = dropZone.style.border;

  var onDragEnter = function (evt) {
    evt.preventDefault();
  };

  var onDragLeave = function (evt) {
    evt.preventDefault();
    dropZone.style.border = dragStyle;
  };

  var onDragOver = function (evt) {
    evt.preventDefault();
    dropZone.style.border = 'solid 1px #ff6d51';
  };

  var onDrop = function (evt) {
    evt.preventDefault();
    dropZone.style.border = dragStyle;
    onPhotoInputChange(evt.dataTransfer.files);
  };

  dropArea.addEventListener('dragenter', onDragEnter);
  dropArea.addEventListener('dragleave', onDragLeave);
  dropArea.addEventListener('dragover', onDragOver);
  dropArea.addEventListener('drop', onDrop);

  window.resetFile = function () {

    avatarContainer.replaceChild(oldAvatar, avatarImage);

    if (newImageContainer) {
      var galleryChildren = galleryContainer.querySelectorAll('.ad-form__photo');
      [].forEach.call(galleryChildren, function (element) {
        element.remove();
      });
      galleryContainer.appendChild(oldPhoto);
      oldPhoto = null;
    }

  };

  var onImgDragStart = function (evt) {
    dragSourceEl = evt.target;
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('src', dragSourceEl.src);
  };
  var onImgDragOver = function (evt) {
    evt.preventDefault();
  };
  var onImgDrop = function (evt) {
    var dragTargetEl = evt.target;
    if (dragSourceEl !== dragTargetEl) {
      dragSourceEl.src = dragTargetEl.src;
      dragTargetEl.src = evt.dataTransfer.getData('src');
    }
  };

  var getFiles = function (photoFiles) {
    var files = Array.from(photoFiles);

    return files.filter(function (file) {
      return FILE_TYPES.some(function (it) {
        return file.name.endsWith(it);
      });
    });
  };

  var getAvatar = function (avatar) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      avatarImage.width = '70';
      avatarImage.height = '70';
      avatarImage.style.borderRadius = '4px';
      avatarImage.style.position = 'relative';
      avatarImage.style.right = '15px';
      avatarImage.src = reader.result;
    });
    reader.readAsDataURL(avatar);

    return avatarImage;
  };

  var onAvatarInputChange = function () {
    var matches = getFiles(arguments[0]);

    if (matches) {
      oldAvatar = avatarContainer.replaceChild(getAvatar(matches[0]), avatarImage);
    }

  };

  var getPhoto = function (photo) {
    var reader = new FileReader();
    var newImage = document.createElement('img');

    reader.addEventListener('load', function () {
      newImage.src = reader.result;
      newImage.width = '70';
      newImage.height = '70';
      newImage.alt = 'Фотография жилья';
      newImage.draggable = true;
      newImage.style.borderRadius = '4px';
      newImage.addEventListener('dragstart', onImgDragStart);
      newImage.addEventListener('dragover', onImgDragOver);
      newImage.addEventListener('drop', onImgDrop);
    });
    reader.readAsDataURL(photo);

    return newImage;
  };

  var onPhotoInputChange = function () {
    var matches = getFiles(arguments[0]);
    var fragment = document.createDocumentFragment();

    if (matches) {
      matches.forEach(function (file) {
        newImageContainer = imageContainer.cloneNode();
        newImageContainer.appendChild(getPhoto(file));
        fragment.appendChild(newImageContainer);
      });
    }

    if (!oldPhoto) {
      oldPhoto = galleryContainer.removeChild(imageContainer);
    }

    galleryContainer.appendChild(fragment);
  };

  avatarInput.addEventListener('change', function () {
    onAvatarInputChange(avatarInput.files);
  });

  photoInput.addEventListener('change', function () {
    onPhotoInputChange(photoInput.files);
  });
})();
