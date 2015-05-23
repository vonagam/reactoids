$require 'mixins/component'

$define ->


  Hidder = React.createClass

    propTypes:

      hide: React.PropTypes.bool

    mixins: [ 'component' ]

    classes:
      'hidder':
        '-showing': ''
        '-hidding': ''

    getDefaultProps: ->

      hide: true

    render: ->

      className = @classed '', if @props.hide then '.-hidding' else '.-showing'

      inside = if @props.hide then null else @props.children
    
      `<div
        { ...this.omitProps() }
        className={ className }
      >
        { inside }
      </div>`
