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
  var oldPhoto;
  var newImageContainer;
  var dragSourceEl;

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
    if (oldAvatar) {
      avatarImage.remove();
      avatarContainer.style.padding = '0 15px';
      avatarContainer.appendChild(oldAvatar);
    }

    if (newImageContainer) {
      var galleryChildren = galleryContainer.querySelectorAll('.ad-form__photo');
      [].forEach.call(galleryChildren, function (element) {
        element.remove();
      });
      if (oldPhoto) {
        galleryContainer.appendChild(oldPhoto);
        oldPhoto = null;
      }
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
        return file.name.toLowerCase().endsWith(it);
      });
    });
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

  var getFileData = function (data) {
    return (getFiles(data).length === 0) ? false : getFiles(data);
  };

  var onAvatarInputChange = function () {
    var match = getFileData(avatarInput.files) || getFileData(arguments[0]);

    if (match) {
      if (!oldAvatar) {
        oldAvatar = avatarContainer.removeChild(avatarImage);
      } else {
        oldAvatar.remove();
      }

      avatarContainer.style.padding = '0';
      avatarImage.remove();
      avatarImage = avatarContainer.appendChild(getAvatar(match[0]));
    } else if (arguments[0].length > 0) {
      if (!oldAvatar) {
        oldAvatar = avatarContainer.removeChild(avatarImage);
      } else {
        oldAvatar.remove();
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
      newImage.addEventListener('dragstart', onImgDragStart);
      newImage.addEventListener('dragover', onImgDragOver);
      newImage.addEventListener('drop', onImgDrop);
    });
    reader.readAsDataURL(photo);

    return newImage;
  };

  var onPhotoInputChange = function () {
    var matches = getFiles(photoInput.files);
    var fragment = document.createDocumentFragment();

    if (matches.length > 0) {
      if (!oldPhoto) {
        oldPhoto = galleryContainer.removeChild(imageContainer);
      }

      matches.forEach(function (file) {
        newImageContainer = imageContainer.cloneNode();
        newImageContainer.appendChild(getPhoto(file));
        fragment.appendChild(newImageContainer);
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
