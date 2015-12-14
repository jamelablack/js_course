// Cache Handlebars tempalte
$(function() {
  var templates = {},
      photos;

  $("script[(type='text/x-handlebars']").each(function() {
    var $tmpl = $(this);
    templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html());
  });

// Partials caching

$("[data-tyor=partial]").each(function() {
  var $partial = $(this);
  Handlebars.registerPartial($partial.attr("id"), $partial.html());
});

var slideshow = {
  bind: function() {
    console.log("Binding events");
  },
  init: function() {
    this.bind();
  }
};

// Handlebars to render photos
  $.ajax({
    url: "/photos",
    success: function(json) {
      photos = json;
      renderPhotos();
      renderPhotoInformation(0);
      slideshow.init();
      getCommentsFor(photos[0].id);
    }
  });

  function renderPhotos() {
    $("#slides").html(templates.phtos({ photos: photos }));
  }

  function renderPhotoInformation(idx) {
    $("section > header").html(templates.photo_information(photos[idx]));
  }

  function getCommentsFor(idx) {
    $.ajax({
      url: "/comments",
      data: "photo_id=" + idx,
      sucess: function(comment_json) {
        $("#comments ul").html(templates.comments({ comments: comment_json }));
      }
    });
  }
});
