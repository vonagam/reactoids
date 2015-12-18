Mixin = requireSource 'various/Mixin'
ComponentMixin = requireSource 'mixins/Component'

Dummy = requireSource 'components/general/Dummy'


# https://tech.yandex.ru/share/doc/dg/api-docpage/

SCRIPTS_SRCS = [

  '//yastatic.net/es5-shims/0.0.2/es5-shims.min.js'

  '//yastatic.net/share2/share.js'

]

afterYandexScripts = ( callback )->

  return callback() if window.Ya && window.Ya.share2

  _.each SCRIPTS_SRCS, ( scriptSrc )->

    script = document.createElement 'script'

    script.charset = 'utf-8'

    script.src = scriptSrc

    document.getElementsByTagName( 'head' )[ 0 ].appendChild script

  setTimeout callback, 1


YaShare = React.createClass

  mixins: Mixin.resolve [ ComponentMixin( {} ) ]

  propTypes:

    content: React.PropTypes.object
    contentByService: React.PropTypes.object
    theme: React.PropTypes.object
    hooks: React.PropTypes.object

  componentDidMount: ->=

    afterYandexScripts @applyShare

  componentWillReceiveProps: ( nextProps )->

    return if _.isEqualPick @props, nextProps, [ 'content', 'contentByService', 'theme' ]

    @applyShare()

  applyShare: ->

    node = ReactDOM.findDOMNode @refs.node

    Ya.share2 node, {

      content: @props.content
      contentByService: @props.contentByService
      theme: @props.theme
      hooks: 
        onready: _.partial @onHook, 'onready'
        onshare: _.partial @onHook, 'onshare'

    }

  onHook: ( name )->

    hook = @props.hooks?[ name ]

    return unless hook

    hook.apply undefined, _.slice arguments, 1

  render: ->=

    { classed } = this

    <div
      {... @omitProps() }
      className={ classed '.' }
    >
      <Dummy ref='node' />
    </div>


module.exports = YaShare
