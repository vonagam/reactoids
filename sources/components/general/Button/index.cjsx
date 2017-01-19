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

    AjaxMixin()

  ]

  propTypes: {

    'href': React.PropTypes.string

    'ajax': React.PropTypes.funced React.PropTypes.object # ()->=

    'onClick': React.PropTypes.func

  }

  onClick: ->

    ajax = _.funced @props.ajax

    @sendAjax 'one', ajax

  ##

  render: ->=

    { props, state, classed, callback } = this

    enabled = _.isString( props.href ) || props.onClick || ! _.isEmpty _.funced props.ajax


    <a

      {... @omitProps() }

      className={ classed '.', "-#{ if enabled then 'enabled' else 'disabled' }", '-waiting': state.ajaxes.one }

      href={ props.href }

      onClick={ callback 'onClick, props.onClick' }

    />

  ##

}


module.exports = Button

