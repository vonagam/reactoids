# mixins

FocusMixin = requireSource 'mixins/Focus'


FocusPassMixin = Mixin.create {

  name: 'FocusPassMixin'

  args: {

    'findFocusables': React.PropTypes.func # ( that )->= focusables

  }

  mixins: [ FocusMixin ]

  mixin: ( ARGS )->=

    mixins: [

      FocusMixin {

        findFocusables: ARGS.findFocusables

        findFocused: ( that, focusables )->= _.find focusables, ( focusable )->= focusable.isFocused()

      }

    ]

  ##

}


module.exports = FocusPassMixin
