getModifiers = ( input, args )->=

  if _.isFunction input

    input.apply undefined, args

  else

    input

  ##

##


applyD3Props = ( target, props, defaults, args )->=

  modifiers = _.defaults {}, getModifiers( props, args ), getModifiers( defaults, args )


  _.each modifiers, ( value, key )->

    return if value == undefined

    target[ key ]( value )

  ##


  target

##


module.exports = applyD3Props
