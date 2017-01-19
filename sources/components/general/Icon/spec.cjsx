describe 'Icon', ->

  Icon = requireSubject()


  getDefaultClassNames = requireSource '../tests/react/contexts/getClassNames'

  getClassNames = ( constructor, keys, id )->=

    result = getDefaultClassNames constructor, keys, id

    result[ '-iknown' ] = '-youknown'

    result

  ##


  variants = {

    icon: [ 'iknown', 'iunknown' ]

    'data-unknown': [ 3 ]

  }

  options = {

    skip: ( variation )->=

      variation.icon == undefined

    ##

  }

  itVariations 'renders [s]', variants, options, ( variation )->

    known = variation.icon == 'iknown'

    unknown = variation[ 'data-unknown' ]


    instance = shallow <Icon {... variation } />, context: { getClassNames: getClassNames }


    expect( instance ).to.match 'i.icon'

    expect( instance ).onlyIf( unknown ).to.have.data 'unknown', unknown


    expect( instance ).onlyIf( known ).to.have.className '-youknown'

    expect( instance ).onlyIf( ! known ).to.have.className '-unknown'

  ##

##
