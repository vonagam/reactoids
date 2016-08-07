# mixins

AjaxMixin = requireSource 'mixins/Ajax'


Button = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        '-enabled': ''
        '-disabled': ''
        '-waiting': ''

      }

    }

    AjaxMixin

  ]

  propTypes: {

    'href': React.PropTypes.string

    'text': React.PropTypes.node

    'onClick': React.PropTypes.func

    'ajax': React.PropTypes.funced React.PropTypes.object # ()->=

  }

  onClick: ->

    ajax = _.funced @props.ajax

    return if _.isEmpty ajax

    @sendAjax 'one', ajax

  ##

  render: ->=

    { props, state, classed } = this

    enabled = _.isString( props.href ) || props.onClick || ! _.isEmpty _.funced props.ajax


    <a

      {... @omitProps() }

      className={ classed '.', "-#{ if enabled then 'enabled' else 'disabled' }", '-waiting': state.ajaxes.one }

      href={ if _.isString props.href then props.href else undefined }

      onClick={ @callback 'onClick, props.onClick' }

      children={ props.text || props.children }

    />

  ##

}


module.exports = Button

