function ModelConstructor(options) {
  var id_count = 0;

  function Model(attrs) {
    id_count++;

    var self = this;
    self.attributes = attrs || {};
    self.id = id_count;
    self.attributes.id = id_count;

    if (options && options.change && _.isFunction(options.change)) {
      this.__events.push(options.change);
    }
  }

  Model.prototype = {
    __events: [],
    set: function(key, val) {
      this.attributes[key] = val;
      this.triggerChange();
    },
    get: function(key) {
      return this.attributes[key];
    },
    remove: function(key) {
      return this.attributes[key];
    },
    triggerChange: function() {
      this.__events.forEach(function(cb) {
       cb();
      });
    },
    addCallback: function(cb) {
      this.__events.push(cb);
    }
  };

  _.extend(Model.prototype, options);

  return Model;
}

function CollectionConstructor(options) {
  function Collection(model_constructor) {
    this.models = [];
    this.model = model_constructor;
  }

  Collection.prototype = {
    add: function(model) {
      var old_m = _(this.models).findWhere({ id: model.id }),
          new_m;

      if (old_m) { return old_m; }

      new_m = new this.model(model);
      this.models.push(new_m);

      return new_m;
    },
    remove: function(model) {
      model = _.isNumber(model) ? { id: model } : model;

      var m = _(this.models).findWhere(model);

      if (!m) { return; }

      this.models = this.models.filter(function(existing_m) {
        return existing_m.attributes.id !== m.id;
      });
    },

    reset: function() {
      this.models = [];
    }
  };

  _.extend(Collection.prototype, options);

  return Collection;
}


