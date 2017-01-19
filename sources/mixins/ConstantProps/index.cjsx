ConstantPropsMixin = Mixin.create {

  name: 'ConstantPropsMixin'

  args: {

    'keys': React.PropTypes.arrayOf React.PropTypes.string

  }

  mixin: ( ARGS )->=

    componentWillUpdate: ( nextProps )->

      unless isEqualPick @props, nextProps, ARGS.keys

        throw new Error "some of '#{ ARGS.keys.join "', '" }' props have changed, they must stay the same"

      ##

    ##

  ##

}


if process.env.NODE_ENV == 'production'

  ConstantPropsMixin = Mixin.create {

    name: 'ConstantPropsMixin'

    mixin: _.once ->=

      {}

    ##

  }

##


module.exports = ConstantPropsMixin
