$require 'mixins/component'

$define ->


  Hidder = React.createClass

    mixins: [ 'component' ]

    propTypes:

      hide: React.PropTypes.bool

    classes:
      'hidder':
        '-showing': ''
        '-hidding': ''

    getDefaultProps: ->

      hide: true

    render: ->

      className = @classed '', if @props.hide then '-hidding' else '-showing'

      inside = if @props.hide then null else @props.children
    
      `<div
        { ...this.omitProps() }
        className={ className }
      >
        { inside }
      </div>`
