chai.use( function smatch( chai, utils ) {

  const Assertion = chai.Assertion;


  Assertion.addMethod( 'matchTypes', function( input ) {

    let object = this._obj;


    let check = checkPropTypes( input, object );


    this.assert(

      Boolean( check ) === false,

      `expected #{this} to match types. ${ check }`,

      `expected #{this} not to match types`,

    );

  } );

} );
