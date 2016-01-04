Icon = React.createClass

  mixins: Mixin.resolve [ 

    ComponentMixin

      classes: 

        '-unknown': ''

      ##

    ##

  ]

  propTypes:

    'icon': React.PropTypes.string.isRequired

  ##

  render: ->=

    { props, classed } = this

    icon = classed( "-#{ props.icon }" ) || classed( '-unknown' )


    <i 

      {... @omitProps() }

      className={ @mergeClassNames classed( '.' ), icon }

    />

  ##

##


module.exports = Icon
