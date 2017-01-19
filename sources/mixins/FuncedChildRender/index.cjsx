FuncedChildRenderMixin = Mixin.create {

  name: 'FuncedChildRenderMixin'

  args: {

    'getChildArg': React.PropTypes.func # ( that )->= argument

    'isRequired': React.PropTypes.bool

  }

  defaults: {

    'getChildArg': _.constant null

    'isRequired': false

  }

  mixin: ( ARGS )->=

    type = React.PropTypes.funced React.PropTypes.element # ( that, argument )->= child

    type = type.isRequired if ARGS.isRequired


    propTypes: {

      'children': type

    }

    render: ->=

      children = _.funced @props.children, this, ARGS.getChildArg this


      if ARGS.isRequired && process.env.NODE_ENV != 'production'

        React.Children.only children

      else

        children

      ##

    ##

  ##

}


module.exports = FuncedChildRenderMixin
