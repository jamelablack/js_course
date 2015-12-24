$(function() {
  var canvas = $("canvas")[0],
      ctx = canvas.getContext("2d"),
      method,
     $color = $("input");

  var drawing_methods = {
    square: function(e) {
      var side = 30;
          x = e.offsetX - side / 2,
          y = e.offsetY - side / 2;

      ctx.fillRect(x, y, side, side);
    },

    circle: function(e) {
      var radius = 15;
          x = e.offsetX - radius / 2,
          y = e.offsetY - radius / 2;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    },

    triangle: function(e) {
      var side = 30,
          x = e.offsetX,
          y = e.offsetY - side / 2;
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(x + side / 2, y + side);
      ctx.lineTo(x - side / 2, y + side);
      ctx.fill();
      ctx.closePath();
   },

    clear: function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
};

  $(".drawing_method").on("click", function(e) {
    e.preventDefault();

    var $e = $(this),
        class_name = "active";

    $e.closest("ul").find("." + class_name).removeClass(class_name);
    $e.addClass(class_name);
    method = $e.attr("data-method");
  }).eq(0).click();

  $("#clear").on("click", function(e) {
    e.preventDefault();
    drawing_methods.clear();
  });

  $("canvas").on("click", function(e) {
    var color = $color.val();

    ctx.fillStyle = color;
    drawing_methods[method](e);
  });
});


