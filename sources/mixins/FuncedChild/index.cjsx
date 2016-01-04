mixin = Mixin.createArged

  args:

    'getChildArgs': React.PropTypes.func # ( that )->= arguments array

  ##

  mixin: ( ARGS )->=

    propTypes:

      children: React.PropTypes.func

    ##

    render: ->=

      children = @props.children.apply this, ARGS.getChildArgs this

      children && React.Children.only children

    ##

  ##

##


module.exports = mixin
