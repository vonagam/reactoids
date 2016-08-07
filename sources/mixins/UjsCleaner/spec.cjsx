describe.skip 'UjsCleaner', ->

  UjsCleaner = requireSubject()


  it 'works', ->

    UjsCleaned = createMixinClass UjsCleaner

    root = TestReact.render(

      <div data-react-class='UjsCleaned' data-react-props='{}' data-check='exist'>
        <UjsCleaned />
      </div>

    )

    expect( root.getAttribute 'data-react-class' ).equal null
    expect( root.getAttribute 'data-react-props' ).equal null
    expect( root.getAttribute 'data-check' ).equal 'exist'

    TestReact.unmount root

  ##

##
