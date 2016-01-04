ComponentArgs = classes:

  '-showing': ''
  '-hidding': ''


Hidder = React.createClass

  displayName: 'Hidder'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ) ]

  propTypes:

    hide: React.PropTypes.bool

  render: ->=

    { props, classed } = this

    <div
      {... @omitProps() }
      className={ classed '.', "-#{ if props.hide then 'hidding' else 'showing' }" }
    >
      { 

        props.children unless props.hide

      }
    </div>


module.exports = Hidder
