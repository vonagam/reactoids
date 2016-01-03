ContainerMixin = requireSource 'renderers/base/mixins/Container'


mixin = Mixin.createArged

  nodeGet: React.PropTypes.func # ( that )->=
  nodeCreate: React.PropTypes.func # ( that, props )->=
  nodeUpdate: React.PropTypes.func # ( that, prevProps, nextProps )->=
  nodeDestroy: React.PropTypes.func # ( that )->=

  mixins: [ ContainerMixin ]

  mixin: ( ARGS )->=

    mixins: [ ContainerMixin( ContainerMixin.pick ARGS ) ]

    getPublicInstance: ->=

      ARGS.nodeGet this

    mountComponent: ( rootID, transaction, context )->=

      prevProps = {}
      nextProps = @_currentElement.props

      result = ARGS.nodeCreate this, nextProps

      ARGS.nodeUpdate this, prevProps, nextProps
      
      @mountAndCreateChildren nextProps.children, transaction, context

      result

    receiveComponent: ( nextElement, transaction, context )->

      prevProps = @_currentElement.props
      nextProps = nextElement.props

      unless _.isEqual prevProps, nextProps

        ARGS.nodeUpdate this, prevProps, nextProps

        @updateChildren nextProps.children, transaction, context
      
      @_currentElement = nextElement

    unmountComponent: ->

      ARGS.nodeDestroy this

      @unmountChildren()

    mountComponentIntoNode: ( rootID, container )->

      throw new Error(
      
        'You cannot render React-Anything-Node standalone. ' +
        'It is needed to be located in a React-Anything-Root.'
      
      )


module.exports = mixin
