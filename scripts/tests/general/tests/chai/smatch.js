import DeepEqual from 'sinon/lib/sinon/util/core/deep-equal';


chai.use( function smatch( chai, utils ) {

  const Assertion = chai.Assertion;

  const deepEqual = DeepEqual.use( sinon.match );


  Assertion.addMethod( 'smatch', function( input ) {

    let object = this._obj;


    this.assert(

      deepEqual( input, object ),

      function() {

        return 'expected #{this} to match ' + spy.formatters.D(

          { callCount: 1, getCall: () => ( { args: [ object ] } ) },

          [ input ],

        );

      },

      function() {

        return 'expected #{this} not to match ' + spy.formatters.D(

          { callCount: 1, getCall: () => ( { args: [ object ] } ) },

          [ input ],

        );

      },

    );

  } );

} );
