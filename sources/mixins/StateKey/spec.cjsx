describe.skip 'StateKey', ->

  StateKey = requireSubject()


  it 'works', ->

    StateKeyed = createMixinClass StateKey,

      getInitialState: ->=

        bool: true
        key: 3

      ##

    ##

    component = TestReact.render <StateKeyed />

    expect( component.getStateKey 'bool' ).equal true
    expect( component.getStateKey 'key' ).equal 3

    component.setStateKey 'key', 4
    component.toggleStateKey 'bool'

    expect( component.getStateKey 'bool' ).equal false
    expect( component.getStateKey 'key' ).equal 4

    TestReact.unmount component

  ##

##
