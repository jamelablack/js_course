$(function() {
  var $canvas = $("#canvas");

  function getFormObject($f) {
    var o = {};

    $f.serializeArray().forEach(function(input) {
      o[input.name] = input.value;
    });

    return o;
  }

  function createElement(data) {
    var $d = $("<div />", {
      "class": data.shape_type,
      data: data
    });

   resetElement($d);
   return $d;
  }

  function animateElement() {
    var $e = $(this),
      data = $e.data();

    resetElement($e);
    $e.animate({
      left: +data.end_x,
      top: +data.end_y
    }, +data.duration);
  }

  function resetElement($e) {
    var data = $e.data();

    $e.css({
      left: +data.start_x,
      right: +data.start_y
    });
  }

  function stopAnimations() {
    $canvas.find("div").stop();
  }

  $("form").on("submit", function(e) {
    e.preventDefault();

    var  $f = $(this),
         data = getFormObject($f);

    $canvas.append(createElement(data));
  });

  $("animate").on("click", function(e) {
    e.preventDefault();
    $canvas.find("div").each(animateElement);
  });

  $("#stop").on("click", function(e) {
    e.preventDefault();

    stopAnimations();
  });

});
