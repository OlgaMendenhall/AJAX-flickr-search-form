$(document).ready(function() {

// do stuff when the button is clicked
 $('form').submit(function(evt) {
   evt.preventDefault();  // preventing the form from submission
   var $searchField = $('#search');
   var $submitButton = $('#submit');
   
   $searchField.prop("disabled", true);
   $submitButton.attr("disabled", true).val("searching...");

    // the AJAX part
       // flickr api url
    var flickerAPI = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
    var animal = $searchField.val();
   
       // Flickr options
    var flickrOptions = {
      tags: animal,
      format: "json"
    };
   
       // displayPhotos
    function displayPhotos(data) {
      var photoHTML = '<ul>';
      
      // Looping through the images
      $.each(data.items,function(i,photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      }); // end each
      
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
      $searchField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Search");
    }
   
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

  }); // end submit

}); // end ready