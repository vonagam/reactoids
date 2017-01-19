describe.skip 'PureRender', ->

  PureRender = requireSubject()


  it 'works', ->

    count = 0


    PureRendered = createMixinClass PureRender(),

      componentDidUpdate: -> count++

      componentDidMount: -> count++

    ##


    component = TestReact.render <PureRendered />

    expect( count ).equal 1


    component.setState { key: 'value' }

    expect( count ).equal 2


    component.setState { key: 'value' }

    expect( count ).equal 2


    component.setState { func: component._bind( _.bind, _ ) }

    expect( count ).equal 3


    component.setState { func: component._bind( _.bind, _ ) }

    expect( count ).equal 3


    TestReact.unmount component

  ##

##
