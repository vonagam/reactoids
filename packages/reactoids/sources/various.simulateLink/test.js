defSinon( 'assignHref', stub( window.location, 'assign' ) );

defLocation( 'https://foo.bar/baz?qux' );


contexts( 'with href = ${ doStringify( value.href ) }', [

  { href: 'https://a.b/', location: 'https://a.b/' },

  { href: '/x', location: '/x' },

  { href: undefined, location: '' },

], ( { href, location } ) => {

  contexts( 'with container = ${ key }', {

    'undefined': undefined,

    '$( <div> )': $( '<div>' ),

  }, ( containter ) => {

    contexts( {

      'with decorateLink': spy(),

      'without decorateLink': undefined,

    }, ( decorateLink ) => {

      defSinon( 'decorateLink', decorateLink );

      contexts( {

        'with prevention': true,

        'without prevention': false,

      }, ( prevent ) => {

        it( 'does work', () => {

          let $link, $containter;

          let onClick = sinon.spy( ( event ) => {

            $link = $( event.target );

            $containter = $link.parent();

            if ( prevent ) {

              event.preventDefault();

            }

          } );


          let containter2 = containter || $( 'body' );


          containter2.on( 'click', onClick );

          simulateLink( href, containter, decorateLink );

          containter2.off( 'click', onClick );


          expect( onClick ).to.be.calledOnce;

          expect( $link.is( 'a' ) ).to.be.true;

          expect( $containter.is( containter2 ) ).to.be.true;

          if ( decorateLink ) {

            expect( decorateLink ).to.be.calledOnce.and.be.calledWithMatch( $link );

          }

          expect( $link.parent() ).to.have.lengthOf( 0 );

          expect( $assignHref ).to.have.callCount( 1 - prevent ).and.onlyIf( ! prevent ).to.be.calledWithExactly( location );

        } );

      } );

    } );

  } );

} );
