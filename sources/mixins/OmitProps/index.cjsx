OmitPropsMixin = Mixin.create {

  name: 'OmitPropsMixin'

  mixin: _.once ->=

    omitProps: ->=

      keys = _.keys @constructor.propTypes


      @omitProps = _.bind ->=

        _.omit @props, keys

      , this


      @omitProps()

    ##

  ##

}


module.exports = OmitPropsMixin
