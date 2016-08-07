Image = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        '-enabled': ''
        '-disabled': ''

      }

    }

  ]

  propTypes: {

    'tag': React.PropTypes.string

    'src': React.PropTypes.string

  }

  getDefaultProps: ->=

    'tag': 'img'

  ##

  render: ->=

    { props, classed } = this

    { src } = props

    Tag = props.tag


    if src

      style =

        if Tag == 'img'

          src: src

        else

          style: _.assign {}, props.style, backgroundImage: "url(#{ src })"

        ##

      ##

    ##


    <Tag

      {... @omitProps() }

      {... style }

      className={ classed '.', "-#{ if src then 'enabled' else 'disabled' }" }

    />

  ##

}


module.exports = Image
