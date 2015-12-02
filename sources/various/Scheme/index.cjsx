I18n = requireDependency 'i18n-js'

Fields = requireSource 'components/inputs/Fields'

Input = requireSource 'components/inputs/Input'


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

  scopes = _.map scopes, ( scope )->= scope: "#{ scope }.#{ key }"

  I18n.t null, defaults: scopes, defaultValue: ''


Field = ( model, key, options )->=

  field = _.cloneDeep( options ) || {}

  field.key = key
  
  field.type ||= Input

  field.messages ||= {}

  if I18n

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

    @_fields = []

  fields: ( fields )->

    _.transform fields, ( fields, options, key )-> 

      fields.push new Field @name, key, options

    , @_fields, this

  toProp: ->=

    @_fields


class Model extends Node

  constructor: ( name, scheme )->

    name = _( [ name, scheme.name ] ).compact().map( _.snakeCase ).join '.'

    super name

    
class Scheme extends Node

  model: ( name, fields )->=

    model = new Model name, this

    model.fields fields

    @_fields.push model

    model

  toProp: ->=

    _.map @_fields, ( field )->=

      if field instanceof Model

        key: field.name
        type: Fields
        props: scheme: field.toProp()

      else

        field


module.exports = Scheme
