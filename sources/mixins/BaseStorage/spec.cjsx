describe.skip 'BaseStorage', ->

  BaseStorage = requireSubject()


  it 'works', ->

    storedValue = { a: 1 }


    ARGS =

      name: 'myStore'

      get: ( that )->= storedValue

      set: ( that, value )-> storedValue = value

    ##


    BaseStored = createMixinClass BaseStorage( ARGS )

    component = TestReact.render <BaseStored />


    expect( component.state.myStore ).eql storedValue
    expect( component.getMyStore() ).eql storedValue
    expect( component.getMyStoreKey 'a' ).equal 1


    component.setMyStore b: 2
    expect( storedValue ).eql { b: 2 }

    component.setMyStoreKey 'c', 3
    expect( storedValue ).eql { b: 2, c: 3 }

    expect( component.getMyStore() ).eql storedValue
    expect( component.state.myStore ).eql storedValue


    storedValue = { e: 4 }
    expect( component.getMyStore() ).eql storedValue
    expect( component.state.myStore ).not.eql storedValue

    component.syncMyStore()

    expect( component.state.myStore ).eql storedValue


    TestReact.unmount component

  ##

##
