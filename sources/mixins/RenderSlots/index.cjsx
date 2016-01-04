mixin = Mixin.createArged

  args:

    'names': React.PropTypes.arrayOf React.PropTypes.string

  ##

  mixin: ( ARGS )->=

    result = {}

    result.propTypes = {}

    _.each ARGS.names, ( name )->

      render = "render#{ _.capitalize _.camelCase name }"

      result.propTypes[ name ] = React.PropTypes.funced React.PropTypes.object

      result.propTypes[ render ] = React.PropTypes.funced React.PropTypes.node # ( that, slotProps, userProps )->=

      result[ render ] = ( slotProps )->=

        userProps = _.funced( @props[ name ], this ) || {}

        _.funced @props[ render ], this, slotProps, userProps

      ##

    ##

    result

  ##

##


module.exports = mixin
