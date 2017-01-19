# dependencies

$ = requireDependency 'jquery' # jquery/jquery, http://jquery.com


FocusMixin = Mixin.create {

  name: 'FocusMixin'

  args: {

    'findFocusables': React.PropTypes.func # ( that )->= focusables

    'findFocused': React.PropTypes.func # ( that, focusables )->= focused

    'isFocusable': React.PropTypes.func # ( that, focusables )->= bool

    'isFocused': React.PropTypes.func # ( that, focused )->= bool

    'focus': React.PropTypes.func # ( that, focusable )->

    'blur': React.PropTypes.func # ( that, focused )->

  }

  defaults: {

    'findFocusables': ( that )->= ReactDOM.findDOMNode that

    'findFocused': ( that, focusables )->= _.find focusables, ( focusable )->= focusable == document.activeElement

    'isFocusable': ( that, focusables )->= ! _.isEmpty focusables

    'isFocused': ( that, focused )->= Boolean focused

    'focus': ( that, focusable )-> focusable.focus()

    'blur': ( that, focused )-> focused.blur()

  }

  mixin: ( ARGS )->=

    findFocusables = ( that )->=

      _.compact _.castArray ARGS.findFocusables that

    ##


    'isFocusable': ->=

      focusables = findFocusables this

      ARGS.isFocusable this, focusables

    ##

    'isFocused': ->=

      focusables = findFocusables this

      focused = ARGS.findFocused this, focusables

      ARGS.isFocused this, focused

    ##

    'focus': ->

      focusables = findFocusables this

      focused = ARGS.findFocused this, focusables

      return unless ARGS.isFocusable this, focusables

      return if ARGS.isFocused this, focused

      ARGS.focus this, focusables[ 0 ]

    ##

    'blur': ->

      focusables = findFocusables this

      focused = ARGS.findFocused this, focusables

      return unless ARGS.isFocusable this, focusables

      return unless ARGS.isFocused this, focused

      ARGS.blur this, focused

    ##

  ##

}


module.exports = FocusMixin
