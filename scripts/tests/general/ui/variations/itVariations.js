import Promise from 'bluebird';

import findReasons from './findReasons';


const itVariations = function( type, title, scheme, options, fn ) {

  if ( arguments.length == 4 ) return itVariations( type, title, scheme, {}, options );


  options = _.defaults( {}, options, {

    skip: _.constant( false ),

    only: _.constant( true ),

    before: _.noop,

    after: _.noop,

    beforeEach: _.noop,

    afterEach: _.noop,

    timeoutFactor: 100,

    parallel: false,

    sinon: false,

  } );

  if ( options.sinon ) options.parallel = false;


  let it = type ? global.it[ type ] : global.it;

  it( title, async function() {

    let problems = [];

    let context = {};


    let variations = getVariations( scheme, { skip: options.skip, only: options.only } );

    if ( _.isEmpty( variations ) ) return;


    this.timeout( 2000 + variations.length * options.timeoutFactor );


    await options.before( context );

    try {

      await Promise[ options.parallel ? 'map' : 'each' ]( variations, async ( variation, index ) => {

        let testContext = _.assign( {}, context, { index } );

        if ( options.sinon ) testContext.sinon = sinon.createSandbox();

        await options.beforeEach( variation, testContext );

        try {

          await fn( variation, testContext );

        } catch ( error ) {

          let problem = _.find( problems, ( problem ) => _.isEqual( problem.error.stack, error.stack ) );

          if ( problem ) {

            problem.variations.push( variation );

          } else {

            problem = { error: error, variations: [ variation ] };

            problems.push( problem );

          }

        } finally {

          await options.afterEach( variation, testContext );

          if ( options.sinon ) testContext.sinon.restore();

        }

      } );

    } finally {

      await options.after( context );

    }


    if ( problems.length > 0 ) {

      let problem = problems[ 0 ];

      let reasons = findReasons( variations, problem.variations );

      let error = problem.error;

      error.message = `${ reasons }: ${ error.message }`;

      if ( problems.length > 1 ) error.message = `(one of ${ problems.length } errors): ${ error.message }`;

      throw error;

    }

  } );

};


global.itVariations = _.partial( itVariations, undefined );

global.itVariations.skip = _.partial( itVariations, 'skip' );

global.itVariations.only = _.partial( itVariations, 'only' );
