Label = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin()

  ]

  propTypes: {

    'htmlFor': React.PropTypes.any

  }

  isForAttr: ( target )->=

    _.isString( target ) && /^\w+$/.test target

  ##

  onClick: ->

    target = @props.htmlFor

    return if @isForAttr target

    target = target @dom() if _.isFunction target

    target = $( target )[ 0 ] if _.isString target

    target.focus() if target && target.focus

  ##

  render: ->=

    { props, classed } = this

    htmlFor = props.htmlFor if @isForAttr props.htmlFor


    <label

      {... @omitProps() }

      className={ classed '.' }

      htmlFor={ htmlFor }

      onClick={ @callback 'onClick, props.onClick' }

    />

  ##

}


module.exports = Label
