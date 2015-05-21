classes = $require 'various/classes'
$require 'mixins/omit_props'

$define ->


  Component = React.createClass

    propTypes:

      active: React.PropTypes.bool

    mixins: [ 'omit_props' ]

    render: ->

      className = classes @props.className, 'Component', disabled: ! @props.active

      inside = if @props.active then @props.children else null

      props = @omitProps()
    
      `<div { ...props } className={ className }>
        { inside }
      </div>`
