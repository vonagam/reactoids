describe 'OmitProps', ->

  OmitProps = requireSubject()


  it 'works', ->

    OmitPropsed = TestMixin.createMixinClass OmitProps(),

      propTypes:

        'data-hello': React.PropTypes.any

      ##

      render: ->=

        <div {... @omitProps() } />

      ##

    ##


    expect( TestReact.renderShallow(

      <OmitPropsed data-hello='1' data-world='2' />

    ) ).eql(

      <div data-world='2' />

    )

  ##

##
