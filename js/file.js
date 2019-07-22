'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.ad-form');
  var avatarChooser = form.querySelector('#avatar');
  var galleryChooser = form.querySelector('#images');
  var avatarPreviewContainer = form.querySelector('.ad-form-header__preview');
  var avatarPreview = form.querySelector('.ad-form-header__preview > img');
  var galleryPreview = form.querySelector('.ad-form__photo');
  var saveAvatarPreview = avatarPreview.cloneNode();
  var saveGalleryPreview = galleryPreview.cloneNode();

  var galleryContainer = document.querySelector('.ad-form__photo-container');

  window.resetFile = function () {
    avatarPreviewContainer.removeChild(avatarPreview);
    var galleryChildren = galleryContainer.querySelectorAll('.ad-form__photo');
    if (galleryChildren) {
      [].forEach.call(galleryChildren, function (element) {
        element.remove();
      });
    }

    avatarPreviewContainer.appendChild(saveAvatarPreview);
    galleryContainer.appendChild(saveGalleryPreview);
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
          avatarPreview.src = reader.result;
          avatarPreview.width = '70';
          avatarPreview.height = '70';
          avatarPreview.style.borderRadius = '4px';
          avatarPreview.style.position = 'relative';
          avatarPreview.style.right = '15px';
        });

        reader.readAsDataURL(file);
      }
    });
  };

  var uploadGallery = function (fileChooser) {
    fileChooser.addEventListener('change', function () {
      var files = Array.from(fileChooser.files);
      var fragment = document.createDocumentFragment();
      var renderPreview = function (file) {
        var clonePreview = galleryPreview.cloneNode();
        var newGalleryPreview = document.createElement('img');
        newGalleryPreview.width = '70';
        newGalleryPreview.height = '70';
        newGalleryPreview.alt = 'Фотография жилья';
        newGalleryPreview.style.borderRadius = '4px';

        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            newGalleryPreview.src = reader.result;
          });
          clonePreview.appendChild(newGalleryPreview);
          fragment.appendChild(clonePreview);
          reader.readAsDataURL(file);
        }
      };

      files.forEach(function (image) {
        renderPreview(image);
      });

      galleryContainer.appendChild(fragment);
      galleryPreview.remove();
    });
  };

  uploadPicture(avatarChooser, avatarPreview);
  uploadGallery(galleryChooser);
})();
