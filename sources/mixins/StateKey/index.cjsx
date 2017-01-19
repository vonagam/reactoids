# mixins

BaseKeyMixin = requireSource 'mixins/BaseKey'


StateKeyMixin = Mixin.create {

  name: 'StateKeyMixin'

  mixins: [

    BaseKeyMixin

  ]

  mixin: _.once ->=

    BaseKeyArgs = {

      name: 'state'

      get: ( that, props, state )->= state

      set: ( that, value, callback )-> that.setState value, callback

    }


    mixins: [

      BaseKeyMixin BaseKeyArgs

    ]

  ##

}


module.exports = StateKeyMixin
