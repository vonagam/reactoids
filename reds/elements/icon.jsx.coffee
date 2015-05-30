$require 'mixins/component'

$define ->


  Icon = React.createClass

    mixins: [ 'component' ]

    propTypes:

      icon: React.PropTypes.string.isRequired

    classes:
      'icon': ''

    render: ->

      `<i
        { ...this.omitProps() }
        className={ this.mergeClassNames( this.classed( '' ), 'fa fa-' + this.props.icon ) }
      />`
