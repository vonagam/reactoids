# dependencies

window = requireDependency 'window' # Ya.share2 https://tech.yandex.ru/share/doc/dg/api-docpage/

# mixins

ScriptInjectorMixin = requireSource 'mixins/ScriptInjector'

# components

Dummy = requireSource 'components/general/Dummy'


contentPropType = React.PropTypes.shape {

  'description': React.PropTypes.string

  'image': React.PropTypes.string

  'title': React.PropTypes.string

  'url': React.PropTypes.string

}


YaShare = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin()

    ScriptInjectorMixin {

      scripts: [

        '//yastatic.net/es5-shims/0.0.2/es5-shims.min.js'

        '//yastatic.net/share2/share.js'

      ]

      check: ->= _.has window, 'Ya.share2'

      decorateScript: ( script )-> script.charset = 'utf-8'

      callback: ( that )-> that.applyShare()

    }

  ]

  propTypes: {

    'content': contentPropType

    'contentByService': React.PropTypes.objectOf contentPropType

    'theme': React.PropTypes.shape {

      'bare': React.PropTypes.bool

      'copy': React.PropTypes.oneOf [ 'last', 'first', 'hidden' ]

      'counter': React.PropTypes.bool

      'lang': React.PropTypes.oneOf [ 'az', 'be', 'en', 'hy', 'ka', 'kk', 'ro', 'ru', 'tr', 'tt', 'uk' ]

      'limit': React.PropTypes.number

      'services': React.PropTypes.string

      'size': React.PropTypes.oneOf [ 's', 'm' ]

    }

    'hooks': React.PropTypes.shape {

      'onready': React.PropTypes.func

      'onshare': React.PropTypes.func

    }

  }

  componentWillReceiveProps: ( nextProps )->

    @applyShare() unless _.isEqualPick @props, nextProps, [ 'content', 'contentByService', 'theme' ]

  ##

  applyShare: ->

    node = @dom 'node'


    window.Ya.share2 node, {

      'content': @props.content

      'contentByService': @props.contentByService

      'theme': @props.theme

      'hooks': {

        'onready': @callback 'props.hooks.onready'

        'onshare': @callback 'props.hooks.onshare'

      }

    }

  ##

  render: ->=

    { props, classed } = this


    <div {... @omitProps() } className={ classed '.' }>

      <Dummy ref='node' />

    </div>

  ##

}


module.exports = YaShare
