$require 'mixins/component'

$define ->


  Icon = React.createClass

    propTypes:

      icon: React.PropTypes.string.isRequired

    mixins: [ 'component' ]

    render: ->

      `<i
        { ...this.omitProps() }
        className={ this.classes( 'Icon fa fa-' + this.props.icon ) }
      />`
