document.addEventListener('DOMContentLoaded', function() {
  var no_photos = document.getElementById('no_photos');
  var viewer = document.getElementById('viewer');
  var current_photo = document.getElementById('current_photo');
  var uploader = document.getElementById('uploader');
  var next_photo = document.getElementById('next_photo');
  var prev_photo = document.getElementById('prev_photo');
  var reader = new FileReader();

  var photos = new Array();
  var current_photo_idx = 0;

  function upload_photo(upload_event) {
    for (var i = 0; i < upload_event.target.files.length; i++) {
      photos.push(upload_event.target.files[i]);
    }

    viewer.style.display = 'block';
    no_photos.style.display = 'none';

    current_photo_idx = photos.length - 1;
    reader.readAsDataURL(photos[current_photo_idx]);
    update_button_visibility();
  }

  function update_button_visibility() {
    if (photos.length == 1) { return; }

    if (current_photo_idx == 0) {
      next_photo.style.display = 'inline';
      prev_photo.style.display = 'none';
    } else if (current_photo_idx == photos.length - 1) {
      next_photo.style.display = 'none';
      prev_photo.style.display = 'inline';
    } else {
      next_photo.style.display = 'inline';
      prev_photo.style.display = 'inline';
    }
  }

  uploader.addEventListener('change', upload_photo);

  reader.onload = function() {
    current_photo.src = reader.result;
  }

  next_photo.addEventListener('click', function() {
    current_photo_idx += 1;
    reader.readAsDataURL(photos[current_photo_idx]);
    update_button_visibility();
  });

  prev_photo.addEventListener('click', function() {
    current_photo_idx -= 1;
    reader.readAsDataURL(photos[current_photo_idx]);
    update_button_visibility();
  });

});
