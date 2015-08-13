resetContents = ( that )->

  that._for_contents = {}

  that._prop_contents = _.mapValues that.props.contents, ( content )-> _.funced content, that

  return


mixin =

  propTypes:

    contents: React.PropTypes.object

  getDefaultProps: ->

    contents: {}

  componentWillMount: ->

    resetContents this

    return

   componentWillUpdate: ->

    resetContents this

    return

  contentFor: ( key, value )->

    for_content = @_for_contents[ key ]

    if arguments.length == 1

      prop_content = @_prop_contents[ key ]

      return for_content unless prop_content

      return prop_content unless for_content

      return for_content.concat prop_content

    else if value

      @_for_contents[ key ] = 

        if for_content

          for_content.concat value

        else

          _.wrapInArray value

    return


ReactMixinManager.add 'content_for', mixin
