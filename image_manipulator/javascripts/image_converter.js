var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");

var preloader = {
  path: "images/",
  srcs: ["1.jpg", "2.jpg", "3.jpg"],
  createImage: function(i, src) {
    var $img = $("<img />", { src: this.path + src });
    $img.on("load", function() {
      manipulator.process($img[0]);
    });
  },
  run: function() {
    $.each(this.srcs, $.proxy(this.createImage, this));
  }
};

var manipulator = {
  drawImage: function(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
  },
  convertToGrayscale: function() {
    var image_data = ctx.getImageData(0, 0, canvas.width, canvas.height),
        gray;

    for (var i = 0, len = image_data.data.length; i < len; i += 4) {
      gray = image_data.data[i] * .3086 + image_data.data[i + 1] * .6094 + image_data.data[i + 2] * .0820;
      image_data.data[i] = gray;
      image_data.data[i + 1] = gray;
      image_data.data[i + 2] = gray;
    }
    ctx.putImageData(image_data, 0, 0);
  },
  writeImage: function() {
    var img = document.createElement("img");

    img.src = canvas.toDataURL();
    $(document.body).append(img);
  },
  process: function(img) {
    this.drawImage(img);
    this.convertToGrayscale();
    this.writeImage();
  }
};

$(function() {
  preloader.run();
});

