Button = $require 'elements/button'
$require 'mixins/component'
$require 'mixins/listener'

$define ->


  Scrollen = React.createClass

    propTypes:

      parent: React.PropTypes.any

    mixins: [ 'component', 'listener' ]

    getDefaultProps: ->

      parent: window

    isBellowScreen: ->

      $button = $ React.findDOMNode @refs.button

      $parent = $ @props.parent

      button_top = $button.offset().top

      button_top -= offset.top if offset = $parent.offset()

      button_top > $parent.scrollTop() + $parent.height()

    onScroll: ->

      bellow = @isBellowScreen()

      if bellow == false && @bellow == true

        @refs.button.onClick() 

      @bellow = bellow

      return

    componentDidMount: ->

      @bellow = @isBellowScreen()

      @addListener 'scrollen',
        target: window
        event: 'scroll'
        callback: @onScroll

      return

    render: ->

      `<Button
        ref='button'
        { ...this.omitProps() }
        className={ this.classes( 'Scrollen' )  }
      />`
