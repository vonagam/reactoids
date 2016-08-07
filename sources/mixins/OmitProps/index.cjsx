mixin = Mixin.createArged {

  args: {}

  mixin: ->=

    KEYS = undefined


    initConstants: ->

      KEYS ||= _.keys @constructor.propTypes

    ##

    omitProps: ->=

      _.omit @props, KEYS

    ##

  ##

}


module.exports = mixin
