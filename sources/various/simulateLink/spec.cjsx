describe 'simulateLink', ->

  $ = requireDependency 'jquery'

  windowLocation = requireWindow 'location' # https://developer.mozilla.org/en-US/docs/Web/API/Location

  simulateLink = requireSubject()


  hrefBefore = windowLocation.href


  variants = {

    prevent: [ true ]

    containter: [ $( '<div>' ) ]

    decorateLink: [ ( $link )-> $link.attr 'data-unknown', 3 ]

  }

  options = {

    only: ( variation )->=

      variation.href

    ##

    afterEach: ->

      windowLocation.href = hrefBefore

    ##

  }

  itVariations 'works', variants, options, ( variation )->

    $link = undefined

    href = 'https://foo.bar/'


    onClick = sinon.spy ( event )->

      $link = $ event.target

      event.preventDefault() if variation.prevent

    ##

    containter = variation.containter || $( 'body' )

    containter.one 'click', onClick


    simulateLink href, variation.containter, variation.decorateLink


    expect( onClick ).to.be.calledOnce

    expect( $link.is 'a' ).to.be.true

    expect( $link.attr 'data-unknown' ).onlyIf( variation.decorateLink ).to.equal '3'

    expect( $link.parent() ).onlyIf( variation.prevent ).to.have.lengthOf 0

    # TODO expect( windowLocation.href ).to.equal if variation.prevent then hrefBefore else href

    $link.remove()

  ##

  it 'should be tested better'

##
