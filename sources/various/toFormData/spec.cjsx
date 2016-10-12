describe 'toFormData', ->

  toFormData = requireSubject()

  FormData = requireWindow 'FormData' # https://developer.mozilla.org/en-US/docs/Web/API/FormData


  it 'works', ->

    data = { foo: { bar: 0, asd: { bsa: 1 } }, arr: [ 2, 3 ] }


    formData = toFormData data


    expect( formData ).to.be.instanceof FormData


    _.each [ 'foo[bar]', 'foo[asd][bsa]', 'arr[1]' ], ( path )->

      expect( formData.get path ).to.equal _.get( data, path ).toString()

    ##

  ##

##
