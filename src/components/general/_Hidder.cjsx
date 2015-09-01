require '../../mixins/component'


Hidder = React.createClass

  displayName: 'Hidder'

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

    <div
      {... @omitProps() }
      className={ @classed '', "-#{ if @props.hide then 'hidding' else 'showing' }" }
    >
      { 

        @props.children unless @props.hide

      }
    </div>


module.exports = Hidder
