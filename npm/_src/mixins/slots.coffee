mixin = ( names... )->

  result = {}

  result.propTypes = {}

  _.each names, ( name )->

    props_name = name

    render_name = "render#{ _.capitalize _.camelCase name }"

    result.propTypes[ props_name ] = React.PropTypes.funced React.PropTypes.object

    result.propTypes[ render_name ] = React.PropTypes.funced React.PropTypes.node

    result[ name ] = ( slot_props )->

      user_props = _.funced( @props[ props_name ], this ) || {}

      _.funced @props[ render_name ], this, slot_props, user_props

    return

  result


ReactMixinManager.add 'slots', mixin
