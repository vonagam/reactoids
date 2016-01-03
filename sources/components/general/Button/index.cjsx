ComponentMixin = requireSource 'mixins/Component'
AjaxMixin = requireSource 'mixins/Ajax'


ComponentArgs = classes:

  '-enabled': ''
  '-disabled': ''
  '-waiting': ''


Button = React.createClass

  displayName: 'Button'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ), AjaxMixin ]

  propTypes:

    href: React.PropTypes.string
    text: React.PropTypes.node
    onClick: React.PropTypes.func
    ajax: React.PropTypes.funced React.PropTypes.object # ()->=

  onClick: ->

    ajax = _.funced @props.ajax

    return if _.isEmpty ajax

    @sendAjax 'one', ajax

  render: ->=

    { props, state, classed } = this

    Tag = if _.isString props.href then 'a' else 'span'

    enabled = _.isString( props.href ) || props.onClick || ! _.isEmpty _.funced props.ajax

    <Tag
      {... @omitProps() }
      className={ classed '.', "-#{ if enabled then 'enabled' else 'disabled' }", '-waiting': state.ajaxes.one }
      onClick={ @_queue @onClick, props.onClick }
      href={ if _.isString props.href then props.href else undefined }
    >
      { 

        props.text || props.children

      }
    </Tag>


module.exports = Button 

