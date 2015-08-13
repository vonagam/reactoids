Field = §require 'schemes/field'
Fields = §require 'elements/forms/fields'


class Model

  constructor: ( name )->

    @_fields = []

    @name = name

    return

  fields: ( fields )->

    fields = _.map fields, ( options, name )-> 

      new Field @name, name, options

    , this

    _.append @_fields, fields

    return

  toProp: ->

    @_fields

    
class Scheme

  constructor: ->

    @_models = {}

    return

  model: ( name )->

    model = new Model name

    @_models[ name ] = model

    model

  toProp: ->

    _.map @_models, ( node, key )->

      key: key
      type: Fields
      props:
        scheme: node.toProp()


§export Scheme
