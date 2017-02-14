RenderSlotsMixin = Mixin.create {

  name: 'RenderSlotsMixin'

  args: {

    'names': React.PropTypes.arrayOf React.PropTypes.string

  }

  mixin: ( ARGS )->=

    result = {}

    result.propTypes = {}

    _.each ARGS.names, ( name )->

      render = "render#{ _.pascalCase name }"

      result.propTypes[ name ] = React.PropTypes.funced React.PropTypes.object # ( that )->= userProps for slot

      result.propTypes[ render ] = React.PropTypes.funced React.PropTypes.node # ( that, slotProps, userProps )->= node for slot

      result[ render ] = ( slotProps )->=

        userProps = _.funced( @props[ name ], this ) || {}

        _.funced @props[ render ], this, slotProps, userProps

      ##

    ##

    result

  ##

}


module.exports = RenderSlotsMixin
