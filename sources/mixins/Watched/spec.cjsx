describe 'Watched', ->

  Watched = requireSubject()


  it 'works', ( done )->

    i = 0

    component = undefined


    ARGS =

      name: 'my'

      getValue: sinon.spy ( element )->=

        i += 1

        if i > 3 then 'newValue' else 'oldValue'

      onChange: sinon.spy ->=

        TestReact.unmount component

      duration: 1


    Watcheded = TestMixin.createMixinClass Watched ARGS

    component = TestReact.render <Watcheded />

    expect( ARGS.getValue ).callCount 1
    expect( ARGS.onChange ).callCount 0

    setTimeout ->

      expect( ARGS.getValue ).callCount 4
      expect( ARGS.onChange ).callCount 1
      expect( ARGS.onChange ).calledWith component, 'newValue', 'oldValue'

      expect( component.isMounted() ).equal false

      done()

    , 20
