describe 'Link', ->

  Link = requireSubject()


  SAME_HREFS = [ '/tests', '//reactoids.com/tests', 'https://reactoids.com/tests/?#' ]

  OTHER_HREFS = [ '/check', 'https://asd.com', 'https://reactoids.com:60/tests' ]


  variants = {

    href: SAME_HREFS.concat OTHER_HREFS

    isCurrent: [ false, true, sinon.spy _.random ]

    'data-unknown': [ 3 ]

  }

  options = {

    afterEach: ( variation )->

      variation.isCurrent.reset() if _.isFunction variation.isCurrent

    ##

  }

  itVariations 'renders [s]', variants, options, ( variation )->

    instance = shallow <Link {... variation } />


    expect( instance ).to.match 'a.link'

    expect( instance ).onlyIf( variation.href ).to.have.attr 'href', variation.href

    expect( instance ).onlyIf( variation[ 'data-unknown' ] ).to.have.data 'unknown', variation[ 'data-unknown' ]

    expect( instance ).onlyIf( _.isString variation.href ).to.have.className '-enabled'

    expect( instance ).onlyIf( ! _.isString variation.href ).to.have.className '-disabled'


    if variation.href

      if variation.isCurrent != undefined

        if _.isFunction variation.isCurrent

          expect( variation.isCurrent ).callCount 1

          isCurrent = variation.isCurrent.returnValues[ 0 ]

        else

          isCurrent = variation.isCurrent

        ##

      else

        isCurrent = _.includes SAME_HREFS, variation.href

      ##

    else

      if _.isFunction variation.isCurrent

        expect( variation.isCurrent ).not.to.have.been.called

      ##

      isCurrent = false

    ##

    expect( instance ).onlyIf( isCurrent ).to.have.className '-current'

  ##

##
