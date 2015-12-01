describe 'FindDOM', ->

  FindDOM = requireSubject()


  it 'works', ->

    FindDOMed = TestMixin.createMixinClass FindDOM,

      render: ->=

        <div>
          <div ref='foo' className='foo' />
          <div ref='bar' className='bar' />
        </div>


    component = TestReact.render <FindDOMed />


    $component = TestReact.$ component

    expect( component.dom() ).equal $component[ 0 ]

    expect( component.dom 'foo' ).equal $component.find( '.foo' )[ 0 ]

    expect( component.dom component.refs.bar ).equal $component.find( '.bar' )[ 0 ]


    TestReact.unmount component
