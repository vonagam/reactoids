describe.skip 'Layered', ->

  Layered = requireSubject()


  it 'works', ->

    root = document.createElement 'div'

    renderFunc = ( mark, that )->=

      return if that.state.asd > 2

      <div data-id={ mark }>{ that.state.asd }</div>

    ##

    renderFunc0 = sinon.spy _.partial renderFunc, 'func'

    renderFunc1 = sinon.spy _.partial renderFunc, 'temp'

    renderFunc2 = sinon.spy ->= <div data-id='my'>{ @state.bsa }</div>

    Layereded = createMixinClass Layered(),

      getInitialState: ->=

        'asd': 1
        'bsa': 2

      ##

      renderMyLayer: renderFunc2

    ##


    component = TestReact.render <Layereded />


    component.addLayer 'func', order: 1, content: renderFunc0, root: ->= root

    component.addLayer 'temp', order: 101, content: renderFunc1, temporary: true, root: ->= root

    component.addLayer 'my', order: 3, root: ->= root


    expect( root.innerHTML.replace( /\s+data-reactid="[^"]+"/g, '' ) ).equal [

      '<div data-layer-order="1"><div data-id="func">1</div></div>'
      '<div data-layer-order="3"><div data-id="my">2</div></div>'
      '<div data-layer-order="101"><div data-id="temp">1</div></div>'

    ].join( '' )


    component.setState asd: 3

    expect( root.innerHTML.replace( /\s+data-reactid="[^"]+"/g, '' ) ).equal [

      '<div data-layer-order="3"><div data-id="my">2</div></div>'

    ].join( '' )


    component.setState asd: 0

    expect( root.innerHTML.replace( /\s+data-reactid="[^"]+"/g, '' ) ).equal [

      '<div data-layer-order="1"><div data-id="func">0</div></div>'
      '<div data-layer-order="3"><div data-id="my">2</div></div>'

    ].join( '' )

  ##

##
