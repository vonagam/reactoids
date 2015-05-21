Field = $require 'schemes/_field'

$define ->


  class Node

    constructor: ->

      @nodes = []

    addNode: ( node )->

      @nodes.push node

      node

    toFields: ->

      _.flatten _.invoke @nodes, 'toFields'


  class Attr

    constructor: ( path, name, options )->

      @field = new Field path, name, options

    toFields: ->

      @field


  class Model extends Node

    constructor: ( name )->

      super

      @name = name

      return

    attr: ( name, options )->

      @addNode new Attr @name, name, options

      @

    attrs: ( attrs )->

      _.each attrs, ( options, name )->

        @attr name, options

        return

      , @

      @

      
  class Scheme extends Node

    constructor: ( name )->

      return new Model name if name

    model: ( name )->

      @addNode new Model name
