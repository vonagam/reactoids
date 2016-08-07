describe 'Icon', ->

  Icon = requireSubject()


  getDefaultClassNames = requireSource '../tests/react/contexts/getClassNames'

  getClassNames = ( id, constructor, keys )->=

    result = getDefaultClassNames id, constructor, keys

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


    instance = shallow <Icon {... variation } />, context: { getClassNames: getClassNames }


    expect( instance ).to.match 'i.icon'

    expect( instance ).onlyIf( variation[ 'data-unknown' ] ).to.have.data 'unknown', variation[ 'data-unknown' ]


    expect( instance ).onlyIf( known ).to.have.className '-youknown'

    expect( instance ).onlyIf( ! known ).to.have.className '-unknown'

  ##

##
