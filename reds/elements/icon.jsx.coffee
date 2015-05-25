$require 'mixins/component'

$define ->


  Icon = React.createClass

    propTypes:

      icon: React.PropTypes.string.isRequired

    mixins: [ 'component' ]

    classes:
      'icon': ''

    render: ->

      `<i
        { ...this.omitProps() }
        className={ this.mergeClassNames( this.classed( '' ), 'fa fa-' + this.props.icon ) }
      />`
