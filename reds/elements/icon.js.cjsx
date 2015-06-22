$require 'mixins/component'


Icon = React.createClass

  displayName: 'Icon'

  mixins: [ 'component' ]

  classes:

    'icon': ''

  propTypes:

    icon: React.PropTypes.string.isRequired

  render: ->

    <i
      {... @omitProps() }
      className={ @mergeClassNames @classed( '' ), "fa fa-#{ @props.icon }" }
    />


$define -> Icon
