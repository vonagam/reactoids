mixin = ->

  KEYS = undefined
  

  omitProps: ->

    KEYS ||= _.keys @constructor.propTypes

    _.omit @props, KEYS


module.exports = mixin
