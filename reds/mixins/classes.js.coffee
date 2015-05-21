classes = $require 'various/classes'


mixin =

  propTypes:

    className: React.PropTypes.oneOfType [ React.PropTypes.string, React.PropTypes.object ]

  classes: ( args... )->

    classes @props.className, args


React.mixins.add 'classes', mixin
