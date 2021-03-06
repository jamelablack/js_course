function ModelConstructor(options) {
  var id_count = 0;

  function Model() {
    id_count++;

    var self = this;
    self.attributes = {};
    self.id = id_count;
    self.attributes.id = id_count;
  }

  Model.prototype = {
    set: function(key, val) {
      this.attributes[key] = val;
    },
    get: function(key) {
      return this.attributes[key];
    }
  };

  _.extend(Model.prototype, options);

  return Model;
}
