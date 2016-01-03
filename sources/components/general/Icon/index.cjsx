ComponentMixin = requireSource 'mixins/Component'


ComponentArgs = classes: 

  '-unknown': ''


Icon = React.createClass

  displayName: 'Icon'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ) ]

  propTypes:

    icon: React.PropTypes.string.isRequired

  render: ->=

    { props, classed } = this

    icon = classed "-#{ props.icon }"

    if ! icon

      icon = classed "-unknown"

    <i
      {... @omitProps() }
      className={ @mergeClassNames @classed( '.' ), icon }
    />


module.exports = Icon
