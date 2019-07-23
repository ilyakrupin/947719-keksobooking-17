'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.ad-form');
  var avatarChooser = form.querySelector('#avatar');
  var galleryChooser = form.querySelector('#images');
  var avatarContainer = form.querySelector('.ad-form-header__preview');
  var galleryPreview = form.querySelector('.ad-form__photo');
  var avatarPreview = form.querySelector('.ad-form-header__preview > img');
  var galleryContainer = document.querySelector('.ad-form__photo-container');
  var newAvatar;
  var oldAvatar;
  var newGallery;
  var oldGallery;

  window.resetFile = function () {
    if (newAvatar) {
      newAvatar.remove();
      avatarContainer.appendChild(oldAvatar);
    }

    if (newGallery) {
      var galleryChildren = galleryContainer.querySelectorAll('.ad-form__photo');
      [].forEach.call(galleryChildren, function (element) {
        element.remove();
      });
      galleryContainer.appendChild(oldGallery);
      oldGallery = null;
    }

  };

  var uploadPicture = function (fileChooser) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (newAvatar) {
            newAvatar.remove();
          }
          newAvatar = document.createElement('img');
          newAvatar.src = reader.result;
          newAvatar.width = '70';
          newAvatar.height = '70';
          newAvatar.style.borderRadius = '4px';
          newAvatar.style.position = 'relative';
          newAvatar.style.right = '15px';

          if (!oldAvatar) {
            oldAvatar = avatarContainer.removeChild(avatarPreview);
          }

          avatarContainer.appendChild(newAvatar);
        });

        reader.readAsDataURL(file);
      }
    });
  };

  var uploadGallery = function (fileChooser) {
    fileChooser.addEventListener('change', function () {
      var files = Array.from(fileChooser.files);
      var fragment = document.createDocumentFragment();

      var renderPreview = function (thisFile) {
        newGallery = galleryPreview.cloneNode();
        var newImage = document.createElement('img');
        newImage.width = '70';
        newImage.height = '70';
        newImage.alt = 'Фотография жилья';
        newImage.style.borderRadius = '4px';

        var fileName = thisFile.name.toLowerCase();
        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          var reader = new FileReader();

          reader.addEventListener('load', function () {
            newImage.src = reader.result;
          });

          newGallery.appendChild(newImage);
          fragment.appendChild(newGallery);
          reader.readAsDataURL(thisFile);
        }
      };

      files.forEach(function (file) {
        renderPreview(file);
      });

      if (!oldGallery) {
        oldGallery = galleryContainer.removeChild(galleryPreview);
      }

      galleryContainer.appendChild(fragment);
    });
  };

  uploadPicture(avatarChooser);
  uploadGallery(galleryChooser);
})();
