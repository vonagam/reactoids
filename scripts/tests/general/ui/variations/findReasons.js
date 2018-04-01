const getScheme = function( variations ) {

  let keys = _.keys( variations[ 0 ] );

  return _.transform( keys, ( scheme, key ) => {

    scheme[ key ] = _.uniq( _.map( variations, key ) );

  }, {} );

};


export default findReasons = function( variationsAll, variationsBad ) {

  if ( variationsAll.length == variationsBad.length ) return `all ${ variationsAll.length } variations`;


  let schemeAll = getScheme( variationsAll );

  let schemeBad = getScheme( variationsBad );

  let reasons = {};

  _.each( _.keys( schemeBad ), ( key ) => {

    let valuesAll = schemeAll[ key ];

    let valuesBad = schemeBad[ key ];

    if ( valuesAll.length == valuesBad.length ) return;

    let valuesGood = _.difference( valuesAll, valuesBad );

    let reason;

    if ( valuesGood.length == 1 && valuesAll.length > 2 ) {

      reason = `not ${ doStringify( valuesGood[ 0 ] ) }`;

    } else if ( valuesBad.length == 1 ) {

      reason = `only ${ doStringify( valuesBad[ 0 ] ) }`;

    } else {

      reason = `in ( ${ _.map( valuesBad, doStringify ).join( ', ' ) } )`;

    }

    reasons[ key ] = reason;

  } );


  if ( _.isEmpty( reasons ) ) return `all values (${ variationsBad.length }/${ variationsAll.length } variations)`;


  return _.map( reasons, ( message, key ) => (

    `${ key }(${ schemeBad[ key ].length }/${ schemeAll[ key ].length }): ${ message }`

  ) ).join( ', ' );

};
