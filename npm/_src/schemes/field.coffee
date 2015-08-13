§global 'I18n', 'https://github.com/fnando/i18n-js'

Input = §require 'elements/inputs/input'


getTranslation = ( field, scopes )->

  scopes = _.map scopes, ( scope )-> scope: scope + '.' + field

  I18n.t null, defaults: scopes, defaultValue: ''


Field = ( model, name, options )->

  field = _.clone( options, true ) || {}

  field.key = name
  
  field.type ||= Input

  model = '.' + model if model

  field.messages ?= {}
  field.messages.label ?= getTranslation name, [ "simple_form.labels#{ model }", "activerecord.attributes#{ model }", 'attributes' ]
  field.messages.hint ?= getTranslation name, [ "simple_form.hints#{ model }" ]
  field.messages.placeholder ?= getTranslation name, [ "simple_form.placeholders#{ model }" ]

  label = field.messages.label

  if label && ! _.isPlainObject( label ) && ! _.isFunction( label )

    field.messages.label = content: label, position: 'before'

  field


§export Field
