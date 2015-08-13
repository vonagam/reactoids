'use strict';

var Field, Input, getTranslation;

if (!window.I18n) {
  console.log('reactoids/schemes/field: I18n is not defined in window, see https://github.com/fnando/i18n-js');
}

Input = require('../elements/inputs/input');

getTranslation = function(field, scopes) {
  scopes = _.map(scopes, function(scope) {
    return {
      scope: scope + '.' + field
    };
  });
  return I18n.t(null, {
    defaults: scopes,
    defaultValue: ''
  });
};

Field = function(model, name, options) {
  var base, base1, base2, field, label;
  field = _.clone(options, true) || {};
  field.key = name;
  field.type || (field.type = Input);
  if (model) {
    model = '.' + model;
  }
  if (field.messages == null) {
    field.messages = {};
  }
  if ((base = field.messages).label == null) {
    base.label = getTranslation(name, ["simple_form.labels" + model, "activerecord.attributes" + model, 'attributes']);
  }
  if ((base1 = field.messages).hint == null) {
    base1.hint = getTranslation(name, ["simple_form.hints" + model]);
  }
  if ((base2 = field.messages).placeholder == null) {
    base2.placeholder = getTranslation(name, ["simple_form.placeholders" + model]);
  }
  label = field.messages.label;
  if (label && !_.isPlainObject(label) && !_.isFunction(label)) {
    field.messages.label = {
      content: label,
      position: 'before'
    };
  }
  return field;
};

module.exports = Field;
