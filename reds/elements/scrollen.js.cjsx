# $ = $global 'jQuery' http://jquery.com

$require 'mixins/component'
$require 'mixins/listener'

Button = $require 'elements/button'


Scrollen = React.createClass

  displayName: 'Scrollen'

  mixins: [ 'component', 'listener' ]

  classes:

    'scrollen': ''

  propTypes:

    parent: React.PropTypes.any

  getDefaultProps: ->

    parent: window

  isBellowScreen: ->

    $button = $ @dom 'button'

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

    @addListener 'scrollen', {

      target: window
      event: 'scroll'
      callback: @onScroll

    }

    return

  render: ->

    <Button
      ref='button'
      {... @omitProps() }
      className={ @classed '' }
    />


$define -> Scrollen
