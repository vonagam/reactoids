SingleChildRenderMixin = Mixin.create {

  name: 'SingleChildRenderMixin'

  args: {

    'isRequired': React.PropTypes.bool

  }

  defaults: {

    'isRequired': false

  }

  mixin: ( ARGS )->=

    type = React.PropTypes.element

    type = type.isRequired if ARGS.isRequired


    propTypes: {

      children: type

    }

    render: ->=

      @props.children

    ##

  ##

}


module.exports = SingleChildRenderMixin
