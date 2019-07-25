'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.ad-form');
  var defaultAvatar;
  var avatarInput = form.querySelector('#avatar');
  var avatarContainer = form.querySelector('.ad-form-header__preview');
  var avatarImage = form.querySelector('.ad-form-header__preview > img');
  var defaultPhoto;
  var photoInput = form.querySelector('#images');
  var photoContainer = form.querySelector('.ad-form__photo');
  var newPhotoContainer;
  var galleryContainer = document.querySelector('.ad-form__photo-container');
  var sourceElement;

  var dropAreaHeader = form.querySelector('.ad-form__field');
  var dropZoneHeader = dropAreaHeader.querySelector('.ad-form-header__drop-zone');
  var dropArea = form.querySelector('.ad-form__upload');
  var dropZone = dropArea.querySelector('.ad-form__drop-zone');
  var dropZoneHeaderStyle = dropZoneHeader.style.border;
  var dropZoneStyle = dropZone.style.border;

  var onDragEnter = function (evt) {
    evt.preventDefault();
  };
  var onDragLeave = function (evt) {
    evt.preventDefault();
    dropZone.style.border = dropZoneStyle;
  };
  var onDragOver = function (evt) {
    evt.preventDefault();
    dropZone.style.border = 'solid 1px #ff6d51';
  };
  var onDropAreaDrop = function (evt) {
    evt.preventDefault();
    dropZone.style.border = dropZoneStyle;
    onPhotoInputChange(evt.dataTransfer.files);
  };

  var onDropAreaHeaderLeave = function (evt) {
    evt.preventDefault();
    dropZoneHeader.style.border = dropZoneHeaderStyle;
  };
  var onDropAreaHeaderDragOver = function (evt) {
    evt.preventDefault();
    dropZoneHeader.style.border = 'solid 1px #ff6d51';
  };
  var onDropAreaHeaderDrop = function (evt) {
    evt.preventDefault();
    dropZoneHeader.style.border = dropZoneHeaderStyle;
    onAvatarInputChange(evt.dataTransfer.files);
  };

  var resetFile = function () {
    if (defaultAvatar) {
      avatarImage.remove();
      avatarContainer.style.padding = '0 15px';
      avatarContainer.appendChild(defaultAvatar);
    }

    if (newPhotoContainer) {
      var galleryChildren = galleryContainer.querySelectorAll('.ad-form__photo');
      [].forEach.call(galleryChildren, function (element) {
        element.remove();
      });
      if (defaultPhoto) {
        galleryContainer.appendChild(defaultPhoto);
        defaultPhoto = null;
      }
    }

    dropAreaHeader.removeEventListener('dragenter', onDragEnter);
    dropAreaHeader.removeEventListener('dragleave', onDropAreaHeaderLeave);
    dropAreaHeader.removeEventListener('dragover', onDropAreaHeaderDragOver);
    dropAreaHeader.removeEventListener('drop', onDropAreaHeaderDrop);
    dropArea.removeEventListener('dragenter', onDragEnter);
    dropArea.removeEventListener('dragleave', onDragLeave);
    dropArea.removeEventListener('dragover', onDragOver);
    dropArea.removeEventListener('drop', onDropAreaDrop);
    avatarInput.removeEventListener('change', onAvatarInputChange);
    photoInput.removeEventListener('change', onPhotoInputChange);
  };

  var onImageDragStart = function (evt) {
    sourceElement = evt.target;
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('src', sourceElement.src);
  };
  var onImageDragOver = function (evt) {
    evt.preventDefault();
  };
  var onImageDrop = function (evt) {
    var targetElement = evt.target;
    if (sourceElement !== targetElement) {
      sourceElement.src = targetElement.src;
      targetElement.src = evt.dataTransfer.getData('src');
    }
  };

  var getAvatar = function (avatar) {
    var reader = new FileReader();
    var newAvatar = document.createElement('img');
    reader.addEventListener('load', function () {
      newAvatar.width = '70';
      newAvatar.height = '70';
      newAvatar.style.borderRadius = '5px';
      newAvatar.src = reader.result;
    });
    reader.readAsDataURL(avatar);

    return newAvatar;
  };

  var getFiles = function (photoFiles) {
    var files = Array.from(photoFiles);

    return files.filter(function (file) {
      return FILE_TYPES.some(function (it) {
        return file.name.toLowerCase().endsWith(it);
      });
    });
  };

  var getFilesData = function (data) {
    return (getFiles(data).length === 0) ? false : getFiles(data);
  };

  var onAvatarInputChange = function () {
    var match = getFilesData(avatarInput.files) || getFilesData(arguments[0]);
    avatarInput.value = null;
    if (match) {
      if (!defaultAvatar) {
        defaultAvatar = avatarContainer.removeChild(avatarImage);
      } else {
        defaultAvatar.remove();
      }
      avatarContainer.style.padding = '0';
      avatarImage.remove();
      avatarImage = avatarContainer.appendChild(getAvatar(match[0]));
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
      newImage.style.borderRadius = '5px';
      newImage.addEventListener('dragstart', onImageDragStart);
      newImage.addEventListener('dragover', onImageDragOver);
      newImage.addEventListener('drop', onImageDrop);
    });
    reader.readAsDataURL(photo);

    return newImage;
  };

  var onPhotoInputChange = function () {
    var matches = getFilesData(photoInput.files) || getFilesData(arguments[0]);
    photoInput.value = null;
    var fragment = document.createDocumentFragment();
    if (matches) {
      if (!defaultPhoto) {
        defaultPhoto = galleryContainer.removeChild(photoContainer);
      }
      matches.forEach(function (file) {
        newPhotoContainer = photoContainer.cloneNode();
        newPhotoContainer.appendChild(getPhoto(file));
        fragment.appendChild(newPhotoContainer);
      });
    }
    galleryContainer.appendChild(fragment);
  };

  var fileUploadHandlers = function () {
    dropAreaHeader.addEventListener('dragenter', onDragEnter);
    dropAreaHeader.addEventListener('dragleave', onDropAreaHeaderLeave);
    dropAreaHeader.addEventListener('dragover', onDropAreaHeaderDragOver);
    dropAreaHeader.addEventListener('drop', onDropAreaHeaderDrop);

    dropArea.addEventListener('dragenter', onDragEnter);
    dropArea.addEventListener('dragleave', onDragLeave);
    dropArea.addEventListener('dragover', onDragOver);
    dropArea.addEventListener('drop', onDropAreaDrop);

    avatarInput.addEventListener('change', onAvatarInputChange);
    photoInput.addEventListener('change', onPhotoInputChange);
  };

  window.file = {
    activate: fileUploadHandlers,
    reset: resetFile
  };

})();
