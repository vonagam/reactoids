Mixin = requireSource 'various/Mixin'

ContainerMixin = requireSource 'renderers/base/mixins/Container'

ReactInstanceMap = require 'react/lib/ReactInstanceMap'
ReactUpdates = require 'react/lib/ReactUpdates'


mixin = Mixin.createArged

  args:

    rootDidMount: React.PropTypes.func # ( that )->
    rootDidUpdate: React.PropTypes.func # ( that, prevProps, prevState, prevContext )->
    rootRender: React.PropTypes.func # ( that )->

  mixins: [ ContainerMixin ]

  mixin: ( ARGS )->=

    performOnChildren = ( that, method )->

      transaction = ReactUpdates.ReactReconcileTransaction.getPooled()
      
      transaction.perform(

        method
        that
        that.props.children
        transaction
        ReactInstanceMap.get( that )._context

      )
      
      ReactUpdates.ReactReconcileTransaction.release transaction

      ARGS.rootRender that


    mixins: [ ContainerMixin( ContainerMixin.pick ARGS ) ]

    componentDidMount: ->

      ARGS.rootDidMount this

      performOnChildren this, @mountAndCreateChildren

    componentDidUpdate: ( prevProps, prevState, prevContext )->

      ARGS.rootDidUpdate this, prevProps, prevState, prevContext

      performOnChildren this, @updateChildren

    componentWillUnmount: ->

      @unmountChildren()


module.exports = mixin
