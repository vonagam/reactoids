BaseContainerArgs = requireSource 'renderers/pixi/mixins/BaseContainerArgs'

BaseRootMixin = requireSource 'renderers/base/mixins/Root'


BaseRootArgs =

  rootDidMount: ( that )->

    options = _.omit that.props, 'width', 'height'

    options.view = ReactDOM.findDOMNode that

    that.renderer = new PIXI.WebGLRenderer 1, 1, options

    that.pixi = new PIXI.Container

    that.applyPixiSizeProps()

  rootDidUpdate: ( that, prevProps )->

    if that.props.width != prevProps.width || that.props.height != prevProps.height

      that.applyPixiSizeProps()

  rootRender: ( that )->

    that.renderer.render that.pixi


Root = React.createClass

  displayName: 'PIXI:Root'

  mixins: Mixin.resolve [ BaseRootMixin( _.assign {}, BaseContainerArgs, BaseRootArgs ) ]

  ###

  propTypes:

    width: React.PropTypes.number
    height: React.PropTypes.number
    transparent: React.PropTypes.bool
    autoResize: React.PropTypes.bool
    antialias: React.PropTypes.bool
    forceFXAA: React.PropTypes.bool
    resolution: React.PropTypes.number
    clearBeforeRender: React.PropTypes.bool
    preserveDrawingBuffer: React.PropTypes.bool

  getDefaultProps: ->=

    width: 0
    height: 0
    transparent: false
    autoResize: false
    antialias: false
    forceFXAA: false
    resolution: 1
    clearBeforeRender: false
    preserveDrawingBuffer: false

  ###

  applyPixiSizeProps: ->

    @renderer.resize @props.width, @props.height
    @pixi.width = @props.width
    @pixi.height = @props.height

  componentDidMount: ->

    render = _.bind ->

      BaseRootArgs.rootRender this

      @props.onRender()

      @raf = requestAnimationFrame render

    , this

    @raf = requestAnimationFrame render

  componentWillUnmount: ->

    cancelAnimationFrame @raf if @raf

    @renderer.destroy()

    @pixi.destroy()

  render: ->=

    <canvas />


module.exports = Root
