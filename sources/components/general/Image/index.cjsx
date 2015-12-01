Mixin = requireSource 'various/Mixin'
ComponentMixin = requireSource 'mixins/Component'


ComponentArgs = classes:

  '-enabled': ''
  '-disabled': ''


Image = React.createClass

  displayName: 'Image'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ) ]

  propTypes:

    tag: React.PropTypes.string
    src: React.PropTypes.string

  getDefaultProps: ->=

    tag: 'img'

  render: ->=

    { props, classed } = this

    Tag = props.tag

    src = props.src

    if src

      style =

        if Tag == 'img'

          src: src

        else

          style: _.assign {}, props.style, backgroundImage: "url(#{ src })"

    <Tag
      {... @omitProps() }
      {... style }
      className={ classed '.', "-#{ if src then 'enabled' else 'disabled' }" }
    />


module.exports = Image
