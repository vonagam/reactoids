describe 'Image', ->

  Image = requireSubject()


  variants = {

    tag: [ 'img', 'div' ]

    src: [ 'isrc' ]

    style: [ { display: 'none' }, { backgroundImage: 'asd' } ]

    'data-unknown': [ 3 ]

  }


  itVariations 'renders [s]', variants, ( variation )->

    { tag, src } = variation

    img = tag == undefined || tag == 'img'


    instance = shallow <Image {... variation } />

    props = instance.props()


    expect( instance ).to.have.tagName tag || 'img'

    expect( instance ).to.have.className 'image'

    expect( instance ).onlyIf( variation[ 'data-unknown' ] ).to.have.data 'unknown', variation[ 'data-unknown' ]

    expect( _.get props, 'style.display' ).equal _.get variation, 'style.display'


    expect( instance ).onlyIf( src ).to.have.className '-enabled'

    expect( instance ).onlyIf( ! src ).to.have.className '-disabled'


    if src

      expect( instance ).onlyIf( img && src ).to.have.attr 'src', src

      expect( _.get props, 'style.backgroundImage' ).onlyIf( ! img ).equal "url(#{ src })"

    else

      expect( instance ).to.not.have.attr 'src'

      expect( _.get props, 'style.backgroundImage' ).equal _.get variation, 'style.backgroundImage'

    ##

  ##

##
