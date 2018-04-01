const eachVariation = function( scheme, iteratee ) {

  let keys = _.keys( scheme );

  let heaKey = _.head( keys );

  let headValues = scheme[ heaKey ];

  let tail = _.omit( scheme, heaKey );

  _.each( headValues, ( headValue ) => {

    let headVariation = { [ heaKey ]: headValue };

    if ( _.isEmpty( tail ) ) {

      iteratee( headVariation );

    } else {

      eachVariation( tail, ( variation ) => {

        iteratee( _.assign( {}, headVariation, variation ) );

      } );

    }

  } );

};


export default getVariations = function( scheme, options = {} ) {

  let variations = [];

  eachVariation( scheme, ( variation ) => {

    if ( options.skip && options.skip( variation ) === true ) return;

    if ( options.only && options.only( variation ) === false ) return;

    variations.push( variation );

  } );

  return variations;

};


global.getVariations = getVariations;
