 function ModelConstructor(opts) {
  var id_count = 0;

  function Model(attrs) {
    id_count++;

    var self = this;
    self.attributes = attrs || {};
    self.id = id_count;
    self.attributes.id = id_count;

    if (opts && opts.change && _.isFunction(opts.change)) {
      self.__events.push(opts.change);
    }
  }

  Model.prototype = {
    __events: [],
    __remove: function() { },
    set: function(key, val) {
      this.attributes[key] = val;
      this.triggerChange();
    },
    get: function(key) {
      return this.attributes[key];
    },
    remove: function(key) {
      delete this.attributes[key];
      this.triggerChange();
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

  _.extend(Model.prototype, opts);

  return Model;
}

function CollectionConstructor(opts) {
  function Collection(model_constructor) {
    this.models = [];
    this.model = model_constructor;
  }

  _.extend(Collection.prototype, opts);

  Collection.prototype = {
    add: function(model) {
      var old_m = _(this.models).findWhere({ id: model.id }),
          new_m;

      if (old_m) { return old_m; }

      new_m = new this.model(model);
      this.models.push(new_m);

      return new_m;
    },
    get: function(idx) {
      return _(this.models).findWhere({ id: idx });
    },
    remove: function(model) {
      model = _.isNumber(model) ? { id: model } : model;

      var m = _(this.models).findWhere(model);

      if (!m) { return; }

      m.__remove();
      this.models = this.models.filter(function(existing_m) {
        return existing_m.attributes.id !== m.id;
      });
    },
    set: function(models) {
      this.reset();
      models.forEach(this.add.bind(this));
    },
    reset: function() {
      this.models = [];
    }
  };

  return Collection;
}

function ViewConstructor(options) {
  function View(model) {
    this.model = model;
    this.model.addCallback(this.render.bind(this));
    this.model.__remove = this.remove.bind(this);
    this.model.view = this;
    this.$el = $("<" + this.tag_name + " />", this.attributes);
    this.render();
  }

  View.prototype = {
    tag_name: "div",
    attributes: {},
    template: function() { },
    events: {},
    render: function () {
      this.$el.html(this.template(this.model.attributes));
      this.bindEvents();
      return this.$el;
    },
    bindEvents: function() {
      var $el = this.$el,
        event, selector, parts;

      for (var prop in this.events) {
        parts = prop.split(" ");
        selector = parts.length > 1 ? parts.slice(1).join(" ") : undefined;
        event = parts[0];
        if (selector) {
          $el.on(event + ".view", selector, this.events[prop].bind(this))
        }
        else {
          $el.on(event + ".view", this.events[prop].bind(this));
        }
      }
    },
    unbindEvents: function() {
      this.$el.off("view");
    },
    remove: function() {
      this.unbindEvents();
      this.$el.remove();
    }
  };

  _.extend(View.prototype, options);

  return View;
}

