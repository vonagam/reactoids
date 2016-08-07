describe 'toFormData', ->

  toFormData = requireSubject()

  window = requireDependency 'window' # FormData


  it 'works', ->

    data = { foo: { bar: 0, asd: { bsa: 1 } }, arr: [ 2, 3 ] }


    formData = toFormData data


    expect( formData ).to.be.instanceof window.FormData


    _.each [ 'foo[bar]', 'foo[asd][bsa]', 'arr[1]' ], ( path )->

      expect( formData.get path ).to.equal _.get( data, path ).toString()

    ##

  ##

##
