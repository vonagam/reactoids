Mixin = require 'reactoids/various/Mixin'


ReferenceMixin = Mixin.create {

  name: 'ReferenceMixin'

  args: {

    references: React.PropTypes.func # ( that, props, state )->= references

    id: React.PropTypes.func # ( that, props, state )->= string

  }

  mixin: ( ARGS )->=

    addToReferences = ( references, id, reference )->

      return unless references

      references[ id ] = reference

    ##

    removeFromReferences = ( references, id, reference )->

      return unless references

      delete references[ id ] if references[ id ] == reference

    ##


    componentWillMount: ->

      references = ARGS.references this, @props, @state

      id = ARGS.id this, @props, @state

      addToReferences references, id, this

    ##

    componentWillUpdate: ( nextProps, nextState )->

      prevReferences = ARGS.references this, @props, @state

      nextReferences = ARGS.references this, nextProps, nextState

      prevId = ARGS.id this, @props, @state

      nextId = ARGS.id this, nextProps, nextState


      if nextReferences != prevReferences || nextId != prevId

        removeFromReferences prevReferences, prevId, this

        addToReferences nextReferences, nextId, this

      ##

    ##

    componentWillUnmount: ->

      references = ARGS.references this, @props, @state

      id = ARGS.id this, @props, @state

      removeFromReferences references, id, this

    ##

  ##

}


module.exports = ReferenceMixin
