describe 'Paginator', ->

  Paginator = requireSubject()


  variants = {

    current: [ 0, 3, 10, 11 ]

    total: [ 12, 17 ]

    size: [ 2, 4, 9 ]

    url: [ ( page )->= "url#{ page }" ]

    'data-unknown': [ 3 ]

  }

  options = {

    skip: ( variation )->=

      _.some _.pick( variation, 'current', 'total', 'size', 'url' ), _.isUndefined

    ##

  }

  itVariations 'renders [s]', variants, options, ( variation )->

    { current, total, size, url } = variation


    instance = shallow <Paginator {... variation } />


    expect( instance ).to.match 'div.paginator'

    expect( instance ).onlyIf( variation[ 'data-unknown' ] ).to.have.data 'unknown', variation[ 'data-unknown' ]


    strings = instance.children().map ( child )->= child.prop 'children'

    strings = _.filter strings, _.isString

    expect( strings ).to.deep.equal [ '#first', '#prev', '#next', '#last' ]


    all = 4 + total

    min = 4 + 1 + ( size + 1 ) * 2

    size = Math.min min, all

    expect( instance.children() ).to.have.lengthOf size


    names = instance.children().map ( child )->= child.prop 'className'

    onEdge = current == 0 || current == total - 1

    expect( _.count names, 'button -number -disabled -current' ).to.equal 1

    expect( _.count names, 'button -named -disabled -current' ).equal +onEdge

    expect( _.count names, 'button -named -disabled' ).equal +onEdge


    hrefs = instance.children().map ( child )->= child.prop 'href'

    expect( _.count hrefs, url current ).to.equal 0

    expect( _.count hrefs, url current - 1 ).to.equal( 2 * ( current != 0 ) + 1 * ( current == 1 ) )

    expect( _.count hrefs, url current + 1 ).to.equal( 2 * ( current != total - 1 ) + 1 * ( current == total - 2 ) )

  ##

##
