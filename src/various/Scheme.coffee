#§global 'I18n', 'https://github.com/fnando/i18n-js'

Fields = require '../components/inputs/Fields'

Input = require '../components/inputs/Input'


MESSAGES = [ 'label', 'hint', 'placeholder' ]


getTranslation = ( model, key, type )->=

  key = _.snakeCase key

  simple = "simple_form.#{ type }s"

  [ name, specific ] = model.split '.'

  scopes = []

  scopes.push "#{ simple }.#{ name }.#{ specific }" if name && specific

  scopes.push "#{ simple }.#{ name }" if name

  scopes.push "#{ simple }.defaults.#{ specific }" if specific

  scopes.push "#{ simple }.defaults"

  if type == 'label'

    scopes.push "activerecord.attributes.#{ name }"

    scopes.push "attributes"

  scopes = _.map scopes, ( scope )-> return scope: "#{ scope }.#{ key }"

  I18n.t null, defaults: scopes, defaultValue: ''


Field = ( model, key, options )->=

  field = _.cloneDeep( options ) || {}

  field.key = key
  
  field.type ||= Input

  field.messages ||= {}

  _.transform MESSAGES, ( result, type )->

    result[ type ] ?= getTranslation model, key, type

  , field.messages

  label = field.messages.label

  if label && ! _.isPlainObject( label ) && ! _.isFunction( label )

    field.messages.label = content: label, position: 'before'

  field


class Node

  constructor: ( name )->

    @name = name || ''

    @fields = []

  fields: ( fields )->

    _.transform fields, ( fields, options, key )-> 

      fields.push new Field @name, key, options

    , @fields, this

  toProp: ->=

    @fields


class Model extends Node

  constructor: ( name, scheme )->

    name = 

      if scheme.name

        _.map( [ name, scheme.name ], _.snakeCase ).join '.'

      else

        _.snakeCase name

    super name

    
class Scheme extends Node

  model: ( name, fields )->=

    model = new Model name, this

    model.fields fields

    @fields.push model

    model

  toProp: ->=

    _.map @fields, ( field )->=

      if field instanceof Model

        key: field.name
        type: Fields
        props: scheme: field.toProp()

      else

        field


module.exports = Scheme
