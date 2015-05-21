getKeys = ( cache, keys, name )->

  unless cache[ name ]

    keys = _.flattenDeep [ keys ]

    keys = _.flatten _.map keys, ( key )-> 

      if _.isFunction( key ) && key.propTypes then _.keys key.propTypes else key

    cache[ name ] = keys

  cache[ name ]


mixin = ->

  KEYS = {}

  omitProps: ( keys = @constructor, name = '', props = @props )->

    name = '_o_' + name

    keys = getKeys KEYS, keys, name

    _.omit props, keys

  pickProps: ( keys = @constructor, name = '', props = @props )->

    name = '_p_' + name

    keys = getKeys KEYS, keys, name

    _.pick props, keys


React.mixins.add 'omit_props', mixin
