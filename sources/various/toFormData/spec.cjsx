describe 'toFormData', ->

  toFormData = requireSubject()


  it 'can be tested only in browser', ->

    data = { foo: { bar: 0, asd: { bsa: 1 } }, arr: [ 2, 3 ] }

    formData = toFormData data

    expect( formData ).instanceof window.FormData

    expect( formData.get( 'foo[bar]' ).value ).equal _( data ).get( 'foo.bar' ).toString()

    expect( formData.get( 'foo[asd][bsa]' ).value ).equal _( data ).get( 'foo.asd.bsa' ).toString()

    expect( formData.get( 'arr[1]' ).value ).equal _( data ).get( 'arr.1' ).toString()

  ##

##
