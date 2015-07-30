'use strict';

var Field, Fields, Model, Scheme;

Field = require('../schemes/field');

Fields = require('../elements/forms/fields');

Model = (function() {
  function Model(name) {
    this._fields = [];
    this.name = name;
    return;
  }

  Model.prototype.fields = function(fields) {
    fields = _.map(fields, function(options, name) {
      return new Field(this.name, name, options);
    }, this);
    _.append(this._fields, fields);
  };

  Model.prototype.toProp = function() {
    return this._fields;
  };

  return Model;

})();

Scheme = (function() {
  function Scheme() {
    this._models = {};
    return;
  }

  Scheme.prototype.model = function(name) {
    var model;
    model = new Model(name);
    this._models[name] = model;
    return model;
  };

  Scheme.prototype.toProp = function() {
    return _.map(this._models, function(node, key) {
      return {
        key: key,
        type: Fields,
        props: {
          scheme: node.toProp()
        }
      };
    });
  };

  return Scheme;

})();

module.exports = Scheme;
