chai.use( function onlyIf( chai, utils ) {

  const Assertion = chai.Assertion;


  Assertion.addMethod( 'onlyIf', function( bool ) {

    utils.flag( this, 'negate', ! bool );

  } );

} );
