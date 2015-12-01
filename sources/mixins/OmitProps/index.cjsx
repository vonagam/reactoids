Mixin = requireSource 'various/Mixin'


mixin = ->=

  KEYS = undefined

  Mixin.createPlain

    initConstants: ->

      KEYS ||= _.keys @constructor.propTypes

    omitProps: ->=

      _.omit @props, KEYS


module.exports = mixin
